/**
 * Created By : Pradeepa S
 * Created Date : Nov 15 2023
 * Description : This File containe design component for View and Edit Category
 */

import React, { useEffect, useState } from "react";
import { ViewCategoryInterface } from '@/interfaces/components/products/category/ViewCategoryInterface'
import { Button, Snackbar, sdkMui } from "@baas/platform-web-sdk";
import { Constants } from "@/utils/Constants";
import { Helper } from "@/utils/Helper";
import { AlertProps } from '@mui/material/Alert';
import { Messages } from "@/utils/Messages";
import _ from 'lodash';

const helper = new Helper()
const constants = new Constants()
const messages = new Messages()
const timeout = 3000

//createBy and created Auth Id details
const AuthID = JSON.parse(helper?.getCookie(constants?.AUTH_INFO_COOKIE_NAME))?.AuthID
const AuthName = JSON.parse(helper?.getCookie(constants?.AUTH_INFO_COOKIE_NAME))?.ContactPerson?.ContactPersonName

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <sdkMui.Alert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ViewCategory({ configs, data }: ViewCategoryInterface) {

    let date = new Date().toISOString()
    const [UserInfo] = useState({
        "CreatedAuthID": AuthID,
        "CreatedBy": AuthName,
        "ModifiedAuthID": AuthID,
        "ModifiedBy": AuthName,
        "ModifiedDate": date,
        "DeletedAuthID": AuthID,
        "DeletedBy": AuthName,
        "DeletedDate": date
    })
    const [ParentCategoryData] = useState(data?.parentCategoryData?.filter((category: any) => category?.CategoryName !== data?.editableData[0]?.CategoryName))
    const [CategoryInfo, setCategoryInfo] = useState({
        "CategoryID": data?.editableData[0]?.CategoryID,
        "CategoryName": data?.editableData[0]?.CategoryName,
        "CategoryCode": data?.editableData[0]?.CategoryCode,
        "Description": data?.editableData[0]?.Description
    })
    const [ParentCategoryID, setParentCategoryID] = useState(data?.editableData[0]?.ParentCategoryID)
    const [ProductID, setProductID] = useState('')
    const [duplicateProductAddedMessage, setDuplicateProductAddedMessage] = useState(false)
    const [assignProductEnable, setAssignProductEnable] = useState(false)
    const [isButtonLoading, setIsButtonLoading] = useState(false)
    const [isChangeButtonLoading, setChnageIsButtonLoading] = useState(false)
    const [productCategoryInfo, setProductCategoryInfo] = useState<any[]>([])
    const [categoryPopUpVisible, setCategoryPopupVisible] = useState(false)
    const [categoryEditSuccessMessage, setIsCategoryEditSuccessMessage] = useState(false)
    const [DuplicateProductCategory, setDuplicateProductCategory] = useState(false)
    const [parentCategoryAddedSuccessMessage, setParentCategoryAddedSuccessMessage] = useState(false)
    const [productAssignedSuccessMessage, setProductAssignedSuccessMessage] = useState(false)
    const [productRemoveSuccessMessage, setProductRemoveSuccessMessage] = useState(false)
    const [isProductCategoryListLoading, setIsProductCategoryListLoading] = useState(false)
    const [isMinimumOneProductAdded, setIsMinimumOneProductAdded] = useState(false)
    const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true)
    const [productCategoryList, setProductCategoryList] = useState(data?.productCategoryData)

    const handleCategoryDataChange = (e: any) => {

        setCategoryInfo((prevState: any) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }


    const handleChangeRootCategory = async (e: any) => {
        setParentCategoryID(e?.target?.value)
        let response = await configs?.functionObject?.changeRootCategory(UserInfo, data?.editableData[0]?.CategoryID, e?.target?.value)
        if (response?.status === 200) {
            setParentCategoryAddedSuccessMessage(true)
            setTimeout(() => {
                setParentCategoryAddedSuccessMessage(false)
            }, timeout)
        }
    }

    const handleAddProductCategory = (input: any) => {
        setProductID(input)
        let duplicateCheck = productCategoryInfo?.find((product: any) => product?.ProductName === input)
        if (input !== null) {
            if (duplicateCheck === undefined) {
                let productCategoryData = {
                    "ProductID": data?.productData?.find((product: any) => product?.ProductName === input)?.ProductID,
                    "ProductName": input,
                    "CategoryID": data?.editableData[0]?.CategoryID,
                    "Remarks": " "
                }
                setProductCategoryInfo([...productCategoryInfo, productCategoryData])
            }
            else {
                setDuplicateProductAddedMessage(true)
                setTimeout(() => {
                    setDuplicateProductAddedMessage(false)
                }, timeout)
            }
        }
    }


    const readProductCategory = async () => {
        setIsProductCategoryListLoading(true)
        let readProductCategory = await configs?.functionObject?.readProductCategories(data?.editableData[0]?.CategoryID)
        if (readProductCategory?.status === 200) {
            setIsProductCategoryListLoading(false)
            setProductCategoryList(readProductCategory?.output)
        }
    }

    const handleRemoveRow = (productID: any) => {
        let productCategoryData = productCategoryInfo?.filter((data: any) => data?.ProductID !== productID)
        setProductCategoryInfo(productCategoryData)
        setProductID('')
    }

    const handleAssignProducttoCategory = async () => {
        setIsButtonLoading(true)
        setAssignProductEnable(false)
        if (productCategoryInfo?.length > 0) {
            let assignProductCategory = await configs?.functionObject?.assignProducttoCategory(UserInfo, productCategoryInfo)
            if (assignProductCategory?.status === 200) {
                setIsButtonLoading(false)
                setProductCategoryInfo([])
                readProductCategory()
                setProductAssignedSuccessMessage(true)
                setTimeout(() => {
                    setProductAssignedSuccessMessage(true)
                }, timeout)
                setProductID('')
            }
            else if (assignProductCategory?.status === 409) {
                setDuplicateProductCategory(true)
                setTimeout(() => {
                    setDuplicateProductCategory(false)
                }, timeout)
                setProductCategoryInfo([])
                setIsButtonLoading(false)
                setProductID('')
            }
        }
        else {
            setIsButtonLoading(false)
            setIsMinimumOneProductAdded(true)
            setTimeout(() => {
                setIsMinimumOneProductAdded(false)
            }, timeout)
        }
    }

    const handleremoveProductCategory = async (productCategoryID: any) => {
        let request = {
            "ProductCategoryID": productCategoryID,
            "ModifiedAuthID": UserInfo?.ModifiedAuthID,
            "ModifiedBy": UserInfo?.ModifiedBy,
            "DeletedAuthID": UserInfo?.DeletedAuthID,
            "DeletedBy": UserInfo?.DeletedBy
        }
        setIsProductCategoryListLoading(true)
        let removeProductCategory = await configs?.functionObject?.removeProducttoCategory(request)
        if (removeProductCategory?.status === 200) {
            readProductCategory()
            setProductRemoveSuccessMessage(true)
            setTimeout(() => {
                setProductRemoveSuccessMessage(false)
            }, timeout)
        }
    }

    const handleChangeCategory = async () => {
        setChnageIsButtonLoading(true)
        let request = { UserInfo, CategoryInfo }
        let changeCategory = await configs?.functionObject?.changeCategory(request)
        if (changeCategory?.status === 200) {
            setChnageIsButtonLoading(false)
            setIsCategoryEditSuccessMessage(true)
            setTimeout(() => {
                setIsCategoryEditSuccessMessage(false)
            }, timeout)

        }
    }

    const handleCloseView = () => {
        const ediData = {
            "CategoryID": data?.editableData[0]?.CategoryID,
            "CategoryName": data?.editableData[0]?.CategoryName,
            "CategoryCode": data?.editableData[0]?.CategoryCode,
            "Description": data?.editableData[0]?.Description
        }
        if (_.isEqual(ediData, CategoryInfo) && productCategoryInfo?.length === 0) {
            configs?.router?.push(`/merchants/${configs?.router?.query?.merchantkey}/products/categories`)
        }
        else {
            setCategoryPopupVisible(true)
        }
    }

    useEffect(() => {
        let ediData = {
            "CategoryID": data?.editableData[0]?.CategoryID,
            "CategoryName": data?.editableData[0]?.CategoryName,
            "CategoryCode": data?.editableData[0]?.CategoryCode,
            "Description": data?.editableData[0]?.Description
        }
        if (!_.isEqual(ediData, CategoryInfo)) {
            setIsSaveButtonDisabled(false)
        }
        else {
            setIsSaveButtonDisabled(true)
        }
    }, [CategoryInfo])

    return (
        <>
            <form onSubmit={(e: any) => { e?.preventDefault(); assignProductEnable ? handleAssignProducttoCategory() : handleChangeCategory() }}>
                <sdkMui.Grid container spacing={3} alignItems={'center'} sx={{ display: 'flex' }}>
                    <sdkMui.Grid item xs={10}>
                        <sdkMui.Typography variant="h4" fontWeight={'bold'} >Category Info.</sdkMui.Typography>
                    </sdkMui.Grid>
                    <sdkMui.Grid item xs={2} textAlign={'right'}>
                        <span className="material-symbols-outlined" style={{ cursor: 'pointer' }} onClick={() => { handleCloseView() }}>close</span>
                    </sdkMui.Grid>
                    <sdkMui.Grid item xs={4} justifyContent={'center'} sx={{ display: 'flex' }}>
                        <sdkMui.FormControl size="small" variant="outlined" sx={{ width: '90%' }}>
                            <sdkMui.InputLabel id="demo-simple-select-label" variant="outlined" >Root Category</sdkMui.InputLabel>
                            <sdkMui.Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name='ParentCategoryID'
                                value={ParentCategoryID}
                                fullWidth
                                label="Parent Category"
                                onChange={(e: any) => { handleChangeRootCategory(e) }}
                                size="small"
                            >
                                {
                                    ParentCategoryData?.map((parentCategory: any, index: number) => (
                                        <sdkMui.MenuItem value={parentCategory.CategoryID} key={index}> {parentCategory?.CategoryName}</sdkMui.MenuItem>
                                    ))
                                }
                            </sdkMui.Select>
                            {/* {
                                data?.editableData[0]?.ParentCategoryID === null && <sdkMui.Typography variant='body2' sx={{ ml: 0.5 }}> Choose Root Category</sdkMui.Typography>
                            } */}
                        </sdkMui.FormControl>

                    </sdkMui.Grid>
                    <sdkMui.Grid item xs={2} textAlign={'left'}>
                        <sdkMui.TextField
                            size="small"
                            name='CategoryName'
                            label='Category Name'
                            value={CategoryInfo?.CategoryName}
                            onChange={(e: any) => handleCategoryDataChange(e)} />
                    </sdkMui.Grid>
                    <sdkMui.Grid item xs={2} textAlign={'left'}>
                        <sdkMui.TextField
                            size="small"
                            name='CategoryCode'
                            label='Category Code'
                            value={CategoryInfo?.CategoryCode}
                            onChange={(e: any) => handleCategoryDataChange(e)} />
                    </sdkMui.Grid>
                    <sdkMui.Grid item xs={2}>
                        <sdkMui.TextField
                            size="small"
                            name='Description'
                            label='Description'
                            value={CategoryInfo?.Description}
                            onChange={(e: any) => handleCategoryDataChange(e)} />
                    </sdkMui.Grid>
                    <sdkMui.Grid item xs={1.5} textAlign={'left'}>
                        <Button configs={{
                            type: 'submit',
                            label: "Save",
                            varient: 'contained',
                            color: 'primary',
                            size: 'small',
                            isButtonDisabled: isSaveButtonDisabled,
                            isButtonloading: isChangeButtonLoading
                        }} callbacks={{
                            handleButtonClick: () => { }
                        }} />
                    </sdkMui.Grid>
                    <sdkMui.Grid item xs={12}>
                        <sdkMui.Divider />
                    </sdkMui.Grid>
                    <sdkMui.Grid item xs={10}>
                        <sdkMui.Typography variant="h4" fontWeight={'bold'} >Category Product Info.</sdkMui.Typography>
                    </sdkMui.Grid>

                    <sdkMui.Grid item xs={2}>
                        <Button configs={{
                            type: 'submit',
                            label: "Add Products",
                            color: 'primary',
                            varient: 'contained',
                            size: 'small',
                            isButtonloading: isButtonLoading
                        }} callbacks={{
                            handleButtonClick: () => { setAssignProductEnable(true) }
                        }} />
                    </sdkMui.Grid>
                    <sdkMui.Grid item xs={4} >
                        <sdkMui.Autocomplete
                            id="combo-box-demo"
                            value={ProductID}
                            onChange={(event, newInputValue) => {
                                handleAddProductCategory(newInputValue)
                            }}
                            placeholder='Choose Product'
                            options={data?.productData?.map((option: any) => option?.ProductName || "")}
                            fullWidth
                            renderInput={(params) => <sdkMui.TextField {...params} size='small' label="Product" variant='outlined' />}
                        />
                    </sdkMui.Grid>
                    {
                        productCategoryInfo?.length > 0 &&
                        <sdkMui.Grid item xs={8} >
                            <sdkMui.Box border={"1px solid #E0E0E0"} sx={{ p: 2 }}>
                                {productCategoryInfo?.map((chipData: any) => (
                                    <>
                                        <sdkMui.Chip label={chipData?.ProductName} variant="outlined" sx={{ borderRadius: '6px', fontSize: '14px', width: 'fit-content' }} icon={<span onClick={() => { handleRemoveRow(chipData?.ProductID) }} className="material-symbols-outlined" style={{ fontSize: '18px', fontWeight: 'bold' }}>cancel</span>} />
                                        &nbsp;&nbsp;
                                    </>
                                ))}
                                {DuplicateProductCategory &&
                                    <Alert data-testid="Instanceservice-Duplicate-Message" sx={{ mt: 2 }} severity="error">{messages?.DUPLICATE_PRODUCT_MESSAGE}</Alert>
                                }
                            </sdkMui.Box>
                        </sdkMui.Grid>
                    }
                    {
                        DuplicateProductCategory &&
                        <sdkMui.Grid item xs={8} >
                            <sdkMui.Box border={"1px solid #E0E0E0"} sx={{ p: 2 }}>
                                {DuplicateProductCategory &&
                                    <Alert data-testid="Instanceservice-Duplicate-Message" sx={{ width: '50%' }} severity="error">{messages?.DUPLICATE_PRODUCT_MESSAGE}</Alert>
                                }
                            </sdkMui.Box>
                        </sdkMui.Grid>
                    }
                    {
                        isProductCategoryListLoading ?
                            <sdkMui.CircularProgress />
                            :
                            <sdkMui.Grid item xs={12} >
                                <sdkMui.Box border={"1px solid #E0E0E0"} sx={{ p: 2 }}>
                                    {productCategoryList?.map((productCategory: any) => (
                                        <>
                                            <sdkMui.Chip label={productCategory?.Product?.ProductName} color={'primary'} variant="outlined" sx={{ borderRadius: '6px', fontSize: '14px', width: 'fit-content' }} icon={<span onClick={() => { handleremoveProductCategory(productCategory?.ProductCategoryID) }} className="material-symbols-outlined" style={{ fontSize: '18px', fontWeight: 'bold' }}>cancel</span>} />
                                            &nbsp;&nbsp;
                                        </>
                                    ))}
                                </sdkMui.Box>
                            </sdkMui.Grid>
                    }

                </sdkMui.Grid>
            </form>
            {
                duplicateProductAddedMessage &&
                <Snackbar
                    configs={{
                        isSetOpen: duplicateProductAddedMessage,
                        severity: 'error',
                        alertDescription: messages?.DUPLICATE_PRODUCT_SELECTED,
                        snackbarAutoHideDuration: timeout
                    }} />
            }
            {
                productAssignedSuccessMessage &&
                <Snackbar
                    configs={{
                        isSetOpen: productAssignedSuccessMessage,
                        severity: 'success',
                        alertDescription: messages?.PRODUCT_ASSIGNED_SUCCESSFULLY,
                        snackbarAutoHideDuration: timeout
                    }} />
            }
            {
                productRemoveSuccessMessage &&
                <Snackbar
                    configs={{
                        isSetOpen: productRemoveSuccessMessage,
                        severity: 'success',
                        alertDescription: messages?.PRODUCT_REMOVED_SUCCESSFULLY,
                        snackbarAutoHideDuration: timeout
                    }} />
            }
            {
                categoryPopUpVisible &&
                <sdkMui.Dialog
                    open={categoryPopUpVisible}
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
                                handleButtonClick: () => { setCategoryPopupVisible(false) }
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
                                handleButtonClick: () => { setCategoryPopupVisible(false); configs?.router?.push(`/merchants/${configs?.router?.query?.merchantkey}/products/categories`) }
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
                categoryEditSuccessMessage &&
                <Snackbar
                    configs={{
                        isSetOpen: categoryEditSuccessMessage,
                        severity: 'success',
                        alertDescription: messages?.CATEGORY_EDITED_SUCCESSFULLY,
                        snackbarAutoHideDuration: timeout
                    }} />
            }
            {
                parentCategoryAddedSuccessMessage &&
                <Snackbar
                    configs={{
                        isSetOpen: parentCategoryAddedSuccessMessage,
                        severity: 'success',
                        alertDescription: messages?.PARENT_CATEGORY_ADDED_SUCCESSFULLY,
                        snackbarAutoHideDuration: timeout
                    }} />
            }
            {
                isMinimumOneProductAdded &&
                <Snackbar
                    configs={{
                        isSetOpen: isMinimumOneProductAdded,
                        severity: 'error',
                        alertDescription: messages?.MINIMUM_ONE_PRODUCT_ADDED,
                        snackbarAutoHideDuration: timeout
                    }} />
            }
        </>
    )
}