/**
 * Created By : Pradeepa S
 * Created Date : Nov 08 2023
 * Description : This component contain add product functionality
 */

import React, { useEffect, useState } from 'react';
import { Button, sdkMui } from '@baas/platform-web-sdk'
import { AddProductInterface } from '@/interfaces/components/products/product/AddProductInterface'
import { Constants } from '@/utils/Constants';
import { Helper } from '@/utils/Helper';
import _ from 'lodash'
import { AlertProps } from '@mui/material/Alert';
import { Messages } from '@/utils/Messages';

const constants = new Constants()
const helper = new Helper()
const messages = new Messages()

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <sdkMui.Alert elevation={6} ref={ref} variant="filled" {...props} />;
});

//createBy and created Auth Id details
const AuthID = JSON.parse(helper?.getCookie(constants?.AUTH_INFO_COOKIE_NAME))?.AuthID
const AuthName = JSON.parse(helper?.getCookie(constants?.AUTH_INFO_COOKIE_NAME))?.ContactPerson?.ContactPersonName

export function AddProduct({ configs, data, callbacks }: AddProductInterface) {

    //useStates
    const [UserInfo, setUserInfo] = useState({
        "CreatedAuthID": AuthID,
        "CurrencyID": '',
        "CreatedBy": AuthName,
        "ModifiedAuthID": AuthID,
        "ModifiedBy": AuthName
    })
    const [ProductInfo, setProductInfo] = useState({
        "ProductName": '',
        "ProductCode": '',
        "AppSettingUomID": '',
        "BaseSaleRate": '',
        "ComparisionSaleRate": ''
    })
    const [isSaveButtonLoading, setIsSaveButtonLoading] = useState(false)
    const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true)
    const [displayErrorMessage, setDisplayErrorMessage] = useState(false)
    const [isBaseProductGreaterMessageOpen, setIsBaseProductGreaterMessageOpen] = useState(false)

    const handleProductInfoChange = (e: any) => {
        setProductInfo((prevState: any) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            };
        });

    }

    const handleCurrencyDataChange = (e: any) => {
        setUserInfo((prevState: any) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleAddProduct = async () => {
        setIsSaveButtonLoading(true)
        if (ProductInfo?.BaseSaleRate > ProductInfo?.ComparisionSaleRate) {
            setIsBaseProductGreaterMessageOpen(true)
            setTimeout(() => {
                setIsBaseProductGreaterMessageOpen(false)
                setIsSaveButtonLoading(false)
            }, 3000)
        }
        else {
            let request = { UserInfo, ProductInfo }
            let response = await configs?.functionObject?.addProduct(request)
            if (response?.status === 409) {
                setDisplayErrorMessage(true)
                setTimeout(() => {
                    setDisplayErrorMessage(false)
                    setIsSaveButtonLoading(false)
                }, 3000)
            }
            else {
                setIsSaveButtonLoading(false)
                callbacks?.handleAddProduct(response)
            }
        }
    }

    const handleFormClose = () => {
        let createProductInfo = {
            "ProductName": '',
            "ProductCode": '',
            "AppSettingUomID": '',
            "BaseSaleRate": '',
            "ComparisionSaleRate": ''
        }
        let UserInfoData = {
            "CreatedAuthID": AuthID,
            "CurrencyID": '',
            "CreatedBy": AuthName,
            "ModifiedAuthID": AuthID,
            "ModifiedBy": AuthName
        }
        if (_.isEqual(createProductInfo, ProductInfo) && (_.isEqual(UserInfoData, UserInfo))) {
            callbacks?.handleFormClose(false)
        }
        else {
            callbacks?.handleFormClose(true)
        }
    }

    useEffect(() => {
        let ediData = {
            "ProductName": '',
            "ProductCode": '',
            "AppSettingUomID": '',
            "BaseSaleRate": '',
            "ComparisionSaleRate": ''
        }
        let userInfoData = {
            "CreatedAuthID": AuthID,
            "CurrencyID": '',
            "CreatedBy": AuthName,
            "ModifiedAuthID": AuthID,
            "ModifiedBy": AuthName
        }
        if (!_.isEqual(ediData, ProductInfo) || !_.isEqual(userInfoData, UserInfo)) {
            setIsSaveButtonDisabled(false)
        }
        else {
            setIsSaveButtonDisabled(true)
        }
    }, [ProductInfo, UserInfo])

    return (
        <>
            <sdkMui.Grid container spacing={2} alignItems={'center'} sx={{ background: (theme) => theme.palette.primary.main, color: (theme) => theme.palette.primary.contrastText }}>
                <sdkMui.Grid item xs={10} data-testid={'Add_Product_Title'} >
                    <sdkMui.Typography variant='h4' textAlign={'center'} fontWeight={'bold'} sx={{ p: 2, pt: 2 }}>Add New Product</sdkMui.Typography>
                </sdkMui.Grid>
                <sdkMui.Grid item xs={2} sx={{ textAlign: 'right' }} data-testid={'Add_Product_Form_Close'} >
                    <span className='material-symbols-outlined' style={{ cursor: 'pointer', fontSize: '20px', fontWeight: 'bold', padding: '8px' }} onClick={() => { handleFormClose() }}>close</span>
                </sdkMui.Grid>
            </sdkMui.Grid>

            <sdkMui.Box sx={{ p: 2 }}>
                <sdkMui.Grid item xs={12} sx={{ mt: 1 }}>
                    <form onSubmit={(e: any) => { e?.preventDefault(); handleAddProduct() }} data-testid={configs?.dataTestID}>
                        <sdkMui.Grid container spacing={2}>

                            {/* <sdkMui.Grid item xs={12}>
                                <sdkMui.FormControl size="small" variant="standard" fullWidth>
                                    <sdkMui.InputLabel id="demo-simple-select-label" variant="standard" >Parent Product</sdkMui.InputLabel>
                                    <sdkMui.Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name='ParentProductID'
                                        value={ProductInfo?.ParentProductID}
                                        label="Parent Product"
                                        onChange={(e: any) => { handleProductInfoChange(e) }}
                                        size="small"
                                    >
                                        {
                                            data?.ParentProductData?.map((parentProduct: any, index: number) => (
                                                <sdkMui.MenuItem value={parentProduct.ProductID} key={index}> {parentProduct?.ProductName}</sdkMui.MenuItem>
                                            ))
                                        }
                                    </sdkMui.Select>
                                </sdkMui.FormControl>
                            </sdkMui.Grid> */}
                            <sdkMui.Grid item xs={12}>
                                <sdkMui.TextField
                                    data-testid={'Product_Name_TextField'}
                                    name='ProductName'
                                    label={'Product Name'}
                                    required
                                    fullWidth
                                    value={ProductInfo?.ProductName}
                                    placeholder='Enter Product Name ....'
                                    variant='standard'
                                    onChange={(e: any) => handleProductInfoChange(e)}
                                />
                            </sdkMui.Grid>
                            <sdkMui.Grid item xs={12}>
                                <sdkMui.TextField
                                    data-testid={'Product_Code_TextField'}
                                    name='ProductCode'
                                    label={'Product Code'}
                                    required
                                    fullWidth
                                    value={ProductInfo?.ProductCode}
                                    placeholder='Enter Product Code ....'
                                    variant='standard'
                                    onChange={(e: any) => handleProductInfoChange(e)}
                                />
                            </sdkMui.Grid>
                            <sdkMui.Grid item xs={6}>
                                <sdkMui.FormControl size="small" variant="standard" fullWidth>
                                    <sdkMui.InputLabel id="demo-simple-select-label" variant="standard" required>UoM</sdkMui.InputLabel>
                                    <sdkMui.Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name='AppSettingUomID'
                                        value={ProductInfo?.AppSettingUomID}
                                        label="UoM"
                                        onChange={(e: any) => { handleProductInfoChange(e) }}
                                        required
                                        size="small"
                                    >
                                        {
                                            data?.AppSettingUomData?.map((UoM: any, index: number) => (
                                                <sdkMui.MenuItem value={UoM.AppSettingUomID} key={index}> {UoM?.UomName}</sdkMui.MenuItem>
                                            ))
                                        }
                                    </sdkMui.Select>
                                </sdkMui.FormControl>
                            </sdkMui.Grid>
                            <sdkMui.Grid item xs={6}>
                                <sdkMui.FormControl size="small" variant="standard" fullWidth>
                                    <sdkMui.InputLabel id="demo-simple-select-label" variant="standard" required>Currency</sdkMui.InputLabel>
                                    <sdkMui.Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name='CurrencyID'
                                        value={UserInfo?.CurrencyID}
                                        label="Currency"
                                        onChange={(e: any) => { handleCurrencyDataChange(e) }}
                                        required
                                        size="small"
                                    >
                                        {
                                            data?.CurrencyData?.map((currency: any, index: number) => (
                                                <sdkMui.MenuItem value={currency.CurrencyID} key={index}> {currency?.CurrencyCode}</sdkMui.MenuItem>
                                            ))
                                        }
                                    </sdkMui.Select>
                                </sdkMui.FormControl>
                            </sdkMui.Grid>
                            <sdkMui.Grid item xs={6}>
                                <sdkMui.TextField
                                    data-testid={'BaseSaleRate_Code_TextField'}
                                    name='BaseSaleRate'
                                    label={'Base Sale Rate'}
                                    required
                                    value={ProductInfo?.BaseSaleRate}
                                    placeholder='Enter sale rate ....'
                                    variant='standard'
                                    onChange={(e: any) => handleProductInfoChange(e)}
                                />
                            </sdkMui.Grid>
                            <sdkMui.Grid item xs={6}>
                                <sdkMui.TextField
                                    data-testid={'ComparisionSaleRate_Code_TextField'}
                                    name='ComparisionSaleRate'
                                    label={'Comparision Sale Rate'}
                                    required
                                    fullWidth
                                    value={ProductInfo?.ComparisionSaleRate}
                                    placeholder='Enter comparison sale rate ....'
                                    variant='standard'
                                    onChange={(e: any) => handleProductInfoChange(e)}
                                />
                            </sdkMui.Grid>
                            <sdkMui.Grid item xs={12} sx={{ mt: 3, textAlign: 'center' }}>
                                <Button
                                    callbacks={{
                                        handleButtonClick: () => { }
                                    }}
                                    configs={{
                                        label: 'Create Product',
                                        color: 'primary',
                                        size: 'small',
                                        type: "submit",
                                        varient: 'contained',
                                        isButtonDisabled: isSaveButtonDisabled,
                                        dataTestID: 'Product-save-button',
                                        isButtonloading: isSaveButtonLoading
                                    }}
                                />
                            </sdkMui.Grid>

                        </sdkMui.Grid>
                    </form>
                </sdkMui.Grid>
                {displayErrorMessage &&
                    <Alert data-testid="Product-Duplicate-Message" sx={{ mt: 2 }} severity="error">{messages?.DUPLICATE_PRODUCT_MESSAGE}</Alert>
                }
                {isBaseProductGreaterMessageOpen &&
                    <Alert data-testid="Base_Rate_Greater_Messgae" sx={{ mt: 2 }} severity="error">{messages?.BASE_RATE_GREATER_MESSAGE}</Alert>
                }
            </sdkMui.Box>

        </>
    )
}

