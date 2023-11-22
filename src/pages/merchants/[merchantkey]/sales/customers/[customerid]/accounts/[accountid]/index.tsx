/**
@CreatedBy    : HariPrakash
@Createddate  : Oct 12 2023
@ModifiedBy   : Muthumariappan
@ModifiedDate : Oct 26 2023
@Decription   : This  file for Account Lists
 */

import { sdkMui } from "@baas/platform-web-sdk";
import { ViewAccountDetailsFunction } from "@/functions/sales/customers/ViewAccountFunction";
import { useState } from "react";
import { CustomerAccountList } from "@/configs/pages/sales/customers/CustomerAccountList.Config";
import AppStore from "../../../../../../../../../appstorefile";
import { platformHelper } from "@baas/platform-web-sdk";
import { ViewAccountDetail } from "@/components/sales/customers/AccountsList/ViewAccount";
import { ViewAccountInvoice } from "@/components/sales/customers/AccountsList/view/ViewAccountInvoice";
import { CustomerFunction } from "@/functions/sales/customers/CustomerFunction";
import { ViewAccountPayment } from "@/components/sales/customers/AccountsList/view/ViewAccountPayment";
import { CustomerAccountInfo } from "@/components/sales/customers/AccountsList/CustomerAccountCardInfo";
import { Breadcrumb, } from "@baas/platform-web-sdk";
import { ViewAccountCard } from "@/components/sales/customers/AccountsList/view/ViewAccountCard";
import { useRouter } from "next/router";


const appstore = new AppStore()
const viewAccountDetailsFunction = new ViewAccountDetailsFunction()
const customerFunction = new CustomerFunction()


