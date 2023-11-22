/**
 * CreatedBy    : Uma Kohila S
 * CreatedDate  : Oct 24 2023
 * Description  : This file contain AddPriceList component of Price List
 */
import React, { useState } from "react";
import { addPricelistInterface } from "@/interfaces/components/sales/customers/pricelist/add PriceListInterface";
import { Button, Snackbar, sdkMui } from "@baas/platform-web-sdk";
import { Helper } from "@/utils/Helper";
import _ from 'lodash'
import { Constants } from "@/utils/Constants";

const helper = new Helper();
const constants = new Constants();

const AuthID = JSON.parse(helper?.getCookie(constants?.AUTH_INFO_COOKIE_NAME))?.AuthID
const TenantID = JSON.parse(helper?.getCookie(constants?.TENANT_INFO_COOKIE_NAME))?.TenantID
const MerchantID = JSON.parse(helper?.getCookie(constants?.MERCHANT_INFO_COOKIE_NAME))?.MerchantID
const AuthName = JSON.parse(helper?.getCookie(constants?.AUTH_INFO_COOKIE_NAME))?.ContactPerson?.ContactPersonName


function AddPriceList({ configs, data }: addPricelistInterface) {
    const [isEmpltyRowCreation, setIsEmptyRowCreationMessage] = useState(false)
    const [UserInfo, setUserInfo] = useState<any>({})
    const [open, setOpen] = useState(false)
    const [closePopup, setClosePopup] = useState(false)
    const [PricelistInfo, setPricelistInfo] = useState<any>()
    const [recordPaymentSuccessMessageIsOpen, setRecordPaymentSuccessMessageIsOpen] = useState(false)
    const [recordPaymentErrorMessageIsOpen, setRecordPaymentErrorMessageIsOpen] = useState(false)
    const [discountTableData, setDiscountTableData] = useState(false)
    const [PriceItmeInfo, setpricelistItemInfo] = useState<any>([])
    const [productTableData, setProductTableData] = useState<any>([])
    const [showDiscountTableData, setShowDiscountTableData] = useState<any>([])
    const [PriceItmeInfoList, setpricelistItemInfoList] = useState<any>([])
    const [discountPoupVisivle, setDiscountPopupVisible] = useState(false)
    const [productValue, setProductValue] = useState<any>({
        "ProductName": '',
        "ProductID": '',
        "Rate": ''
    })
    const [pricelistData, setPriceListData] = useState<any>({
        "DisplayName": '',
        "StartDate": '',
        "EndDate": '',
        "ProductID": '',
        "Rate": 0.00,
        "RangeMin": 0,
        "RangeMax": 0,
        "DiscountPeriod": '',
        "DiscountType": '',
        "DiscountRate": 0.00,
        "DiscountPercent": 0.00,
        "CurrencyID": '',
        "CurrencyCode": ''
    })

    const [priceListTableData, setPriceListTableData] = useState<any>({
        "ProductID": '',
        "ProductName": '',
        "ProductCode": '',
        "UoM": '',
        "Rate": '',
        "RangeMin": '',
        "RangeMax": '',
        "DiscountPeriod": '',
        "DiscountType": '',
        "DiscountRate": '',
        "DiscountPercent": '',
        "CurrencyID": '',
        "CurrencyCode": '',
        "CurrencySymbol": '',
        "Description": ''
    })

    const productMenus = [
        {
            ColumnName: "ProductName",
            DisplayName: "Product Name",
            IsVisible: true,
        },
        {
            ColumnName: "ProductCode",
            DisplayName: "Product Code",
            IsVisible: true,
        },
        {
            ColumnName: "Rate",
            DisplayName: "Rate",
            IsVisible: true,
        },
        {
            ColumnName: "UoM",
            DisplayName: "UoM",
            IsVisible: true,
        },
        {
            ColumnName: "",
            DisplayName: "",
            IsVisible: true
        }
    ]

    const productMenu = [
        {
            ColumnName: "ProductName",
            DisplayName: "Product Name",
            IsVisible: true,
        },
        {
            ColumnName: "Rate",
            DisplayName: "Rate",
            IsVisible: true,
        },
        {
            ColumnName: "",
            DisplayName: "",
            IsVisible: true
        }
    ]

    const menu = [
        {
            ColumnName: "RangeMin",
            DisplayName: "Min.Range",
            IsVisible: true,
        },
        {
            ColumnName: "RangeMax",
            DisplayName: "Max.Range",
            IsVisible: true,
        },
        {
            ColumnName: "DiscountPeriod",
            DisplayName: "Discount Period",
            IsVisible: true,
        },
        {
            ColumnName: "DiscountType",
            DisplayName: "Discount Type",
            IsVisible: true,
        },
        {
            ColumnName: "CurrencyCode",
            DisplayName: "Currency Code",
            IsVisible: true,
        },
        {
            ColumnName: "DiscountRate",
            DisplayName: "Discount Rate",
            IsVisible: true,
        },
    ]

    const DisPeriod = [
        {
            DisplayName: "Year",
            IsVisible: true,
        },
        {
            DisplayName: "Month",
            IsVisible: true,
        }
    ]

    const DisCountType = [
        {
            DisplayName: "Percent",
            IsVisible: true,
        },
        {
            DisplayName: "Rate",
            IsVisible: true,
        }
    ]

    const handleFormChange = (e: any) => {
        setPriceListData((prevState: any) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            };
        });
        setPriceListTableData((prevState: any) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleCurrencySelectDrowpdown = (event: any) => {
        setPriceListTableData((prevState: any) => {
            return {
                ...prevState,
                "CurrencyID": data?.currencyListData?.find((data: any) => data?.CurrencyID === event?.target?.value)?.CurrencyID,
                "CurrencyCode": data?.currencyListData?.find((data: any) => data?.CurrencyID === event?.target?.value)?.CurrencyCode,
                "CurrencySymbol": data?.currencyListData?.find((data: any) => data?.CurrencyID === event?.target?.value)?.CurrencySymbol
            }
        })
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

    const handleAddDiscountRow = async () => {
        setIsEmptyRowCreationMessage(false);
        let data = {
            "ProductID": parseInt(productValue?.ProductID),
            "ProductName": productValue?.ProductName,
            "Rate": productValue?.Rate,
            "RangeMin": parseInt(priceListTableData?.RangeMin),
            "RangeMax": parseInt(priceListTableData?.RangeMax),
            "DiscountPeriod": priceListTableData?.DiscountPeriod,
            "DiscountType": priceListTableData?.DiscountType,
            "DiscountRate": priceListTableData?.DiscountRate === '' ? 0 : parseFloat(priceListTableData?.DiscountRate),
            "DiscountPercent": priceListTableData?.DiscountPercent === '' ? 0 : parseFloat(priceListTableData?.DiscountPercent),
            "CurrencyID": priceListTableData?.CurrencyID,
            "CurrencyCode": priceListTableData?.CurrencyCode,
            "CurrencySymbol": priceListTableData?.CurrencySymbol,
            "Description": priceListTableData?.Description === '' ? null : priceListTableData?.Description
        }
        let pricelistdata = {
            "ProductID": parseInt(productValue?.ProductID),
            "Rate": parseFloat(productValue?.Rate),
            "CurrencyID": priceListTableData?.CurrencyID,
            "RangeMin": parseInt(priceListTableData?.RangeMin),
            "RangeMax": parseInt(priceListTableData?.RangeMax),
            "DiscountPeriod": priceListTableData?.DiscountPeriod,
            "DiscountType": priceListTableData?.DiscountType,
            "DiscountPercent": priceListTableData?.DiscountPercent === '' ? 0 : parseFloat(priceListTableData?.DiscountPercent),
            "DiscountRate": priceListTableData?.DiscountRate === '' ? 0 : parseFloat(priceListTableData?.DiscountRate),
            "Description": priceListTableData?.Description === '' ? null : priceListTableData?.Description
        }
        setpricelistItemInfo([...PriceItmeInfo, pricelistdata])
        setpricelistItemInfoList([...PriceItmeInfoList, data])
        setPriceListTableData({
            "ProductID": '',
            "ProductName": '',
            "ProductCode": '',
            "Rate": '',
            "UoM": '',
            "RangeMin": '',
            "RangeMax": '',
            "DiscountPeriod": '',
            "DiscountType": '',
            "DiscountRate": '',
            "DiscountPercent": '',
            "CurrencyID": '',
            "CurrencyCode": '',
            "CurrencySymbol": '',
            "Description": ''
        })
    }
    const handleAddRow = async () => {
        setUserInfo((prevState: any) => {
            return {
                ...prevState,
                "MerchantID": MerchantID,
                "TenantID": TenantID,
                "CreatedAuthID": AuthID,
                "CreatedBy": AuthName,
                "ModifiedAuthID": AuthID,
                "ModifiedBy": AuthName
            }
        })
        setPricelistInfo((prevState: any) => {
            return {
                ...prevState,
                "CustomerID": parseInt(`${configs?.router?.query?.customerid}`),
                "StartDate": handleDateasISOString(pricelistData?.StartDate),
                "DisplayName": pricelistData?.DisplayName,
                "EndDate": handleDateasISOString(pricelistData?.EndDate),
            }
        })
        setIsEmptyRowCreationMessage(false);
        let producttableData = {
            "ProductID": priceListTableData?.ProductID,
            "Rate": priceListTableData?.Rate,
            "ProductName": priceListTableData?.ProductName,
            "ProductCode": priceListTableData?.ProductCode
        }
        setProductTableData([...productTableData, producttableData])
        setProductValue((prevState: any) => {
            return {
                ...prevState,
                "ProductID": priceListTableData?.ProductID,
                "ProductName": priceListTableData?.ProductName,
                "Rate": priceListTableData?.Rate,
                "ProductCode": priceListTableData?.ProductCode
            }
        })
        setPriceListTableData({
            "ProductID": '',
            "ProductName": '',
            "ProductCode": '',
            "Rate": '',
            "UoM": '',
            "RangeMin": '',
            "RangeMax": '',
            "DiscountPeriod": '',
            "DiscountType": '',
            "DiscountRate": '',
            "DiscountPercent": '',
            "CurrencyID": '',
            "CurrencyCode": '',
            "CurrencySymbol": '',
            "Description": ''
        })
    }
    const handleCancel = async () => {
        setPriceListTableData({
            "ProductID": '',
            "ProductName": '',
            "ProductCode": '',
            "Rate": '',
            "UoM": '',
            "RangeMin": '',
            "RangeMax": '',
            "DiscountPeriod": '',
            "DiscountType": '',
            "DiscountRate": '',
            "DiscountPercent": '',
            "CurrencyID": '',
            "CurrencyCode": '',
            "CurrencySymbol": '',
            "Description": ''
        })
        setPriceListData({
            "DisplayName": '',
            "StartDate": '',
            "EndDate": '',
            "ProductID": '',
            "Rate": 0.00,
            "RangeMin": 0,
            "RangeMax": 0,
            "DiscountPeriod": '',
            "DiscountType": '',
            "DiscountRate": 0.00,
            "DiscountPercent": 0.00,
            "CurrencyID": '',
            "CurrencyCode": ''
        })
        setProductTableData([])
        setShowDiscountTableData([])
        setpricelistItemInfoList([])
    }
    const handleClose = async () => {
        const data = {
            "ProductID": '',
            "ProductName": '',
            "ProductCode": '',
            "UoM": '',
            "Rate": '',
            "RangeMin": '',
            "RangeMax": '',
            "DiscountPeriod": '',
            "DiscountType": '',
            "DiscountRate": '',
            "DiscountPercent": '',
            "CurrencyID": '',
            "CurrencyCode": '',
            "CurrencySymbol": '',
            "Description": ''
        }
        let productdata = {}
        if (_.isEqual(data, priceListTableData)) {
            configs?.router?.push(helper?.constructDynamicURL(`/merchants/[merchantkey]/product/pricelist/${configs?.router?.query?.pricelistid}/pricelist`, { "merchantkey": configs?.merchantkey }))
        } else if (_.isEqual(productdata, productTableData)) {
            configs?.router?.push(helper?.constructDynamicURL(`/merchants/[merchantkey]/product/pricelist/${configs?.router?.query?.customerid}/pricelist`, { "merchantkey": configs?.merchantkey }))
        }
        else {
            setClosePopup(true)
        }
    }

    const handleDiscountModelClose = async () => {
        let data = {}
        if (_.isEqual(data, showDiscountTableData)) {
            setDiscountPopupVisible(false)
        } else {
            setClosePopup(true)
        }
    }

    const handleRowDelete = async (ProductID: any) => {
        const updatedRows = productTableData.filter((row: any) => row.ProductID !== ProductID);
        setProductTableData(updatedRows)
    }

    const handleShowDiscountData = async (ProductID: any) => {
        const updatedRows = PriceItmeInfoList.filter((row: any) => row.ProductID === ProductID);
        setShowDiscountTableData(updatedRows);
        setDiscountTableData(true);
    }

    const handleCreate = async () => {
        let request = { UserInfo, PricelistInfo, PriceItmeInfo }
        let response = await configs?.functionObj?.createPriceList(request)
        if (response?.status === 200) {
            setRecordPaymentSuccessMessageIsOpen(true)
            setTimeout(() => {
                setRecordPaymentSuccessMessageIsOpen(false)
            }, 3000)
            handleCancel();
        } else {
            setRecordPaymentErrorMessageIsOpen(true)
            setTimeout(() => {
                setRecordPaymentErrorMessageIsOpen(false)
            }, 3000)
        }
    }

    return (
        <>
            <sdkMui.Grid container spacing={2} data-testid="Add-PriceList-Component">
                <sdkMui.Grid item xs={12}>
                    <sdkMui.Card >
                        <sdkMui.Grid container sx={{ pl: 2, borderBottom: '1px solid #000' }}>
                            <sdkMui.Grid item xs={10} sx={{ pt: 2 }}>
                                <sdkMui.Stack spacing={2} direction={'row'}>
                                    <span className="material-symbols-outlined"> list_alt_add </span>
                                    <sdkMui.Typography data-testid="Add-PriceList-Component-Title" variant='h3' fontWeight={'bold'} sx={{ pb: 1, pt: 0, mt: 0 }}>
                                        Add PriceList
                                    </sdkMui.Typography>
                                </sdkMui.Stack>
                            </sdkMui.Grid>
                            <sdkMui.Grid item xs={2} sx={{ pl: '5%', pb: 1, pt: 1 }}>
                                <sdkMui.Stack direction={"row"} spacing={2}>
                                    <Button
                                        configs={{
                                            label: "Save",
                                            dataTestID: 'Add-PriceList-Save-Button',
                                            varient: 'contained',
                                            size: 'small'
                                        }}
                                        callbacks={{
                                            handleButtonClick: () => { handleCreate() },
                                            handleOnChange: () => { }
                                        }}
                                    />
                                    <span className='material-symbols-outlined' style={{ cursor: 'pointer', textAlign: 'center', fontSize: '24px', marginTop: '14px' }} onClick={() => { { handleClose() } }} > cancel</span>
                                </sdkMui.Stack>
                            </sdkMui.Grid>
                        </sdkMui.Grid>
                        <sdkMui.Grid container spacing={2} sx={{ pt: 2 }}>
                            <sdkMui.Grid container spacing={2} sx={{ p: 2, pt: 3 }}>
                                <sdkMui.Grid item xs={2} sx={{ pt: 3, }}>
                                    <sdkMui.Typography sx={{ fontSize: '18px', textAlign: 'right' }} >Display Name</sdkMui.Typography>
                                </sdkMui.Grid>
                                <sdkMui.Grid item xs={4}>
                                    <sdkMui.TextField
                                        id="outlined-basic"
                                        size='small'
                                        variant='outlined'
                                        name={'DisplayName'}
                                        value={pricelistData?.DisplayName}
                                        label="Display Name"
                                        sx={{ width: '80%' }}
                                        type='text'
                                        onChange={(e: any) => handleFormChange(e)}
                                        required
                                    />
                                </sdkMui.Grid>
                            </sdkMui.Grid>
                            <sdkMui.Grid container spacing={2} sx={{ p: 2, }}>
                                <sdkMui.Grid item xs={2}>
                                    <sdkMui.Typography data-testid="Add-PriceList-Start-Date" sx={{ fontSize: '18px', textAlign: 'right' }}>Start Date</sdkMui.Typography>
                                </sdkMui.Grid>
                                <sdkMui.Grid item xs={4}>
                                    <sdkMui.TextField
                                        id="outlined-basic"
                                        size='small'
                                        variant='outlined'
                                        name={'StartDate'}
                                        value={pricelistData?.StartDate}
                                        sx={{ width: '80%' }}
                                        type='date'
                                        InputProps={{
                                            inputProps: {
                                                max: '9999-12-31',
                                            },
                                        }}
                                        onChange={(e: any) => handleFormChange(e)}
                                        required


                                    />
                                </sdkMui.Grid>
                                <sdkMui.Grid item xs={2}>
                                    <sdkMui.Typography data-testid="Add-PriceList-End-Date" sx={{ fontSize: '18px', textAlign: 'right' }}>End Date</sdkMui.Typography>
                                </sdkMui.Grid>
                                <sdkMui.Grid item xs={4}>
                                    <sdkMui.TextField
                                        id="outlined-basic"
                                        size='small'
                                        variant='outlined'
                                        name={'EndDate'}
                                        value={pricelistData?.EndDate}
                                        sx={{ width: '80%' }}
                                        type='date'
                                        InputProps={{
                                            inputProps: {
                                                max: '9999-12-31',
                                            },
                                        }}
                                        onChange={(e: any) => handleFormChange(e)}
                                    />
                                </sdkMui.Grid>
                            </sdkMui.Grid>
                        </sdkMui.Grid>
                        <sdkMui.Grid container >
                            <sdkMui.Grid item xs={12} sx={{ p: 1 }}>
                                <sdkMui.Grid container spacing={1} >
                                    <sdkMui.Grid item xs={4} sx={{ m: 2 }}>
                                        <sdkMui.Typography variant="h3"></sdkMui.Typography>
                                    </sdkMui.Grid>
                                </sdkMui.Grid>
                                <sdkMui.Grid container spacing={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <sdkMui.Grid item xs={8}>
                                        <sdkMui.TableContainer sx={{ p: 1, pl: 2, textAlign: 'center' }}>
                                            <sdkMui.Table border={1} sx={{ color: 'black' }}>
                                                <sdkMui.TableHead>
                                                    <sdkMui.TableRow>
                                                        {productMenu?.map((headers: any) => <sdkMui.TableCell key={null} sx={{ fontSize: '14px', textAlign: 'center', background: (theme) => theme.palette.primary.main, color: (theme) => theme.palette.primary.contrastText }}>{headers?.DisplayName}
                                                        </sdkMui.TableCell>)}
                                                    </sdkMui.TableRow>
                                                </sdkMui.TableHead>
                                                <sdkMui.TableBody>
                                                    <sdkMui.TableRow>
                                                        <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary, justifyContent: 'center', alignItems: 'center' }} >
                                                            <sdkMui.Autocomplete
                                                                id="combo-box-demo"
                                                                defaultValue={null}
                                                                value={priceListTableData?.ProductName}
                                                                placeholder='Select Product'
                                                                onChange={(event, newInputValue) => {
                                                                    setPriceListTableData((prevState: any) => {
                                                                        return {
                                                                            ...prevState,
                                                                            "ProductID": data?.productListData?.find((data: any) => data?.ProductName === newInputValue)?.ProductID,
                                                                            "ProductName": data?.productListData?.find((data: any) => data?.ProductName === newInputValue)?.ProductName,
                                                                            "Rate": parseInt(data?.productListData?.find((data: any) => data?.ProductName === newInputValue)?.SaleRate),
                                                                            "ProductCode": data?.productListData?.find((data: any) => data?.ProductName === newInputValue)?.ProductCode,
                                                                            "UoM": data?.productListData?.find((data: any) => data?.ProductName === newInputValue)?.UoM
                                                                        }
                                                                    })
                                                                }}
                                                                options={data?.productListData?.map((option: any) => option?.ProductName || "")}
                                                                sx={{ width: 450 }}
                                                                renderInput={(params) => <sdkMui.TextField {...params} label="Product" variant="standard" />}
                                                            />
                                                        </sdkMui.TableCell>
                                                        <sdkMui.TableCell>
                                                            <sdkMui.TextField
                                                                id="outlined-basic"
                                                                size='small'
                                                                variant='standard'
                                                                name={'Rate'}
                                                                value={priceListTableData?.Rate}
                                                                label="Rate"
                                                                sx={{ width: '100%', }}
                                                                type='number'
                                                                defaultValue={priceListTableData?.Rate}
                                                                onChange={(e: any) => handleFormChange(e)}
                                                            />
                                                        </sdkMui.TableCell>
                                                        <span className='material-symbols-outlined' style={{ cursor: 'pointer', textAlign: 'center', fontSize: '24px', marginTop: '14px' }} onClick={() => { { priceListTableData?.ProductID === '' ? setIsEmptyRowCreationMessage(true) : handleAddRow() } }} > add_circle</span>
                                                    </sdkMui.TableRow>
                                                </sdkMui.TableBody>
                                            </sdkMui.Table>
                                        </sdkMui.TableContainer>
                                    </sdkMui.Grid>
                                </sdkMui.Grid>
                                <sdkMui.Grid container spacing={1} >
                                    <sdkMui.Grid item xs={12}>

                                    </sdkMui.Grid>
                                </sdkMui.Grid>
                                {productTableData?.length > 0 ?
                                    <>
                                        <sdkMui.Divider sx={{ visibility: 'visible' }}></sdkMui.Divider>
                                        <sdkMui.Chip label={`PriceList Count : ${productTableData?.length}`} sx={{ ml: '20px', mt: '8px' }} size='medium' color='primary'></sdkMui.Chip>
                                        <sdkMui.Grid container spacing={1} >
                                            <sdkMui.Grid item xs={12}>
                                                <sdkMui.TableContainer sx={{ p: 1, pl: 2, textAlign: 'center' }}>
                                                    <sdkMui.Table border={1} sx={{ color: 'black' }}>
                                                        <sdkMui.TableHead>
                                                            <sdkMui.TableRow>
                                                                {productMenus?.map((headers: any) => <sdkMui.TableCell key={null} sx={{ fontSize: '14px', textAlign: 'center', background: (theme) => theme.palette.primary.main, color: (theme) => theme.palette.primary.contrastText }}>{headers?.DisplayName}
                                                                </sdkMui.TableCell>)}
                                                            </sdkMui.TableRow>
                                                        </sdkMui.TableHead>
                                                        <sdkMui.TableBody>
                                                            {productTableData?.map((row: any) => (
                                                                <>
                                                                    <sdkMui.TableRow key={null} sx={{ '& > *': { borderRight: 'none', borderLeft: 'none' } }} >
                                                                        <sdkMui.TableCell sx={{ textAlign: 'center' }}><sdkMui.Typography variant='h5'>{row?.ProductName}</sdkMui.Typography> </sdkMui.TableCell>
                                                                        <sdkMui.TableCell sx={{ textAlign: 'center' }}><sdkMui.Typography variant='h5'>{row?.ProductCode}</sdkMui.Typography> </sdkMui.TableCell>
                                                                        <sdkMui.TableCell sx={{ textAlign: "right" }}> {row?.Rate} </sdkMui.TableCell>
                                                                        <sdkMui.TableCell sx={{ textAlign: 'center' }}> {row?.UoM || "N/A"} </sdkMui.TableCell>
                                                                        <sdkMui.TableCell sx={{ textAlign: 'right' }} >
                                                                            <span className='material-symbols-outlined' style={{ cursor: 'pointer', textAlign: 'center', fontSize: '20px' }} onClick={() => { { setDiscountPopupVisible(true) } }} > add_circle</span>
                                                                            <span className='material-symbols-outlined' style={{ cursor: 'pointer', textAlign: 'center', fontSize: '20px' }} onClick={() => { { handleRowDelete(row?.ProductID) } }} >delete</span>
                                                                            <sdkMui.IconButton
                                                                                aria-label="expand row"
                                                                                size="small"
                                                                                onClick={() => setOpen(!open)}
                                                                            >
                                                                                {open ?
                                                                                    <span className="material-symbols-outlined" style={{ display: "flex", alignItems: "center", justifyContent: "center", cursor: 'pointer', fontSize: '30px', paddingBottom: "15px" }} onClick={() => { setDiscountTableData(false) }}> keyboard_arrow_down</span>
                                                                                    : <span className="material-symbols-outlined" style={{ display: "flex", alignItems: "center", justifyContent: "center", cursor: 'pointer', fontSize: '30px', paddingBottom: "15px" }} onClick={() => { handleShowDiscountData(row?.ProductID); }}> expand_less </span>
                                                                                }
                                                                            </sdkMui.IconButton>
                                                                        </sdkMui.TableCell>
                                                                    </sdkMui.TableRow>
                                                                    <sdkMui.TableRow key={null} sx={{ paddingBottom: 0, paddingTop: 0 }} >
                                                                        <sdkMui.Collapse in={open} timeout="auto" unmountOnExit>
                                                                            {discountTableData && showDiscountTableData?.length > 0 ? <>
                                                                                {row?.ProductID === showDiscountTableData[0]?.ProductID ? <>
                                                                                    <sdkMui.Grid container spacing={1} >
                                                                                        <sdkMui.Grid item xs={12}>
                                                                                            <sdkMui.TableContainer sx={{ p: 1, pl: 2, textAlign: 'center' }}>
                                                                                                <sdkMui.Table sx={{ color: 'black' }}>
                                                                                                    <sdkMui.TableHead>
                                                                                                        <sdkMui.TableRow>
                                                                                                            {menu?.map((headers: any) => <sdkMui.TableCell key={null} sx={{ fontSize: '14px', textAlign: 'center', border: 'none' }}>{headers?.DisplayName}
                                                                                                            </sdkMui.TableCell>)}
                                                                                                        </sdkMui.TableRow>
                                                                                                    </sdkMui.TableHead>
                                                                                                    <sdkMui.TableBody >
                                                                                                        {showDiscountTableData?.map((row: any) => (
                                                                                                            <sdkMui.TableRow key={null} >
                                                                                                                <sdkMui.TableCell sx={{ textAlign: 'center' }}> {row?.RangeMin} </sdkMui.TableCell>
                                                                                                                <sdkMui.TableCell sx={{ textAlign: 'center' }}> {row?.RangeMax} </sdkMui.TableCell>
                                                                                                                <sdkMui.TableCell sx={{ textAlign: 'center' }}> {row?.DiscountPeriod} </sdkMui.TableCell>
                                                                                                                <sdkMui.TableCell sx={{ textAlign: 'center' }}> {row?.DiscountType} </sdkMui.TableCell>
                                                                                                                <sdkMui.TableCell sx={{ textAlign: 'center' }}> {row?.CurrencyCode} </sdkMui.TableCell>
                                                                                                                {row?.DiscountType === "Rate" ?
                                                                                                                    <sdkMui.TableCell sx={{ textAlign: 'center' }}> {row?.CurrencySymbol + ' ' + row?.DiscountRate} </sdkMui.TableCell>
                                                                                                                    : <sdkMui.TableCell sx={{ textAlign: 'center' }}> {row?.DiscountPercent + '%'} </sdkMui.TableCell>
                                                                                                                }
                                                                                                            </sdkMui.TableRow>
                                                                                                        ))}
                                                                                                    </sdkMui.TableBody>
                                                                                                </sdkMui.Table>
                                                                                            </sdkMui.TableContainer>
                                                                                        </sdkMui.Grid>
                                                                                    </sdkMui.Grid>
                                                                                </> : <></>}
                                                                            </> : <></>
                                                                            }
                                                                        </sdkMui.Collapse>
                                                                    </sdkMui.TableRow>
                                                                </>
                                                            ))}
                                                        </sdkMui.TableBody>
                                                    </sdkMui.Table >
                                                </sdkMui.TableContainer>
                                            </sdkMui.Grid>
                                        </sdkMui.Grid>
                                    </> :
                                    <></>}
                                {
                                    discountPoupVisivle &&
                                    <sdkMui.Dialog
                                        open={discountPoupVisivle}
                                        keepMounted
                                    >
                                        <sdkMui.DialogContent>
                                            <sdkMui.Box sx={{ pt: 2 }}>
                                                <sdkMui.Grid container spacing={2} sx={{ pl: 2 }}>
                                                    <sdkMui.Typography fontWeight={'bold'} fontSize={'16px'}>Add Discount Info.</sdkMui.Typography>
                                                </sdkMui.Grid>
                                                <sdkMui.Divider sx={{ visibility: 'visible' }}></sdkMui.Divider>
                                                <sdkMui.Grid container spacing={2} sx={{ pl: 3, p: 2, pt: 4 }}>
                                                    <sdkMui.Grid xs={6} >
                                                        <sdkMui.TextField
                                                            id="outlined-basic"
                                                            size='small'
                                                            variant='outlined'
                                                            name={'RangeMin'}
                                                            value={priceListTableData?.RangeMin}
                                                            label="Min.Range"
                                                            sx={{ width: '98%' }}
                                                            type='text'
                                                            onChange={(e: any) => handleFormChange(e)}
                                                        />
                                                    </sdkMui.Grid>
                                                    <sdkMui.Grid xs={6} >
                                                        <sdkMui.TextField
                                                            id="outlined-basic"
                                                            size='small'
                                                            variant='outlined'
                                                            name={'RangeMax'}
                                                            value={priceListTableData?.RangeMax}
                                                            label="Max.Range"
                                                            sx={{ width: '98%' }}
                                                            type='text'
                                                            onChange={(e: any) => handleFormChange(e)}
                                                        />
                                                    </sdkMui.Grid>
                                                </sdkMui.Grid>
                                                <sdkMui.Grid container spacing={2} sx={{ pt: 4, pl: 3, p: 2 }} >
                                                    <sdkMui.Grid xs={6} >
                                                        <sdkMui.FormControl size='medium' variant='outlined'>
                                                            <sdkMui.InputLabel id="Customer-select-label" variant='outlined' >Discount Period</sdkMui.InputLabel>
                                                            <sdkMui.Select
                                                                labelId="Customer-select-label"
                                                                id="Invoice-select"
                                                                value={priceListTableData?.DiscountPeriod}
                                                                label="Discount Period"
                                                                name={'DiscountPeriod'}
                                                                onChange={(e: any) => handleFormChange(e)}
                                                                size="medium"
                                                                style={{
                                                                    width: '200px'
                                                                }}
                                                            >
                                                                {DisPeriod?.map((item: any, index: number) =>
                                                                    <sdkMui.MenuItem value={item?.DisplayName} key={index} >{item?.DisplayName} </sdkMui.MenuItem>
                                                                )}
                                                            </sdkMui.Select>
                                                        </sdkMui.FormControl>
                                                    </sdkMui.Grid>
                                                    <sdkMui.Grid xs={6} >
                                                        <sdkMui.FormControl size='medium' variant='outlined'>
                                                            <sdkMui.InputLabel id="Customer-select-label" variant='outlined' required >Currency Code</sdkMui.InputLabel>
                                                            <sdkMui.Select
                                                                labelId="Customer-select-label"
                                                                id="Invoice-select"
                                                                value={priceListTableData?.CurrencyID}
                                                                label="Currency Code"
                                                                name={'CurrencyID'}
                                                                onChange={(e: any) => handleCurrencySelectDrowpdown(e)}
                                                                size="medium"
                                                                style={{
                                                                    width: '210px'
                                                                }}
                                                            >
                                                                {data?.currencyListData?.map((item: any, index: number) =>
                                                                    <sdkMui.MenuItem value={item?.CurrencyID} key={index} >{item?.CurrencyCode} </sdkMui.MenuItem>
                                                                )}
                                                            </sdkMui.Select>
                                                        </sdkMui.FormControl>
                                                    </sdkMui.Grid>
                                                </sdkMui.Grid>
                                                <sdkMui.Grid container spacing={2} sx={{ pt: 4, pl: 3, p: 2 }} >
                                                    <sdkMui.Grid xs={6}>
                                                        <sdkMui.FormControl size='medium' variant='outlined'>
                                                            <sdkMui.InputLabel id="Customer-select-label" variant='outlined' >Discount Type</sdkMui.InputLabel>
                                                            <sdkMui.Select
                                                                labelId="Customer-select-label"
                                                                id="Invoice-select"
                                                                value={priceListTableData?.DiscountType}
                                                                label="Discount Type"
                                                                name={'DiscountType'}
                                                                onChange={(e: any) => handleFormChange(e)}
                                                                size="medium"
                                                                style={{
                                                                    width: '200px'
                                                                }}
                                                            >
                                                                {DisCountType?.map((item: any, index: number) =>
                                                                    <sdkMui.MenuItem value={item?.DisplayName} key={index} >{item?.DisplayName} </sdkMui.MenuItem>
                                                                )}
                                                            </sdkMui.Select>
                                                        </sdkMui.FormControl>
                                                    </sdkMui.Grid>
                                                    <sdkMui.Grid xs={6} >
                                                        {priceListTableData?.DiscountType === "Percent" ?
                                                            <sdkMui.TextField
                                                                id="outlined-basic"
                                                                size='medium'
                                                                variant='outlined'
                                                                name={'DiscountPercent'}
                                                                value={priceListTableData?.DiscountPercent}
                                                                label="Discount Percent"
                                                                sx={{ width: '100%', height: '20px' }}
                                                                type='text'
                                                                onChange={(e: any) => handleFormChange(e)}
                                                            /> :
                                                            <sdkMui.TextField
                                                                id="outlined-basic"
                                                                size='medium'
                                                                variant='outlined'
                                                                name={'DiscountRate'}
                                                                value={priceListTableData?.DiscountRate}
                                                                label="Discount Rate"
                                                                sx={{ width: '100%', height: '20px' }}
                                                                type='text'
                                                                onChange={(e: any) => handleFormChange(e)}
                                                            />
                                                        }
                                                    </sdkMui.Grid>
                                                </sdkMui.Grid>
                                            </sdkMui.Box>
                                        </sdkMui.DialogContent>
                                        <sdkMui.DialogActions>
                                            <Button
                                                callbacks={{
                                                    handleButtonClick: () => { handleDiscountModelClose() }
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
                                                    handleButtonClick: () => { priceListTableData?.CurrencyID === '' ? setIsEmptyRowCreationMessage(true) : handleAddDiscountRow(); setDiscountPopupVisible(false); }
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
                                {isEmpltyRowCreation &&
                                    <Snackbar
                                        configs={{
                                            isSetOpen: isEmpltyRowCreation,
                                            severity: 'error',
                                            alertDescription: 'Fill All The PriceList Item! Feilds',
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
                                                    handleButtonClick: () => { setClosePopup(false); configs?.router?.push(helper?.constructDynamicURL(`/merchants/[merchantkey]/sales/customers/${configs?.router?.query?.customerid}/pricelist`, { "merchantkey": configs?.merchantkey })) }
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
                                    </sdkMui.Dialog>}
                            </sdkMui.Grid></sdkMui.Grid>
                    </sdkMui.Card>
                </sdkMui.Grid ></sdkMui.Grid >
        </>)
}
export { AddPriceList }