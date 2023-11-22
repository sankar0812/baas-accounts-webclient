/**
 * CreatedBy     : Sreedhar A
 * CreatedDate   : Nov 14 2023
 * ModifiedBy    : Uma Kohila
 * Modified Date : NOV 18 2023
 * Description   : This file contain EditPriceList component of Price List
 */
import { editProductPricelistInterface } from "@/interfaces/components/products/pricelists/editProductPricelist";
import React, { useState } from "react";
import { Button, Snackbar, sdkMui } from "@baas/platform-web-sdk";
import MenuItem from '@mui/material/MenuItem';
import { Helper } from "@/utils/Helper";
import { Constants } from "@/utils/Constants";
import { ProductPriceListFunction } from "@/functions/products/pricelists/ListPriceListFunction";
import _ from 'lodash'
import { Messages } from "@/utils/Messages";

const helper = new Helper();
const constants = new Constants();
const messages = new Messages()
const productPriceListFunction = new ProductPriceListFunction()
const AuthID = JSON.parse(helper?.getCookie(constants?.AUTH_INFO_COOKIE_NAME))?.AuthID
const TenantID = JSON.parse(helper?.getCookie(constants?.TENANT_INFO_COOKIE_NAME))?.TenantID
const MerchantID = JSON.parse(helper?.getCookie(constants?.MERCHANT_INFO_COOKIE_NAME))?.MerchantID
const AuthName = JSON.parse(helper?.getCookie(constants?.AUTH_INFO_COOKIE_NAME))?.ContactPerson?.ContactPersonName

