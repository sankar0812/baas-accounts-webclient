

import React, { useEffect, useState } from 'react';
import { Button, Snackbar, sdkMui } from '@baas/platform-web-sdk';
import { EditProductInterface } from '@/interfaces/components/products/product/EditProductInterface';
import { Helper } from '@/utils/Helper';
import { Messages } from "@/utils/Messages";
import logoimg from '@/assets/images/products.png'
import { Constants } from '@/utils/Constants';
import { ProductFunction } from '@/functions/products/product/ProductsFuction';
import _ from 'lodash'
import Switch from '@mui/material/Switch';

const constants = new Constants()
const helper = new Helper();
const messages = new Messages();
const productFunction = new ProductFunction()

const AuthID = JSON.parse(helper?.getCookie(constants?.AUTH_INFO_COOKIE_NAME))?.AuthID
const AuthName = JSON.parse(helper?.getCookie(constants?.AUTH_INFO_COOKIE_NAME))?.ContactPerson?.ContactPersonName


export function EditProduct({ configs, data }: EditProductInterface) {
    const [editableProduct, setEditableData] = useState(data?.editProductData)
    const [editedProductData, setEditedProductData] = useState({
        "ProductID": parseInt(configs?.router?.query?.productid),
        "ProductName": editableProduct.ProductName,
        "ProductCode": editableProduct.ProductCode,
        "ComparisionSaleRate": editableProduct.ComparisionSaleRate,
        "ProductUPC": editableProduct.ProductUPC,
        "ProductSKU": editableProduct.ProductSKU,
        "BaseSaleRate": editableProduct.BaseSaleRate,
        "CurrencyID": editableProduct.CurrencyID,
        "AppSettingUomID": editableProduct.AppSettingUomID,
        "IsGoods": null,
        "IsService": null,
        "StockLimit": "",
        "ModifiedAuthID": AuthID,
        "ModifiedBy": AuthName
    })

    const [parentProduct, setParentPorduct] = useState({ "ParentProductID": editableProduct?.ParentProductID });
    const [successEditProductMessage, setSuccessEditProductMessage] = useState(false)
    const [successParentProductMessage, setSuccessParentProductMessage] = useState(false)
    const [isEnablePurchase, setIsEnablePurchase] = useState(data?.editProductData?.IsPurchase)
    const [isEnableSale, setIsEnableSale] = useState(data?.editProductData?.IsSellable)
    const [isEnableProduct, setIsEnableProduct] = useState(data?.editProductData?.IsEnabled)
    const [enablePurchaseMessage, setEnablePurchaseMessage] = useState(false)
    const [disablePurchaseMessage, setDisablePurchaseMessage] = useState(false)
    const [enableSaleMessage, setEnableSaleMessage] = useState(false)
    const [disableSaleMessage, setDisableSaleMessage] = useState(false)
    const [enableAvailabilityMessage, setEnableAvailabilityMessage] = useState(false)
    const [disableAvailabilityMessage, setDisableAvailabilityMessage] = useState(false)
    const [closePopup, setClosePopup] = useState(false)
    const [purchaseStatusMessage, setPurchaseStatusMessage] = useState('')
    const [saleStatusMessage, setSaleStatusMessage] = useState('')
    const [enableSaleErrorMessage, setEnableSaleErrorMessage] = useState(false)
    const [isEnableAvailabilityFlagLoading, setIsEnableAvailabilityFlagLoading] = useState(false)
    const [isEnableSaleFlagLoading, setIsEnableSaleFlagLoading] = useState(false)
    const [displayErrorMessage, setDisplayErrorMessage] = useState('')
    const [availabilityStatusMessage, setAvailabilityStatusMessage] = useState('')
    const [isSaveButtonDisabled, setIsaveButtonDisabled] = useState(true)


    const ReadProduct = async () => {
        let saveResponse = await productFunction?.readProductForEdit(parseInt(configs?.router?.query?.productid))
        setEditableData(saveResponse?.output)
    }

    const ProductEdit = async () => {
        let response = await productFunction.updateProduct(editedProductData)
        if (response?.status === 200) {
            ReadProduct()
            setSuccessEditProductMessage(true)
            setTimeout(() => {
                setSuccessEditProductMessage(false)
            }, 3000)
        }
    }

    const changeBaseProduct = async (e: any) => {
        setParentPorduct({ ...parentProduct, ParentProductID: e.target.value })
        const baseProduct = {
            "ProductID": parseInt(configs?.router?.query?.productid),
            "ParentProductID": parseInt(e.target.value),
            "ModifiedAuthID": AuthID,
            "ModifiedBy": AuthName
        }
        let parentResponse = await productFunction?.changeParentProduct(baseProduct)
        if (parentResponse?.status === 200) {
            setSuccessParentProductMessage(true)
            setTimeout(() => {
                setSuccessParentProductMessage(false)
            }, 3000)
        }

    }

    const changeIsPurchased = async (e: any) => {
        if (e.target.checked) {
            let enablePurchase = {
                "ProductID": parseInt(configs?.router?.query?.productid),
                "ModifiedAuthID": AuthID,
                "ModifiedBy": AuthName
            }
            let enablePurchaseResponse = await productFunction?.enablePurchaseProduct(enablePurchase)
            setPurchaseStatusMessage(enablePurchaseResponse?.message)
            if (enablePurchaseResponse?.status === 200) {
                setIsEnablePurchase(e.target.checked)
                ReadProduct()
                setEnablePurchaseMessage(true)
                setTimeout(() => {
                    setEnablePurchaseMessage(false)
                }, 3000)
            }
        } else {
            let disablePurchase = {
                "ProductID": parseInt(configs?.router?.query?.productid),
                "ModifiedAuthID": AuthID,
                "ModifiedBy": AuthName
            }
            let disablePurchaseResponse = await productFunction?.disablePurchaseProduct(disablePurchase)
            setPurchaseStatusMessage(disablePurchaseResponse?.message)
            if (disablePurchaseResponse?.status === 200) {
                setIsEnablePurchase(e.target.checked)
                ReadProduct()
                setDisablePurchaseMessage(true)
                setTimeout(() => {
                    setDisablePurchaseMessage(false)
                }, 3000)
            }
        }
    }

    const changeIsSellable = async (e: any) => {
        if (e.target.checked) {
            let enableSale = {
                "ProductID": parseInt(configs?.router?.query?.productid),
                "ModifiedAuthID": AuthID,
                "ModifiedBy": AuthName
            }
            let enableSaleResponse = await productFunction?.enableSaleProduct(enableSale)
            setSaleStatusMessage(enableSaleResponse?.message)
            if (enableSaleResponse?.status === 200) {
                setIsEnableSale(e.target.checked)
                ReadProduct()
                setEnableSaleMessage(true)
                setTimeout(() => {
                    setEnableSaleMessage(false)
                }, 3000)
            }
            if (enableSaleResponse?.status === 404) {
                setDisplayErrorMessage(enableSaleResponse?.message)
                setIsEnableSale(false)
                setEnableSaleErrorMessage(true)
                setIsEnableSaleFlagLoading(true)
                setTimeout(() => {
                    setEnableSaleErrorMessage(false)
                    setIsEnableSaleFlagLoading(false)
                }, 3000)
            }

        } else {
            let disableSale = {
                "ProductID": parseInt(configs?.router?.query?.productid),
                "ModifiedAuthID": AuthID,
                "ModifiedBy": AuthName
            }
            let disableSaleResponse = await productFunction?.disableSaleProduct(disableSale)
            setSaleStatusMessage(disableSaleResponse?.message)
            if (disableSaleResponse?.status === 200) {
                setIsEnableSale(e.target.checked)
                ReadProduct()
                setDisableSaleMessage(true)
                setTimeout(() => {
                    setDisableSaleMessage(false)
                }, 3000)
            }
        }
    }


    const changeIsAvailability = async (e: any) => {
        if (e.target.checked) {
            let enableAvailability = {
                "UserInfo": {
                    "ModifiedAuthID": AuthID,
                    "ModifiedBy": AuthName,
                    "ModifiedDate": new Date().toISOString()
                },
                "ProductInfo": {
                    "ProductID": parseInt(configs?.router?.query?.productid),
                    "IsEnabled": e.target.checked
                }
            }
            let enableAvailabilityResponse = await productFunction?.enableProductAvailability(enableAvailability)
            setAvailabilityStatusMessage(enableAvailabilityResponse?.message)
            if (enableAvailabilityResponse?.status === 200) {
                setIsEnableProduct(e.target.checked)
                ReadProduct()
                setEnableAvailabilityMessage(true)
                setTimeout(() => {
                    setEnableAvailabilityMessage(false)
                }, 3000)
            }
            if (enableAvailabilityResponse?.status === 422) {
                setDisplayErrorMessage(enableAvailabilityResponse?.message)
                setIsEnableProduct(false)
                setEnableSaleErrorMessage(true)
                setTimeout(() => {
                    setEnableSaleErrorMessage(false)
                }, 3000)
                setIsEnableAvailabilityFlagLoading(true)
                setTimeout(() => {
                    setIsEnableAvailabilityFlagLoading(false)
                }, 3000)
                setIsEnableProduct(false)
            }
        } else {
            let disableAvailability = {
                "UserInfo": {
                    "ModifiedAuthID": AuthID,
                    "ModifiedBy": AuthName,
                    "ModifiedDate": new Date().toISOString()
                },
                "ProductInfo": {
                    "ProductID": parseInt(configs?.router?.query?.productid),
                    "IsEnabled": e.target.checked
                }
            }
            let disableAvailabilityResponse = await productFunction?.disableProductAvailability(disableAvailability)
            setAvailabilityStatusMessage(disableAvailabilityResponse?.message)
            if (disableAvailabilityResponse?.status === 200) {
                setIsEnableProduct(e.target.checked)
                ReadProduct()
                setDisableAvailabilityMessage(true)
                setTimeout(() => {
                    setDisableAvailabilityMessage(false)
                }, 3000)
            }
        }
    }

    useEffect(() => {
        const EditProductData = {
            "ProductID": parseInt(configs?.router?.query?.productid),
            "ProductName": editableProduct.ProductName,
            "ProductCode": editableProduct.ProductCode,
            "ComparisionSaleRate": editableProduct.ComparisionSaleRate,
            "ProductUPC": editableProduct.ProductUPC,
            "ProductSKU": editableProduct.ProductSKU,
            "BaseSaleRate": editableProduct.BaseSaleRate,
            "CurrencyID": editableProduct.CurrencyID,
            "AppSettingUomID": editableProduct.AppSettingUomID,
            "IsGoods": null,
            "IsService": null,
            "StockLimit": "",
            "ModifiedAuthID": AuthID,
            "ModifiedBy": AuthName
        }
        if (_.isEqual(editedProductData, EditProductData)) {
            setIsaveButtonDisabled(true)
        } else {
            setIsaveButtonDisabled(false);
        }
    }, [editedProductData])

    return (
        <>
            {/* <sdkMui.Card sx={{ p: 1 }}> */}
            <form onSubmit={(e: any) => { e?.preventDefault(); ProductEdit(); }}>
                <sdkMui.Grid container spacing={0.5} >
                    <sdkMui.Grid item xs={2} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <img
                            src={logoimg.src} alt={"ProductImage"} sizes='(max-width: 100px) 50px, 50px' width={150} height={150}
                            style={{
                                filter: 'drop-shadow(0px 0px 4px gray)'
                            }}
                        />
                    </sdkMui.Grid>
                    <sdkMui.Grid item xs={10}>
                        <sdkMui.Grid container spacing={2}>
                            <sdkMui.Grid item xs={12} textAlign={'right'}>
                                <Button
                                    callbacks={{
                                        handleButtonClick: () => { }
                                    }}
                                    configs={{
                                        label: 'Save',
                                        color: 'primary',
                                        size: 'small',
                                        type: "submit",
                                        varient: 'contained',
                                        isButtonDisabled: isSaveButtonDisabled,
                                        dataTestID: 'Product-Save-Button',
                                    }}
                                />
                            </sdkMui.Grid>
                            <sdkMui.Grid item xs={4}>
                                <sdkMui.FormControl size="small" variant="outlined" fullWidth>
                                    <sdkMui.InputLabel id="demo-simple-select-label" >Base Product</sdkMui.InputLabel>

                                    <sdkMui.Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name='ParentProductID'
                                        value={parentProduct?.ParentProductID}
                                        label="Parent Product"
                                        onChange={(e: any) => { changeBaseProduct(e); }}
                                    >
                                        {
                                            data?.baseProducts?.filter((parent: any) => parent?.ProductName !== editableProduct.ProductName)?.map((product: any, index: number) => (
                                                <sdkMui.MenuItem
                                                    defaultValue={parentProduct?.ParentProductID}
                                                    value={product.ProductID}
                                                    key={index}
                                                >
                                                    {product?.ProductName}
                                                </sdkMui.MenuItem>
                                            ))
                                        }
                                    </sdkMui.Select>
                                </sdkMui.FormControl>
                            </sdkMui.Grid>

                            <sdkMui.Grid item xs={3}>
                                <sdkMui.TextField
                                    fullWidth
                                    size='small'
                                    name='ProductName'
                                    required
                                    label={'Product Name'}
                                    placeholder='Enter Product Name...'
                                    value={editedProductData?.ProductName}
                                    type='text'
                                    onChange={(e) => setEditedProductData((prevState: any) => { return { ...prevState, ProductName: e.target.value } })}
                                    sx={{ p: 0 }}
                                />
                            </sdkMui.Grid>
                            <sdkMui.Grid item xs={3}>
                                <sdkMui.TextField
                                    fullWidth
                                    size='small'
                                    name='ProductCode'
                                    required
                                    label={'Product Code'}
                                    placeholder='Enter Product Code...'
                                    value={editedProductData?.ProductCode}
                                    onChange={(e) => setEditedProductData({ ...editedProductData, ProductCode: e.target.value })}
                                    sx={{ p: 0 }}
                                />
                            </sdkMui.Grid>
                            <sdkMui.Grid item xs={2}>
                                <sdkMui.FormControl size="small" variant="outlined" required fullWidth >
                                    <sdkMui.InputLabel id="demo-simple-select-label"  >UoM</sdkMui.InputLabel>
                                    <sdkMui.Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name='AppSettingUomID'
                                        value={editedProductData?.AppSettingUomID}
                                        label="UoM"
                                        onChange={(e: any) => { setEditedProductData({ ...editedProductData, AppSettingUomID: e.target.value }) }}
                                    >
                                        {
                                            data?.AppsettingUOMData?.map((UOM: any, index: number) => (
                                                <sdkMui.MenuItem
                                                    defaultValue={editedProductData?.AppSettingUomID}
                                                    value={UOM.AppSettingUomID}
                                                    key={index}
                                                >
                                                    {UOM?.UomName}
                                                </sdkMui.MenuItem>
                                            ))
                                        }
                                    </sdkMui.Select>
                                </sdkMui.FormControl>
                            </sdkMui.Grid>

                            <sdkMui.Grid item xs={2} >
                                <sdkMui.TextField
                                    size='small'
                                    type='number'
                                    name='ComparisionSaleRate'
                                    required
                                    label={'Comp. Sale Rate'}
                                    placeholder='Enter Comparision Sale Rate...'
                                    value={editedProductData?.ComparisionSaleRate}
                                    onChange={(e) => setEditedProductData({ ...editedProductData, ComparisionSaleRate: e.target.value })}
                                    sx={{ p: 0 }}
                                />
                            </sdkMui.Grid>
                            <sdkMui.Grid item xs={2} >
                                <sdkMui.TextField
                                    size='small'
                                    type='text'
                                    name='BaseSaleRate'
                                    required
                                    label={'Base Sale Rate'}
                                    placeholder='Enter Base Sale Rate...'
                                    value={editedProductData?.BaseSaleRate}
                                    onChange={(e) => setEditedProductData({ ...editedProductData, BaseSaleRate: e.target.value })}
                                    sx={{ p: 0 }}
                                />
                            </sdkMui.Grid>
                            <sdkMui.Grid item xs={2}>
                                <sdkMui.FormControl size="small" variant="outlined" required fullWidth >
                                    <sdkMui.InputLabel id="demo-simple-select-label"  >Currency</sdkMui.InputLabel>
                                    <sdkMui.Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name='CurrencyID'
                                        value={editedProductData?.CurrencyID}
                                        label="Currency"
                                        onChange={(e: any) => { setEditedProductData({ ...editedProductData, CurrencyID: e.target.value }) }}
                                    >
                                        {
                                            data?.currencyData?.map((currency: any, index: number) => (
                                                <sdkMui.MenuItem
                                                    defaultValue={editedProductData?.CurrencyID}
                                                    value={currency.CurrencyID}
                                                    key={index}
                                                >
                                                    {currency?.CurrencyCode}
                                                </sdkMui.MenuItem>
                                            ))
                                        }
                                    </sdkMui.Select>
                                </sdkMui.FormControl>
                            </sdkMui.Grid>

                            <sdkMui.Grid item xs={3} >
                                <sdkMui.TextField
                                    size='small'
                                    name='ProductUPC'
                                    required
                                    label={'UPC'}
                                    inputProps={{
                                        maxLength: 12,
                                        minLength: 12
                                    }}
                                    placeholder='Enter UPC...'
                                    value={editedProductData?.ProductUPC}
                                    onChange={(e) => setEditedProductData((prevState: any) => { return { ...prevState, ProductUPC: e.target.value } })}
                                    sx={{ p: 0 }}
                                    fullWidth
                                />
                            </sdkMui.Grid>

                            <sdkMui.Grid item xs={3} >
                                <sdkMui.TextField
                                    size='small'
                                    name='ProductSKU'
                                    required
                                    label={'SKU'}
                                    inputProps={{
                                        maxLength: 12,
                                        minLength: 8,
                                        pattern: '^[a-zA-Z0-9-]*$'
                                    }}
                                    placeholder='Enter SKU...'
                                    value={editedProductData?.ProductSKU}
                                    onChange={(e) => {
                                        const validatedValue = e.target.value.replace(/[^a-zA-Z0-9-]/g, '');
                                        setEditedProductData({ ...editedProductData, ProductSKU: validatedValue.slice(0, 12) })
                                    }}
                                    sx={{ p: 0 }}
                                    fullWidth
                                />
                            </sdkMui.Grid>
                            <sdkMui.Grid item xs={2}>
                                <sdkMui.Typography>Is Purchased </sdkMui.Typography>
                                <Switch defaultChecked={isEnablePurchase} onChange={(e: any) => { changeIsPurchased(e); }} />
                            </sdkMui.Grid>
                            <sdkMui.Grid item xs={2}>
                                {isEnableSaleFlagLoading ?
                                    <sdkMui.CircularProgress color="inherit" size={18} /> : <>
                                        <sdkMui.Typography> Is Sellable </sdkMui.Typography>
                                        <Switch defaultChecked={isEnableSale} onChange={(e: any) => { changeIsSellable(e); }} />
                                    </>}
                            </sdkMui.Grid>
                            <sdkMui.Grid item xs={2}>
                                {isEnableAvailabilityFlagLoading ?
                                    <sdkMui.CircularProgress color="inherit" size={18} /> : <>
                                        <sdkMui.Typography> Is Enable </sdkMui.Typography>
                                        <Switch defaultChecked={isEnableProduct} onChange={(e: any) => { changeIsAvailability(e); }} />
                                    </>}
                            </sdkMui.Grid>

                        </sdkMui.Grid>
                    </sdkMui.Grid>
                </sdkMui.Grid>
            </form>
            {
                successEditProductMessage &&
                <Snackbar
                    configs={{
                        dataTestID: 'Success-Product-Edit',
                        severity: 'success',
                        alertDescription: messages?.PRODUCT_EDIT_MESSAGE,
                        isSetOpen: successEditProductMessage,
                        snackbarAutoHideDuration: 3000
                    }}
                />
            }
            {
                successParentProductMessage &&
                <Snackbar
                    configs={{
                        dataTestID: 'Success-Parent-Product-Edit',
                        severity: 'success',
                        alertDescription: messages?.PARENT_PRODUCT_MESSAGE,
                        isSetOpen: successParentProductMessage,
                        snackbarAutoHideDuration: 3000
                    }}
                />
            }

            {
                enablePurchaseMessage &&
                <Snackbar
                    configs={{
                        dataTestID: 'Enable-Purchase',
                        severity: 'success',
                        alertDescription: purchaseStatusMessage,
                        isSetOpen: enablePurchaseMessage,
                        snackbarAutoHideDuration: 3000
                    }}
                />
            }
            {
                disablePurchaseMessage &&
                <Snackbar
                    configs={{
                        dataTestID: 'Disable-Purchase',
                        severity: 'success',
                        alertDescription: purchaseStatusMessage,
                        isSetOpen: disablePurchaseMessage,
                        snackbarAutoHideDuration: 3000
                    }}
                />
            }
            {
                enableSaleMessage &&
                <Snackbar
                    configs={{
                        dataTestID: 'Enable-Sale',
                        severity: 'success',
                        alertDescription: saleStatusMessage,
                        isSetOpen: enableSaleMessage,
                        snackbarAutoHideDuration: 3000
                    }}
                />
            }
            {
                disableSaleMessage &&
                <Snackbar
                    configs={{
                        dataTestID: 'Disable-Sale',
                        severity: 'success',
                        alertDescription: saleStatusMessage,
                        isSetOpen: disableSaleMessage,
                        snackbarAutoHideDuration: 3000
                    }}
                />
            }
            {
                enableAvailabilityMessage &&
                <Snackbar
                    configs={{
                        dataTestID: 'Enable-Availability',
                        severity: 'success',
                        alertDescription: availabilityStatusMessage,
                        isSetOpen: enableAvailabilityMessage,
                        snackbarAutoHideDuration: 3000
                    }}
                />
            }
            {
                enableSaleErrorMessage &&
                <Snackbar
                    configs={{
                        dataTestID: 'Enable-Availability',
                        severity: 'error',
                        alertDescription: displayErrorMessage,
                        isSetOpen: enableSaleErrorMessage,
                        snackbarAutoHideDuration: 3000
                    }}
                />
            }
            {
                disableAvailabilityMessage &&
                <Snackbar
                    configs={{
                        dataTestID: 'Disable-Availability',
                        severity: 'success',
                        alertDescription: availabilityStatusMessage,
                        isSetOpen: disableAvailabilityMessage,
                        snackbarAutoHideDuration: 3000
                    }}
                />
            }
            {
                closePopup &&
                <sdkMui.Dialog
                    open={closePopup}
                    keepMounted
                >
                    <sdkMui.DialogContent>
                        <sdkMui.DialogContentText>
                            <b>Your changes will be lost, Are you sure want to Cancel..?</b>
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
                                handleButtonClick: () => { setClosePopup(false); configs?.router?.push(helper?.constructDynamicURL(`/merchants/[merchantkey]/products/products`, { "merchantkey": configs?.merchantkey })) }
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
            {/* </sdkMui.Card> */}
        </>
    )
}