/**
 * CreatedBy : Sreedhar
 * Createddate : Oct 19 2023
 * Decription : This is the function file for Account Create
 */
import React, { useEffect, useState } from 'react';
import { Button, sdkMui } from '@baas/platform-web-sdk';
import CancelIcon from '@mui/icons-material/Cancel';
import { CreateAccountsInterface } from '@/interfaces/components/sales/customers/pricelist/createAccountsInterface';
import { Messages } from '@/utils/Messages';
import MenuItem from '@mui/material/MenuItem';
import { AlertProps } from "@mui/material/Alert";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <sdkMui.Alert elevation={6} ref={ref} variant="filled" {...props} />;
});
// const customerAccountListFunction = new CustomerAccountListFunction()
const messages = new Messages();

export function CreatePriceListForm({ configs, data, callbacks }: CreateAccountsInterface) {
    const [displayErrorMessage, setDisplayErrorMessage] = useState(false);
    const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false)
    const [isButtonloading, setIsButtonLoading] = useState(false)
    const [accountData, setAccountData] = useState({
        CustomerID: configs?.router?.query?.customerid,
        AccountNumber: "",
        AccountCode: "",
        DisplayName: "",
        CurrencyID: "",
        OpenedDate: "",
        Username: "",
        Password: "",
        AutoReplenishAmount: "",
        LowBalanceThreshold: "",
        AppSettingNetTermID: ""
    })

    const handleFormSumbit = async (e: any) => {
        e?.preventDefault();
        e?.preventDefault()
        let reqdata = Object.assign({}, accountData, data?.Currency)
        let response = await configs?.functionObject?.CreateAccount(reqdata);
        if (response?.status === 200) {
            callbacks?.handleAccountCreateFormSubmit(response);

        } else {
            setDisplayErrorMessage(true)
        }
    }

    const handleFormChange = (e: any) => {
        setAccountData((prevState: any) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        });
    };

    useEffect(() => {
        if (displayErrorMessage) {
            setDisplayErrorMessage(true);
            setIsButtonLoading(false)
            setTimeout(() => {
                setIsSubmitButtonDisabled(false);
                setDisplayErrorMessage(false)
            }, 3000)
        }
    }, [displayErrorMessage])

    return (
        <>
            <form onSubmit={(e: any) => { { handleFormSumbit(e) }; setIsButtonLoading(true) }} data-testId={`${configs?.datatestID}`}>
                <sdkMui.Box sx={{
                    position: 'absolute',
                    top: '30%',
                    left: '30%',
                    bgcolor: 'background.paper',
                    borderRadius: '13px',
                    p: 2,
                    width: '35%',
                }}
                >
                    <sdkMui.Grid container spacing={2} sx={{ mt: 0 }}>
                        <sdkMui.Grid xs={11} sm={11} md={11} lg={11} xl={11} sx={{ display: 'flex', justifyContent: "center", alignItems: 'center', textAlign: 'center', }}>
                            <b>Create Account </b>
                        </sdkMui.Grid>
                        <sdkMui.Grid xs={1} sm={1} md={1} lg={1} xl={1} sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                            <sdkMui.IconButton
                                aria-label="close"
                                onClick={() => callbacks?.handleAccountCreateFormClose()}
                                sx={{
                                    position: 'absolute',
                                    float: 'right',
                                    color: 'red',
                                    fontWeight: 800,
                                    padding: 0
                                }}
                            >
                                <CancelIcon />
                            </sdkMui.IconButton>
                        </sdkMui.Grid>
                    </sdkMui.Grid>
                    &nbsp;
                    <sdkMui.Grid container spacing={2}>
                        <sdkMui.Grid item xs={6} sm={6} md={6} lg={6} xl={6} sx={{ display: "flex", textAlign: "center", justifyContent: "center", alignItems: "center" }}>
                            <sdkMui.TextField
                                style={{ width: "80%" }}
                                variant="filled"
                                name='AccountNumber'
                                label="Account Number"
                                placeholder='Enter Account Number...'
                                required={true}
                                type='text'
                                data-testid="Account-number"
                                disabled={false}
                                value={accountData?.AccountNumber}
                                onChange={(e: any) => handleFormChange(e)}
                            />
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={6} sm={6} md={6} lg={6} xl={6} sx={{ display: "flex", textAlign: "center", justifyContent: "center", alignItems: "center" }}>
                            <sdkMui.TextField
                                style={{ width: "80%" }}
                                variant="filled"
                                name='AccountCode'
                                label="Account Code"
                                placeholder='Enter AccountCode...'
                                required={true}
                                type='text'
                                data-testid="Account-code"
                                disabled={false}
                                value={accountData?.AccountCode}
                                onChange={(e: any) => handleFormChange(e)}
                            />
                        </sdkMui.Grid>
                    </sdkMui.Grid>
                    &nbsp;
                    <sdkMui.Grid container spacing={2}>
                        <sdkMui.Grid item xs={6} sm={6} md={6} lg={6} xl={6} sx={{ display: "flex", textAlign: "center", justifyContent: "center", alignItems: "center" }}>
                            <sdkMui.TextField
                                style={{ width: "80%" }}
                                variant="filled"
                                name='DisplayName'
                                label="Account Name"
                                placeholder='Enter Account Name...'
                                required={true}
                                type='text'
                                disabled={false}
                                value={accountData?.DisplayName}
                                onChange={(e: any) => handleFormChange(e)}
                            />
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={6} sm={6} md={6} lg={6} xl={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <sdkMui.TextField
                                style={{ width: "80%" }}
                                variant="filled"
                                name='CurrencyID'
                                label="Currency Code"
                                placeholder='Enter Currency Code...'
                                required
                                select
                                value={accountData?.CurrencyID}
                                onChange={(e: any) => handleFormChange(e)}                            >
                                {data?.Currency?.map((data: any) => (
                                    <MenuItem key={data.CurrencyID} value={data.CurrencyID}>
                                        {`${data.CurrencyCode} ${data.CurrencySymbol}`}
                                    </MenuItem>
                                ))}

                            </sdkMui.TextField>
                        </sdkMui.Grid>
                    </sdkMui.Grid>
                    &nbsp;
                    <sdkMui.Grid container spacing={2}>
                        <sdkMui.Grid item xs={6} sm={6} md={6} lg={6} xl={6} sx={{ display: "flex", textAlign: "center", justifyContent: "center", alignItems: "center" }}>
                            <sdkMui.TextField
                                style={{ width: "80%" }}
                                variant="filled"
                                name='Username'
                                label="User Name"
                                placeholder='Enter Username...'
                                required={true}
                                type='text'
                                disabled={false}
                                value={accountData?.Username}
                                onChange={(e: any) => handleFormChange(e)}
                            />
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={6} sm={6} md={6} lg={6} xl={6} sx={{ display: "flex", textAlign: "center", justifyContent: "center", alignItems: "center" }}>
                            <sdkMui.TextField
                                style={{ width: "80%" }}
                                variant="filled"
                                name='Password'
                                label="Password"
                                placeholder='Enter Password...'
                                required={true}
                                type='Password'
                                disabled={false}
                                value={accountData?.Password}
                                onChange={(e: any) => handleFormChange(e)}
                            />
                        </sdkMui.Grid>
                    </sdkMui.Grid>
                    &nbsp;
                    <sdkMui.Grid container spacing={2}>
                        <sdkMui.Grid item xs={6} sm={6} md={6} lg={6} xl={6} sx={{ display: "flex", textAlign: "center", justifyContent: "center", alignItems: "center" }}>
                            <sdkMui.TextField
                                style={{ width: "80%" }}
                                variant="filled"
                                name='AutoReplenishAmount'
                                label="Auto Replenish Amount"
                                placeholder='Enter AutoReplenishAmount...'
                                required={true}
                                type='text'
                                disabled={false}
                                value={accountData?.AutoReplenishAmount}
                                onChange={(e: any) => handleFormChange(e)}
                            />
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={6} sm={6} md={6} lg={6} xl={6} sx={{ display: "flex", textAlign: "center", justifyContent: "center", alignItems: "center" }}>
                            <sdkMui.TextField
                                style={{ width: "80%" }}
                                variant="filled"
                                name='LowBalanceThreshold'
                                label="Low Balance Threshold"
                                placeholder='Enter LowBalanceThreshold...'
                                required={true}
                                type='text'
                                disabled={false}
                                value={accountData?.LowBalanceThreshold}
                                onChange={(e: any) => handleFormChange(e)}

                            />
                        </sdkMui.Grid>
                    </sdkMui.Grid>
                    &nbsp;
                    <sdkMui.Grid container spacing={2}>
                        <sdkMui.Grid item xs={6} sm={6} md={6} lg={6} xl={6} sx={{ display: "flex", textAlign: "center", justifyContent: "center", alignItems: "center" }}>
                            <sdkMui.TextField
                                style={{ width: "80%" }}
                                variant="filled"
                                name='OpenedDate'
                                label="Opened Date"
                                required={true}
                                type='date'
                                disabled={false}
                                value={accountData?.OpenedDate}
                                onChange={(e: any) => handleFormChange(e)}
                            />
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={6} sm={6} md={6} lg={6} xl={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <sdkMui.TextField
                                style={{ width: "80%" }}
                                variant="filled"
                                name='AppSettingNetTermID'
                                label="App Setting Net Term"
                                placeholder='Enter Net Term Name...'
                                required
                                select
                                value={accountData?.AppSettingNetTermID}
                                onChange={(e: any) => handleFormChange(e)}                            >
                                {data?.AppSettingsNetTermData?.map((data: any) => (
                                    <MenuItem key={data.AppSettingNetTermID} value={data.AppSettingNetTermID}>
                                        {data.AppSettingNetTerm}
                                    </MenuItem>
                                ))}
                            </sdkMui.TextField>
                        </sdkMui.Grid>
                    </sdkMui.Grid>
                    &nbsp;
                    <sdkMui.Grid item xs={12} container spacing={2}>
                        <sdkMui.Grid item xs={12} sx={{ display: 'flex', justifyContent: 'Center', alignItems: 'Center', height: '45%' }}>
                            <Button
                                callbacks={{
                                    handleButtonClick: () => { }
                                }}
                                configs={{
                                    label: 'Add Account',
                                    color: 'primary',
                                    size: 'large',
                                    type: "submit",
                                    isButtonDisabled: isSubmitButtonDisabled,
                                    isButtonloading: isButtonloading,
                                    varient: 'contained',
                                    dataTestID: 'Instance-service-submit-button'
                                }}
                            />
                        </sdkMui.Grid>
                    </sdkMui.Grid>
                    {displayErrorMessage && (
                        <Alert
                            data-testid="Connector-Duplicate-Message"
                            sx={{ mt: 2 }}
                            severity="error"
                        >
                            {messages?.DUPLICATE_Accounts_MESSASGE}
                        </Alert>
                    )}
                </sdkMui.Box>
            </form>
        </>
    );
}       
