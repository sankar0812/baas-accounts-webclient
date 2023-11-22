/**
 * CreatedBy    : Uma Kohila S
 * CreatedDate  : Oct 24 2023
 * Description  : This file contain AddPriceList component of Price List
 */
import React, { useState } from "react";
import { addProductBulkDiscountInterface } from "@/interfaces/components/products/product/bulkDiscount/addBulkDiscountInterface";
import { Button, Snackbar, sdkMui } from "@baas/platform-web-sdk";
import { Helper } from "@/utils/Helper";
import { Messages } from "@/utils/Messages";
import { Constants } from "@/utils/Constants";

const helper = new Helper();
const messages = new Messages()
const constants = new Constants();

const AuthID = JSON.parse(helper?.getCookie(constants?.AUTH_INFO_COOKIE_NAME))?.AuthID
const TenantID = JSON.parse(helper?.getCookie(constants?.TENANT_INFO_COOKIE_NAME))?.TenantID
const MerchantID = JSON.parse(helper?.getCookie(constants?.MERCHANT_INFO_COOKIE_NAME))?.MerchantID
const AuthName = JSON.parse(helper?.getCookie(constants?.AUTH_INFO_COOKIE_NAME))?.ContactPerson?.ContactPersonName


function AddProductPriceList({ configs, data, callbacks }: addProductBulkDiscountInterface) {
    const [isEmpltyRowCreation, setIsEmptyRowCreationMessage] = useState(false)
    const [bulkDiscountSuccessMessageIsOpen, setBulkDiscountSuccessMessageIsOpen] = useState(false)
    const [bulkDiscountErrorMessageIsOpenfor422, setBulkDiscounrErrorMessageIsOpenfor422] = useState(false)
    const [bulkDiscountErrorMessageIsOpenfor500, setBulkDiscounrErrorMessageIsOpenfor500] = useState(false)
    const [quentatyErroeMessageIsOpen, setQuentatyErroeMessageIsOpen] = useState(false)
    const [productListData] = useState<any>(data?.ProductListData)
    const [discountType, setDiscountType] = useState<any>("")
    const [discountPeriod, setDiscountPeriod] = useState<any>("")
    const [BlukDiscountInfo, setBlukDiscountInfo] = useState<any>([])
    const [productDatas, setProductDatas] = useState<any>("")
    const [bulkDiscountDetails, setBulkDiscountDetails] = useState({
        "RangeMin": '',
        "RangeMax": '',
        "DiscountPeriod": '',
        "DiscountType": '',
        "DiscountPercent": '',
        "DiscountRate": '',
        "Description": ''
    })
    const [UserInfo, setUserInfo] = useState<any>({
        "CreatedAuthID": '',
        "CreatedBy": "''",
        "ModifiedAuthID": '',
        "ModifiedBy": '',
        "MerchantID": '',
        "TenantID": '',
        "CurrencyID": '',
        "ProductID": ''
    })

    const DisPeriod = [
        {
            DisplayName: "Monthly",
            IsVisible: true,
        },
        {
            DisplayName: "Quarterly",
            IsVisible: true,
        },
        {
            DisplayName: "Half yearly",
            IsVisible: true,
        },
        {
            DisplayName: "Yearly",
            IsVisible: true,
        }
    ]
    const DisCountType = [
        {
            DisplayName: "Rate",
            IsVisible: true,
        },
        {
            DisplayName: "Percent",
            IsVisible: true,
        }
    ]

    const TableHeaders = [
        {
            DisplayName: "Min. Qty.",
            IsVisible: true
        },
        {
            DisplayName: "Max. Qty.",
            IsVisible: true
        },
        {
            DisplayName: "Disc. Type",
            IsVisible: true
        },
        {
            DisplayName: "Disc. Rate",
            IsVisible: true
        },
        {
            DisplayName: "Disc. Percent",
            IsVisible: true
        },
        {
            DisplayName: "Disc. Period",
            IsVisible: true
        },
        {
            DisplayName: "",
            IsVisible: true
        }
    ]
    const handleformOnchange = async (e: any) => {
        setBulkDiscountDetails((prevState: any) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            };
        });

        setProductDatas((prevState: any) => {
            return {
                ...prevState,
                "BaseSaleRate": parseInt(productListData?.BaseSaleRate),
                "CurrencyID": productListData?.CurrencyID,
                "ProductID": productListData?.ProductID
            }
        })

    }

    const handleAddDiscountType = async () => {
        setBulkDiscountDetails((prevState: any) => {
            return {
                ...prevState,
                "DiscountType": discountType
            }
        })
    }

    const handleAddDiscountPeriod = async () => {
        setBulkDiscountDetails((prevState: any) => {
            return {
                ...prevState,
                "DiscountPeriod": discountPeriod
            }
        })
    }

    const handleAddRow = async () => {
        setUserInfo((prevState: any) => {
            return {
                ...prevState,
                "CreatedAuthID": parseInt(AuthID),
                "CreatedBy": AuthName,
                "ModifiedAuthID": parseInt(AuthID),
                "ModifiedBy": AuthName,
                "MerchantID": parseInt(MerchantID),
                "TenantID": parseInt(TenantID),
                "CurrencyID": productDatas?.CurrencyID,
                "ProductID": productDatas?.ProductID
            }
        })
        let data = {
            "RangeMin": parseInt(bulkDiscountDetails?.RangeMin),
            "RangeMax": parseInt(bulkDiscountDetails?.RangeMax),
            "DiscountPeriod": discountPeriod,
            "DiscountType": discountType,
            "DiscountPercent": bulkDiscountDetails?.DiscountPercent,
            "DiscountRate": bulkDiscountDetails?.DiscountRate,
            "Description": bulkDiscountDetails?.Description
        }
        if (productDatas?.BaseSaleRate > parseInt(bulkDiscountDetails?.DiscountRate)) {
            setBlukDiscountInfo([...BlukDiscountInfo, data])
            setBulkDiscountDetails({
                "RangeMin": '',
                "RangeMax": '',
                "DiscountPeriod": '',
                "DiscountType": '',
                "DiscountPercent": '',
                "DiscountRate": '',
                "Description": ''
            })
            setDiscountPeriod("");
            setDiscountType("")
            setQuentatyErroeMessageIsOpen(false)
        } else if (100 > parseFloat(bulkDiscountDetails?.DiscountPercent)) {
            setBlukDiscountInfo([...BlukDiscountInfo, data])
            setBulkDiscountDetails({
                "RangeMin": '',
                "RangeMax": '',
                "DiscountPeriod": '',
                "DiscountType": '',
                "DiscountPercent": '',
                "DiscountRate": '',
                "Description": ''
            })
            setDiscountPeriod("");
            setDiscountType("")
            setQuentatyErroeMessageIsOpen(false)
        }
        else {
            setQuentatyErroeMessageIsOpen(true)
        }
    }

    const handleRowDelete = async (index: number) => {
        const updatedRecords = [...BlukDiscountInfo]
        updatedRecords.splice(index, 1)
        setBlukDiscountInfo(updatedRecords)
    }

    const handleCreate = async () => {
        let request = { UserInfo, BlukDiscountInfo }
        let response = await configs?.functionObj?.createProductBulkDiscount(request)
        if (response?.status === 200) {
            setBulkDiscountSuccessMessageIsOpen(true)
            setTimeout(() => {
                callbacks?.handleAddClose()
                setBulkDiscountSuccessMessageIsOpen(false)
                setBlukDiscountInfo([])
            }, 3000)
        }
        else if (response?.status === 500) {
            setBulkDiscounrErrorMessageIsOpenfor500(true)
            setTimeout(() => {
                setBulkDiscounrErrorMessageIsOpenfor500(false)
            }, 3000)
        }
        else if (response?.status === 422) {
            setBulkDiscounrErrorMessageIsOpenfor422(true)
            setTimeout(() => {
                setBulkDiscounrErrorMessageIsOpenfor422(false)
            }, 3000)
        } else {
            setBulkDiscounrErrorMessageIsOpenfor500(true)
            setTimeout(() => {
                setBulkDiscounrErrorMessageIsOpenfor500(false)
            }, 3000)
        }
    }

    return (
        <>
            <sdkMui.Box sx={{ display: 'flex', alignItems: 'center', justifyItems: 'center' }}>
                <sdkMui.Grid container spacing={2} sx={{ display: 'flex' }}>
                    <sdkMui.Grid container spacing={2} alignItems={'center'} sx={{ display: 'flex', pt: 3 }}>
                        {/* <sdkMui.Grid item xs={2.5} textAlign={'center'}>
                            <sdkMui.Typography fontWeight={'bold'} fontSize={'16px'}>Add Product Bulk Discount</sdkMui.Typography>
                        </sdkMui.Grid> */}
                        <sdkMui.Grid item xs={10}  ></sdkMui.Grid>
                        <sdkMui.Grid item xs={2} textAlign={'right'} >
                            <sdkMui.Stack direction={"row-reverse"} spacing={2}>
                                <span className='material-symbols-outlined' style={{ cursor: "pointer" }} onClick={() => { callbacks?.handleAddClose() }} > close </span>
                                <Button configs={{
                                    label: 'Save',
                                    dataTestID: 'Add-Button',
                                    isButtonDisabled: false,
                                    size: 'small',
                                    varient: 'contained'
                                }}
                                    callbacks={{
                                        handleButtonClick: () => { handleCreate() },
                                        handleOnChange: () => { },
                                    }}
                                />

                            </sdkMui.Stack>

                        </sdkMui.Grid>

                        {/* <sdkMui.Grid xs={12} justifyContent={'center'} sx={{ display: 'flex' }}>
                            <sdkMui.Divider sx={{ width: '97.9%', ml: 3, justifyContent: 'center' }} />
                        </sdkMui.Grid> */}
                    </sdkMui.Grid>
                    <sdkMui.Grid item xs={4}>
                        <sdkMui.Grid container spacing={2} data-testid="Add-PriceList-Component" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <sdkMui.Grid item xs={12} sx={{ p: 2 }}>

                                <sdkMui.Grid container spacing={1.5} sx={{ p: 1 }}>
                                    <sdkMui.Grid item xs={6}>
                                        <sdkMui.TextField
                                            id="outlined-basic"
                                            size="small"
                                            variant='outlined'
                                            name={'RangeMin'}
                                            label="Min. Qty."
                                            onChange={(e: any) => handleformOnchange(e)}
                                            required
                                            type="number"
                                            value={bulkDiscountDetails?.RangeMin} />
                                    </sdkMui.Grid>
                                    <sdkMui.Grid item xs={6}>
                                        <sdkMui.TextField
                                            id="outlined-basic"
                                            size="small"
                                            variant='outlined'
                                            name={'RangeMax'}
                                            label="Max. Qty."
                                            onChange={(e: any) => handleformOnchange(e)}
                                            type="number"
                                            value={bulkDiscountDetails?.RangeMax} />
                                    </sdkMui.Grid>
                                </sdkMui.Grid>
                                <sdkMui.Grid container spacing={1.5} sx={{ p: 1 }}>

                                    <sdkMui.Grid item xs={6}>
                                        <sdkMui.Autocomplete
                                            id="combo-box-demo"
                                            defaultValue={null}
                                            placeholder='Select Product'
                                            value={discountType}
                                            onChange={(event, newInputValue) => {
                                                setDiscountType(newInputValue);
                                                handleAddDiscountType();
                                            }}
                                            options={DisCountType?.map((option) => option?.DisplayName || "")}
                                            sx={{ width: "100%" }}
                                            renderInput={(params) => <sdkMui.TextField {...params} size='small' label="Discount Type" variant='outlined' required />}
                                        />
                                    </sdkMui.Grid>
                                    <sdkMui.Grid item xs={6} >
                                        {discountType === "Rate" ?
                                            <sdkMui.TextField
                                                id="outlined-basic"
                                                size="small"
                                                variant='outlined'
                                                name={'DiscountRate'}
                                                label="Discount Rate"
                                                onChange={(e: any) => handleformOnchange(e)}
                                                required
                                                fullWidth
                                                value={bulkDiscountDetails?.DiscountRate}
                                                type="number" />
                                            :

                                            <sdkMui.TextField
                                                id="outlined-basic"
                                                size="small"
                                                variant='outlined'
                                                name={'DiscountPercent'}
                                                label="Discount Percent"
                                                onChange={(e: any) => handleformOnchange(e)}
                                                required
                                                fullWidth
                                                value={bulkDiscountDetails?.DiscountPercent}
                                                type="number" />
                                        }
                                    </sdkMui.Grid>
                                </sdkMui.Grid>
                                <sdkMui.Grid container spacing={1.5} sx={{ p: 1 }} >
                                    <sdkMui.Grid item xs={12}>
                                        <sdkMui.Autocomplete
                                            id="combo-box-demo"
                                            defaultValue={null}
                                            value={discountPeriod}
                                            onChange={(event, newInputValue) => {
                                                setDiscountPeriod(newInputValue);
                                                handleAddDiscountPeriod();
                                            }}
                                            placeholder='Select Product'
                                            options={DisPeriod?.map((option) => option?.DisplayName || "")}
                                            sx={{ width: "100%" }}
                                            renderInput={(params) => <sdkMui.TextField {...params} size='small' label="Discount Period" variant='outlined' required />}
                                        />
                                    </sdkMui.Grid>
                                </sdkMui.Grid>
                                <sdkMui.Grid container spacing={1.5} sx={{ p: 1 }}>

                                    <sdkMui.Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <sdkMui.Button fullWidth type="button" variant="contained" size="medium" onClick={() => { discountPeriod === "" && discountType === "" && bulkDiscountDetails?.RangeMin === "" ? setIsEmptyRowCreationMessage(true) : handleAddRow() }}>
                                            Add Row
                                        </sdkMui.Button>
                                    </sdkMui.Grid>
                                </sdkMui.Grid>
                            </sdkMui.Grid >
                        </sdkMui.Grid >
                    </sdkMui.Grid>
                    <sdkMui.Grid item xs={8} >
                        {/* <sdkMui.Typography sx={{ fontSize: '16px', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}> Bulk Discount Info.</sdkMui.Typography> */}
                        <sdkMui.TableContainer sx={{ maxHeight: { xs: "40vh", sm: "40vh", md: "40vh", lg: "50vh", xl: "50vh" }, minHeight: 'fit-content', cursor: 'pointer', pr: 1, pb: 1 }}>
                            <sdkMui.Table sx={{ color: 'black' }} stickyHeader>
                                <sdkMui.TableHead>
                                    <sdkMui.TableRow>
                                        {TableHeaders?.map((headers: any, index: any) => <sdkMui.TableCell key={index} sx={{ fontSize: '14px', textAlign: 'center', background: (theme) => theme.palette.primary.main, color: (theme) => theme.palette.primary.contrastText }}>{headers?.DisplayName}
                                        </sdkMui.TableCell>)}
                                    </sdkMui.TableRow>
                                </sdkMui.TableHead>
                                <sdkMui.TableBody>
                                    {BlukDiscountInfo?.length > 0 ?
                                        <>
                                            {BlukDiscountInfo?.map((row: any, index: number) => (
                                                <sdkMui.TableRow key={index}>
                                                    <sdkMui.TableCell sx={{ textAlign: "left" }}><sdkMui.Typography variant='h6'> {row?.RangeMin || 'N/A'}</sdkMui.Typography> </sdkMui.TableCell>
                                                    <sdkMui.TableCell sx={{ textAlign: 'left' }}><sdkMui.Typography variant='h6'> {row?.RangeMax || 'N/A'} </sdkMui.Typography></sdkMui.TableCell>
                                                    <sdkMui.TableCell sx={{ textAlign: 'left' }}><sdkMui.Typography variant='h6'>{row?.DiscountType || 'N/A'}</sdkMui.Typography> </sdkMui.TableCell>
                                                    <sdkMui.TableCell sx={{ textAlign: "right" }}><sdkMui.Typography variant='h6'> {row?.DiscountType === "Rate" ? "USD $ " + parseFloat(row?.DiscountRate).toFixed(2) : "N/A"} </sdkMui.Typography></sdkMui.TableCell>
                                                    <sdkMui.TableCell sx={{ textAlign: 'right' }}> <sdkMui.Typography variant='h6'>{row?.DiscountType === "Rate" ? "N/A" : parseFloat(row?.DiscountPercent).toFixed(2) + " %"} </sdkMui.Typography></sdkMui.TableCell>
                                                    <sdkMui.TableCell sx={{ textAlign: 'left' }}><sdkMui.Typography variant='h6'>{row?.DiscountPeriod || 'N/A'}</sdkMui.Typography> </sdkMui.TableCell>
                                                    <sdkMui.TableCell sx={{ textAlign: 'left' }} >
                                                        <span className='material-symbols-outlined' style={{ cursor: 'pointer', textAlign: 'center', fontSize: '20px' }} onClick={() => { { handleRowDelete(index); } }} >delete</span>
                                                    </sdkMui.TableCell>
                                                </sdkMui.TableRow>
                                            ))}
                                        </> : <>
                                            <sdkMui.TableRow >
                                                <sdkMui.TableCell colSpan={7} sx={{ textAlign: 'center' }}>
                                                    <sdkMui.Typography >Add Row</sdkMui.Typography>
                                                </sdkMui.TableCell>
                                            </sdkMui.TableRow>
                                        </>
                                    }
                                </sdkMui.TableBody>
                            </sdkMui.Table>
                        </sdkMui.TableContainer>
                    </sdkMui.Grid>
                </sdkMui.Grid>
                {
                    quentatyErroeMessageIsOpen &&
                    <Snackbar
                        configs={{
                            dataTestID: 'Quentaty_Check_Alert',
                            severity: 'error',
                            alertDescription: messages?.PRODUCT_BULK_DISCOUNT_MESSAGES?.GREATE_SALERATE_MESSAGE,
                            isSetOpen: quentatyErroeMessageIsOpen,
                            snackbarAutoHideDuration: 3000
                        }}
                    />
                }
                {
                    isEmpltyRowCreation &&
                    <Snackbar
                        configs={{
                            dataTestID: 'Empty_Row_Check_Alert',
                            severity: 'error',
                            alertDescription: messages?.PRODUCT_BULK_DISCOUNT_MESSAGES?.EMPLTY_ROW_CREATIO_MESSAGE,
                            isSetOpen: isEmpltyRowCreation,
                            snackbarAutoHideDuration: 3000
                        }}
                    />
                }
                {
                    isEmpltyRowCreation &&
                    <Snackbar
                        configs={{
                            dataTestID: 'Empty_Row_Check_Alert',
                            severity: 'error',
                            alertDescription: messages?.PRODUCT_BULK_DISCOUNT_MESSAGES?.EMPLTY_ROW_CREATIO_MESSAGE,
                            isSetOpen: isEmpltyRowCreation,
                            snackbarAutoHideDuration: 3000
                        }}
                    />
                }
                {
                    bulkDiscountSuccessMessageIsOpen &&
                    <Snackbar
                        configs={{
                            dataTestID: 'Bulk_Discount_Sucess_message',
                            severity: 'success',
                            alertDescription: messages?.PRODUCT_BULK_DISCOUNT_MESSAGES?.BULK_DISCOUNT_SUCESS_MESSAGE,
                            isSetOpen: bulkDiscountSuccessMessageIsOpen,
                            snackbarAutoHideDuration: 3000
                        }}
                    />
                }
                {
                    bulkDiscountErrorMessageIsOpenfor500 &&
                    <Snackbar
                        configs={{
                            dataTestID: 'Bulk_Discount_Error_message_for_500',
                            severity: 'error',
                            alertDescription: messages?.PRODUCT_BULK_DISCOUNT_MESSAGES?.BULK_DISCOUNT_ERROR_MESSAGE_FOR_500,
                            isSetOpen: bulkDiscountErrorMessageIsOpenfor500,
                            snackbarAutoHideDuration: 3000
                        }}
                    />
                }
                {
                    bulkDiscountErrorMessageIsOpenfor422 &&
                    <Snackbar
                        configs={{
                            dataTestID: 'Bulk_Discount_Error_message_for_422',
                            severity: 'error',
                            alertDescription: messages?.PRODUCT_BULK_DISCOUNT_MESSAGES?.BULK_DISCOUNT_ERROR_MESSAGE_FOR_422,
                            isSetOpen: bulkDiscountErrorMessageIsOpenfor422,
                            snackbarAutoHideDuration: 3000
                        }}
                    />
                }
            </sdkMui.Box >
        </>
    )
}
export { AddProductPriceList }