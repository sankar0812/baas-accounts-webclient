/**
 * CreatedBy : HariPrakash
 * Createddate : Oct 12 2023
 * Decription : This  file for Account Lists
 */
import { ListCustomersAccount } from "@/components/sales/customers/AccountsList/ListAccounts";
import { Button, Snackbar, Spinner, sdkMui } from "@baas/platform-web-sdk";
import { Breadcrumb, } from "@baas/platform-web-sdk";
import { CustomerAccountListFunction } from "@/functions/sales/customers/CustomerAccountFunction";
import { CustomerFunction } from "@/functions/sales/customers/CustomerFunction";
import { useState } from "react";
import { CustomerAccountList } from "@/configs/pages/sales/customers/CustomerAccountList.Config";
import AppStore from "../../../../../../../../appstorefile";
import { platformHelper } from "@baas/platform-web-sdk";
import { useRouter } from "next/router";
import { CustomerSettingsList } from "@/components/sales/customers/CustomerSettings";
import { CustomersSettingsConfig } from "@/configs/pages/sales/customers/customerSettings.Config";
import Modal from '@mui/material/Modal';
import { CreatePriceListForm } from "@/components/sales/customers/AccountsList/CreateAccounts";
import { Messages } from "@/utils/Messages";
import { CurrencyFunction } from "@/functions/Currency/CurrencyFunction";
import { Constants } from "@/utils/Constants"
import { AppSettingsFunction } from '@/functions/appsettings/appsettings';

const appstore = new AppStore()
const messages = new Messages()
const constants = new Constants()
const customerAccountListFunction = new CustomerAccountListFunction()
const customerFunction = new CustomerFunction();
const customerAccountColumnSettings = new CustomerAccountList()
const currencyFunction = new CurrencyFunction()
const appSettingsFunction = new AppSettingsFunction();

