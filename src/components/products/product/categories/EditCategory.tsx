/** 
 * CreatedBy    : Uma Kohila
 * CreatedDate  : Nov 14 2023
 * Description  : This file contains Add Category to the product component
 */

import React, { useState } from "react";
import { Helper } from "@/utils/Helper";
import { Constants } from "@/utils/Constants";
import { Button, Chip, Snackbar, sdkMui } from "@baas/platform-web-sdk";
import { addCategoryInterface } from "@/interfaces/components/products/product/category/EditCategoryInterface";
import { Messages } from "@/utils/Messages";

const helper = new Helper();
const messages = new Messages()
const constants = new Constants();

const AuthID = JSON.parse(helper?.getCookie(constants?.AUTH_INFO_COOKIE_NAME))?.AuthID
const AuthName = JSON.parse(helper?.getCookie(constants?.AUTH_INFO_COOKIE_NAME))?.ContactPerson?.ContactPersonName

function AddCategory({ configs, data }: addCategoryInterface) {
    const timeOut = 3000
    const [isLoading, setIsLoading] = useState(false)
    const [isPopUpVisible, setIsPopUpVisible] = useState(false)
    const [closePopup, setClosePopup] = useState(false)
    const [productCategoryList, setProductCategoryList] = useState<any>(data?.CategoryData)
    const [AddateogorySuccessMessageIsOpen, setAddateogorySuccessMessageIsOpen] = useState(false)
    const [addateogoryErrorMessageIsOpenfor500, setAddateogoryErrorMessageIsOpenfor500] = useState(false)
    const [addateogoryErrorMessageIsOpenfor422, setAddateogoryErrorMessageIsOpenfor422] = useState(false)
    const [removeCateogorySuccessMessageIsOpen, setRemoveCateogorySuccessMessageIsOpen] = useState(false)
    const [removeCateogoryErrorMessageIsOpenfor500, setRemoveCateogoryErrorMessageIsOpenfor500] = useState(false)
    const [removeCateogoryErrorMessageIsOpenfor422, setRemovecateogoryErrorMessageIsOpenfor422] = useState(false)
    const [CategoryList] = useState<any>(data?.CategoryList)
    const [deletePopVisible, setIsDeletePopVisible] = useState(false)
    const [CategoryInfo, setCategoryInfo] = useState<any>([])
    const [deleteID, setDeleteID] = useState<any>()
    const [UserInfo, setUserInfo] = useState<any>({
        "CreatedAuthID": '',
        "CreatedBy": '',
        "ModifiedAuthID": '',
        "ModifiedBy": ''
    })

    const handleDataSet = (newValue: any) => {
        setUserInfo((prevState: any) => {
            return {
                ...prevState,
                "CreatedAuthID": parseInt(AuthID),
                "CreatedBy": AuthName,
                "ModifiedAuthID": parseInt(AuthID),
                "ModifiedBy": AuthName
            }
        })
        let CategoryData = {
            "CategoryID": CategoryList?.find((data: any) => data?.CategoryName === newValue)?.CategoryID,
            "ProductID": parseInt(configs?.router?.query?.productid),
            "Remarks": ''
        }
        setCategoryInfo([...CategoryInfo, CategoryData])
    }

    const handleAddCategory = async () => {
        setIsLoading(true)
        let request = { UserInfo, CategoryInfo }
        let response = await configs?.functionObj?.addCategoryToTheProduct(request);
        if (response?.status === 200) {
            setAddateogorySuccessMessageIsOpen(true)
            handleReadCategoty()
            setTimeout(() => {
                setAddateogorySuccessMessageIsOpen(false)
                setCategoryInfo([])
                setIsLoading(false);
            }, timeOut)
        } else if (response?.status === 500) {
            setAddateogoryErrorMessageIsOpenfor500(true)
            setTimeout(() => {
                setAddateogoryErrorMessageIsOpenfor500(false)
                setCategoryInfo([])
                setIsLoading(false);
            }, timeOut)
        } else if (response?.status === 422) {
            setAddateogoryErrorMessageIsOpenfor422(true)
            setTimeout(() => {
                setAddateogoryErrorMessageIsOpenfor500(false);
                setCategoryInfo([])
                setIsLoading(false);
            }, timeOut)
        } else {
            setAddateogoryErrorMessageIsOpenfor500(true)
            setTimeout(() => {
                setAddateogoryErrorMessageIsOpenfor500(false)
                setCategoryInfo([])
                setIsLoading(false);
            }, timeOut)
        }


    }

    const handleReadCategoty = async () => {
        let readCategory = await configs?.functionObj?.readCategoriesforProductID(parseInt(configs?.router?.query?.productid));
        if (readCategory?.status === 200) {
            setProductCategoryList(readCategory?.output);
            setIsLoading(false);
        } else {
            setProductCategoryList(null);
            setIsLoading(false);
        }
        setIsPopUpVisible(false);
    }

    const handleDelete = async () => {
        setIsLoading(true)
        let request = {
            "ProductCategoryID": deleteID,
            "ModifiedAuthID": AuthID,
            "ModifiedBy": AuthName,
            "DeletedAuthID": AuthID,
            "DeletedBy": AuthName
        }
        let response = await configs?.functionObj?.removeCategoryfROMTheProduct(request);
        if (response?.status === 200) {
            setRemoveCateogorySuccessMessageIsOpen(true)
            handleReadCategoty();
            setTimeout(() => {
                setRemoveCateogorySuccessMessageIsOpen(false)
            }, timeOut)
        } else if (response?.status === 500) {
            setRemoveCateogoryErrorMessageIsOpenfor500(true)
            setTimeout(() => {
                setRemoveCateogoryErrorMessageIsOpenfor500(false)
            }, timeOut)
        } else if (response?.status === 422) {
            setRemovecateogoryErrorMessageIsOpenfor422(true)
            setTimeout(() => {
                setRemovecateogoryErrorMessageIsOpenfor422(false);
            }, timeOut)
        } else {
            setRemoveCateogoryErrorMessageIsOpenfor500(true)
            setTimeout(() => {
                setRemoveCateogoryErrorMessageIsOpenfor500(false)
            }, timeOut)
        }
    }

    return (
        <>
            <sdkMui.Grid container spacing={2} data-testid={configs?.["data-testid"]} >
                <sdkMui.Grid item xs={12} textAlign={"right"}>
                    {productCategoryList?.length > 0 &&
                        <Button
                            configs={{
                                label: 'Add Category',
                                dataTestID: 'Add_Button',
                                size: 'small',
                                isButtonDisabled: false,
                                varient: 'contained',
                                startIcon: <span style={{ marginRight: '-7px' }} className="material-symbols-outlined"> add </span>,
                            }} callbacks={{
                                handleButtonClick: () => { setIsPopUpVisible(true) },
                                handleOnChange: () => { }
                            }}
                        />}
                </sdkMui.Grid>
                <sdkMui.Grid container spacing={2}>
                    <sdkMui.Grid item xs={12} >
                        {productCategoryList?.length > 0 ? (
                            <>
                                {isLoading ?

                                    <sdkMui.Stack sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <sdkMui.CircularProgress sx={{ alignItems: 'center !important' }} />
                                    </sdkMui.Stack>
                                    : <>

                                        <sdkMui.Stack direction={"row"} spacing={1} sx={{ pl: 1, display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                                            {productCategoryList?.map((row: any, index: number) => (
                                                <Chip
                                                    key={index}
                                                    configs={{
                                                        label: row?.Category?.CategoryName,
                                                        showDeleteIcon: true,
                                                        variant: 'filled',
                                                        clickable: false,
                                                        size: 'medium',
                                                        color: 'primary',
                                                        dataTestID: 'Add_Button'
                                                    }}
                                                    callbacks={{
                                                        handleClick: () => { },
                                                        handleDelete: () => { setIsDeletePopVisible(true); setDeleteID(row?.ProductCategoryID); }
                                                    }}
                                                />
                                            ))}
                                        </sdkMui.Stack>

                                    </>
                                }
                            </>
                        ) : (
                            <><sdkMui.Grid container spacing={2}>
                                <sdkMui.Grid item xs={12} textAlign={"center"} >
                                    <sdkMui.Typography fontSize={"14px"}>No Data Found</sdkMui.Typography>
                                </sdkMui.Grid>
                                <sdkMui.Grid item xs={12} textAlign={"center"} >
                                    <Button
                                        configs={{
                                            label: 'Add Category',
                                            dataTestID: 'Add_Button',
                                            size: 'medium',
                                            isButtonDisabled: false,
                                            varient: 'contained',
                                            startIcon: <span style={{ marginRight: '-7px' }} className="material-symbols-outlined"> add </span>,
                                        }} callbacks={{
                                            handleButtonClick: () => { setIsPopUpVisible(true) },
                                            handleOnChange: () => { }
                                        }}
                                    />
                                </sdkMui.Grid>
                            </sdkMui.Grid>
                            </>
                        )}
                    </sdkMui.Grid>
                </sdkMui.Grid>
            </sdkMui.Grid >
            {isPopUpVisible &&
                <sdkMui.Dialog
                    open={isPopUpVisible}
                    keepMounted
                    fullWidth
                >
                    <sdkMui.DialogContent>
                        <sdkMui.Grid container spacing={2}>
                            <sdkMui.Grid item xs={12}>
                                <sdkMui.Grid item xs={12}>
                                    <sdkMui.Typography fontSize={"16px"} fontWeight={"Bold"}> Add Category</sdkMui.Typography>
                                </sdkMui.Grid>
                                <sdkMui.Grid item xs={12}>
                                    <sdkMui.Divider sx={{ visibility: 'visible' }}></sdkMui.Divider>
                                </sdkMui.Grid>
                            </sdkMui.Grid>
                            <sdkMui.Grid container spacing={2} >
                                <sdkMui.Grid xs={12} sx={{ pt: 4, pl: 8 }}>
                                    <sdkMui.Autocomplete
                                        id="combo-box-demo"
                                        value={CategoryInfo?.CategoryName}
                                        onChange={(event, newInputValue) => {
                                            handleDataSet(newInputValue)
                                        }}
                                        placeholder='Select Category'
                                        options={CategoryList?.map((option: any) => option?.CategoryName)}
                                        sx={{ width: 300 }}
                                        renderInput={(params) => <sdkMui.TextField {...params} size='small' label="Category Name" variant='outlined' required />}
                                    />
                                </sdkMui.Grid>
                            </sdkMui.Grid>
                        </sdkMui.Grid>
                    </sdkMui.DialogContent>
                    <sdkMui.DialogActions>
                        <Button
                            callbacks={{
                                handleButtonClick: () => { CategoryInfo?.length === 0 ? setIsPopUpVisible(false) : setClosePopup(true) }
                            }}
                            configs={{
                                label: 'Cancel',
                                color: 'secondary',
                                size: 'small',
                                type: 'button',
                                varient: 'contained',
                            }}
                        />
                        <Button
                            callbacks={{
                                handleButtonClick: () => { handleAddCategory(); setIsPopUpVisible(false) }
                            }}
                            configs={{
                                label: 'Save',
                                color: 'error',
                                size: 'small',
                                type: 'button',
                                varient: 'contained',
                            }}
                        />
                    </sdkMui.DialogActions>
                </sdkMui.Dialog>
            }
            {
                closePopup &&
                <sdkMui.Dialog
                    open={closePopup}
                    keepMounted
                >
                    <sdkMui.DialogContent>
                        <sdkMui.DialogContentText>
                            <b>Your changes will be lost, Are you sure want to Cancle..?</b>
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
                                handleButtonClick: () => { setClosePopup(false); setIsPopUpVisible(false) }
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
            {
                deletePopVisible &&
                <sdkMui.Dialog
                    open={deletePopVisible}
                    keepMounted
                >
                    <sdkMui.DialogContent>
                        <sdkMui.DialogContentText>
                            <b>Your changes will be lost, Are you sure want to Delete..?</b>
                        </sdkMui.DialogContentText>
                    </sdkMui.DialogContent>
                    <sdkMui.DialogActions>
                        <Button
                            callbacks={{
                                handleButtonClick: () => { setDeleteID(''); setIsDeletePopVisible(false) }
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
                                handleButtonClick: () => { handleDelete(); setIsDeletePopVisible(false) }
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
            {
                AddateogorySuccessMessageIsOpen &&
                <Snackbar
                    configs={{
                        dataTestID: 'Add_Category_Sucess_message',
                        severity: 'success',
                        alertDescription: messages?.ADD_CATEGORY_TO_THE_PRODUCT?.ADD_CATEGORY_SUCCESS_MESSAGE,
                        isSetOpen: AddateogorySuccessMessageIsOpen,
                        snackbarAutoHideDuration: timeOut
                    }}
                />
            }
            {
                addateogoryErrorMessageIsOpenfor500 &&
                <Snackbar
                    configs={{
                        dataTestID: 'Add_Category_Error_message_for_500',
                        severity: 'error',
                        alertDescription: messages?.ADD_CATEGORY_TO_THE_PRODUCT?.ADD_CATEGORY_ERROR_MESSAGE_FOR_500,
                        isSetOpen: addateogoryErrorMessageIsOpenfor500,
                        snackbarAutoHideDuration: timeOut
                    }}
                />
            }
            {
                addateogoryErrorMessageIsOpenfor422 &&
                <Snackbar
                    configs={{
                        dataTestID: 'Add_Category_Error_message_for_422',
                        severity: 'error',
                        alertDescription: messages?.ADD_CATEGORY_TO_THE_PRODUCT?.ADD_CATEGORY_ERROR_MESSAGE_FOR_422,
                        isSetOpen: addateogoryErrorMessageIsOpenfor422,
                        snackbarAutoHideDuration: timeOut
                    }}
                />
            }
            {
                removeCateogorySuccessMessageIsOpen &&
                <Snackbar
                    configs={{
                        dataTestID: 'Add_Category_Sucess_message',
                        severity: 'success',
                        alertDescription: messages?.REMOVE_CATEGORY_TO_THE_PRODUCT?.REMOVE_CATEGORY_SUCCESS_MESSAGE,
                        isSetOpen: removeCateogorySuccessMessageIsOpen,
                        snackbarAutoHideDuration: timeOut
                    }}
                />
            }
            {
                removeCateogoryErrorMessageIsOpenfor422 &&
                <Snackbar
                    configs={{
                        dataTestID: 'Add_Category_Error_message_for_422',
                        severity: 'error',
                        alertDescription: messages?.REMOVE_CATEGORY_TO_THE_PRODUCT?.REMOVE_CATEGORY_ERROR_MESSAGE_FOR_422,
                        isSetOpen: removeCateogoryErrorMessageIsOpenfor422,
                        snackbarAutoHideDuration: timeOut
                    }}
                />
            }
            {
                removeCateogoryErrorMessageIsOpenfor500 &&
                <Snackbar
                    configs={{
                        dataTestID: 'Add_Category_Error_message_for_500',
                        severity: 'error',
                        alertDescription: messages?.REMOVE_CATEGORY_TO_THE_PRODUCT?.REMOVE_CATEGORY_ERROR_MESSAGE_FOR_500,
                        isSetOpen: removeCateogoryErrorMessageIsOpenfor500,
                        snackbarAutoHideDuration: timeOut
                    }}
                />
            }

        </>
    )
}
export { AddCategory }