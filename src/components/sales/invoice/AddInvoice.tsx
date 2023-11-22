import { useEffect, useState } from 'react';
import { CreateInvoiceInterface } from '@/interfaces/components/sales/invoices/CreateInvoiceInterface';
import { Button, Snackbar, sdkMui } from '@baas/platform-web-sdk';
import { SelectChangeEvent } from '@mui/material/Select';
import { Helper } from '@/utils/Helper';
import { Constants } from '@/utils/Constants';
import _ from 'lodash'
import { Messages } from '@/utils/Messages';

const helper = new Helper()
const constants = new Constants()
const messages = new Messages()

//createBy and created Auth Id details
const AuthID = JSON.parse(helper?.getCookie(constants?.AUTH_INFO_COOKIE_NAME))?.AuthID
const AuthName = JSON.parse(helper?.getCookie(constants?.AUTH_INFO_COOKIE_NAME))?.ContactPerson?.ContactPersonName

export function CreateInvoice({ configs, data }: CreateInvoiceInterface) {
    const [customerInfo] = useState(data?.CustomerInfo)
    const [currencyInfo] = useState(data?.CurrencyInfo)
    const [netterm] = useState(data?.TermInfo)
    const [productInfo, setProductInfo] = useState([])
    const [selectedCustomerID, setSelectedCustomerID] = useState('')
    const [selectedCurrencyID, setSelectedCurrencyID] = useState('')
    const [selectedCustomerAccountID, setSelectedCustomerAccountID] = useState('')
    const [selectedProduct, setSelectedProduct] = useState<any>("")
    const [selectedTerm, setSelectedTerm] = useState("")
    const [duplicateProduct, setDuplicateProduct] = useState(false)
    const [ClosePopup, setClosePopup] = useState(false)
    const [successCreateMessage, setSuccessCreateMessage] = useState(false)
    const [isProductAdded, setIsProductAdded] = useState(false)
    const [errorCreateMessage, setErrorCreateMessage] = useState(false)
    const [saveButtonLoading, setsaveButtonLoading] = useState(false)
    const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true)
    const [isbackUpChargeAdded, setIsbackUpChargeAdded] = useState(false)
    const [dueDate, setDueDate] = useState('')
    const [rateSuffix, setRateSuffix] = useState({
        "CurrencyCode": '',
        "CurrencySymbol": ''
    })
    const [UserInfo, setUserInfo] = useState({
        "MerchantID": '',
        "TenantID": '',
        "CreatedAuthID": AuthID,
        "CreatedBy": AuthName,
        "ModifiedAuthID": AuthID,
        "ModifiedBy": AuthName,
    })
    const [InvoiceItemData, setInvoiceItemData] = useState({
        "ProductID": '',
        "ProductName": '',
        "Qty": '',
        "Rate": '',
        "TotalAmount": 0.00,
        'Description': ''
    })
    const [isEmptyRowCreation, setIsEmptyRowCreation] = useState(false)
    const [InvoiceItemInfo, setInvoiceItemInfo] = useState<any[]>([])
    const [InvoiceInfo, setInvoiceInfo] = useState({
        "ProjectID": 1,
        "CustomerID": selectedCustomerID,
        "CustomerAccountID": selectedCustomerAccountID,
        "CurrencyID": '',
        "InvoiceNumber": '',
        "InvoiceDate": new Date().toISOString().split('T')[0],
        "AppSettingNetTermID": '',
        "ProductCharges": 0.00,
        "BackupCharges": 0.00,
        "Remarks": '',
        "SubTotal": 0.00,
        "BalanceDue": 0.00,
        'InvoiceAmount': 0.00,
        "DueDate": ''
    })

    const iteminfoheader = [{
        "ColumnName": "Item Detail"
    },
    {
        "ColumnName": "Qty"
    },
    {
        "ColumnName": "Rate"
    },
    {
        "ColumnName": "Amount"
    }]


    const handleCustomerDropDownChange = (event: SelectChangeEvent) => {
        setSelectedCustomerID(event?.target?.value)
        setInvoiceInfo((prevState: any) => {
            return {
                ...prevState,
                "CustomerID": data?.CustomerInfo?.find((data: any) => data?.CustomerID === event?.target?.value)?.CustomerID,
                "InvoiceAmount": 0,
                "BalanceDue": 0
            };
        });
        setUserInfo((prevState: any) => {
            return {
                ...prevState,
                "MerchantID": data?.CustomerInfo?.find((data: any) => data?.CustomerID === event?.target?.value)?.MerchantID,
                "TenantID": data?.CustomerInfo?.find((data: any) => data?.CustomerID === event?.target?.value)?.TenantID
            };
        })
        handleGenerateInvoiceNumber(event?.target?.value)
        setInvoiceItemInfo([])

    }

    const handleCurrencydropdown = (event: SelectChangeEvent) => {
        setSelectedCurrencyID(event?.target?.value)

        setRateSuffix((prevState: any) => {
            return {
                ...prevState,
                "CurrencyCode": currencyInfo?.find((data: any) => data?.CurrencyCode === event?.target?.value)?.CurrencyCode,
                "CurrencySymbol": currencyInfo?.find((data: any) => data?.CurrencyCode === event?.target?.value)?.CurrencySymbol
            }
        });
        setInvoiceInfo((prevState: any) => {
            return {
                ...prevState,
                "CurrencyID": data?.CurrencyInfo.find((data: any) => data?.CurrencyCode === event?.target?.value)?.CurrencyID
            }
        })
    }

    const handleProductData = async (CustomerAccountID: any) => {
        let response = await configs?.functionObject?.readPriceListItem(CustomerAccountID)
        if (response?.status === 200) {
            setProductInfo(response?.output?.productInfo)
        }
    }

    const handleGenerateInvoiceNumber = async (customerID: any) => {
        let invoiceNumber = await configs?.functionObject?.readGenerateInvoiceNumber(customerID)
        if (invoiceNumber.status === 200) {
            setInvoiceInfo((prevState: any) => {
                return {
                    ...prevState,
                    "InvoiceNumber": invoiceNumber?.output?.InvoiceNumber
                };
            });
        }
    }

    const handletermDropDownChange = (event: SelectChangeEvent) => {

        setSelectedTerm(event?.target?.value)
        setInvoiceInfo((prevState: any) => {
            return {
                ...prevState,
                "AppSettingNetTermID": data?.TermInfo?.find((data: any) => data?.AppSettingNetTerm === event?.target?.value)?.AppSettingNetTermID
            };
        });

        // Assuming dayADD is a valid number
        if (InvoiceInfo?.InvoiceDate !== '') {
            let dayADD = parseInt(event?.target?.value.split('-')[1]);
            let dateString = InvoiceInfo?.InvoiceDate;
            let dateObject = new Date(dateString);
            dateObject.setDate(dateObject.getDate() + dayADD);
            let updatedDate = dateObject.toISOString().split('T')[0];
            setDueDate(updatedDate);

            setInvoiceInfo((prevState: any) => {
                return {
                    ...prevState,
                    "DueDate": new Date(updatedDate).toISOString()
                }
            })
        }
    }


    const handleCustomerAccountDropDownChange = (event: SelectChangeEvent) => {
        setSelectedCustomerAccountID(event?.target?.value)
        setInvoiceInfo((prevState: any) => {
            return {
                ...prevState,
                "CustomerAccountID": parseInt(event?.target?.value)
            };
        });
        handleProductData(event?.target?.value)
    }

    const handleFormChange = (e: any) => {
        if (e.target.name === "InvoiceDate") {
            if (InvoiceInfo?.AppSettingNetTermID !== '') {
                let dayADD = parseInt(selectedTerm.split('-')[1]);
                let dateString = e?.target?.value;
                let dateObject = new Date(dateString);
                dateObject.setDate(dateObject.getDate() + dayADD);
                let updatedDate = dateObject.toISOString().split('T')[0];
                setDueDate(updatedDate);
                setInvoiceInfo((prevState: any) => {
                    return {
                        ...prevState,
                        "DueDate": new Date(updatedDate).toISOString(),
                        "InvoiceDate": e?.target?.value
                    }
                })
            }
            else {
                setInvoiceInfo((prevState: any) => {
                    return {
                        ...prevState,
                        "InvoiceDate": e?.target?.value
                    }
                })
            }

        } else {
            setInvoiceInfo((prevState: any) => {
                return {
                    ...prevState,
                    [e.target.name]: e.target.value
                };
            });
        }

    }
    const handleBackupChargeChange = (e: any) => {
        let SubTotal = InvoiceInfo?.SubTotal;
        let backupCharges = parseFloat(e.target.value === "" ? "0" : e.target.value);
        let totalAmount = SubTotal + backupCharges;

        setInvoiceInfo((prevState: any) => {
            return {
                ...prevState,
                "InvoiceAmount": totalAmount,
                "BalanceDue": totalAmount,
                [e.target.name]: e.target.value
            };
        });
    }

    const handleItemFormChange = (e: any) => {
        setInvoiceItemData((prevState: any) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            };
        });
    }

    const handleCreateRow = () => {
        let rate = productInfo?.find((data: any) => data?.Product?.ProductName === selectedProduct?.Product?.ProductName)?.Rate
        let TotalAmount = parseInt(InvoiceItemData?.Qty) * rate
        let productName = InvoiceItemInfo?.find((data: any) => data?.ProductName === selectedProduct?.Product?.ProductName)

        const itemdata = {
            ...InvoiceItemData,
            "ProductName": selectedProduct?.Product?.ProductName,
            "Qty": parseInt(InvoiceItemData?.Qty),
            "Rate": rate,
            "TotalAmount": parseFloat(TotalAmount.toFixed(2).toString())
        }

        if (productName !== undefined) {
            setDuplicateProduct(true)
            setTimeout(() => {
                setDuplicateProduct(false)
            }, 3000)
            setSelectedProduct("")
            setInvoiceItemData({
                ...InvoiceItemData,
                "Qty": ''  // Set Qty to an empty string,
            })
        } else {
            setInvoiceItemInfo([...InvoiceItemInfo, itemdata])
            if (InvoiceItemInfo?.length === 0) {
                let Rateqty = parseInt(InvoiceItemData?.Qty) * parseFloat(rate)
                if (InvoiceInfo?.BackupCharges === 0.00) {
                    setInvoiceInfo({
                        ...InvoiceInfo,
                        "SubTotal": Rateqty,
                        "InvoiceAmount": Rateqty,
                        "BalanceDue": Rateqty
                    })
                }
                else {
                    setInvoiceInfo({
                        ...InvoiceInfo,
                        "SubTotal": Rateqty,
                        "InvoiceAmount": Rateqty + parseFloat(InvoiceInfo?.BackupCharges.toString()),
                        "BalanceDue": Rateqty + parseFloat(InvoiceInfo?.BackupCharges.toString())
                    })
                    InvoiceInfo?.BackupCharges !== 0.00 && setIsbackUpChargeAdded(true)
                }

            }
            else {
                let amount = parseInt(InvoiceItemData?.Qty) * parseFloat(rate)
                if (isbackUpChargeAdded === false) {
                    setInvoiceInfo({
                        ...InvoiceInfo,
                        "InvoiceAmount": InvoiceInfo?.InvoiceAmount + amount + parseFloat(InvoiceInfo?.BackupCharges.toString()),
                        "BalanceDue": InvoiceInfo?.BalanceDue + amount + parseFloat(InvoiceInfo?.BackupCharges.toString()),
                        "SubTotal": InvoiceInfo?.SubTotal + amount
                    })
                    setIsbackUpChargeAdded(true)
                }
                else {
                    setInvoiceInfo({
                        ...InvoiceInfo,
                        "InvoiceAmount": InvoiceInfo?.InvoiceAmount + amount,
                        "BalanceDue": InvoiceInfo?.BalanceDue + amount,
                        "SubTotal": InvoiceInfo?.SubTotal + amount
                    })
                }
            }
            setSelectedProduct("")
            setInvoiceItemData({
                ...InvoiceItemData,
                "Qty": ''  // Set Qty to an empty string,
            })
        }
    }


    const handleDeleteRow = (productname: string, TotalAmount: number) => {
        const updatedRows = InvoiceItemInfo.filter((row: any) => row.ProductName !== productname);
        setInvoiceItemInfo(updatedRows);
        setInvoiceInfo({
            ...InvoiceInfo,
            "SubTotal": InvoiceInfo?.SubTotal - TotalAmount,
            "InvoiceAmount": InvoiceInfo?.InvoiceAmount - TotalAmount,
            "BalanceDue": InvoiceInfo?.BalanceDue - TotalAmount
        })
    };


    const handleCreateInvoice = async () => {
        setsaveButtonLoading(true)
        let request = { UserInfo, InvoiceInfo, InvoiceItemInfo }
        request.InvoiceInfo.InvoiceDate = new Date(InvoiceInfo.InvoiceDate)?.toISOString()
        request.InvoiceInfo.BackupCharges = parseFloat(request?.InvoiceInfo?.BackupCharges.toString())
        if (request.InvoiceItemInfo?.length > 0) {
            let response = await configs?.functionObject?.createInvoice(request)
            if (response.status === 200) {
                setsaveButtonLoading(false)
                setSuccessCreateMessage(true)
                configs?.router?.push(helper?.constructDynamicURL("/merchants/[merchantkey]/sales/invoices", { merchantkey: configs?.router?.query?.merchantkey }))
                setTimeout(() => {
                    setSuccessCreateMessage(false)
                }, 3000)
            } else {
                setsaveButtonLoading(false)
                setErrorCreateMessage(true)
                setTimeout(() => {
                    setErrorCreateMessage(false)
                }, 3000)
            }
        }
        else {

            setsaveButtonLoading(false)
            setIsProductAdded(true)
            setTimeout(() => {
                setIsProductAdded(false)
            }, 3000)

        }

    }

    const handleFormClose = () => {
        const invoiceData = {
            "ProjectID": 1,
            "CustomerID": selectedCustomerID,
            "CustomerAccountID": selectedCustomerAccountID,
            "CurrencyID": '',
            "InvoiceNumber": '',
            "InvoiceDate": new Date().toISOString().split('T')[0],
            "AppSettingNetTermID": '',
            "ProductCharges": 0.00,
            "BackupCharges": 0.00,
            "Remarks": '',
            "SubTotal": 0.00,
            "BalanceDue": 0.00,
            'InvoiceAmount': 0.00,
            "DueDate": ''
        }

        if (_.isEqual(invoiceData, InvoiceInfo)) {
            configs?.router?.push(helper?.constructDynamicURL("/merchants/[merchantkey]/sales/invoices", { merchantkey: configs?.router?.query?.merchantkey }))
        }
        else {
            setClosePopup(true)
        }
    }

    useEffect(() => {
        let ediData = {
            "ProjectID": 1,
            "CustomerID": selectedCustomerID,
            "CustomerAccountID": selectedCustomerAccountID,
            "CurrencyID": '',
            "InvoiceNumber": '',
            "InvoiceDate": new Date().toISOString().split('T')[0],
            "AppSettingNetTermID": '',
            "ProductCharges": 0.00,
            "BackupCharges": 0.00,
            "Remarks": '',
            "SubTotal": 0.00,
            "BalanceDue": 0.00,
            'InvoiceAmount': 0.00,
            "DueDate": ''
        }
        if (!_.isEqual(ediData, InvoiceInfo)) {
            setIsSaveButtonDisabled(false)
        }
        else {
            setIsSaveButtonDisabled(true)
        }
    }, [InvoiceInfo])

    return (
        <>
            <form onSubmit={(e: any) => { e?.preventDefault(); handleCreateInvoice() }} data-testId={`${configs?.datatestID}`}>
                <sdkMui.Box sx={{ pt: 2, boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)" }}>
                    <sdkMui.Grid container spacing={2} direction={'row'} sx={{ pl: 2, display: 'flex' }}>
                        <sdkMui.Grid xs={8} sm={8} md={9} xl={9} lg={9}>
                            <sdkMui.Stack spacing={1} direction={'row'}>
                                <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>description</span>
                                <sdkMui.Typography variant='h3' fontWeight={'bold'} sx={{ pb: 1 }}>
                                    Create New Invoice
                                </sdkMui.Typography>
                            </sdkMui.Stack>
                        </sdkMui.Grid>
                        <sdkMui.Grid xs={3} sm={3} md={2.5} xl={2.5} lg={2.5} sx={{ textAlign: 'right', cursor: 'pointer' }}>
                            <Button
                                callbacks={{
                                    handleButtonClick: () => { }
                                }}
                                configs={{
                                    label: 'Save',
                                    color: 'primary',
                                    size: 'small',
                                    type: "submit",
                                    isButtonDisabled: isSaveButtonDisabled,
                                    varient: 'contained',
                                    dataTestID: 'Invoice-save-button',
                                    isButtonloading: saveButtonLoading
                                }}
                            />
                        </sdkMui.Grid>
                        <sdkMui.Grid xs={1} sm={1} md={0.5} xl={0.5} lg={0.5} data-testId="Invoice-close-button">
                            <span className="material-symbols-outlined" style={{ cursor: 'pointer', display: 'flex', justifyContent: 'right', fontSize: '28px' }}
                                onClick={() => { handleFormClose() }}>close</span>
                        </sdkMui.Grid>
                    </sdkMui.Grid>
                </sdkMui.Box>
                <sdkMui.Box sx={{ p: 3, overflowY: 'scroll', maxHeight: '68vh' }} border={1} >
                    <sdkMui.Grid alignItems="center" container spacing={2} >
                        <sdkMui.Grid item xs={6} sm={6} md={2} xl={2} lg={2} >
                            <sdkMui.Typography variant='h4' fontWeight={'subtitle1'} >Select Customer </sdkMui.Typography>
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={6} sm={6} md={10} xl={10} lg={10}>
                            <sdkMui.FormControl size="small" variant="outlined" data-testId="Invoice-select-customer-feild" required sx={{ width: '40%' }} >
                                <sdkMui.InputLabel id="demo-simple-select-label" variant="outlined" required >Customer</sdkMui.InputLabel>
                                <sdkMui.Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedCustomerID}
                                    label="Customer"
                                    required
                                    onChange={handleCustomerDropDownChange}
                                    size="small"
                                >
                                    {customerInfo?.map((item: any, index: number) =>
                                        <sdkMui.MenuItem value={item?.CustomerID} key={index}> {item?.CustomerName} </sdkMui.MenuItem>
                                    )}
                                </sdkMui.Select>
                                <sdkMui.Grid xs={12}>
                                    {selectedCustomerID && <>
                                        {customerInfo?.filter((data: any) => data?.CustomerID === selectedCustomerID)?.map((customer: any) => (
                                            <>
                                                <sdkMui.Grid sx={{ p: 1 }}>
                                                    <sdkMui.Typography variant='h4' fontWeight={'bold'} >{customer?.CustomerName} </sdkMui.Typography>
                                                    <sdkMui.Typography variant='h5' fontStyle={'subtitle1'} >{customer?.Address1} </sdkMui.Typography>
                                                    <sdkMui.Typography variant='h5' fontWeight={'subtitle1'}>{customer?.City} {customer?.State} </sdkMui.Typography>
                                                    <sdkMui.Typography variant='h5' fontWeight={'subtitle1'} >{customer?.PostalCode} </sdkMui.Typography>
                                                </sdkMui.Grid>
                                            </>
                                        ))}
                                    </>}
                                </sdkMui.Grid>
                            </sdkMui.FormControl>
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={6} sm={6} md={2} xl={2} lg={2}>
                            <sdkMui.Typography variant='h4' fontWeight={'subtitle1'} sx={{ display: 'flex', justifyContent: 'left' }}>Select Account</sdkMui.Typography>
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={6} sm={6} md={10} xl={10} lg={10}>
                            <sdkMui.FormControl size="small" variant="outlined" sx={{ width: '40%' }} data-testId="Invoice-select-Account-feild">
                                <sdkMui.InputLabel id="demo-simple-select-label" variant="outlined" required>Customer Account</sdkMui.InputLabel>
                                <sdkMui.Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedCustomerAccountID}
                                    label="Customer Account"
                                    onChange={handleCustomerAccountDropDownChange}
                                    required
                                    size="small"
                                >
                                    {customerInfo?.map((item: any, index: number) => (
                                        item?.CustomerAccount?.filter((data: any) => data?.CustomerID === selectedCustomerID)?.map((account: any) => (
                                            <sdkMui.MenuItem value={account?.CustomerAccountID} key={index}> {account?.DisplayName} </sdkMui.MenuItem>
                                        ))
                                    ))
                                    }
                                </sdkMui.Select>
                            </sdkMui.FormControl>
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={12} sm={12} md={2} xl={2} lg={2}>
                            <sdkMui.Typography variant='h4' fontWeight={'subtitle1'} >Invoice#</sdkMui.Typography>
                            <sdkMui.Typography variant='h6' fontWeight={'p'} >{"(Populate Automatically)"}</sdkMui.Typography>
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={12} sm={12} md={3} xl={3} lg={3}>
                            <sdkMui.TextField size='small' name={'InvoiceNumber'} sx={{ width: '100%' }} label='Invoice#' onChange={(e: any) => { handleFormChange(e) }} value={InvoiceInfo?.InvoiceNumber} />
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={6} sm={6} md={1} xl={1} lg={1} sx={{ textAlign: 'right' }} >
                            <sdkMui.Typography variant='h4' fontWeight={'subtitle1'} sx={{ textAlign: 'right' }} >Currency</sdkMui.Typography>
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={6} sm={6} md={6} xl={6} lg={6}>
                            <sdkMui.FormControl size="small" variant="outlined" sx={{ width: '32%' }} data-testId="Invoice-Currency-feild">
                                <sdkMui.InputLabel id="demo-simple-select-label" variant="outlined" required>Currency</sdkMui.InputLabel>
                                <sdkMui.Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedCurrencyID}
                                    label="Currency"
                                    required
                                    onChange={handleCurrencydropdown}
                                    size="small"
                                >
                                    {currencyInfo?.map((currency: any, index: number) => (
                                        <sdkMui.MenuItem value={currency?.CurrencyCode} key={index}> {currency?.CurrencyCode} </sdkMui.MenuItem>
                                    ))
                                    }
                                </sdkMui.Select>
                            </sdkMui.FormControl>
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={6} sm={6} md={2} xl={2} lg={2}>
                            <sdkMui.Typography variant='h4' fontWeight={'subtitle1'} >Invoice Date</sdkMui.Typography>
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={6} sm={6} md={3} xl={3} lg={3}>
                            <sdkMui.TextField size='small' type='date' id="outlined-required" data-testId="Invoice-date-feild" sx={{ width: '100%' }} name={'InvoiceDate'} onChange={(e: any) => handleFormChange(e)} value={InvoiceInfo?.InvoiceDate} InputProps={{
                                inputProps: {
                                    max: '9999-12-31',
                                },
                            }} required />
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={6} sm={6} md={1} xl={1} lg={1} sx={{ textAlign: 'center' }}>
                            <sdkMui.Typography variant='h4' fontWeight={'subtitle1'}>Terms</sdkMui.Typography>
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={6} sm={6} md={2} xl={2} lg={2}>
                            <sdkMui.FormControl size="small" variant="outlined" sx={{ width: '100%' }} data-testId="Invoice-term-feild">
                                <sdkMui.InputLabel id="demo-simple-select-label" variant="outlined" required >Terms</sdkMui.InputLabel>
                                <sdkMui.Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedTerm}
                                    label="Terms"
                                    required
                                    onChange={handletermDropDownChange}
                                    size="small"
                                >
                                    {netterm?.map((term: any, index: number) => (
                                        <sdkMui.MenuItem value={term?.AppSettingNetTerm} key={index}> {term?.AppSettingNetTerm} </sdkMui.MenuItem>
                                    ))
                                    }
                                </sdkMui.Select>
                            </sdkMui.FormControl>
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={6} sm={6} md={1} xl={1} lg={1} sx={{ textAlign: 'center' }}>
                            <sdkMui.Typography variant='h4' fontWeight={'subtitle1'} >Due Date</sdkMui.Typography>
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={6} sm={6} md={3} xl={3} lg={3}>
                            <sdkMui.TextField size='small' data-testId="Invoice-duedate-feild" type='date' sx={{ width: '70%' }} required name={'DueDate'} value={dueDate} InputProps={{
                                inputProps: {
                                    max: '9999-12-31',
                                },
                            }} />
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={6} sm={6} md={2} xl={2} lg={2}>
                            <sdkMui.Typography variant='h4' fontWeight={'subtitle1'} >Backup Charges</sdkMui.Typography>
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={6} sm={6} md={10} xl={10} lg={10}>
                            <sdkMui.TextField type="number" inputProps={{ step: "0.5", lang: "en-US", min: 0, maxlength: 6 }} size='small' sx={{ width: '29%' }} data-testId="Invoice-backup-charge-feild" name={'BackupCharges'} label='Backup Charges' required onChange={(e: any) => { handleBackupChargeChange(e) }} value={InvoiceInfo?.BackupCharges === 0.00 ? 0.00 : InvoiceInfo?.BackupCharges} />
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={12} sm={12} md={3} xl={3} lg={3}>
                            <sdkMui.Typography variant='h4' fontWeight={'bold'} >
                                Add Items
                            </sdkMui.Typography>
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
                            <sdkMui.TableContainer sx={{ width: '90%', textAlign: 'center' }} >
                                <sdkMui.Table border={1} data-testID="Invoice-Items-Table-Felid">
                                    <sdkMui.TableHead data-testID="Invoice-Items-Table-Headers-Felid">
                                        <sdkMui.TableRow >
                                            {iteminfoheader?.map((header: any, index: number) => (
                                                <sdkMui.TableCell key={index} sx={{ fontSize: '14px', fontWeight: 'bold', textAlign: 'center', background: (theme) => theme.palette.primary.light, color: (theme: any) => theme.name === 'ORANGE_THEME' ? "#C70039" : theme.palette.primary.dark }}>{header?.ColumnName}

                                                </sdkMui.TableCell>
                                            ))}
                                        </sdkMui.TableRow>
                                    </sdkMui.TableHead>
                                    <sdkMui.TableBody>
                                        <sdkMui.TableRow >
                                            <sdkMui.TableCell>
                                                <sdkMui.Autocomplete
                                                    id="combo-box-demo"
                                                    defaultValue={null}
                                                    value={selectedProduct}
                                                    placeholder='Select Product'
                                                    onChange={(event, newInputValue) => {
                                                        setSelectedProduct(newInputValue);
                                                        setInvoiceItemData((prevState: any) => {
                                                            return {
                                                                ...prevState,
                                                                "ProductID": productInfo?.find((data: any) => data?.Product?.ProductName === newInputValue?.Product?.ProductName)?.ProductID
                                                            };
                                                        });
                                                    }}
                                                    options={productInfo}
                                                    getOptionLabel={(option) => option?.Product?.ProductName || ""}
                                                    renderOption={(props, option) => (
                                                        <sdkMui.Box component="li" {...props}>
                                                            <sdkMui.Grid container spacing={1.5} alignItems={'center'}>
                                                                <sdkMui.Grid item xs={12}>
                                                                    <sdkMui.Typography variant='h4' >{option?.Product?.ProductName}</sdkMui.Typography></sdkMui.Grid>
                                                                <sdkMui.Grid item xs={8}><sdkMui.Typography variant='h6' color={'gray'}>{option?.Product?.ProductCode}</sdkMui.Typography>
                                                                </sdkMui.Grid>
                                                                <sdkMui.Grid item xs={1.5}> <sdkMui.Typography variant='h6' fontWeight={'bold'} >Rate :</sdkMui.Typography></sdkMui.Grid>
                                                                <sdkMui.Grid item xs={2.5}> <sdkMui.Typography variant='h6' color={'gray'}>{rateSuffix?.CurrencyCode}&nbsp;{rateSuffix?.CurrencySymbol} {option?.Rate}</sdkMui.Typography></sdkMui.Grid>
                                                                <sdkMui.Grid xs={12}><sdkMui.Divider /></sdkMui.Grid>
                                                            </sdkMui.Grid>
                                                        </sdkMui.Box>
                                                    )}
                                                    sx={{ width: 450 }}
                                                    renderInput={(params) => <sdkMui.TextField {...params} label="Product" variant="standard" />}
                                                />

                                            </sdkMui.TableCell>
                                            <sdkMui.TableCell align='right'>
                                                <sdkMui.TextField id="standard-basic" inputProps={{ step: "1", lang: "en-US" }} size="small" type='number' name={'Qty'} label="Qty" variant="standard" onChange={(e: any) => handleItemFormChange(e)} value={InvoiceItemData?.Qty} />
                                            </sdkMui.TableCell>
                                            <sdkMui.TableCell align='right'>
                                                {selectedProduct ?
                                                    <>
                                                        {productInfo?.filter((data: any) => data?.Product?.ProductName === selectedProduct?.Product?.ProductName)?.map((product: any) => (
                                                            <>
                                                                <sdkMui.TextField type='text' InputProps={{
                                                                    readOnly: true,
                                                                    endAdornment: (
                                                                        <>
                                                                            {selectedCurrencyID &&
                                                                                <sdkMui.Typography>{rateSuffix?.CurrencySymbol}&nbsp;{rateSuffix?.CurrencyCode}</sdkMui.Typography>}
                                                                        </>
                                                                    ),
                                                                }}
                                                                    sx={{ direction: 'rtl' }} name={'Rate'} variant='standard' label='Rate' inputProps={{ readOnly: true, }} value={product?.Rate} onChange={(e: any) => handleItemFormChange(e)} />
                                                            </>
                                                        ))
                                                        }
                                                    </>
                                                    :
                                                    <sdkMui.TextField id="standard-basic" InputProps={{
                                                        readOnly: true,
                                                        endAdornment: (
                                                            <>
                                                                {selectedCurrencyID &&
                                                                    <sdkMui.Typography>{rateSuffix?.CurrencySymbol}&nbsp;{rateSuffix?.CurrencyCode}</sdkMui.Typography>}
                                                            </>
                                                        ),
                                                    }}
                                                        type='text' sx={{ direction: 'rtl' }} name={'Rate'} label='Rate' required variant='standard' inputProps={{ readOnly: true, }} value={InvoiceItemData?.Rate || 0} onChange={(e: any) => handleItemFormChange(e)} />
                                                }
                                            </sdkMui.TableCell >
                                            <sdkMui.TableCell align='right'>
                                                {selectedProduct ?
                                                    <>
                                                        {productInfo?.filter((data: any) => data?.Product?.ProductName === selectedProduct?.Product?.ProductName)?.map((product: any) => (
                                                            <>
                                                                <sdkMui.TextField id="standard-basic" InputProps={{
                                                                    readOnly: true,
                                                                    endAdornment: (
                                                                        <>
                                                                            {selectedCurrencyID &&
                                                                                <sdkMui.Typography>{rateSuffix?.CurrencySymbol}&nbsp;{rateSuffix?.CurrencyCode}</sdkMui.Typography>}
                                                                        </>
                                                                    ),
                                                                }} type='text' size="small" sx={{ direction: 'rtl' }} name={'TotalAmount'} label="Amount" variant="standard" value={(parseFloat(InvoiceItemData?.Qty) * product?.Rate).toFixed(2) || product?.Rate} />
                                                            </>
                                                        ))
                                                        }
                                                    </>
                                                    :
                                                    <sdkMui.TextField id="standard-basic" size="small"
                                                        InputProps={{
                                                            readOnly: true,
                                                            endAdornment: (
                                                                <>
                                                                    {selectedCurrencyID &&
                                                                        <sdkMui.Typography>{rateSuffix?.CurrencySymbol}&nbsp;{rateSuffix?.CurrencyCode}</sdkMui.Typography>}
                                                                </>
                                                            ),
                                                        }} sx={{ direction: 'rtl' }} name={'TotalAmount'} label="Amount" required variant="standard" value={0} onChange={(e: any) => handleItemFormChange(e)} />
                                                }
                                            </sdkMui.TableCell >
                                            <span className='material-symbols-outlined' style={{ cursor: 'pointer', textAlign: 'center', fontSize: '24px', marginTop: '14px' }} onClick={() => { { selectedProduct && InvoiceItemData?.Qty ? handleCreateRow() : setIsEmptyRowCreation(true); setTimeout(() => { setIsEmptyRowCreation(false); }, 3000) } }} >add_circle</span>
                                        </sdkMui.TableRow>
                                        {InvoiceItemInfo?.map((row: any) => (
                                            <>
                                                <sdkMui.TableRow>
                                                    <sdkMui.TableCell>
                                                        <sdkMui.Typography variant='h5' fontWeight={'body1'} >{row?.ProductName} </sdkMui.Typography>
                                                    </sdkMui.TableCell>
                                                    <sdkMui.TableCell align='right'>
                                                        <sdkMui.Typography variant='h5' fontWeight={'body1'}>{row?.Qty} </sdkMui.Typography>
                                                    </sdkMui.TableCell>
                                                    <sdkMui.TableCell align='right'>
                                                        <sdkMui.Stack spacing={2} direction={'row'} sx={{ justifyContent: 'flex-end' }}>
                                                            <sdkMui.Grid container spacing={2}>
                                                                <sdkMui.Grid xs={9}>
                                                                    <sdkMui.Typography variant='h5' fontWeight={'body1'}>{rateSuffix?.CurrencyCode}&nbsp;{rateSuffix?.CurrencySymbol}</sdkMui.Typography>
                                                                </sdkMui.Grid>
                                                                <sdkMui.Grid xs={3}>
                                                                    <sdkMui.Typography variant='h5' fontWeight={'body1'}>{row?.Rate} </sdkMui.Typography>
                                                                </sdkMui.Grid>
                                                            </sdkMui.Grid>
                                                        </sdkMui.Stack>
                                                    </sdkMui.TableCell>
                                                    <sdkMui.TableCell align='right'>
                                                        <sdkMui.Stack spacing={2} direction={'row'} sx={{ justifyContent: 'flex-end' }}>
                                                            <sdkMui.Grid container spacing={2}>
                                                                <sdkMui.Grid xs={7}>
                                                                    <sdkMui.Typography variant='h5' fontWeight={'body1'}>{rateSuffix?.CurrencyCode}&nbsp;{rateSuffix?.CurrencySymbol}</sdkMui.Typography>
                                                                </sdkMui.Grid>
                                                                <sdkMui.Grid xs={5}>
                                                                    <sdkMui.Typography variant='h5' fontWeight={'body1'}>{parseFloat(row?.TotalAmount)?.toFixed(2)} </sdkMui.Typography>
                                                                </sdkMui.Grid>
                                                            </sdkMui.Grid>
                                                        </sdkMui.Stack>
                                                    </sdkMui.TableCell>
                                                    <span className='material-symbols-outlined' style={{ cursor: 'pointer', textAlign: 'center', fontSize: '18px', marginTop: '10px' }} onClick={() => { handleDeleteRow(row.ProductName, row.TotalAmount) }} >Delete</span>
                                                </sdkMui.TableRow>
                                            </>
                                        ))}
                                    </sdkMui.TableBody>
                                </sdkMui.Table>
                            </sdkMui.TableContainer>
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={12} sm={12} md={7.5} xl={7.5} lg={7.5}>
                            <sdkMui.Grid xs={12}>
                                <sdkMui.Typography variant='h4' fontWeight={'bold'} sx={{ textAlign: 'left' }}>&nbsp;Notes : </sdkMui.Typography></sdkMui.Grid>
                            <sdkMui.Grid xs={12}>
                                <hr style={{ visibility: 'hidden' }} />
                            </sdkMui.Grid>
                            <sdkMui.Grid xs={8} sx={{ textAlign: 'center' }}>
                                <sdkMui.TextField data-testId="Invoice-Description-Feild" id="standard-basic" size="medium" sx={{ textAlign: 'center', width: '90%' }} type='text' placeholder='Write here.........' rows={1} multiline={true} name={'Remarks'} label="Description" variant="outlined" onChange={(e: any) => handleFormChange(e)} value={InvoiceInfo?.Remarks} />
                            </sdkMui.Grid>
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={12} sm={12} md={4.5} xl={4.5} lg={4.5} >
                            <sdkMui.Stack spacing={1} direction={'row'} data-testId="Invoice-Conclusion-Feild">
                                <sdkMui.Stack spacing={2} direction={'column'} sx={{ p: 1.5 }} >
                                    <sdkMui.Typography variant='h5' fontWeight={'body1'}>Sub Total :</sdkMui.Typography>
                                    <sdkMui.Typography variant='h5' fontWeight={'body1'}>Total :</sdkMui.Typography>
                                    <sdkMui.Typography variant='h5' fontWeight={'body1'}>Balance Due :</sdkMui.Typography>
                                </sdkMui.Stack>
                                <sdkMui.Stack spacing={2} direction={'column'} >
                                    <sdkMui.TextField type='number'
                                        value={InvoiceInfo?.SubTotal?.toFixed(2) || 0}
                                        InputProps={{
                                            readOnly: true,
                                            endAdornment: (
                                                <>
                                                    {selectedCurrencyID &&
                                                        <sdkMui.Typography>{rateSuffix?.CurrencySymbol}&nbsp;{rateSuffix?.CurrencyCode}</sdkMui.Typography>}
                                                </>
                                            ),
                                        }}
                                        name={'SubTotal'} variant='standard' sx={{ display: 'flex', alignItems: 'center', direction: 'rtl' }}></sdkMui.TextField>
                                    <sdkMui.TextField type='number' variant='standard'
                                        InputProps={{
                                            readOnly: true,
                                            endAdornment: (
                                                <>
                                                    {selectedCurrencyID &&
                                                        <sdkMui.Typography>{rateSuffix?.CurrencySymbol}&nbsp;{rateSuffix?.CurrencyCode}</sdkMui.Typography>}
                                                </>
                                            ),
                                        }}
                                        value={InvoiceInfo?.InvoiceAmount.toFixed(2) || 0} sx={{ direction: 'rtl' }} />
                                    <sdkMui.TextField type='number' variant='standard'
                                        InputProps={{
                                            readOnly: true,
                                            endAdornment: (
                                                <>
                                                    {selectedCurrencyID &&
                                                        <sdkMui.Typography>{rateSuffix?.CurrencySymbol}&nbsp;{rateSuffix?.CurrencyCode}</sdkMui.Typography>}
                                                </>
                                            ),
                                        }}
                                        value={InvoiceInfo?.BalanceDue.toFixed(2) || 0} sx={{ direction: 'rtl' }} ></sdkMui.TextField>
                                </sdkMui.Stack>
                            </sdkMui.Stack>
                        </sdkMui.Grid>
                    </sdkMui.Grid>
                </sdkMui.Box>
            </form >
            {
                isEmptyRowCreation &&
                <Snackbar
                    configs={{
                        dataTestID: 'Add row',
                        severity: 'error',
                        alertDescription: messages?.EMPTY_ROW_CREATION,
                        isSetOpen: isEmptyRowCreation,
                        snackbarAutoHideDuration: 3000
                    }}
                />
            }
            {
                isProductAdded &&
                <Snackbar
                    configs={{
                        dataTestID: 'Add row',
                        severity: 'error',
                        alertDescription: messages?.ADD_ITEM_ROW,
                        isSetOpen: isProductAdded,
                        snackbarAutoHideDuration: 3000
                    }}
                />
            }
            {
                duplicateProduct &&
                <Snackbar
                    configs={{
                        dataTestID: 'Product_Already_Exits',
                        severity: 'error',
                        alertDescription: messages?.PRODUCT_ALREADY_EXISTS,
                        isSetOpen: duplicateProduct,
                        snackbarAutoHideDuration: 3000
                    }}
                />
            }
            {
                successCreateMessage &&
                <Snackbar
                    configs={{
                        dataTestID: 'Success-Invoice-Create',
                        severity: 'success',
                        alertDescription: messages?.INVOICE_CREATE_SUCCESS_MESSAGE,
                        isSetOpen: successCreateMessage,
                        snackbarAutoHideDuration: 3000
                    }}
                />
            }
            {
                errorCreateMessage &&
                <Snackbar
                    configs={{
                        dataTestID: 'Error-Invoice-Create',
                        severity: 'error',
                        alertDescription: messages?.INVOICE_CREATE_ERROR_MESSAGE,
                        isSetOpen: errorCreateMessage,
                        snackbarAutoHideDuration: 3000
                    }}
                />
            }
            {
                ClosePopup &&
                <sdkMui.Dialog
                    open={ClosePopup}
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
                                handleButtonClick: () => { setClosePopup(false); configs?.router?.push(helper?.constructDynamicURL("/merchants/[merchantkey]/sales/invoices", { merchantkey: configs?.router?.query?.merchantkey })) }
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
        </>
    )
}