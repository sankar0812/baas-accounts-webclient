/**
@CreatedBy    : Muthumariappan
@CreatedDate  : Oct 14 2023
@ModifiedBy   : Muthumariappan
@ModifiedDate : Oct 26 2023
@Description  : This file contains view module index page
*/

// Import all the neccessary files in header
import React, { useState } from "react";
import { Breadcrumb, platformHelper, sdkMui } from "@baas/platform-web-sdk";
import { useRouter } from "next/router";
import AppStore from "../../../../../../../../appstorefile";
import { CustomerSettingsList } from "@/components/sales/customers/CustomerSettings";
import { CustomersSettingsConfig } from "@/configs/pages/sales/customers/customerSettings.Config";
import { CustomerFunction } from "@/functions/sales/customers/CustomerFunction";
import { ViewCustomers } from "@/components/sales/customers/viewcustomers/ViewCustomers";
import { ViewCustomerContact } from "@/components/sales/customers/viewcustomers/ViewCustomerContact";
// import {ViewCustomerPayment} from "@/components/sales/customers/viewcustomers/ViewCustomerPayment";


// Initialize the required files as a objects
const customerFunction = new CustomerFunction();
const appstore = new AppStore();
const customersSettingsConfig = new CustomersSettingsConfig()


export default function Paymentsreceived(props: any) {
    const router = useRouter()
    const [viewCustomersData] = useState(props?.customerViewData?.[0])
    const [customerInfo] = useState(props?.customerInfo?.[0])
    const [viewCustomerContactData] = useState(props?.customerContactData)

    return (
        <>
            <sdkMui.Grid container spacing={2} direction={'column'}>
                <sdkMui.Grid item xs={12} sm={6} md={4} lg={3} xl={2} sx={{ mt: 1 }}>
                    <Breadcrumb configs={{
                        breadcrumbItems: [
                            { breadcrumbItemName: "Customers", href: `/merchants/${router.query.merchantkey}/sales/customers`, name: "Customers" },
                            { breadcrumbItemName: customerInfo?.CustomerName, href: '', name: customerInfo?.CustomerName },
                            { breadcrumbItemName: "View", href: `/merchants/${router.query.merchantkey}/view`, name: "View" },
                        ],
                        router: router
                    }}
                        data={{ defaltBreadcrumbItemName: "Customers View" }}
                    />
                </sdkMui.Grid>
                <hr style={{ visibility: "hidden" }} />
                <sdkMui.Grid container sx={{ pl: 2 }}>
                    <sdkMui.Grid item xs={2} sm={2} md={2} lg={2} xl={2}  >
                        <CustomerSettingsList
                            configs={{
                                moduleName: 'View',
                                router: router,
                                selectedSchemaCode: 'VIEW'
                            }}
                            data={{
                                customerSettingsList: customersSettingsConfig?.CUSTOMERS_DETAIL
                            }}
                        />
                    </sdkMui.Grid>
                    <sdkMui.Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                        <sdkMui.Grid container sx={{ display: 'flex', }}>
                            <sdkMui.Grid item xs={4} sm={4} md={5} lg={5} xl={5}>
                                <ViewCustomers
                                    configs={{
                                        dataTestID: "Customers-Info-View-Form",
                                    }}
                                    data={{
                                        viewCustomersData: viewCustomersData
                                    }}
                                />
                            </sdkMui.Grid>
                            <sdkMui.Grid item xs={8} sm={8} md={7} lg={7} xl={7}>
                                <ViewCustomerContact
                                    configs={{
                                        dataTestID: "Customers-Contact"
                                    }}
                                    data={{
                                        viewCustomersContactData: viewCustomerContactData
                                    }}
                                />
                            </sdkMui.Grid>
                        </sdkMui.Grid>
                    </sdkMui.Grid>
                </sdkMui.Grid>
            </sdkMui.Grid>
        </>
    )
}


export const getServerSideProps = async (context: any) => {

    const { query } = context;
    const merchantkey = query.merchantkey;
    const INSTANCEKEY = appstore?.INSTANCE?.INSTANCE_KEY;
    const CONNECTORURL = appstore?.AUTH?.AUTH_CONNECTOR_URL;
    const customerid = query.customerid;

    if (!platformHelper.checkUserCookieStorage(context)) {
        return {
            redirect: {
                destination: `${CONNECTORURL}/signin/${INSTANCEKEY}`,
                permanent: false
            },
        };
    }

    let customerViewData = await customerFunction?.readCustomersByIDSSR(parseInt(customerid));
    let customersContactData = await customerFunction?.readCustomersContactSSR(parseInt(customerid));

    return {
        props: {
            customerViewData: customerViewData?.output,
            customerInfo: customerViewData?.output,
            customerContactData: customersContactData?.output,
            merchantkey: merchantkey,
        }
    }
}