function EditPriceList({ configs, data }: editProductPricelistInterface) {
    const [open, setOpen] = useState(false)
    const [discountTableData, setDiscountTableData] = useState(false)
    const [closePopup, setClosePopup] = useState(false)
    const [pricelistMessage, setPriceListMessage] = useState(false)
    const [selectedProducts, setSelectedProducts] = useState<any>([]);
    const [duplicateProductMessage, setDuplicateProductMessage] = useState(false);
    const [emptRowCreationMessage, setEmptyRowCreationMessage] = useState(false)
    const [IsServerErrorMessageOpen, setIsServerErrorMessageOpen] = useState(false);
    const [statusChangePriceList, setStatusChangePriceList] = useState(false)
    const [recordPaymentSuccessMessageIsOpen, setRecordPaymentSuccessMessageIsOpen] = useState(false)
    const [recordPaymentDeleteMessageIsOpen, setRecordPaymentDeletesMessageIsOpen] = useState(false)
    const [editablePricelist] = useState(data?.priceListData)
    const [priceListItems, setPriceListItems] = useState(data?.priceListData?.PriceListItem)
    const [priceListItemsDiscount, setPriceListItemsDiscount] = useState<any>([])
    const [noBulkDiscountFound, setNoBulkDiscountFound] = useState(false)
    const [isPublishedErrorMessageisOpen, setIsBublishedErrorMessageIsOpen] = useState(false)
    const [pricelistData, setPriceListData] = useState({
        "PriceListID": parseInt(configs?.router?.query?.pricelistid),
        "DisplayName": editablePricelist?.DisplayName,
        "PriceListCode": editablePricelist?.PriceListCode,
        "PriceListStatusID": editablePricelist?.PriceListStatusID,
        "StartDate": new Date(editablePricelist.StartDate).toISOString().split('T')[0],
        "EndDate": editablePricelist?.EndDate === null ? "" : new Date(editablePricelist.EndDate).toISOString().split('T')[0],
        "ProductID": editablePricelist?.ProductID,
        "Rate": editablePricelist?.Rate,
        "Remarks": editablePricelist?.Remarks,
    })

    const pricelists = async () => {
        let response = await productPriceListFunction?.readPriceListIteams(parseInt(configs?.router?.query?.pricelistid))
        setPriceListItems(response.output)
    }
    const productMenus = [
        {
            ColumnName: "ProductName",
            DisplayName: "Product Name",
            IsVisible: true,
            Align: "left",
        },
        {
            ColumnName: "ProductCode",
            DisplayName: "Product Code",
            IsVisible: true,
            Align: "left",
        },
        {
            ColumnName: "Rate",
            DisplayName: "Rate",
            IsVisible: true,
            Align: "left",
        },
        {
            ColumnName: "",
            DisplayName: "",
            IsVisible: true,
            Align: "right",
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
            ColumnName: "DiscountRate",
            DisplayName: "Discount Rate",
            IsVisible: true,
        },
        {
            ColumnName: "Edit",
            DisplayName: "Edit",
            IsVisible: true,
        }, {
            ColumnName: "Delete",
            DisplayName: "Delete",
            IsVisible: true,
        },
    ]
    const [priceListTableData, setPriceListTableData] = useState({
        "ProductID": '',
        "ProductName": '',
        "BaseSaleRate": '',
        "ProductCode": ''
    })
    const handleShowDiscountData = async (ProductID: any) => {
        let response = await configs?.bulkDiscountFuncObj?.readProductBulkDiscounts(ProductID);
        if (response?.status === 200) {
            setPriceListItemsDiscount(response?.output);
            setDiscountTableData(true);
        }
        else {
            setNoBulkDiscountFound(true);
            setTimeout(() => {
                setPriceListItemsDiscount([]);
                setNoBulkDiscountFound(false);
                setDiscountTableData(false);
            }, 3000)
        }
    }
    const handleRowDelete = async (priceListItem: any) => {
        let request = {
            "PriceListID": parseInt(configs.router.query.pricelistid),
            "PriceListItemID": parseInt(priceListItem?.PriceListItemID),
            "ProductID": parseInt(priceListItem?.Product?.ProductID),
            "ModifiedAuthID": AuthID,
            "ModifiedBy": AuthName,
            "DeletedAuthID": AuthID,
            "DeletedBy": AuthName
        }
        let response = await configs?.functionObj?.removeProductPriceList(request)
        if (response?.status === 200) {
            pricelists()
            setRecordPaymentDeletesMessageIsOpen(true)
            setTimeout(() => {
                setRecordPaymentDeletesMessageIsOpen(false)
            }, 3000);
        }
    }
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
    const handleAddRow = async () => {
        setPriceListTableData({
            "ProductID": '',
            "ProductName": '',
            "BaseSaleRate": '',
            "ProductCode": ''
        })
        let UserInfo = {
            "MerchantID": MerchantID,
            "TenantID": TenantID,
            "CreatedAuthID": AuthID,
            "CreatedBy": AuthName
        }
        let PriceListItemInfo = {
            "ProductID": parseInt(priceListTableData?.ProductID),
            "PriceListID": parseInt(configs?.router?.query?.pricelistid),
            "Rate": parseFloat(priceListTableData?.BaseSaleRate)
        };
        let request = { UserInfo, PriceListItemInfo }
        let response = await configs?.functionObj?.AddProductPriceList(request)
        if (response?.status === 200) {
            setRecordPaymentSuccessMessageIsOpen(true)
            pricelists()
            setTimeout(() => {
                setRecordPaymentSuccessMessageIsOpen(false)
            }, 3000);
        }
        else if (response?.status === 409) {
            setDuplicateProductMessage(true)
            setTimeout(() => {
                setDuplicateProductMessage(false)
            }, 3000)
        }
    }
    const handleEditPricelist = async () => {
        let request = {
            "PriceListID": parseInt(configs?.router?.query?.pricelistid),
            "DisplayName": pricelistData?.DisplayName,
            "PriceListCode": pricelistData?.PriceListCode,
            "StartDate": new Date(pricelistData.StartDate).toISOString(),
            "EndDate": pricelistData?.EndDate === null ? "" : new Date(pricelistData.EndDate).toISOString(),
            "Remarks": pricelistData?.Remarks,
        }
        let response = await configs?.functionObj?.EditChangePriceList(request)
        if (response?.status === 200) {
            setPriceListMessage(true)
            pricelists()
            setTimeout(() => {
                setPriceListMessage(false)
                configs?.router?.push(helper?.constructDynamicURL("/merchants/[merchantkey]/products/pricelists", { merchantkey: configs?.router?.query?.merchantkey }))
            }, 3000)
        }
        else if (response?.status === 500) {
            setIsServerErrorMessageOpen(true)
            setTimeout(() => {
                setIsServerErrorMessageOpen(false)
            }, 3000)
        }
    }
    const handleStatusChange = async (e: any) => {
        let PriceListStatusID
        let PriceListStatus = await configs?.functionObj?.readPriceListStatusCode(constants?.PRICELIST_STATUS_CODES?.PRICELIST_PUBLISH_STATUS_CODE)
        if (PriceListStatus?.status === 200) {
            PriceListStatusID = PriceListStatus?.output[0]?.PriceListStatusID;
        }
        if (PriceListStatusID === e.target.value && priceListItems !== null) {

            setPriceListData((prevData: any) => { return { ...prevData, PriceListStatusID: e.target.value } })
            let request = {
                "PriceListID": parseInt(configs?.router?.query?.pricelistid),
                "PriceListStatusID": parseInt(e.target.value),
                "ModifiedAuthID": AuthID,
                "ModifiedBy": AuthName
            }
            let response = await configs?.functionObj?.statusChangePriceList(request)
            if (response?.status === 200) {
                setStatusChangePriceList(true)
                pricelists()
                setTimeout(() => {
                    setStatusChangePriceList(false)
                    configs?.router?.push(helper?.constructDynamicURL("/merchants/[merchantkey]/products/pricelists", { merchantkey: configs?.router?.query?.merchantkey }))
                }, 3000)
            }
            else if (response?.status === 500) {
                setIsServerErrorMessageOpen(true)
                setTimeout(() => {
                    setIsServerErrorMessageOpen(false)
                }, 3000)
            }
        }
        else {
            setIsBublishedErrorMessageIsOpen(true)
            setTimeout(() => {
                setIsBublishedErrorMessageIsOpen(false)
            }, 3000)
        }
    }
    const handleClose = async () => {
        const CreateData = {
            "PriceListID": parseInt(configs?.router?.query?.pricelistid),
            "DisplayName": editablePricelist?.DisplayName,
            "PriceListCode": editablePricelist?.PriceListCode,
            "PriceListStatusID": editablePricelist?.PriceListStatusID,
            "StartDate": new Date(editablePricelist.StartDate).toISOString().split('T')[0],
            "EndDate": editablePricelist?.EndDate === null ? "" : new Date(editablePricelist.EndDate).toISOString().split('T')[0],
            "ProductID": editablePricelist?.ProductID,
            "Rate": editablePricelist?.Rate,
            "Remarks": editablePricelist?.Remarks,
        }
        let productdata = {}
        if (_.isEqual(CreateData, pricelistData)) {
            configs?.router?.push(`/merchants/${configs?.router?.query?.merchantkey}/products/pricelists`)
        } else if (_.isEqual(productdata, priceListItems)) {
            configs?.router?.push(`/merchants/${configs?.router?.query?.merchantkey}/products/pricelists`)
        }
        else {
            setClosePopup(true)
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
                                        Edit PriceList
                                    </sdkMui.Typography>
                                </sdkMui.Stack>
                            </sdkMui.Grid>
                            <sdkMui.Grid item xs={2} sx={{ pl: '5%', pb: 1, pt: 1 }}>
                                <sdkMui.Stack direction={"row"} spacing={2}>
                                    {pricelistData?.PriceListStatusID === 1 && <Button
                                        configs={{
                                            label: "Save",
                                            dataTestID: 'Add-PriceList-Save-Button',
                                            varient: 'contained',
                                            size: 'small'
                                        }}
                                        callbacks={{
                                            handleButtonClick: () => { handleEditPricelist() },
                                            handleOnChange: () => { }
                                        }}
                                    />
                                    }
                                    <span className='material-symbols-outlined' style={{ cursor: 'pointer', textAlign: 'center', fontSize: '24px', marginTop: '14px' }} onClick={() => { { handleClose() } }} > cancel</span>
                                </sdkMui.Stack>
                            </sdkMui.Grid>
                        </sdkMui.Grid>
                        <sdkMui.Grid container >
                            <sdkMui.Grid container sx={{ p: 2, pt: 3 }}>
                                <sdkMui.Grid item xs={3}>
                                    <sdkMui.TextField
                                        id="outlined-basic"
                                        size='small'
                                        variant='outlined'
                                        name={'DisplayName'}
                                        value={pricelistData?.DisplayName}
                                        label="Display Name"
                                        sx={{ width: '80%' }}
                                        type='text'
                                        onChange={(e: any) => setPriceListData({ ...pricelistData, DisplayName: e.target.value })}
                                        required
                                    />
                                </sdkMui.Grid>
                                <sdkMui.Grid item xs={3}>
                                    <sdkMui.TextField
                                        id="outlined-basic"
                                        size='small'
                                        variant='outlined'
                                        name={'PriceListCode'}
                                        value={pricelistData?.PriceListCode}
                                        label="Price List Code"
                                        sx={{ width: '80%' }}
                                        type='text'
                                        onChange={(e: any) => setPriceListData({ ...pricelistData, PriceListCode: e.target.value })}
                                        required
                                    />
                                </sdkMui.Grid>
                                <sdkMui.Grid item xs={3}>
                                    <sdkMui.TextField
                                        id="outlined-basic"
                                        size='small'
                                        variant='outlined'
                                        name={'StartDate'}
                                        value={new Date(pricelistData.StartDate).toISOString().split('T')[0]}
                                        sx={{ width: '80%' }}
                                        type='date'
                                        label="Start Date"
                                        onChange={(e: any) => setPriceListData({ ...pricelistData, StartDate: e.target.value })}
                                        required
                                    />
                                </sdkMui.Grid>
                                <sdkMui.Grid item xs={3}>
                                    <sdkMui.TextField
                                        id="outlined-basic"
                                        size='small'
                                        variant='outlined'
                                        name={'EndDate'}
                                        value={pricelistData?.EndDate === "" ? "" : new Date(pricelistData.EndDate).toISOString().split('T')[0]}
                                        sx={{ width: '80%' }}
                                        type='date'
                                        label="End Date"
                                        onChange={(e: any) => setPriceListData({ ...pricelistData, EndDate: e.target.value })}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </sdkMui.Grid>
                            </sdkMui.Grid>
                            <sdkMui.Grid container spacing={2} sx={{ p: 2, }}>
                                <sdkMui.Grid item xs={3}>
                                    <sdkMui.TextField
                                        size="small"
                                        variant="outlined"
                                        name='PriceListStatus'
                                        label="PriceListStatus"
                                        placeholder='Enter PriceListStatus...'
                                        required
                                        select
                                        value={pricelistData?.PriceListStatusID}
                                        sx={{ width: '85%' }}
                                        onChange={(e: any) => { handleStatusChange(e) }}                            >
                                        {data?.priceListStatus?.map((data: any) => (
                                            <MenuItem key={data.PriceListStatusID} value={data.PriceListStatusID}>
                                                {`${data.PriceListStatus}`}
                                            </MenuItem>
                                        ))}
                                    </sdkMui.TextField>
                                </sdkMui.Grid>
                                <sdkMui.Grid item xs={9}>
                                    <sdkMui.TextField
                                        id="outlined-basic"
                                        size='small'
                                        variant='outlined'
                                        name={'Remarks'}
                                        value={pricelistData?.Remarks}
                                        label="Description"
                                        sx={{ width: '95%' }}
                                        type='text'
                                        onChange={(e: any) => setPriceListData({ ...pricelistData, Remarks: e.target.value })}
                                    />
                                </sdkMui.Grid>
                            </sdkMui.Grid>
                        </sdkMui.Grid>
                        <sdkMui.Grid container >
                            <sdkMui.Grid item xs={12} sx={{ p: 1 }}>
                                <sdkMui.Grid container spacing={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <sdkMui.Grid item xs={8}>
                                        <sdkMui.TableContainer sx={{ p: 1, pl: 2, textAlign: 'center' }}>
                                            <sdkMui.Table sx={{ color: 'black' }} size="small">
                                                <sdkMui.TableBody>
                                                </sdkMui.TableBody>
                                            </sdkMui.Table>
                                        </sdkMui.TableContainer>
                                    </sdkMui.Grid>
                                </sdkMui.Grid>
                                <sdkMui.Grid container spacing={1} >
                                    <sdkMui.Grid item xs={12}>
                                    </sdkMui.Grid>
                                </sdkMui.Grid>
                                <sdkMui.Grid container spacing={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <sdkMui.Grid item xs={8}>
                                        <sdkMui.TableContainer sx={{ p: 1, pl: 2, textAlign: 'center' }}>
                                            <sdkMui.Table sx={{ color: 'black' }} size="small">
                                                <sdkMui.TableHead>
                                                    <sdkMui.TableRow>
                                                        {productMenu?.map((headers: any) => <sdkMui.TableCell key={null} sx={{ fontSize: '14px', textAlign: 'left', background: (theme) => theme.palette.primary.main, color: (theme) => theme.palette.primary.contrastText }}>{headers?.DisplayName}
                                                        </sdkMui.TableCell>)}
                                                    </sdkMui.TableRow>
                                                </sdkMui.TableHead>
                                                <sdkMui.TableBody>
                                                    <sdkMui.TableRow>
                                                        <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary, justifyContent: 'left', alignItems: 'center' }} >
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
                                                                            "BaseSaleRate": parseInt(data?.productListData?.find((data: any) => data?.ProductName === newInputValue)?.BaseSaleRate),
                                                                            "ProductCode": data?.productListData?.find((data: any) => data?.ProductName === newInputValue)?.ProductCode,
                                                                            "UoM": data?.productListData?.find((data: any) => data?.ProductName === newInputValue)?.UoM
                                                                        }
                                                                    });
                                                                    setSelectedProducts([...selectedProducts, newInputValue]);
                                                                }}
                                                                options={data?.productListData?.map((option: any) => option?.ProductName)}
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
                                                                value={priceListTableData?.BaseSaleRate}
                                                                label="Rate"
                                                                sx={{ width: '100%', }}
                                                                type='number'
                                                                defaultValue={priceListTableData?.BaseSaleRate}
                                                                onChange={(e: any) => handleFormChange(e)}
                                                            />
                                                        </sdkMui.TableCell>
                                                        {pricelistData?.PriceListStatusID === 1 && <span className='material-symbols-outlined' style={{ cursor: 'pointer', textAlign: 'center', fontSize: '24px', marginTop: '14px' }} onClick={() => { { priceListTableData?.ProductID === '' ? setEmptyRowCreationMessage(true) : handleAddRow() } }} > add_circle</span>}
                                                    </sdkMui.TableRow>
                                                </sdkMui.TableBody>
                                            </sdkMui.Table>
                                        </sdkMui.TableContainer>
                                    </sdkMui.Grid>
                                </sdkMui.Grid>



                                {priceListItems?.length > 0 ?
                                    <>
                                        <sdkMui.Divider sx={{ visibility: 'visible' }}></sdkMui.Divider>
                                        <sdkMui.Grid container spacing={1} >
                                            <sdkMui.Grid item xs={12}>
                                                <sdkMui.TableContainer sx={{ p: 1, pl: 2, textAlign: 'center' }}>
                                                    <sdkMui.Table sx={{ color: 'black' }} size="small">
                                                        <sdkMui.TableHead>
                                                            <sdkMui.TableRow>
                                                                {productMenus?.map((headers: any) => <sdkMui.TableCell key={null} sx={{ fontSize: '14px', textAlign: headers.Align, background: (theme) => theme.palette.primary.main, color: (theme) => theme.palette.primary.contrastText }}>{headers?.DisplayName}
                                                                </sdkMui.TableCell>)}
                                                            </sdkMui.TableRow>
                                                        </sdkMui.TableHead>
                                                        <sdkMui.TableBody>
                                                            {priceListItems?.map((row: any) => (
                                                                <>
                                                                    <sdkMui.TableRow key={null} sx={{ '& > *': { borderRight: 'none', borderLeft: 'none' } }} >
                                                                        <sdkMui.TableCell sx={{ textAlign: 'left' }}><sdkMui.Typography variant='h5'>{row?.Product?.ProductName}</sdkMui.Typography> </sdkMui.TableCell>
                                                                        <sdkMui.TableCell sx={{ textAlign: 'left' }}><sdkMui.Typography variant='h5'>{row?.Product?.ProductCode}</sdkMui.Typography> </sdkMui.TableCell>
                                                                        <sdkMui.TableCell sx={{ textAlign: "left" }}> {row?.Product?.BaseSaleRate} </sdkMui.TableCell>
                                                                        <sdkMui.TableCell sx={{ textAlign: 'right', width: '9%' }} >
                                                                            {pricelistData?.PriceListStatusID === 1 && <span className='material-symbols-outlined' style={{ cursor: 'pointer', textAlign: 'center', fontSize: '20px' }} onClick={() => { { handleRowDelete(row) } }} >delete</span>}
                                                                            &nbsp;
                                                                            <sdkMui.IconButton
                                                                                aria-label="expand row"
                                                                                size="small"
                                                                                onClick={() => setOpen(!open)}
                                                                            >
                                                                                {open ?
                                                                                    <span className="material-symbols-outlined" style={{ display: "flex", alignItems: "center", justifyContent: "center", cursor: 'pointer', fontSize: '30px', paddingBottom: "15px" }} onClick={() => { setDiscountTableData(false) }}> keyboard_arrow_down</span>
                                                                                    : <span className="material-symbols-outlined" style={{ display: "flex", alignItems: "center", justifyContent: "center", cursor: 'pointer', fontSize: '30px', paddingBottom: "15px" }} onClick={() => { handleShowDiscountData(row?.Product?.ProductID); }}> expand_less </span>
                                                                                }
                                                                            </sdkMui.IconButton>
                                                                        </sdkMui.TableCell>
                                                                    </sdkMui.TableRow>
                                                                    <sdkMui.TableRow key={null} sx={{ paddingBottom: 0, paddingTop: 0 }} >
                                                                        <sdkMui.Collapse in={open} timeout="auto" unmountOnExit>
                                                                            {discountTableData && priceListItems?.length > 0 ? <>
                                                                                {row?.Product?.ProductID === priceListItemsDiscount[0]?.ProductID ? <>
                                                                                    {priceListItemsDiscount !== null ?
                                                                                        <>
                                                                                            <sdkMui.Grid container spacing={1} sx={{ alignItems: "center" }}>
                                                                                                <sdkMui.Grid item xs={12} >
                                                                                                    <sdkMui.TableContainer sx={{ p: 1, pl: 2, }}>
                                                                                                        <sdkMui.Table sx={{ color: 'black' }}>
                                                                                                            <sdkMui.TableHead>
                                                                                                                <sdkMui.TableRow>
                                                                                                                    {menu?.map((headers: any) => <sdkMui.TableCell key={null} sx={{ fontSize: '14px', textAlign: 'center', border: 'none', background: (theme) => theme.palette.primary.main, color: (theme) => theme.palette.primary.contrastText }}>{headers?.DisplayName}
                                                                                                                    </sdkMui.TableCell>)}
                                                                                                                </sdkMui.TableRow>
                                                                                                            </sdkMui.TableHead>
                                                                                                            <sdkMui.TableBody >
                                                                                                                {priceListItemsDiscount?.map((row: any) => (
                                                                                                                    <sdkMui.TableRow key={null} >
                                                                                                                        <sdkMui.TableCell sx={{ textAlign: 'center' }}> {row?.RangeMin || 'N/A'} </sdkMui.TableCell>
                                                                                                                        <sdkMui.TableCell sx={{ textAlign: 'center' }}> {row?.RangeMax || 'N/A'} </sdkMui.TableCell>
                                                                                                                        <sdkMui.TableCell sx={{ textAlign: 'center' }}> {row?.DiscountPeriod || 'N/A'} </sdkMui.TableCell>
                                                                                                                        <sdkMui.TableCell sx={{ textAlign: 'center' }}> {row?.DiscountType || 'N/A'} </sdkMui.TableCell>
                                                                                                                        <sdkMui.TableCell sx={{ textAlign: 'center' }}>{row?.DiscountRate || 'N/A'} </sdkMui.TableCell>
                                                                                                                        <sdkMui.TableCell sx={{ textAlign: 'center' }}>
                                                                                                                            <span className="material-symbols-outlined" style={{ fontSize: '16px', cursor: 'pointer', marginTop: '4px' }}  >
                                                                                                                                edit
                                                                                                                            </span>
                                                                                                                        </sdkMui.TableCell>
                                                                                                                        <sdkMui.TableCell sx={{ textAlign: 'center' }}>
                                                                                                                            <span className="material-symbols-outlined" style={{ fontSize: '16px', cursor: 'pointer', marginTop: '4px' }} >
                                                                                                                                delete
                                                                                                                            </span>
                                                                                                                        </sdkMui.TableCell>
                                                                                                                    </sdkMui.TableRow>
                                                                                                                ))}
                                                                                                            </sdkMui.TableBody>
                                                                                                        </sdkMui.Table>
                                                                                                    </sdkMui.TableContainer>
                                                                                                </sdkMui.Grid>
                                                                                            </sdkMui.Grid>
                                                                                        </> : <> No Bulk Discount Found </>
                                                                                    }
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
                                {recordPaymentSuccessMessageIsOpen &&
                                    <Snackbar
                                        configs={{
                                            isSetOpen: recordPaymentSuccessMessageIsOpen,
                                            severity: 'success',
                                            alertDescription: 'PriceList Item Added Successfully!',
                                            dataTestID: 'Empty-Row-Creation-Error',
                                            snackbarAutoHideDuration: 3000
                                        }}
                                    />
                                }
                                {recordPaymentDeleteMessageIsOpen &&
                                    <Snackbar
                                        configs={{
                                            isSetOpen: recordPaymentDeleteMessageIsOpen,
                                            severity: 'success',
                                            alertDescription: 'PriceList Item Deleted Successfully!',
                                            dataTestID: 'Empty-Row-Creation-Error',
                                            snackbarAutoHideDuration: 3000
                                        }}
                                    />
                                }
                                {noBulkDiscountFound &&
                                    <Snackbar
                                        configs={{
                                            isSetOpen: noBulkDiscountFound,
                                            severity: 'error',
                                            alertDescription: 'No Bulk Discount Found for this Product!',
                                            dataTestID: 'Empty-Row-Creation-Error',
                                            snackbarAutoHideDuration: 3000
                                        }}
                                    />
                                }
                                {duplicateProductMessage &&
                                    <Snackbar
                                        configs={{
                                            isSetOpen: duplicateProductMessage,
                                            severity: 'error',
                                            alertDescription: 'Product already exists in the table!',
                                            dataTestID: 'Empty-Row-Creation-Error',
                                            snackbarAutoHideDuration: 3000
                                        }}
                                    />
                                }
                                {emptRowCreationMessage &&
                                    <Snackbar
                                        configs={{
                                            isSetOpen: emptRowCreationMessage,
                                            severity: 'error',
                                            alertDescription: 'Kindly Update All Rows',
                                            dataTestID: 'Empty-Row-Creation-Error',
                                            snackbarAutoHideDuration: 3000
                                        }} callbacks={{
                                            onClose: () => { setEmptyRowCreationMessage(false) }
                                        }}
                                    />
                                }
                                {pricelistMessage &&
                                    <Snackbar
                                        configs={{
                                            isSetOpen: pricelistMessage,
                                            severity: 'success',
                                            alertDescription: 'Successfully Updated the PriceList Data',
                                            dataTestID: 'Empty-Row-Creation-Error',
                                            snackbarAutoHideDuration: 3000
                                        }}
                                    />
                                }
                                {IsServerErrorMessageOpen &&
                                    <Snackbar
                                        configs={{
                                            isSetOpen: IsServerErrorMessageOpen,
                                            severity: 'error',
                                            alertDescription: 'Application Error occured, Contact the System Administrator',
                                            dataTestID: 'Empty-Row-Creation-Error',
                                            snackbarAutoHideDuration: 3000
                                        }}
                                    />
                                }
                                {isPublishedErrorMessageisOpen &&
                                    <Snackbar
                                        configs={{
                                            isSetOpen: isPublishedErrorMessageisOpen,
                                            severity: 'error',
                                            alertDescription: messages?.PRODUCT_PUBLISHED_ERROR_MESSAGE,
                                            dataTestID: 'Empty-Row-Creation-Error',
                                            snackbarAutoHideDuration: 3000
                                        }}
                                    />
                                }
                                {statusChangePriceList &&
                                    <Snackbar
                                        configs={{
                                            isSetOpen: statusChangePriceList,
                                            severity: 'success',
                                            alertDescription: 'PriceList Status Updated Successfully',
                                            dataTestID: 'Empty-Row-Creation-Error',
                                            snackbarAutoHideDuration: 3000
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
                                                    handleButtonClick: () => { setClosePopup(false); configs?.router?.push(helper?.constructDynamicURL(`/merchants/[merchantkey]/products/pricelists`, { "merchantkey": configs?.merchantkey })) }
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
                </sdkMui.Grid >
            </sdkMui.Grid >
        </>
    )
}
export { EditPriceList }