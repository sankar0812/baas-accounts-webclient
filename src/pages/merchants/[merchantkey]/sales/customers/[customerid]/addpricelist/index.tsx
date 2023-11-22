/**
 * CreatedBy    : Uma Kohila
 * CreatedTime  : Oct 24 2023
 * Description  : This page contains the AddPriceList index page
 */
import { PriceListFunction } from "@/functions/sales/customers/pricelist/PriceListFunction";
import { Breadcrumb, platformHelper, sdkMui } from "@baas/platform-web-sdk"
import { useState } from "react"
import { useRouter } from 'next/router';
import AppStore from "../../../../../../../../appstorefile";
import { CustomerFunction } from "@/functions/sales/customers/CustomerFunction";
import { AddPriceList } from "@/components/sales/customers/pricelist/addPriceList";
import { ProductFunction } from "@/functions/products/product/ProductsFuction";
import { CurrencyFunction } from "@/functions/Currency/CurrencyFunction";

const appstore = new AppStore()
const productFunction = new ProductFunction()
const customerFunction = new CustomerFunction();
const currencyFunction = new CurrencyFunction();
const priceListFunction = new PriceListFunction();

export default function CustomerAccounts(props: any) {
    const router = useRouter()
    const [merchantkey] = useState(props?.merchantkey)
    const [customerInfo] = useState(props?.customerInfo)
    const [productListData] = useState(props?.productList?.output)
    const [CurrencyList] = useState(props?.currencyList?.output)

    return (
        <>
            <sdkMui.Grid container spacing={2} direction={'column'}>
                <sdkMui.Grid item xs={12} sx={{ mt: 1 }} >
                    <Breadcrumb configs={{
                        breadcrumbItems: [
                            { breadcrumbItemName: "Customers", href: `/merchants/${router?.query?.merchantkey}/sales/customers`, name: "Customers" },
                            { breadcrumbItemName: customerInfo?.CustomerName, href: ``, name: customerInfo?.CustomerName },
                            { breadcrumbItemName: "Pricelist", href: `/merchants/${router?.query?.merchantkey}/sales/customers/${router?.query?.customerid}/pricelist`, name: "PriceList" },
                            { breadcrumbItemName: " AddPriceList", href: `/merchants/${router?.query?.merchantkey}/sales/customers/${router?.query?.customerid}/addpricelist`, name: "AddPriceList" },
                        ],
                        router: router
                    }}
                        data={{ defaltBreadcrumbItemName: "pricelist" }}
                    />
                </sdkMui.Grid>
                <AddPriceList
                    configs={{
                        router: router,
                        "data-testid": "Add-PriceList-Component",
                        functionObj: priceListFunction,
                        merchantkey: merchantkey
                    }}
                    data={{
                        productListData: productListData,
                        currencyListData: CurrencyList
                    }} />
            </sdkMui.Grid>
        </>
    )
}
export const getServerSideProps = async (context: any) => {
    const { query } = context
    let customerid = query.customerid
    const INSTANCEKEY = appstore?.INSTANCE?.INSTANCE_KEY;
    const CONNECTORURL = appstore?.AUTH?.AUTH_CONNECTOR_URL;
    const MerchantKey = query?.merchantkey

    if (!platformHelper.checkUserCookieStorage(context)) {
        return {
            redirect: {
                destination: `${CONNECTORURL}/signin/${INSTANCEKEY}`,
                permanent: false,
            },
        };
    }
    //ServerSide function calling
    let productsList = await productFunction?.readProductSSR();
    let currencyList = await currencyFunction?.readCurrencySSR();
    let customer = await customerFunction?.readCustomerByIDSSR(parseInt(customerid));

    return {
        props: {
            customerInfo: customer?.output[0],
            productList: productsList,
            merchantkey: MerchantKey,
            currencyList: currencyList,
        }
    }
}