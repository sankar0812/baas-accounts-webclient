/**
 * CreatedBy    : Uma Kohila
 * CreatedDate  : Oct 23 2023
 * ModifiedBy   : Sreedhar
 * ModifiedDate : 
 * Description  : This file contains PriceList index
 */

import { PriceListFunction } from "@/functions/sales/customers/pricelist/PriceListFunction";
import { Breadcrumb, platformHelper, sdkMui } from "@baas/platform-web-sdk"
import { useState } from "react"
import { useRouter } from 'next/router';
import AppStore from "../../../../../../../../appstorefile";
import { CustomerSettingsList } from "@/components/sales/customers/CustomerSettings";
import { CustomersSettingsConfig } from "@/configs/pages/sales/customers/customerSettings.Config";
import { CustomerFunction } from "@/functions/sales/customers/CustomerFunction";
import { ListPriceList } from "@/components/sales/customers/pricelist/ListPriceList";
import { Constants } from "@/utils/Constants";

const appstore = new AppStore()
const constants = new Constants();
const priceListFunction = new PriceListFunction();
const customerFunction = new CustomerFunction();


export default function CustomerAccounts(props: any) {
    const router = useRouter()
    const [customerInfo] = useState(props?.customerInfo?.output?.[0])
    const customersSettingsConfig = new CustomersSettingsConfig()
    const [CusromerAccounts] = useState(props?.CusromerAccounts?.output)
    const [PriceListsforCreate] = useState(props?.PriceListsforCreate?.output)

    return (
        <>
            <sdkMui.Grid container spacing={2} direction={'column'}>
                <sdkMui.Grid item xs={12} sx={{ mt: 1 }} >
                    <Breadcrumb configs={{
                        breadcrumbItems: [
                            { breadcrumbItemName: "Customer", href: ``, name: "customers" },
                            { breadcrumbItemName: customerInfo?.CustomerName, href: '', name: customerInfo?.CustomerName, },
                            { breadcrumbItemName: "PriceList", href: "", name: "pricelist" },
                        ],
                        router: router
                    }}
                        data={{ defaltBreadcrumbItemName: "pricelist" }}
                    />
                </sdkMui.Grid>
                <sdkMui.Grid item xs={12} sx={{ mt: 1 }}>
                    <sdkMui.Grid container spacing={2} direction={'row'} sx={{ display: 'flex', }}>
                        <sdkMui.Grid item xs={2} sx={{ mt: 1, textAlign: 'left' }} >
                            <CustomerSettingsList
                                configs={{
                                    moduleName: 'pricelist',
                                    router: router,
                                    selectedSchemaCode: 'PRICELIST'
                                }}
                                data={{
                                    customerSettingsList: customersSettingsConfig?.CUSTOMERS_DETAIL
                                }}
                            />
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={10} >
                            <sdkMui.Grid container spacing={2}>
                                <sdkMui.Grid item xs={11}>
                                    <sdkMui.Typography variant="h4" fontWeight={'bold'} sx={{ p: 1 }}>Price List</sdkMui.Typography>
                                </sdkMui.Grid>
                            </sdkMui.Grid>
                            <sdkMui.Grid container spacing={2}>
                                <sdkMui.Grid xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2, pt: 6, pl: 3 }}>
                                    <ListPriceList
                                        configs={{
                                            "data-testid": '',
                                            router: router,
                                            functionObj: customerFunction,
                                            pricelistFuncObj: priceListFunction
                                        }}
                                        data={{
                                            CustomerAccounts: CusromerAccounts,
                                            PriceListData: PriceListsforCreate
                                        }} />

                                </sdkMui.Grid>
                            </sdkMui.Grid>
                        </sdkMui.Grid>
                    </sdkMui.Grid>
                </sdkMui.Grid>
            </sdkMui.Grid>
        </>
    )
}
export const getServerSideProps = async (context: any) => {
    const { query } = context
    let customerid = query.customerid
    const INSTANCEKEY = appstore?.INSTANCE?.INSTANCE_KEY;
    const CONNECTORURL = appstore?.AUTH?.AUTH_CONNECTOR_URL;
    let PriceListStatusID
    if (!platformHelper.checkUserCookieStorage(context)) {
        return {
            redirect: {
                destination: `${CONNECTORURL}/signin/${INSTANCEKEY}`,
                permanent: false,
            },
        };
    }
    //ServerSide function calling
    let PriceList = await priceListFunction?.readPriceListSSR(parseInt(customerid))
    let customer = await customerFunction?.readCustomersByIDSSR(parseInt(customerid))
    let CusromerAccounts = await customerFunction?.readCustomerAccountsWithCustomerIDSSR(parseInt(customerid));
    let PriceListStatus = await priceListFunction?.readPriceListStatusSSR(constants?.PRICELIST_STATUS_CODES?.PRICELIST_PUBLISH_STATUS_CODE)
    if (PriceListStatus?.status === 200) {
        PriceListStatusID = PriceListStatus?.output[0]?.PriceListStatusID
    } else {
        PriceListStatusID = 0
    }
    let PriceListsforCreate = await priceListFunction?.readPriceListsforCreateSSR(parseInt(PriceListStatusID))

    return {
        props: {
            PriceList: PriceList,
            customerInfo: customer,
            CusromerAccounts: CusromerAccounts,
            PriceListsforCreate: PriceListsforCreate
        }
    }
}