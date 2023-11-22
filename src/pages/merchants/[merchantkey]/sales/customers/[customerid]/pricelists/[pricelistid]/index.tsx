import { ViewPriceList } from "@/components/sales/customers/pricelist/ViewPricelIst"
import AppStore from "../../../../../../../../../appstorefile";
import { PriceListFunction } from "@/functions/sales/customers/pricelist/PriceListFunction";
import { CurrencyFunction } from "@/functions/Currency/CurrencyFunction";
import { useState } from "react";
import { CustomerFunction } from "@/functions/sales/customers/CustomerFunction";
import { platformHelper } from "@baas/platform-web-sdk";

const appstore = new AppStore()
const priceListFunction = new PriceListFunction();
const customerFunction = new CustomerFunction();
const currencyFunction = new CurrencyFunction()
export default function CustomerAccounts(props: any) {

    const [PriceList] = useState(props?.PriceList?.output[0])


    const [currency] = useState(props?.Currency?.output)

    return (
        <>
            <ViewPriceList
                configs={{
                    "data-testid": "VIEW",
                }}
                data={{
                    viewRecord: PriceList,
                    Currency: currency
                }}
            />
        </>
    )
}
export const getServerSideProps = async (context: any) => {
    const { query } = context
    let customerid = query.customerid;
    let pricelistid = query.pricelistid
    const INSTANCEKEY = appstore?.INSTANCE?.INSTANCE_KEY;
    const CONNECTORURL = appstore?.AUTH?.AUTH_CONNECTOR_URL;
    if (!platformHelper.checkUserCookieStorage(context)) {
        return {
            redirect: {
                destination: `${CONNECTORURL}/signin/${INSTANCEKEY}`,
                permanent: false,
            },
        };
    }
    //ServerSide function calling

    let PriceList = await priceListFunction?.readPriceListByIDSSR(parseInt(customerid), parseInt(pricelistid))

    let customer = await customerFunction?.readCustomersByIDSSR(parseInt(customerid))
    let Currency = await currencyFunction?.readCurrencySSR()
    return {
        props: {
            PriceList: PriceList,
            customerInfo: customer?.output[0],
            Currency: Currency
        }
    }
}