export default function CustomerAccounts(props: any) {
    const router = useRouter()
    const timeout = 3000
    const [customerInfo] = useState(props?.customerInfo?.output?.[0])
    const [isPageLoading, setIsPageLoading] = useState(false)
    const [listAccount, setListAccount] = useState(props?.customerList?.output)
    const [isCreateFormOpen, setIsCreateFormOpen] = useState<boolean>(false);
    const [isFormSubmitButtonDisabled, setIsFormSubmitButtonDisabled] = useState(false)
    const [] = useState(customerAccountColumnSettings?.handleCustomerAcccountListheaderColumn())
    const customersSettingsConfig = new CustomersSettingsConfig()
    const [isAccountCreateSuccessMessageOpen, setIsAccountCreateSuccessMessageOpen] = useState(false)
    const [currency] = useState(props?.Currency?.output)
    const [isPopUpVisible, setIsPopUpVisible] = useState(false)
    const [appSettingsNetTerm] = useState(props?.appSettingsNetTerm?.output)
    const readAccount = async () => {
        let readAccountList = await customerAccountListFunction?.readCustomersAccountList(parseInt(`${router?.query?.customerid}`))
        if (readAccountList?.status === 200) {
            setListAccount(readAccountList?.output)
            setIsPageLoading(false)
        } else {
            setListAccount(readAccountList?.output)
            setIsPageLoading(false)
        }
    }
    const handleAccountCreateformSumbit = async (data: any) => {
        if (data?.status === 200) {
            setIsPageLoading(true)
            setIsCreateFormOpen(false)
            setIsAccountCreateSuccessMessageOpen(true)
            readAccount()
            setTimeout(() => {
                setIsAccountCreateSuccessMessageOpen(false)
            }, 3000)
            setIsFormSubmitButtonDisabled(false)
        } else {
            setIsCreateFormOpen(false)
        }
    }
    return (
        <>
            <sdkMui.Grid container spacing={2} direction={'column'}>
                <sdkMui.Grid item xs={12} sx={{ mt: 1 }} >
                    <Breadcrumb configs={{
                        breadcrumbItems: [
                            { breadcrumbItemName: "Customers", href: `/merchants/${router.query.merchantkey}/sales/customers`, name: "customers" },
                            { breadcrumbItemName: customerInfo?.CustomerName, href: '', name: customerInfo?.CustomerName },
                            { breadcrumbItemName: "Accounts", href: "", name: "accounts" },
                        ],
                        router: router
                    }}
                        data={{ defaltBreadcrumbItemName: "accounts" }}
                    />
                </sdkMui.Grid>
                <sdkMui.Grid item xs={12} sx={{ mt: 1 }}>
                    <sdkMui.Grid container spacing={2} direction={'row'} sx={{ display: 'flex', }}>
                        <sdkMui.Grid item xs={2} sx={{ mt: 1, textAlign: 'left' }} >
                            <CustomerSettingsList
                                configs={{
                                    moduleName: 'accounts',
                                    router: router,
                                    selectedSchemaCode: 'ACCOUNTS'
                                }}
                                data={{
                                    customerSettingsList: customersSettingsConfig?.CUSTOMERS_DETAIL
                                }}
                            />
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={10} >
                            <sdkMui.Typography variant="h4" fontWeight={'bold'} sx={{ p: 1 }}>{listAccount[0].Customer.CustomerName}
                                <div style={{ float: 'right' }}>
                                    <Button
                                        callbacks={{
                                            handleButtonClick: () => { setIsCreateFormOpen(true), setIsFormSubmitButtonDisabled(false) }
                                        }}
                                        configs={{
                                            label: `Add`,
                                            color: 'primary',
                                            size: 'small',
                                            type: 'button',
                                            startIcon: <span style={{ marginRight: '-7px' }} className="material-symbols-outlined">
                                                add
                                            </span>,
                                            varient: 'contained',
                                            isButtonDisabled: false,
                                            dataTestID: 'Accounts-Create-Button'
                                        }}
                                    />
                                </div>
                                <Modal
                                    open={isCreateFormOpen}
                                    onClose={() => { setIsCreateFormOpen(true) }}
                                    closeAfterTransition
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <CreatePriceListForm
                                        configs={{
                                            datatestID: 'Create_Accounts',
                                            router: router,
                                            functionObject: customerAccountListFunction,
                                            isSubmitButtonDisabled: isFormSubmitButtonDisabled,
                                        }}
                                        data={{
                                            Currency: currency,
                                            AppSettingsNetTermData: appSettingsNetTerm
                                        }}
                                        callbacks={{
                                            handleAccountCreateFormClose: () => { setIsCreateFormOpen(false), setIsPopUpVisible(true); setIsFormSubmitButtonDisabled(true) },
                                            handleAccountCreateFormSubmit: (data: any) => { handleAccountCreateformSumbit(data); setIsFormSubmitButtonDisabled(true) }
                                        }} />
                                </Modal>
                                {
                                    isPopUpVisible &&
                                    <sdkMui.Dialog
                                        open={isPopUpVisible}
                                        keepMounted
                                    >
                                        <sdkMui.DialogContent>
                                            <sdkMui.DialogContentText>
                                                <b>{constants?.LOST_MESSAGE_DATA}</b>
                                            </sdkMui.DialogContentText>
                                        </sdkMui.DialogContent>
                                        <sdkMui.DialogActions>
                                            <Button
                                                callbacks={{
                                                    handleButtonClick: () => { setIsPopUpVisible(false) }
                                                }}
                                                configs={{
                                                    label: 'No',
                                                    color: 'secondary',
                                                    size: 'small',
                                                    type: 'button',
                                                    varient: 'contained',
                                                }}
                                            />
                                            <Button
                                                callbacks={{
                                                    handleButtonClick: () => { setIsPopUpVisible(false); }
                                                }}
                                                configs={{
                                                    label: 'Yes',
                                                    color: 'error',
                                                    size: 'small',
                                                    type: 'button',
                                                    varient: 'contained',
                                                }}
                                            />
                                        </sdkMui.DialogActions>
                                    </sdkMui.Dialog>
                                }


                            </sdkMui.Typography>
                            {isPageLoading ?
                                <Spinner /> :
                                <ListCustomersAccount
                                    configs={{
                                        functionObject: customerAccountListFunction,
                                        'data-testid': "CustomerAccountList",
                                        router: router
                                    }}
                                    data={{
                                        AccountList: listAccount,
                                    }} />

                            }
                        </sdkMui.Grid>
                    </sdkMui.Grid>
                </sdkMui.Grid>
            </sdkMui.Grid>
            {isAccountCreateSuccessMessageOpen &&
                <Snackbar
                    configs={{
                        severity: 'success',
                        alertDescription: messages?.Account_CREATE_SUCCESS_MESSASGE,
                        isSetOpen: isAccountCreateSuccessMessageOpen,
                        snackbarAutoHideDuration: timeout,
                        dataTestID: 'Instanceservice-Create-Success-Message'
                    }}
                />
            }
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


    //ServerSide function calling
    let customer = await customerFunction?.readCustomersByIDSSR(parseInt(customerid))
    let customerList = await customerAccountListFunction?.readCustomersAccountListSSR(parseInt(customerid))
    let Currency = await currencyFunction?.readCurrencySSR()
    let appSettingsNetTerm = await appSettingsFunction?.readAppSettingsNetTerm()
    return {
        props: {
            customerInfo: customer,
            customerList: customerList,
            Currency: Currency,
            appSettingsNetTerm: appSettingsNetTerm
        }
    }
}

