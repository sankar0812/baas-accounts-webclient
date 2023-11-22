/**
 * CreatedBy : Sreedhar S
 * CreatedDate : Oct 04 2023
 * Description : This file contain table component of Price List
 */
import React, { useEffect, useState } from "react";
import { Button, Snackbar, sdkMui } from "@baas/platform-web-sdk";
import { Helper } from "@/utils/Helper";
import { PriceListColumnSettings } from "@/configs/pages/sales/customers/pricelist/PriceListColumnSettings";
import { CreateandListPricelistInterface } from "@/interfaces/components/sales/customers/pricelist/CreateandListPricelistInterface";
import { Constants } from "@/utils/Constants";
import { Messages } from "@/utils/Messages";

const helper = new Helper()
const constants = new Constants();
const messages = new Messages();
const priceListColumnSettings = new PriceListColumnSettings();

const AuthID = JSON.parse(helper?.getCookie(constants?.AUTH_INFO_COOKIE_NAME))?.AuthID
const AuthName = JSON.parse(helper?.getCookie(constants?.AUTH_INFO_COOKIE_NAME))?.ContactPerson?.ContactPersonName

function ListPriceList({ data, configs }: CreateandListPricelistInterface) {
    const [PliceListData, setPriceListData] = useState<any>([])
    const [PriceItmeInfo, setPriceItmeInfo] = useState<any>([])
    const [PriceListInfo, setPriceListInfo] = useState<any>({
        "DisplayName": '',
        "PriceListID": ''
    })
    const [PriceListTableHeaders] = useState(priceListColumnSettings?.handlePriceListheaderColumn)
    const [successMessageIsOpen, setisSuccessMessageIsOpen] = useState(false)
    const [errorMessageisOpenfor422, seterrorMessageIsOpenfor422] = useState(false)
    const [errorMessageisOpenfor500, seterrorMessageIsOpenfor500] = useState(false)
    const [customerAccountID, setCustomerAccountID] = useState<any>({
        "DisplayName": '',
        "CustomerAccountID": ""
    })
    const [UserInfo, setUserInfo] = useState({
        "MerchantID": '',
        "TenantID": '',
        "CreatedAuthID": AuthID,
        "CreatedBy": AuthName,
        "ModifiedAuthID": AuthID,
        "ModifiedBy": AuthName
    })

    const handleCreate = async () => {
        let request = { UserInfo, PriceItmeInfo }
        let response = await configs?.pricelistFuncObj?.createPriceListwithCustomerAccountID(request)
        if (response?.status === 200) {
            setisSuccessMessageIsOpen(true)
            setTimeout(() => {
                setisSuccessMessageIsOpen(false);
                setCustomerAccountID({})
                setPriceListInfo([])
                setPriceItmeInfo('')
            }, 3000)
        } else if (response?.status === 500) {
            seterrorMessageIsOpenfor500(true)
            setTimeout(() => {
                seterrorMessageIsOpenfor500(false);
                setCustomerAccountID({})
                setPriceListInfo([])
                setPriceItmeInfo('')
            }, 3000)
        } else if (response?.status === 422) {
            seterrorMessageIsOpenfor422(true)
            setTimeout(() => {
                seterrorMessageIsOpenfor422(false);
                setCustomerAccountID({})
                setPriceListInfo([])
                setPriceItmeInfo('')
            }, 3000)
        }
        else {
            seterrorMessageIsOpenfor500(true)
            setTimeout(() => {
                seterrorMessageIsOpenfor500(false);
                setCustomerAccountID({})
                setPriceListInfo([])
                setPriceItmeInfo('')
            }, 3000)
        }
    }

    const handleReadPriceList = async () => {
        let PriceList = await configs?.functionObj?.readPriceListsWithCustomerAccountID(customerAccountID?.CustomerAccountID)
        if (PriceList?.status === 200) {
            setPriceListData(PriceList?.output)
        }
        else {
            setPriceListData([])
        }
    }

    useEffect(() => {
        handleReadPriceList()
    }, [customerAccountID?.CustomerAccountID])

    return (
        <>
            <sdkMui.Grid container spacing={2} data-testid='Price-list' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                <sdkMui.Card>
                    <sdkMui.Grid container spacing={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pt: 4, pl: 2 }} >
                        <sdkMui.Grid xs={3} sx={{ pl: 2 }}>
                            <sdkMui.Autocomplete
                                id="combo-box-demo"
                                defaultValue={null}
                                value={customerAccountID?.DisplayName}
                                placeholder='Select Account'
                                fullWidth
                                onChange={(event, newInputValue) => {
                                    if (newInputValue === null) {
                                        setCustomerAccountID(() => {
                                            return {
                                                "DisplayName": '',
                                                "CustomerAccountID": ""
                                            }
                                        })
                                    }
                                    else {
                                        setCustomerAccountID((prevState: any) => {
                                            return {
                                                ...prevState,
                                                "DisplayName": data?.CustomerAccounts?.find((data: any) => data?.DisplayName === newInputValue)?.DisplayName,
                                                "CustomerAccountID": data?.CustomerAccounts?.find((data: any) => data?.DisplayName === newInputValue)?.CustomerAccountID
                                            }
                                        })
                                    }
                                }}
                                options={data?.CustomerAccounts?.map((option) => option?.DisplayName || "")}
                                sx={{ pl: 2 }}
                                renderInput={(params) => <sdkMui.TextField {...params} label="Select Account" variant="standard" />}
                            />
                        </sdkMui.Grid>
                        <sdkMui.Grid xs={7} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <sdkMui.Autocomplete
                                id="combo-box-demo"
                                defaultValue={null}
                                value={PriceListInfo?.DisplayName}
                                placeholder='Select CustomerAccount'
                                onChange={(event, newInputValue) => {
                                    setPriceListInfo((prevState: any) => {
                                        return {
                                            ...prevState,
                                            "DisplayName": data?.PriceListData?.find((data: any) => data?.DisplayName === newInputValue)?.DisplayName,
                                            "PriceListID": data?.PriceListData?.find((data: any) => data?.DisplayName === newInputValue)?.PriceListID,
                                        }
                                    })
                                    setUserInfo((prevState: any) => {
                                        return {
                                            ...prevState,
                                            "MerchantID": data?.PriceListData?.find((data: any) => data?.DisplayName === newInputValue)?.MerchantID,
                                            "TenantID": data?.PriceListData?.find((data: any) => data?.DisplayName === newInputValue)?.TenantID,
                                        }
                                    })
                                    setPriceItmeInfo((prevState: any) => {
                                        return {
                                            ...prevState,
                                            "PriceListID": data?.PriceListData?.find((data: any) => data?.DisplayName === newInputValue)?.PriceListID,
                                            "CustomerAccountID": customerAccountID?.CustomerAccountID
                                        }
                                    })
                                }}
                                options={data?.PriceListData?.map((option) => option?.DisplayName || "")}
                                sx={{ width: '90%', pl: 2 }}
                                renderInput={(params) => <sdkMui.TextField {...params} label="Select PriceList" variant="standard" />}
                            />
                        </sdkMui.Grid>
                        <sdkMui.Grid xs={2} >
                            <Button
                                configs={{
                                    label: 'Add Price List',
                                    color: 'primary',
                                    isButtonDisabled: false,
                                    isButtonloading: false,
                                    size: 'small',
                                    varient: 'contained',
                                    startIcon: <></>,
                                    dataTestID: 'Add_PriceList_Button',
                                    type: 'button'
                                }}
                                callbacks={{
                                    handleButtonClick: () => { handleCreate() },
                                    handleOnChange: () => { }
                                }} />
                        </sdkMui.Grid>
                    </sdkMui.Grid>
                    <sdkMui.Grid container spacing={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pt: 3 }}>
                        <sdkMui.Grid xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2, pl: 2, pb: 2 }}>
                            <sdkMui.TableContainer sx={{ p: 1, pl: 2, textAlign: 'center' }}>
                                <sdkMui.Table sx={{ color: 'black' }}>
                                    <sdkMui.TableHead>
                                        <sdkMui.TableRow>
                                            {PriceListTableHeaders?.map((headers: any) => <sdkMui.TableCell key={null} sx={{ fontSize: '14px', textAlign: 'center', background: (theme) => theme.palette.primary.main, color: (theme) => theme.palette.primary.contrastText }}>{headers?.DisplayName}
                                            </sdkMui.TableCell>)}
                                        </sdkMui.TableRow>
                                    </sdkMui.TableHead>
                                    <sdkMui.TableBody>
                                        {PliceListData?.length > 0 ? <>
                                            {PliceListData?.map((row: any) => (
                                                <>
                                                    <sdkMui.TableRow key={null} sx={{ '& > *': { borderRight: 'none', borderLeft: 'none' } }} >
                                                        <sdkMui.TableCell sx={{ textAlign: 'center', fontSize: '14PX' }}><sdkMui.Typography variant='h5'>{row?.PriceList?.DisplayName || "N/A"}</sdkMui.Typography> </sdkMui.TableCell>
                                                        <sdkMui.TableCell sx={{ textAlign: 'center', fontSize: '14PX' }}><sdkMui.Typography variant='h5'>{row?.PriceList?.PriceListCode || "N/A"}</sdkMui.Typography> </sdkMui.TableCell>
                                                        <sdkMui.TableCell sx={{ textAlign: 'center', fontSize: '14PX' }}><sdkMui.Typography variant='h5'>{row?.PriceList?.StartDate ? helper?.converttoDateFormat(row?.PriceList?.StartDate, "MM/DD/YYYY") : "N/A"}</sdkMui.Typography> </sdkMui.TableCell>
                                                        <sdkMui.TableCell sx={{ textAlign: 'center', fontSize: '14PX' }}><sdkMui.Typography variant='h5'>{row?.PriceList?.PriceListStatus?.PriceListStatus || "N/A"}</sdkMui.Typography> </sdkMui.TableCell>
                                                        <sdkMui.TableCell sx={{ textAlign: 'center', fontSize: '14PX' }}><sdkMui.Typography variant='h5'>{row?.PriceList?.Remarks || "N/A"}</sdkMui.Typography> </sdkMui.TableCell>
                                                        <sdkMui.TableCell sx={{ textAlign: 'center', fontSize: '14PX' }}><sdkMui.Typography variant='h5'>{row?.PriceList?.CreatedBy || "N/A"}</sdkMui.Typography> </sdkMui.TableCell>
                                                        <sdkMui.TableCell sx={{ textAlign: 'center', fontSize: '14PX' }}><sdkMui.Typography variant='h5'>{row?.PriceList?.CreatedDate ? helper?.converttoDateFormat(row?.PriceList?.CreatedDate, "MM/DD/YYYY") : "N/A"}</sdkMui.Typography> </sdkMui.TableCell>
                                                    </sdkMui.TableRow>
                                                </>
                                            ))}
                                        </> : <>
                                            <>
                                                <sdkMui.TableRow >
                                                    <sdkMui.TableCell colSpan={7} sx={{ textAlign: 'center' }}>
                                                        <sdkMui.Typography >No Data Found</sdkMui.Typography>
                                                    </sdkMui.TableCell>
                                                </sdkMui.TableRow>
                                            </>
                                        </>}
                                        {successMessageIsOpen &&
                                            <Snackbar
                                                configs={{
                                                    isSetOpen: successMessageIsOpen,
                                                    severity: 'success',
                                                    alertDescription: messages?.ADD_PRICE_LIST_TO_THE_CUSTOMER_MESSAGES?.SUCCESS_MESSAGE,
                                                    dataTestID: 'Success_message',
                                                    snackbarAutoHideDuration: 3000
                                                }}
                                                callbacks={{
                                                    onClose: () => { }
                                                }}
                                            />
                                        }
                                        {errorMessageisOpenfor422 &&
                                            <Snackbar
                                                configs={{
                                                    isSetOpen: errorMessageisOpenfor422,
                                                    severity: 'error',
                                                    alertDescription: messages?.ADD_PRICE_LIST_TO_THE_CUSTOMER_MESSAGES?.PRICELIST_ERROR_MESSAGE_FOR_422,
                                                    dataTestID: 'Error_message_for_422',
                                                    snackbarAutoHideDuration: 3000
                                                }}
                                                callbacks={{
                                                    onClose: () => { }
                                                }}
                                            />
                                        }
                                        {errorMessageisOpenfor500 &&
                                            <Snackbar
                                                configs={{
                                                    isSetOpen: errorMessageisOpenfor500,
                                                    severity: 'error',
                                                    alertDescription: messages?.ADD_PRICE_LIST_TO_THE_CUSTOMER_MESSAGES?.PRICELIST_ERROR_MESSAGE_FOR_500,
                                                    dataTestID: 'Error_message_for_500',
                                                    snackbarAutoHideDuration: 3000
                                                }}
                                                callbacks={{
                                                    onClose: () => { }
                                                }}
                                            />
                                        }
                                    </sdkMui.TableBody>
                                </sdkMui.Table>
                            </sdkMui.TableContainer>
                        </sdkMui.Grid>
                    </sdkMui.Grid>
                </sdkMui.Card>
            </sdkMui.Grid>
        </>
    )
}

export { ListPriceList }