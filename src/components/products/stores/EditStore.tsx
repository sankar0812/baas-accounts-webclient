/**
@CreatedBy        : Venugopal
@CreatedTime      : Nov 15 2023
@Description      : This is the component file for Edit Store
**/

import React, { useEffect, useState } from "react";
import { editStoreInterface } from "@/interfaces/components/products/stores/EditStoresInterface";
import { Helper } from "@/utils/Helper";
import { StoreFunction } from "@/functions/products/stores/StoreFunction"
import { Messages } from "@/utils/Messages";
import { Constants } from "@/utils/Constants";
import { sdkMui, Button, Chip, Snackbar } from "@baas/platform-web-sdk";
import _ from 'lodash'

const helper = new Helper();
const messages = new Messages();
const storeFunction = new StoreFunction();
const constants = new Constants()

let AuthID = JSON.parse(helper?.getCookie(constants?.AUTH_INFO_COOKIE_NAME))?.AuthID
const AuthName = JSON.parse(helper?.getCookie(constants?.AUTH_INFO_COOKIE_NAME))?.ContactPerson?.ContactPersonName


export function EditStoreComponent({ data, configs }: editStoreInterface) {

    const [priceListstoreData, setPriceListStoreData] = useState(data?.storePriceLIst)
    const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true)
    const [editableStore] = useState(data?.EditStoreInfo[0])
    const [UserInfo] = useState({
        "MerchantID": editableStore?.MerchantID,
        "TenantID": editableStore?.TenantID,
        "CreatedAuthID": AuthID,
        "CreatedBy": AuthName,
        "ModifiedAuthID": AuthID,
        "ModifiedBy": AuthName
    }
    )
    const [successEditStoreMessage, setSuccessEditStoreMessage] = useState(false)
    const [isPriceAlreadyAddedMessageOpen, setIsPriceListAlreadyAddedMessageOpen] = useState(false)
    const [successAddStorePriceList, setSuccessAddStorePriceList] = useState(false)
    const [editedStoreData, setEditedStoreData] = useState({
        "StoreID": parseInt(configs?.router?.query?.storeid),
        "StoreTypeID": editableStore?.StoreTypeID,
        "StoreName": editableStore.StoreName,
        "StoreCode": editableStore.StoreCode,
        "Description": editableStore?.Description,
        "IsEnable": editableStore.IsEnabled,
        "StartDate": editableStore.StartDate,
        "EndDate": editableStore.EndDate

    }
    )
    let pricelistID: Array<any> = []
    const [PricelistInfo, setPricelistInfo] = useState({
        "PriceListID": '',
        "StoreID": parseInt(configs?.router?.query?.storeid),
        "IsEnabled": true
    })
    const [DisplayName, setDisplayName] = useState('')

    const StoreInfoEdit = async () => {
        let editedInfo = {
            "UserInfo": UserInfo,
            "StoreInfo": {
                "StoreTypeID": editedStoreData?.StoreTypeID,
                "StoreID": parseInt(configs?.router?.query?.storeid),
                "StoreName": editedStoreData.StoreName,
                "StoreCode": editedStoreData.StoreCode,
                "Description": editedStoreData?.Description,
                "StartDate": editedStoreData?.StartDate,
                "EndDate": editedStoreData?.EndDate,
            }
        }
        let response = await storeFunction.updateStore(editedInfo)
        if (response?.status === 200) {
            setSuccessEditStoreMessage(true)
            setTimeout(() => {
                setSuccessEditStoreMessage(false)
            }, 3000)
        }
    }

    const handlePriceListOnchange = (e: any) => {
        setPricelistInfo((prevState: any) => {
            return {
                ...prevState,
                "PriceListID": data?.pricelistData?.find((item: any) => item?.DisplayName === e)?.PriceListID
            }
        })
    }

    const handleReadStorePriceList = async () => {
        let response = await storeFunction?.readPriclistStoreEdit(parseInt(configs?.router?.query?.storeid))
        response?.output?.map((pricelist: any) => (
            pricelistID?.push(pricelist?.PriceListID)
        ))

        let storePriceListData = await storeFunction?.readsPriceListByIDSSR(pricelistID)
        setPriceListStoreData(storePriceListData?.output)
    }

    const handleAddPriceListToTheStore = async () => {
        let request = {
            "UserInfo": {
                "CreatedAuthID": UserInfo?.CreatedAuthID,
                "CreatedBy": UserInfo?.CreatedBy,
                "ModifiedAuthID": UserInfo?.CreatedAuthID,
                "ModifiedBy": UserInfo?.ModifiedBy
            },
            "PricelistInfo": PricelistInfo
        }
        let response = await storeFunction?.addPriceListToTheStore(request)
        if (response?.status === 200) {
            handleReadStorePriceList()
            setSuccessAddStorePriceList(true)
            setTimeout(() => {
                setSuccessAddStorePriceList(false)
            }, 3000)
            setDisplayName('')
        }
        if (response?.status === 409) {
            setIsPriceListAlreadyAddedMessageOpen(true)
            setTimeout(() => {
                setIsPriceListAlreadyAddedMessageOpen(false)
            }, 3000)
            setDisplayName('')
        }
    }


    const pricelistHeaders = [
        {
            "ColumnName": 'DisplayName',
            "DisplayName": 'DisplayName',
            "IsVisible": true
        },
        {
            "ColumnName": 'PriceListCode',
            "DisplayName": 'PriceListCode',
            "IsVisible": true

        },
        {
            "ColumnName": 'IsActive',
            "DisplayName": 'IsActive',
            "IsVisible": true
        },
        {
            "ColumnName": 'ActiveDate',
            "DisplayName": 'ActiveDate',
            "IsVisible": true
        },
        {
            "ColumnName": 'StartDate',
            "DisplayName": 'StartDate',
            "IsVisible": true
        },
        {
            "ColumnName": 'EndDate',
            "DisplayName": 'EndDate',
            "IsVisible": true
        },
        {
            "ColumnName": 'Remarks',
            "DisplayName": 'Remarks',
            "IsVisible": true
        },

    ]

    useEffect(() => {

        let ediData = {
            "StoreID": parseInt(configs?.router?.query?.storeid),
            "StoreTypeID": editableStore?.StoreTypeID,
            "StoreName": editableStore.StoreName,
            "StoreCode": editableStore.StoreCode,
            "IsEnable": editableStore.IsEnabled,
            "StartDate": editableStore.StartDate,
            "EndDate": editableStore.EndDate
        }
        if (!_.isEqual(ediData, editedStoreData)) {
            setIsSaveButtonDisabled(false)
        }
        else {
            setIsSaveButtonDisabled(true)
        }
    }, [editedStoreData])

    return (
        <>
            <sdkMui.Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ mt: 1 }} data-testid={configs?.dataTestID}>
                <sdkMui.Card sx={{ p: 1 }}>
                    <sdkMui.CardContent>
                        <form onSubmit={(e: any) => { e?.preventDefault(); StoreInfoEdit() }}>
                            <sdkMui.Box data-testid="Store-Info">
                                <sdkMui.Grid container spacing={2}>
                                    <sdkMui.Grid item xs={10} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }} >
                                        <sdkMui.Typography variant="h4">
                                            <b> Store Info. </b>
                                        </sdkMui.Typography>
                                    </sdkMui.Grid>
                                    <sdkMui.Grid item xs={2} sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                        <Button configs={{
                                            label: 'Save',
                                            dataTestID: 'Add-Button',
                                            isButtonDisabled: isSaveButtonDisabled,
                                            size: 'medium',
                                            varient: 'contained'
                                        }}
                                            callbacks={{
                                                handleButtonClick: (e: any) => { e?.preventDefault(); StoreInfoEdit() }
                                            }} />
                                    </sdkMui.Grid>
                                    <sdkMui.Grid item xs={3}>
                                        <sdkMui.FormControl size="small" variant="outlined" fullWidth >
                                            <sdkMui.InputLabel id="demo-simple-select-label" >Store Type</sdkMui.InputLabel>
                                            <sdkMui.Select
                                                data-testid={'Store_Type_TextField'}
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                name='StoreTypeID'
                                                value={editedStoreData?.StoreTypeID}
                                                label="Store Type"
                                                onChange={(e: any) => { setEditedStoreData((prevState: any) => { return { ...prevState, "StoreTypeID": e.target.value } }) }}
                                                size="small"
                                            >
                                                {
                                                    data?.storeTypeData?.map((storeType: any, index: number) => (
                                                        <sdkMui.MenuItem
                                                            value={storeType.StoreTypeID}
                                                            defaultValue={editedStoreData?.StoreTypeID}
                                                            key={index}> {storeType?.StoreTypeName}</sdkMui.MenuItem>
                                                    ))
                                                }
                                            </sdkMui.Select>
                                        </sdkMui.FormControl>

                                    </sdkMui.Grid>
                                    <sdkMui.Grid item xs={2.5}>
                                        <sdkMui.Stack>
                                            <sdkMui.TextField
                                                id="outlined-basic"
                                                size="small"
                                                variant='outlined'
                                                name={'StoreName'}
                                                label="Store Name"
                                                onChange={(e) => { setEditedStoreData((prevState: any) => { return { ...prevState, "StoreName": e.target.value } }) }}
                                                required
                                                value={editedStoreData?.StoreName}
                                                type="text"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }} />
                                        </sdkMui.Stack>
                                    </sdkMui.Grid>
                                    <sdkMui.Grid item xs={2.5}>
                                        <sdkMui.Stack>
                                            <sdkMui.TextField
                                                id="outlined-basic"
                                                size="small"
                                                variant='outlined'
                                                name={'StoreCode'}
                                                label="Store Code"
                                                onChange={(e) => { setEditedStoreData((prevState: any) => { return { ...prevState, "StoreCode": e.target.value } }) }}
                                                required
                                                value={editedStoreData?.StoreCode}
                                                type="text"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }} />
                                        </sdkMui.Stack>
                                    </sdkMui.Grid>
                                    <sdkMui.Grid item xs={2}>
                                        <sdkMui.Stack>
                                            <sdkMui.TextField
                                                id="outlined-basic"
                                                size="small"
                                                variant='outlined'
                                                label="Start Date"
                                                name={'StartDate'}
                                                onChange={(e) => { setEditedStoreData((prevState: any) => { return { ...prevState, "StartDate": new Date(e.target.value).toISOString() } }) }}
                                                required
                                                value={editedStoreData.StartDate === null ? "" : new Date(editedStoreData.StartDate).toISOString().split('T')[0]}
                                                type="Date"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }} />
                                        </sdkMui.Stack>
                                    </sdkMui.Grid>
                                    <sdkMui.Grid item xs={2}>
                                        <sdkMui.Stack>
                                            <sdkMui.TextField
                                                id="outlined-basic"
                                                size="small"
                                                variant='outlined'
                                                label="End Date"
                                                name={'EndDate'}
                                                onChange={(e) => { setEditedStoreData((prevState: any) => { return { ...prevState, "EndDate": new Date(e.target.value).toISOString() } }) }}
                                                required
                                                value={editedStoreData.EndDate === null ? "" : new Date(editedStoreData.EndDate).toISOString().split('T')[0]}
                                                type="Date"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }} />
                                        </sdkMui.Stack>
                                    </sdkMui.Grid>
                                </sdkMui.Grid>
                                <sdkMui.Grid container spacing={2}>
                                    <sdkMui.Grid item xs={12} sx={{ mt: 3 }}>
                                        <sdkMui.Stack>
                                            <sdkMui.TextField
                                                id="outlined-basic"
                                                size="small"
                                                variant='outlined'
                                                label="Description"
                                                name={'Description'}
                                                onChange={(e) => { setEditedStoreData((prevState: any) => { return { ...prevState, "Description": e.target.value } }) }}
                                                required
                                                value={editedStoreData?.Description}
                                                type='text'
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </sdkMui.Stack>
                                    </sdkMui.Grid>
                                </sdkMui.Grid>
                            </sdkMui.Box>
                        </form>
                        {
                            successEditStoreMessage &&
                            <Snackbar
                                configs={{
                                    dataTestID: 'Success-Product-Edit',
                                    severity: 'success',
                                    alertDescription: messages?.STORE_EDIT_MESSAGE,
                                    isSetOpen: successEditStoreMessage,
                                    snackbarAutoHideDuration: 3000
                                }}
                            />
                        }
                    </sdkMui.CardContent>
                </sdkMui.Card>
                <sdkMui.Card sx={{ p: 1 }}>
                    <sdkMui.CardContent>
                        <sdkMui.Box data-testid="Store-Info">
                            <sdkMui.Grid container spacing={2} alignItems={'center'}>

                                <sdkMui.Grid item xs={12} >
                                    <sdkMui.Typography variant="h4">
                                        <b> Price List </b>
                                    </sdkMui.Typography>
                                </sdkMui.Grid>

                                <sdkMui.Grid item xs={9} textAlign={'center'} sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <sdkMui.Autocomplete
                                        id="combo-box-demo"
                                        value={DisplayName}
                                        onChange={(event, newInputValue) => {
                                            handlePriceListOnchange(newInputValue);
                                            setDisplayName(newInputValue)

                                        }}
                                        placeholder='Choose Product'
                                        options={data?.pricelistData?.map((option: any) => option?.DisplayName || "")}
                                        sx={{ width: '80%' }}
                                        renderInput={(params) => <sdkMui.TextField {...params} size='small' label="Price List" variant='outlined' />}
                                    />
                                </sdkMui.Grid>
                                <sdkMui.Grid item xs={3} textAlign={'left'}>
                                    <Button configs={{
                                        type: 'submit',
                                        label: 'Add PriceList',
                                        dataTestID: 'Add-Button',
                                        isButtonDisabled: priceListstoreData?.length > 0 ? true : false,
                                        size: 'medium',
                                        varient: 'contained'
                                    }}
                                        callbacks={{
                                            handleButtonClick: () => { handleAddPriceListToTheStore() },
                                            handleOnChange: () => { }
                                        }} />
                                </sdkMui.Grid>
                                <sdkMui.Grid item xs={12} sx={{ mt: 1 }}>
                                    {priceListstoreData?.length > 0 &&
                                        <>
                                            <sdkMui.TableContainer sx={{ maxHeight: { xs: "70vh", sm: "70vh", md: "70vh", lg: "80vh", xl: "80vh" }, minHeight: 'fit-content', borderRadius: '15px' }}>
                                                <sdkMui.Table sx={{ minWidth: 650 }} aria-label="sticky table" stickyHeader>
                                                    <sdkMui.TableHead sx={{ background: (theme) => theme.palette.primary.main, color: (theme) => theme.palette.primary.contrastText }}>
                                                        <sdkMui.TableRow sx={{ background: (theme) => theme.palette.primary.main, color: (theme) => theme.palette.primary.contrastText }}>
                                                            {
                                                                pricelistHeaders?.map((column: any, index: number) => (
                                                                    column?.IsVisible && <sdkMui.TableCell key={index} sx={{ background: (theme) => theme.palette.primary.main, color: (theme) => theme.palette.primary.contrastText }}><b> {helper?.convertToTitleCase(column?.DisplayName)}</b></sdkMui.TableCell>
                                                                ))
                                                            }
                                                        </sdkMui.TableRow>
                                                    </sdkMui.TableHead>
                                                    <sdkMui.TableBody>
                                                        {priceListstoreData?.map((SingleData: any, index: number) => (
                                                            <sdkMui.TableRow
                                                                key={index}
                                                                sx={{
                                                                    '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer', '&:hover': {
                                                                        transform: 'scale(1.0)', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)'
                                                                    }
                                                                }}
                                                            >
                                                                {pricelistHeaders?.find((data: any) => data?.ColumnName === 'DisplayName') &&
                                                                    <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }}>
                                                                        {SingleData?.DisplayName || "N/A"}
                                                                    </sdkMui.TableCell>
                                                                }
                                                                {pricelistHeaders?.find((data: any) => data?.ColumnName === 'PriceListCode') &&
                                                                    <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }}>
                                                                        {SingleData?.PriceListCode || "N/A"}
                                                                    </sdkMui.TableCell>
                                                                }
                                                                {pricelistHeaders?.find((data: any) => data?.ColumnName === 'IsActive') &&
                                                                    <sdkMui.Typography sx={{ fontWeight: 'bold', m: 0, mt: 2, ml: 1, display: "flex", alignItems: "flex-end" }}>
                                                                        <Chip
                                                                            configs={{
                                                                                label: SingleData?.IsActive === true ? "Active" : "In-Active",
                                                                                clickable: false,
                                                                                color: SingleData?.IsActive === true ? 'primary' : "error",
                                                                                size: 'small'
                                                                            }}
                                                                            callbacks={{
                                                                                handleClick: () => { },
                                                                                handleDelete: () => { }
                                                                            }} />
                                                                    </sdkMui.Typography>
                                                                }
                                                                {pricelistHeaders?.find((data: any) => data?.ColumnName === 'ActiveDate') &&
                                                                    <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }}>
                                                                        {SingleData?.ActiveDate === null ? "N/A" : helper.converttoDateFormat(new Date(SingleData?.ActiveDate).toISOString().split('T')[0], "MM/DD/YYYY")}

                                                                    </sdkMui.TableCell>
                                                                }
                                                                {pricelistHeaders?.find((data: any) => data?.ColumnName === 'StartDate') &&
                                                                    <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }}>
                                                                        {SingleData?.StartDate === null ? "N/A" : helper.converttoDateFormat(new Date(SingleData?.StartDate).toISOString().split('T')[0], "MM/DD/YYYY")}
                                                                    </sdkMui.TableCell>
                                                                }
                                                                {pricelistHeaders?.find((data: any) => data?.ColumnName === 'EndDate') &&
                                                                    <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }}>
                                                                        {SingleData?.EndDate === null ? "N/A" : helper.converttoDateFormat(new Date(SingleData?.EndDate).toISOString().split('T')[0], "MM/DD/YYYY")}

                                                                    </sdkMui.TableCell>
                                                                }
                                                                {pricelistHeaders?.find((data: any) => data?.ColumnName === 'Remarks') &&
                                                                    <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }}>
                                                                        {SingleData?.Remarks || "N/A"}
                                                                    </sdkMui.TableCell>
                                                                }
                                                            </sdkMui.TableRow>
                                                        ))}
                                                    </sdkMui.TableBody>
                                                </sdkMui.Table>
                                            </sdkMui.TableContainer>
                                        </>
                                    }
                                    {
                                        successAddStorePriceList &&
                                        <Snackbar
                                            configs={{
                                                dataTestID: 'Success-Add-PriceList',
                                                severity: 'success',
                                                alertDescription: messages?.ADD_PRICELIST_TO_STORE,
                                                isSetOpen: successAddStorePriceList,
                                                snackbarAutoHideDuration: 3000
                                            }}
                                        />
                                    }
                                    {
                                        isPriceAlreadyAddedMessageOpen &&
                                        <Snackbar
                                            configs={{
                                                dataTestID: 'Success-Add-PriceList',
                                                severity: 'error',
                                                alertDescription: messages?.PRICELIST_ALREADY_ADDED,
                                                isSetOpen: isPriceAlreadyAddedMessageOpen,
                                                snackbarAutoHideDuration: 3000
                                            }}
                                        />
                                    }
                                </sdkMui.Grid>
                            </sdkMui.Grid>
                        </sdkMui.Box>
                    </sdkMui.CardContent>
                </sdkMui.Card>
            </sdkMui.Grid >
        </>
    );
}