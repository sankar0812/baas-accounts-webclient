/**
 * CreatedBy     : Uma Kohila
 * CreatedDate   : Oct 27 2023
 * Description   : This file contains record payments interface
 */

import { RecordPaymentInterface } from "@/interfaces/components/sales/customers/payments/RecordPaymentsInterface";
import React, { useEffect, useState } from "react";
import { Snackbar, sdkMui } from "@baas/platform-web-sdk";
import { SelectChangeEvent } from '@mui/material/Select';
import { Button } from "@baas/platform-web-sdk";
import { Helper } from "@/utils/Helper";
import _ from 'lodash'
import { Constants } from "@/utils/Constants";
import { Messages } from "@/utils/Messages";


const helper = new Helper();
const constants = new Constants();
const messages = new Messages

const AuthID = JSON.parse(helper?.getCookie(constants?.AUTH_INFO_COOKIE_NAME))?.AuthID
const AuthName = JSON.parse(helper?.getCookie(constants?.AUTH_INFO_COOKIE_NAME))?.ContactPerson?.ContactPersonName

function RecordPayment({ configs, data }: RecordPaymentInterface) {
    const [paymentMethodID, setSeletedPaymentMethodID] = useState('')
    const [totalInvoicePayment, setTotalInvoicePayment] = useState(0)
    const [customerAccountID, setSeletedCustomerAccountID] = useState('')
    const [invoiceID, setSelectedInvoiceID] = useState('')
    const [tableData, setTableData] = useState<any>([])
    const [closePopup, setClosePopup] = useState(false)
    const [duplicateInvoice, SetDuplicateInvoice] = useState(false)
    const [isEmpltyRowCreation, setIsEmptyRowCreationMessage] = useState(false)
    const [recordPaymentSuccessMessageIsOpen, setRecordPaymentSuccessMessageIsOpen] = useState(false)
    const [recordPaymentErrorMessageIsOpen, setRecordPaymentErrorMessageIsOpen] = useState(false)
    const [bankAccountId, setBankAccountID] = useState('')
    const [CustomerPaymentItem, setCustomerPaymentItem] = useState<any>([])
    const [userInfo, setUserInfo] = useState({
        "MerchantID": '',
        "TenantID": '',
        "CreatedAuthID": AuthID,
        "CreatedBy": AuthName,
        "ModifiedAuthID": AuthID,
        "ModifiedBy": AuthName
    })
    const [invoiceData, setInvoiceData] = useState<any>({
        "InvoiceID": '',
        "InvoiceAmount": '',
        "InvoicePaidAmount": '',
        "InvoiceDate": '',
        "BalanceDue": '',
        "InvoiceNumber": ''
    })

    const [PaymentData, setPaymentData] = useState({
        "Remarks": '',
        "CustomerAccountID": '',
        "PaymentMethodID": '',
        "PaidDate": '',
        "PaidAmount": '',
        "CurrencyCode": '',
        "PaymentConfirmation": '',
        "BankDepositedDate": '',
        "BankPostedDate": '',
        "InvoiceID": '',
        "BalanceDue": '',
        "BankAccountID": '',
        "CurrencyID": ''
    })

    const menu = [
        {
            ColumnName: "InvoiceNumber",
            DisplayName: "Invoice Number",
            IsVisible: true,
        },
        {
            ColumnName: "InvoiceAmount",
            DisplayName: "Invoice Amount",
            IsVisible: false,
        },
        {
            ColumnName: "InvoiceDate",
            DisplayName: "Invoice Date",
            IsVisible: true,
        },
        {
            ColumnName: "BalanceDue",
            DisplayName: "Balance Due",
            IsVisible: true,
        },
        {
            ColumnName: "PaidAmount",
            DisplayName: "Paid Amount",
            IsVisible: true,
        }
    ]
    const handleFormChange = (e: any) => {
        setPaymentData((prevState: any) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            };
        });
        setInvoiceData((prevState: any) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            };
        });
    }

    useEffect(() => {

        console.info('SelectedBankAccountID', bankAccountId);
    }, [])

    const handleBankAccountDropDownChange = (event: SelectChangeEvent) => {
        setBankAccountID(event?.target?.value);
        setPaymentData((prevState: any) => {
            return {
                ...prevState,
                "BankAccountID": data?.BankAccountsList?.find((data: any) => data?.BankAccountID === event?.target?.value)?.BankAccountID
            };
        });
    }

    const handlePaymentMethodDropdownChange = (event: SelectChangeEvent) => {
        setSeletedPaymentMethodID(event?.target?.value)
        setPaymentData((prevState: any) => {
            return {
                ...prevState,
                "PaymentMethodID": data?.PaymentMethodList?.find((data: any) => data?.PaymentMethodID === event?.target?.value)?.PaymentMethodID
            };
        });
    };
    const handleAccountDropdownChange = (event: SelectChangeEvent) => {
        setSeletedCustomerAccountID(event?.target?.value)
        setPaymentData((prevState: any) => {
            return {
                ...prevState,
                "CustomerAccountID": event?.target?.value
            };
        });
    };

    const handleCurrencyDropdownChange = (event: SelectChangeEvent) => {
        setPaymentData((prevState: any) => {
            return {
                ...prevState,
                "CurrencyID": data?.CurrencyList?.find((data: any) => data?.CurrencyID === event?.target?.value)?.CurrencyID,
                "CurrencyCode": data?.CurrencyList?.find((data: any) => data?.CurrencyID === event?.target?.value)?.CurrencyCode
            };
        });
    };

    const handleInvoiceDropdownChange = async (event: SelectChangeEvent) => {
        setSelectedInvoiceID(event?.target?.value)
        setPaymentData((prevState: any) => {
            return {
                ...prevState,
                "InvoiceID": data?.InvoiceList?.find((data: any) => data?.InvoiceID === event?.target?.value)?.InvoiceID,
            };
        });
        setUserInfo((prevState: any) => {
            return {
                ...prevState,
                "MerchantID": parseInt(data?.InvoiceList?.find((data: any) => data?.InvoiceID === event?.target?.value)?.MerchantID),
                "TenantID": parseInt(data?.InvoiceList?.find((data: any) => data?.InvoiceID === event?.target?.value)?.TenantID)
            }
        })
        setInvoiceData((prevState: any) => {
            return {
                ...prevState,
                "InvoiceID": data?.InvoiceList?.find((data: any) => data?.InvoiceID === event?.target?.value)?.InvoiceID,
                "InvoiceNumber": data?.InvoiceList?.find((data: any) => data?.InvoiceID === event?.target?.value)?.InvoiceNumber,
                "InvoiceAmount": data?.InvoiceList?.find((data: any) => (data?.InvoiceID === event?.target?.value))?.InvoiceAmount?.toFixed(2),
                "InvoiceDate": data?.InvoiceList?.find((data: any) => (data?.InvoiceID === event?.target?.value))?.InvoiceDate,
                "BalanceDue": data?.InvoiceList?.find((data: any) => (data?.InvoiceID === event?.target?.value))?.BalanceDue?.toFixed(2),
                "InvoicePaidAmount": data?.InvoiceList?.find((data: any) => (data?.InvoiceID === event?.target?.value))?.BalanceDue?.toFixed(2),
            }
        });
    };

    const handleAddRow = async () => {
        let invoice = CustomerPaymentItem?.find((data: any) => data?.InvoiceID === invoiceData?.InvoiceID)
        let invoicerowData = {
            "InvoiceID": PaymentData?.InvoiceID,
            "ReferenceCode": PaymentData?.PaymentConfirmation,
            "Description": PaymentData?.Remarks,
            "InvoicePaidAmount": parseFloat(invoiceData?.InvoicePaidAmount)
        }

        if (invoice !== undefined) {
            SetDuplicateInvoice(true)
            setTimeout(() => {
                SetDuplicateInvoice(false)
            }, 3000)
            setInvoiceData({
                "InvoiceID": '',
                "InvoiceAmount": '',
                "InvoicePaidAmount": '',
                "InvoiceDate": '',
                "BalanceDue": '',
                "InvoiceNumber": ''
            })
            setSelectedInvoiceID('')
        }
        else {
            setCustomerPaymentItem([...CustomerPaymentItem, invoicerowData])
            setIsEmptyRowCreationMessage(false);
            let tableDataClone = tableData;
            tableDataClone.push(invoiceData);
            setTableData(tableDataClone);
            let totalPayment = 0;
            tableDataClone.forEach((invoice: any) => {
                totalPayment += parseFloat(invoice?.InvoicePaidAmount)
            });
            setTotalInvoicePayment(totalPayment)
            setSelectedInvoiceID('')
            setInvoiceData({
                "InvoiceID": '',
                "InvoiceAmount": '',
                "InvoicePaidAmount": '',
                "InvoiceDate": '',
                "BalanceDue": '',
                "InvoiceNumber": ''
            })
        }
    }

    const handleRowDelete = async (IncoiceId: any) => {
        let invoice = tableData?.findIndex((invoice: any) => invoice?.InvoiceID === IncoiceId)
        let tableDataClone = tableData;
        tableDataClone.splice(tableDataClone.indexOf(invoice), 1)
        setTableData(tableDataClone);

        let CustomerPaymentItemClone = CustomerPaymentItem
        CustomerPaymentItemClone.splice(CustomerPaymentItemClone.indexOf(invoice), 1)
        setCustomerPaymentItem(CustomerPaymentItemClone);

        let totalPayment = 0;
        tableDataClone.forEach((invoice: any) => {
            totalPayment += parseFloat(invoice?.PaidAmount)
        });
        setTotalInvoicePayment(totalPayment)
    }
    const handleMakePayment = async () => {
        let CustomerPayment =
        {
            "BankAccountID": parseInt(PaymentData?.BankAccountID),
            "CustomerID": parseInt(configs?.router?.query?.customerid),
            "PaymentMethodID": parseInt(PaymentData?.PaymentMethodID),
            "CurrencyID": parseInt(PaymentData?.CurrencyID),
            "CustomerAccountID": parseInt(PaymentData?.CustomerAccountID),
            "PaidDate": handleDateasISOString(PaymentData?.PaidDate),
            "PaidAmount": parseFloat(PaymentData?.PaidAmount),
            "CurrencyCode": PaymentData?.CurrencyCode,
            "PaymentConfirmation": PaymentData?.PaymentConfirmation,
            "BankDepositedDate": handleDateasISOString(PaymentData?.BankDepositedDate),
            "BankPostedDate": handleDateasISOString(PaymentData?.BankPostedDate),
            "Remarks": PaymentData?.Remarks
        }

        let request = { userInfo, CustomerPayment, CustomerPaymentItem }
        let response = await configs?.functionObject?.recordPaymentsFunction(request)
        if (response?.status === 200) {
            setRecordPaymentSuccessMessageIsOpen(true)
            setTimeout(() => {
                setRecordPaymentSuccessMessageIsOpen(false)
            }, 3000)
            configs?.router?.push(helper?.constructDynamicURL(`/merchants/[merchantkey]/sales/customers/${configs?.router?.query?.customerid}/invoicepayments`, { "merchantkey": configs?.merchantkey }))
        }
        else {
            setTotalInvoicePayment(0)
            setRecordPaymentErrorMessageIsOpen(true)
            setTimeout(() => {
                setRecordPaymentErrorMessageIsOpen(false)
                handleCancel()
            }, 3000)
        }
    }

    const handleDateasISOString = (data: any) => {
        var parts = data?.split("-");
        var year = parseInt(parts[0], 10);
        var month = parseInt(parts[1], 10);
        var day = parseInt(parts[2], 10);
        var isoDate = new Date(year, month, day);
        // Get the ISO date string
        if (isNaN(day) || isNaN(month) || isNaN(year) || month < 1 || month > 12 || day < 1 || day > 31) {
            console.error("Invalid date format");
        } else {
            var isoDate = new Date(year, month - 1, day);
            var isoString = isoDate.toISOString();
            return isoString
        }
    }
    const handleClose = async () => {
        const data = {
            "Remarks": '',
            "PaymentMethodID": '',
            "CustomerAccountID": '',
            "PaidDate": '',
            "PaidAmount": '',
            "CurrencyCode": '',
            "PaymentConfirmation": '',
            "BankDepositedDate": '',
            "BankPostedDate": '',
            "InvoiceID": '',
            "BalanceDue": '',
            "MerchantID": '',
            "TenantID": '',
            "BankAccountID": '',
            "CurrencyID": ''
        }
        if (_.isEqual(data, PaymentData)) {
            configs?.router?.push(helper?.constructDynamicURL(`/merchants/[merchantkey]/sales/customers/${configs?.router?.query?.customerid}/invoicepayments`, { "merchantkey": configs?.merchantkey }))
        } else {
            setClosePopup(true)
        }
    }

    const handleCancel = async () => {
        setSelectedInvoiceID('');
        setSeletedPaymentMethodID('')
        setTableData([])
        setInvoiceData({
            "InvoiceID": '',
            "InvoiceAmount": '',
            "InvoiceDate": '',
            "BalanceDue": '',
            "InvoiceNumber": '',
            "PaidAmount": ''
        });
        setPaymentData({
            "Remarks": '',
            "PaymentMethodID": '',
            "CustomerAccountID": '',
            "PaidDate": '',
            "PaidAmount": '',
            "CurrencyCode": '',
            "PaymentConfirmation": '',
            "BankDepositedDate": '',
            "BankPostedDate": '',
            "InvoiceID": '',
            "BalanceDue": '',
            "BankAccountID": '',
            "CurrencyID": ''
        });
    }

    return (
        <>
            <sdkMui.Card sx={{ minHeight: '60vh', pb: 5 }} data-testid="Record-Payment">
                <sdkMui.Grid container >
                    <sdkMui.Grid item xs={9} sx={{ pt: 2, pl: 2 }}>
                        <sdkMui.Stack spacing={2} direction={'row'}>
                            <span className="material-symbols-outlined">receipt_long</span>
                            <sdkMui.Typography variant='h3' fontWeight={'bold'} sx={{ pb: 1, pt: 0, mt: 0 }}>
                                Record Payments
                            </sdkMui.Typography>
                        </sdkMui.Stack>
                    </sdkMui.Grid>
                    <sdkMui.Grid item xs={3} sx={{ pb: 1, pt: 1, display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                        <sdkMui.Stack direction={"row"} spacing={2}>
                            <Button
                                configs={{
                                    label: "Make Payment",
                                    dataTestID: 'Make-Payment-Button',
                                    varient: 'contained',
                                    size: 'small'
                                }}
                                callbacks={{
                                    handleButtonClick: () => { handleMakePayment() },
                                    handleOnChange: () => { }
                                }}
                            />
                            <span className='material-symbols-outlined' style={{ cursor: 'pointer', fontSize: '24px', display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => { { handleClose() } }} > cancel</span>
                        </sdkMui.Stack>
                    </sdkMui.Grid>
                </sdkMui.Grid>
                <sdkMui.Divider sx={{ visibility: 'visible' }}></sdkMui.Divider>
                <sdkMui.Grid item xs={4} sx={{ p: 2 }}>
                    <sdkMui.Grid container spacing={1} >
                        <sdkMui.Grid item xs={4} sx={{ pb: 2, fontWeight: "bold" }}>
                            <sdkMui.Typography data-testid="Record-Payment-Title" variant="h4">Payment Info.</sdkMui.Typography>
                        </sdkMui.Grid>
                    </sdkMui.Grid>
                    <sdkMui.Grid container spacing={2} >
                        <sdkMui.Grid item xs={4}>
                            <sdkMui.FormControl size='small' variant='outlined'>
                                <sdkMui.InputLabel id="Customer-select-label" variant='outlined' required >Customer Account</sdkMui.InputLabel>
                                <sdkMui.Select
                                    labelId="Customer-select-label"
                                    id="customer-account-select"
                                    value={customerAccountID}
                                    label="Customer Account"
                                    onChange={(e: any) => handleAccountDropdownChange(e)}
                                    size='small'
                                    style={{
                                        width: '300px'
                                    }}
                                >
                                    {data?.CustomerAccounts?.map((account: any, index: number) => (
                                        <sdkMui.MenuItem value={account?.CustomerAccountID} key={index}> {account?.DisplayName} </sdkMui.MenuItem>
                                    ))
                                    }
                                </sdkMui.Select>
                            </sdkMui.FormControl>
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={4}>
                            <sdkMui.FormControl size='small' variant='outlined'>
                                <sdkMui.InputLabel id="Customer-select-label" variant='outlined' required >Payment Method</sdkMui.InputLabel>
                                <sdkMui.Select
                                    data-testid="Record-Payment-DropDown"
                                    labelId="Customer-select-label"
                                    id="customer-select"
                                    value={paymentMethodID}
                                    label="Payment Methods"
                                    onChange={(e: any) => handlePaymentMethodDropdownChange(e)}
                                    size='small'
                                    style={{
                                        width: '300px'
                                    }}
                                >
                                    {data?.PaymentMethodList?.map((item: any, index: number) =>
                                        <sdkMui.MenuItem value={item?.PaymentMethodID} key={index}> {item?.PaymentMethod} </sdkMui.MenuItem>
                                    )}
                                </sdkMui.Select>
                            </sdkMui.FormControl>
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={4} >
                            <sdkMui.TextField
                                id="outlined-basic"
                                size="small"
                                variant='outlined'
                                name={'PaidDate'}
                                value={PaymentData?.PaidDate}
                                onChange={(e: any) => handleFormChange(e)}
                                label="Received Date"
                                sx={{ width: '100%' }}
                                InputLabelProps={{ shrink: true }}
                                required
                                type='date'
                            />
                        </sdkMui.Grid>

                    </sdkMui.Grid>
                    <sdkMui.Grid container spacing={2} sx={{ pt: 2 }}>
                        <sdkMui.Grid item xs={4} >
                            <sdkMui.TextField
                                id="outlined-basic"
                                size="small"
                                variant='outlined'
                                name={'PaidAmount'}
                                value={PaymentData?.PaidAmount}
                                label="Received Amount"
                                sx={{ width: '90%' }}
                                onChange={(e: any) => handleFormChange(e)}
                                required
                                type='text' inputProps={{ step: "0.5", lang: "en-US" }}
                            />
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={4}>
                            <sdkMui.FormControl size='small' variant='outlined'>
                                <sdkMui.InputLabel id="Customer-select-label" variant='outlined' required >Currency Code</sdkMui.InputLabel>
                                <sdkMui.Select
                                    labelId="Customer-select-label"
                                    id="customer-select"
                                    value={PaymentData?.CurrencyID}
                                    label="Payment Methods"
                                    onChange={(e: any) => handleCurrencyDropdownChange(e)}
                                    size='small'
                                    style={{
                                        width: '300px'
                                    }}
                                >
                                    {data?.CurrencyList?.map((item: any, index: number) =>
                                        <sdkMui.MenuItem value={item?.CurrencyID} key={index}> {item?.CurrencyCode} </sdkMui.MenuItem>
                                    )}
                                </sdkMui.Select>
                            </sdkMui.FormControl>
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={4}>
                            <sdkMui.TextField
                                id="outlined-basic"
                                size="small"
                                variant='outlined'
                                name={'BankDepositedDate'}
                                value={PaymentData?.BankDepositedDate}
                                onChange={(e: any) => handleFormChange(e)}
                                label="Deposite Date"
                                sx={{ width: '100%' }}
                                type='date'
                                InputLabelProps={{ shrink: true }}
                                required />
                        </sdkMui.Grid>

                    </sdkMui.Grid>
                    <sdkMui.Grid container spacing={2} sx={{ pt: 2 }}>
                        <sdkMui.Grid item xs={4}>
                            <sdkMui.TextField
                                id="outlined-basic"
                                size="small"
                                variant='outlined'
                                name={'BankPostedDate'}
                                value={PaymentData?.BankPostedDate}
                                onChange={(e: any) => handleFormChange(e)}
                                label="Posted Date"
                                sx={{ width: '90%' }}
                                InputLabelProps={{ shrink: true }}
                                type='date'
                            />
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={4}>
                            <sdkMui.FormControl size='small' variant='outlined'>
                                <sdkMui.InputLabel id="Customer-select-label" variant='outlined' required >Bank Accounts</sdkMui.InputLabel>
                                <sdkMui.Select
                                    labelId="Customer-select-label"
                                    id="customer-select"
                                    value={PaymentData?.BankAccountID}
                                    label="Bank Accounts"
                                    onChange={(e: any) => handleBankAccountDropDownChange(e)}
                                    size='small'
                                    style={{
                                        width: '300px'
                                    }}
                                >
                                    {data?.BankAccountsList?.map((item: any, index: number) =>
                                        <sdkMui.MenuItem value={item?.BankAccountID} key={index}> {item?.DisplayName} </sdkMui.MenuItem>
                                    )}
                                </sdkMui.Select>
                            </sdkMui.FormControl>
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={4}>
                            <sdkMui.TextField
                                id="outlined-basic"
                                size="small"
                                variant='outlined'
                                name={'PaymentConfirmation'}
                                value={PaymentData?.PaymentConfirmation}
                                onChange={(e: any) => handleFormChange(e)}
                                label="PaymentConfirmation"
                                sx={{ width: '100%' }}
                            />
                        </sdkMui.Grid>


                    </sdkMui.Grid>
                    <sdkMui.Grid container spacing={2} sx={{ pt: 2 }}>
                        <sdkMui.Grid item xs={12} >
                            <sdkMui.TextField
                                id="outlined-basic"
                                size="small"
                                variant='outlined'
                                name={'Remarks'}
                                value={PaymentData?.Remarks}
                                label="Remarks"
                                sx={{ width: '100%' }}
                                onChange={(e: any) => handleFormChange(e)}
                            />
                        </sdkMui.Grid>
                    </sdkMui.Grid>
                </sdkMui.Grid>
                <sdkMui.Divider sx={{ visibility: 'visible' }} />
                <sdkMui.Grid container >

                    <sdkMui.Grid item xs={12} sx={{ p: 1 }}>
                        <sdkMui.Grid container spacing={1} sx={{ pl: 2 }}>
                            <sdkMui.Grid item xs={12} sx={{ pb: 2, pl: 5, fontWeight: "bolder" }}>
                                <sdkMui.Typography data-testid="Read-Payment-Info-Sub-Title" variant="h4">Payment Items Info.</sdkMui.Typography>
                            </sdkMui.Grid>
                            <sdkMui.Grid item xs={12} sx={{ pb: 2, fontWeight: "bold" }}>
                                <sdkMui.Stack direction={"row"} spacing={2}>
                                    <sdkMui.Chip data-testid="Read-Payment-InvoiceCount-Label" label={`Invoice Count : ${tableData?.length}`} size='medium' color='primary'></sdkMui.Chip>
                                    <sdkMui.Chip data-testid="Read-Payment-InvoiceAmount-Label" label={`Total Invoice Amount : ${totalInvoicePayment || 0}`} size='medium' color='primary'></sdkMui.Chip>
                                </sdkMui.Stack>
                            </sdkMui.Grid>
                        </sdkMui.Grid>
                        {/* <sdkMui.Divider style={{ visibility: 'visible' }}></sdkMui.Divider> */}
                        <sdkMui.Grid container spacing={1} sx={{ pb: 5 }}>
                            <sdkMui.Grid item xs={12}>
                                <sdkMui.TableContainer sx={{ p: 1, pl: 2, textAlign: 'center' }}>
                                    <sdkMui.Table border={1} sx={{ color: 'black' }}>
                                        <sdkMui.TableHead>
                                            <sdkMui.TableRow>
                                                {menu?.map((headers: any) => <sdkMui.TableCell key={null} sx={{ fontSize: '14px', textAlign: 'center', background: (theme) => theme.palette.primary.main, color: (theme) => theme.palette.primary.contrastText }}>{headers?.DisplayName}
                                                </sdkMui.TableCell>)}
                                            </sdkMui.TableRow>
                                        </sdkMui.TableHead>
                                        <sdkMui.TableBody>
                                            <sdkMui.TableRow>
                                                <sdkMui.TableCell data-testid="Read-Payment-Item-Info" sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }} >
                                                    <sdkMui.FormControl size='medium' variant="standard">
                                                        <sdkMui.InputLabel id="Customer-select-label" variant='standard' required >Invoice</sdkMui.InputLabel>
                                                        <sdkMui.Select
                                                            data-testid="Read-Payment-Item-Infos"
                                                            labelId="Customer-select-label"
                                                            id="Invoice-select"
                                                            value={invoiceID}
                                                            label="Invoice"
                                                            onChange={(e: any) => handleInvoiceDropdownChange(e)}
                                                            size="medium"
                                                            style={{
                                                                width: '250px'
                                                            }}
                                                        >
                                                            {data?.InvoiceList?.map((item: any, index: number) =>
                                                                <sdkMui.MenuItem value={item?.InvoiceID} key={index}> {item?.InvoiceNumber}</sdkMui.MenuItem>
                                                            )}
                                                        </sdkMui.Select>
                                                    </sdkMui.FormControl>
                                                </sdkMui.TableCell>
                                                <sdkMui.TableCell>
                                                    <sdkMui.TextField
                                                        id="outlined-basic"
                                                        size='small'
                                                        variant='standard'
                                                        name={'InvoiceAmount'}
                                                        value={isNaN(parseFloat(invoiceData?.InvoiceAmount?.toString())) ? invoiceData?.InvoiceAmount : parseFloat(invoiceData?.InvoiceAmount?.toString()).toFixed(2)}
                                                        label="Invoice Amount"
                                                        sx={{ width: '100%', direction: 'rtl' }}
                                                        type='text'
                                                        defaultValue={invoiceData?.InvoiceAmount}
                                                    />
                                                </sdkMui.TableCell>
                                                <sdkMui.TableCell>
                                                    <sdkMui.TextField
                                                        id="outlined-basic"
                                                        size='small'
                                                        variant='standard'
                                                        name={'InvoiceDate'}
                                                        value={invoiceData?.InvoiceDate === '' ? '' : helper?.converttoDateFormat(invoiceData?.InvoiceDate, "MM/DD/YYYY")}
                                                        label="Invoice Date"
                                                        sx={{ width: '100%' }}
                                                        type='text'
                                                        defaultValue={invoiceData?.InvoiceDate}
                                                    />
                                                </sdkMui.TableCell>
                                                <sdkMui.TableCell>
                                                    <sdkMui.TextField
                                                        id="outlined-basic"
                                                        size='small'
                                                        variant='standard'
                                                        name={'BalanceDue'}
                                                        value={invoiceData?.BalanceDue}
                                                        defaultValue={parseFloat(invoiceData?.BalanceDue?.toString()).toFixed(2)}
                                                        label="BalanceDue"
                                                        sx={{ width: '100%', direction: 'rtl' }}
                                                        type='text'
                                                    />
                                                </sdkMui.TableCell>
                                                <sdkMui.TableCell>
                                                    <sdkMui.TextField
                                                        id="outlined-basic"
                                                        size='small'
                                                        variant='standard'
                                                        name={'InvoicePaidAmount'}
                                                        value={invoiceData?.InvoicePaidAmount}
                                                        onChange={(e: any) => handleFormChange(e)}
                                                        label="Paid Amount"
                                                        sx={{ width: '100%' }}
                                                        type="number" inputProps={{ step: "0.5", lang: "en-US" }}
                                                        required
                                                    />
                                                </sdkMui.TableCell>
                                                <span className='material-symbols-outlined' style={{ cursor: 'pointer', textAlign: 'center', fontSize: '24px', marginTop: '14px' }} onClick={() => { { invoiceID ? handleAddRow() : setIsEmptyRowCreationMessage(true) } }} > add_circle</span>
                                            </sdkMui.TableRow>
                                            {tableData?.length > 0 &&
                                                <>
                                                    {tableData?.map((row: any) => (
                                                        <sdkMui.TableRow key={null} >
                                                            <sdkMui.TableCell > {row?.InvoiceNumber} </sdkMui.TableCell>
                                                            <sdkMui.TableCell sx={{ textAlign: "right" }}> {row?.InvoiceAmount} </sdkMui.TableCell>
                                                            <sdkMui.TableCell > {helper?.converttoDateFormat(row?.InvoiceDate, "MM/DD/YYYY")} </sdkMui.TableCell>
                                                            <sdkMui.TableCell sx={{ textAlign: "right" }}> {row?.BalanceDue} </sdkMui.TableCell>
                                                            <sdkMui.TableCell sx={{ textAlign: "right" }}> {row?.InvoicePaidAmount} </sdkMui.TableCell>
                                                            <span className='material-symbols-outlined' style={{ cursor: 'pointer', textAlign: 'center', fontSize: '20px', marginTop: '14px' }} onClick={() => { { handleRowDelete(row?.InvoiceID) } }} >delete</span>
                                                        </sdkMui.TableRow>
                                                    ))}
                                                </>
                                            }
                                        </sdkMui.TableBody>
                                    </sdkMui.Table>
                                </sdkMui.TableContainer>
                            </sdkMui.Grid>
                        </sdkMui.Grid>
                        {isEmpltyRowCreation &&
                            <Snackbar
                                configs={{
                                    isSetOpen: isEmpltyRowCreation,
                                    severity: 'error',
                                    alertDescription: 'Fill All The Payment Invoice Item!',
                                    dataTestID: 'Empty-Row-Creation-Error',
                                    snackbarAutoHideDuration: 3000
                                }}
                            />
                        }
                        {recordPaymentSuccessMessageIsOpen &&
                            <Snackbar
                                configs={{
                                    isSetOpen: recordPaymentSuccessMessageIsOpen,
                                    severity: 'success',
                                    alertDescription: 'Record Payment Successfully!',
                                    dataTestID: 'Empty-Row-Creation-Error',
                                    snackbarAutoHideDuration: 3000
                                }}
                            />
                        }
                        {recordPaymentErrorMessageIsOpen &&
                            <Snackbar
                                configs={{
                                    isSetOpen: recordPaymentErrorMessageIsOpen,
                                    severity: 'error',
                                    alertDescription: 'Something went wrong!',
                                    dataTestID: 'Empty-Row-Creation-Error',
                                    snackbarAutoHideDuration: 3000
                                }}
                                callbacks={{
                                    onClose: () => { }
                                }}
                            />
                        }
                        {closePopup &&
                            <sdkMui.Dialog
                                open={closePopup}
                                keepMounted
                            >
                                <sdkMui.DialogContent>
                                    <sdkMui.DialogContentText>
                                        <b>Your changes will be lost, Are you sure want to close..?</b>
                                    </sdkMui.DialogContentText>
                                </sdkMui.DialogContent>
                                <sdkMui.DialogActions>
                                    <Button
                                        callbacks={{
                                            handleButtonClick: () => { setClosePopup(false) }
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
                                            handleButtonClick: () => { setClosePopup(false); configs?.router?.push(helper?.constructDynamicURL(`/merchants/[merchantkey]/sales/customers/${configs?.router?.query?.customerid}/invoicepayments`, { "merchantkey": configs?.merchantkey })) }
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
                    </sdkMui.Grid>
                </sdkMui.Grid>
            </sdkMui.Card>
            {
                duplicateInvoice &&
                <Snackbar
                    configs={{
                        dataTestID: 'Product_Already_Exits',
                        severity: 'error',
                        alertDescription: messages?.INVOICE_ALREADY_EXISTS,
                        isSetOpen: duplicateInvoice,
                        snackbarAutoHideDuration: 3000
                    }}
                />
            }
        </>
    )
}
export { RecordPayment }