const customerAccountColumnSettings = new CustomerAccountList()
export default function CustomerAccounts(props: any) {
    const [ViewAccounts] = useState(props?.viewAccountdetails?.output)
    const [customerInfo] = useState(props?.customerInfo?.output?.[0])
    const [] = useState(customerAccountColumnSettings?.handleCustomerAcccountListheaderColumn())
    const [customerInvoiceCountInfo] = useState(props?.invoiceInfo?.output)
    const [ViewAccountCardsDetail] = useState(props?.viewAccountCardDetails?.output)
    const [customerTransactions] = useState(props?.customerTransaction?.output)
    const router = useRouter()

    return (

        <>
            <sdkMui.Grid item xs={12} sx={{ mt: 1 }} >
                <Breadcrumb configs={{
                    breadcrumbItems: [
                        { breadcrumbItemName: "Customers", href: `/merchants/${router.query.merchantkey}/sales/customers`, name: "customers" },
                        { breadcrumbItemName: customerInfo?.CustomerName, href: '', name: customerInfo?.CustomerName, },
                        { breadcrumbItemName: "AccountsDetails", href: "", name: "accounts" },
                    ],
                    router: router
                }}
                    data={{ defaltBreadcrumbItemName: "accounts" }}
                />
            </sdkMui.Grid>
            <sdkMui.Grid item xs={3} sm={3} lg={3} xl={3} md={3} >
                <CustomerAccountInfo
                    configs={{
                        'data-testid': "CustomerAccountInfo"
                    }}
                    data={{
                        AccountInfo: ViewAccounts,
                    }}
                />
            </sdkMui.Grid>
            <sdkMui.Grid container spacing={2} direction={'column'}>
                <sdkMui.Grid >
                    <sdkMui.Grid item xs={12} sm={12} lg={12} xl={12}>
                        <sdkMui.Grid container spacing={2} data-testid='AccountDetails' sx={{ justifyContent: 'center', alignItems: 'center', backgroundImage: 'images/Banner_pc.png', }}>
                            {ViewAccounts?.map((data: any, index: number) => (
                                <>
                                    <sdkMui.Grid key={index} item xs={12} sm={12} lg={3} xl={3} sx={{ p: 2 }}>
                                        <sdkMui.Card key={data?.Customer} data-testid={`${data.Customer}-sdkMui.Card`} sx={{
                                            background: (theme) => theme.palette.background.paper, p: "14px", color: (theme) => theme.palette.primary.contrastText, width: '100%', boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1);", borderRadius: "15px", cursor: "pointer", WebkitBoxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', '&:hover': {
                                                transform: 'scale(1.05)', boxShadow: '1px 1px 19px 3px rgba(190, 190, 250,1)'
                                            }
                                        }} >
                                            <sdkMui.Grid xs={12} sm={12} lg={12} xl={12} md={12} sx={{ textAlign: 'center', marginRight: '80px', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: "center", color: (theme) => theme?.palette?.text?.primary }} >
                                                <sdkMui.Stack spacing={1} direction="row">
                                                    <sdkMui.Grid >
                                                        <span className="material-symbols-outlined" style={{ borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                            account_balance
                                                        </span>
                                                    </sdkMui.Grid>
                                                    <sdkMui.Typography
                                                        sx={{
                                                            cursor: "pointer",
                                                            textAlign: "center",
                                                            fontWeight: "bold",
                                                        }}
                                                        variant="h5"
                                                    >
                                                        Available Balance
                                                    </sdkMui.Typography>
                                                </sdkMui.Stack>
                                            </sdkMui.Grid>
                                            <sdkMui.Grid xs={12} sm={12} lg={12} xl={12} md={12} sx={{ textAlign: 'center', display: 'flex', alignItems: 'center', marginRight: '25px', marginTop: '10px', fontSize: '30px', justifyContent: "center", color: (theme) => theme?.palette?.text?.primary }} >
                                                <sdkMui.Stack spacing={0} direction="row">
                                                    <span
                                                        style={{
                                                            cursor: 'pointer',
                                                            textAlign: 'center',
                                                            fontWeight: 'bold',
                                                            color: '#42ba96'
                                                        }}
                                                        title={data?.AccountBalance}
                                                    >
                                                        {`${data?.Currency?.CurrencySymbol}${data?.CustomerAccountBalance?.[0]?.AccountBalance}`}
                                                    </span>
                                                </sdkMui.Stack>
                                            </sdkMui.Grid>
                                        </sdkMui.Card>
                                    </sdkMui.Grid>
                                    <sdkMui.Grid key={index} item xs={12} sm={12} lg={3} xl={3} sx={{ p: 2 }}>
                                        <sdkMui.Card key={data?.Customer} data-testid={`${data.Customer}-sdkMui.Card`} sx={{
                                            background: (theme) => theme.palette.background.paper, p: "14px", color: (theme) => theme.palette.primary.contrastText, width: '100%', boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1);", borderRadius: "15px", cursor: "pointer", WebkitBoxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', '&:hover': {
                                                transform: 'scale(1.05)', boxShadow: '1px 1px 19px 3px rgba(190, 190, 250,1)'
                                            }
                                        }} >
                                            <sdkMui.Grid xs={12} sm={12} lg={12} xl={12} md={12} sx={{ textAlign: 'center', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: "center", color: (theme) => theme?.palette?.text?.primary }} >
                                                <sdkMui.Stack spacing={1} direction="row">

                                                    <span className="material-symbols-outlined" style={{ borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        account_balance
                                                    </span>

                                                    <sdkMui.Typography
                                                        sx={{
                                                            cursor: "pointer",
                                                            textAlign: "center",
                                                            fontWeight: "bold",
                                                        }}
                                                        variant="h5"
                                                    >
                                                        Auto Replenish Amount
                                                    </sdkMui.Typography>
                                                </sdkMui.Stack>
                                            </sdkMui.Grid>
                                            <sdkMui.Grid xs={12} sm={12} lg={12} xl={12} md={12} sx={{ textAlign: 'center', display: 'flex', alignItems: 'center', marginRight: '25px', marginTop: '10px', fontSize: '30px', justifyContent: "center", color: (theme) => theme?.palette?.text?.primary }} >
                                                <sdkMui.Stack spacing={0} direction="row">
                                                    {data?.AutoReplenishAmount ? (
                                                        <span
                                                            style={{
                                                                cursor: 'pointer',
                                                                textAlign: 'center',
                                                                fontWeight: 'bold',
                                                                color: '#42ba96'
                                                            }}
                                                        >
                                                            {`${data?.Currency?.CurrencySymbol}${data?.AutoReplenishAmount}`}
                                                        </span>
                                                    ) : (
                                                        "-"
                                                    )
                                                    }
                                                </sdkMui.Stack>
                                            </sdkMui.Grid>
                                        </sdkMui.Card>
                                    </sdkMui.Grid>
                                    <sdkMui.Grid key={index} item xs={12} sm={12} lg={3} xl={3} sx={{ p: 2 }}>
                                        <sdkMui.Card key={data?.Customer} data-testid={`${data.Customer}-sdkMui.Card`} sx={{
                                            background: (theme) => theme.palette.background.paper, p: "14px", color: (theme) => theme.palette.primary.contrastText, width: '100%', boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1);", borderRadius: "15px", cursor: "pointer", WebkitBoxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', '&:hover': {
                                                transform: 'scale(1.05)', boxShadow: '1px 1px 19px 3px rgba(190, 190, 250,1)'
                                            }
                                        }} >
                                            <sdkMui.Grid xs={12} sm={12} lg={12} xl={12} md={12} sx={{ textAlign: 'center', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: "center", color: (theme) => theme?.palette?.text?.primary }} >
                                                <sdkMui.Stack spacing={1} direction="row">

                                                    <span className="material-symbols-outlined" style={{ borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                                                        account_balance
                                                    </span>

                                                    <sdkMui.Typography
                                                        sx={{
                                                            cursor: "pointer",
                                                            textAlign: "center",
                                                            fontWeight: "bold",
                                                        }}
                                                        variant="h5"
                                                    >
                                                        Low Balance Threshold
                                                    </sdkMui.Typography>
                                                </sdkMui.Stack>
                                            </sdkMui.Grid>
                                            <sdkMui.Grid xs={12} sm={12} lg={12} xl={12} md={12} sx={{ textAlign: 'center', display: 'flex', alignItems: 'center', marginRight: '25px', marginTop: '10px', fontSize: '30px', justifyContent: "center", color: (theme) => theme?.palette?.text?.primary }} >
                                                <sdkMui.Stack spacing={0} direction="row">
                                                    {data?.LowBalanceThreshold ? (
                                                        <span
                                                            style={{
                                                                cursor: 'pointer',
                                                                textAlign: 'center',
                                                                fontWeight: 'bold',
                                                                color: '#42ba96'
                                                            }}
                                                            title={data?.CustomerName}
                                                        >
                                                            {`${data?.Currency?.CurrencySymbol}${data?.LowBalanceThreshold}`}
                                                        </span>
                                                    ) : (
                                                        "-"
                                                    )
                                                    }
                                                </sdkMui.Stack>
                                            </sdkMui.Grid>
                                        </sdkMui.Card>
                                    </sdkMui.Grid>
                                </>
                            ))}
                        </sdkMui.Grid>
                    </sdkMui.Grid>
                </sdkMui.Grid>
                <sdkMui.Grid item xs={12}>
                    <sdkMui.Grid container  >
                        <sdkMui.Grid item xs={6} sm={6} lg={6} xl={6} md={6} >
                            <ViewAccountDetail
                                configs={{
                                    functionObject: viewAccountDetailsFunction,
                                    'data-testid': "CustomerAccountList"
                                }}
                                data={{
                                    AccountInformation: customerTransactions,

                                }} />
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={3} sm={3} lg={3} xl={3} md={3} sx={{ mt: 2 }}>
                            <ViewAccountInvoice
                                configs={{
                                    dataTestID: "Customer-Invoice-Info"
                                }}
                                data={{
                                    CustomerInvoiceData: customerInvoiceCountInfo
                                }}
                            />
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={3} sm={3} lg={3} xl={3} md={3} sx={{ mt: 2 }}>
                            <ViewAccountPayment
                                configs={{
                                    dataTestID: "Customer-Payment-Info",
                                }}
                                data={{
                                    viewCustomerPaymentData: customerInvoiceCountInfo
                                }}
                            />
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={12} sm={12} lg={12} xl={12} md={12} >
                            <ViewAccountCard
                                configs={{
                                    dataTestID: "Account-Cards-Details",
                                }}
                                data={{
                                    viewAccountCardData: ViewAccountCardsDetail
                                }}
                            />
                        </sdkMui.Grid>
                    </sdkMui.Grid>
                </sdkMui.Grid>
            </sdkMui.Grid>

        </>
    )
}
export const getServerSideProps = async (context: any) => {


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
    const { query } = context;
    let customerid = query.customerid;
    let customeraccountid = query.accountid;
    let viewAccountdetails = await viewAccountDetailsFunction?.readViewAccountSSR(parseInt(customeraccountid))
    let InvoiceInfo = await customerFunction?.readInvoicesSSR(parseInt(customerid));
    let viewAccountCardDetails = await viewAccountDetailsFunction?.readViewAccountCardSSR(parseInt(customeraccountid))
    let customer = await customerFunction?.readCustomersByIDSSR(parseInt(customerid))
    let customerTransaction = await viewAccountDetailsFunction?.readCustomerTransactionSSR(parseInt(customeraccountid), parseInt(customerid))

    return {
        props: {
            customerInfo: customer,
            viewAccountdetails: viewAccountdetails,
            invoiceInfo: InvoiceInfo,
            viewAccountCardDetails: viewAccountCardDetails,
            customerTransaction: customerTransaction
        }
    }
}

