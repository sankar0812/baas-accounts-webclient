/**
 * Created By : Pradeepa S
 * Created Date : 08 Nov 2023
 * Description : This function contain add package functionality for a particular product
 */

import React, { useEffect, useState } from 'react';
import { CreatePackageInterface } from '@/interfaces/components/products/product/package/CreatePackageinterface'
import { Button, sdkMui } from '@baas/platform-web-sdk';
import _ from 'lodash'
import { Helper } from '@/utils/Helper';
import { AlertProps } from '@mui/material/Alert';
import { Constants } from '@/utils/Constants';
import { Messages } from '@/utils/Messages';

const helper = new Helper()
const messages = new Messages()
const constants = new Constants()

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <sdkMui.Alert elevation={6} ref={ref} variant="filled" {...props} />;
});

//createBy and created Auth Id details
const AuthID = JSON.parse(helper?.getCookie(constants?.AUTH_INFO_COOKIE_NAME))?.AuthID
const AuthName = JSON.parse(helper?.getCookie(constants?.AUTH_INFO_COOKIE_NAME))?.ContactPerson?.ContactPersonName

export function CreatePacakge({ configs, data, callbacks }: CreatePackageInterface) {

    const UserInfo = {
        "CreatedAuthID": AuthID,
        "CreatedBy": AuthName,
        "ModifiedAuthID": AuthID,
        "ModifiedBy": AuthName
    }
    const [PackageInfo, setPackageInfo] = useState({
        "ProductID": parseInt(configs?.router?.query?.productid),
        "PackageTypeID": '',
        "Length": '',
        "LengthUom": "",
        "Width": "",
        "WidthUom": "",
        "Height": "",
        "HeightUom": "",
        "Weight": "",
        "WeightUom": "",
        "PackageCount": "",
    })
    const [isButtonloading, setIsButtonLoading] = useState(false)
    const [productName, setProductName] = useState()
    const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true)
    const [displayErrorMessage, setDisplayErrorMessage] = useState(false)

    const handlePackageInfoChange = (e: any) => {

        setPackageInfo((prevState: any) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleFormClose = () => {
        const createPacakgeData = {
            "ProductID": parseInt(configs?.router?.query?.productid),
            "PackageTypeID": '',
            "Length": '',
            "LengthUom": "",
            "Width": "",
            "WidthUom": "",
            "Height": "",
            "HeightUom": "",
            "Weight": "",
            "WeightUom": "",
            "PackageCount": "",
        }

        if (_.isEqual(createPacakgeData, PackageInfo)) {
            callbacks?.handleClosePackageForm(false)
        }
        else {
            callbacks?.handleClosePackageForm(true)
        }
    }

    const getProductName = async () => {
        let response = await configs?.functionObject?.readProductForEdit(parseInt(configs?.router?.query?.productid))
        setProductName(response?.output[0]?.ProductName)
    }

    const handleAddPackage = async () => {
        setIsButtonLoading(true)
        let request = { UserInfo, PackageInfo }
        let response = await configs?.functionObject?.addProductPackage(request)
        if (response?.status === 409) {
            setDisplayErrorMessage(true)
            setTimeout(() => {
                setDisplayErrorMessage(true)
                setIsButtonLoading(false)
            }, 3000)

        }
        else {
            callbacks?.handleCreatePackage(response)
            setIsButtonLoading(false)
        }
    }

    useEffect(() => {
        getProductName()
    })

    useEffect(() => {
        let ediData = {
            "ProductID": parseInt(configs?.router?.query?.productid),
            "PackageTypeID": '',
            "Length": '',
            "LengthUom": "",
            "Width": "",
            "WidthUom": "",
            "Height": "",
            "HeightUom": "",
            "Weight": "",
            "WeightUom": "",
            "PackageCount": "",
        }
        if (!_.isEqual(ediData, PackageInfo)) {
            setIsSaveButtonDisabled(false)
        }
        else {
            setIsSaveButtonDisabled(true)
        }
    }, [PackageInfo])

    return (
        <>
            <sdkMui.Box sx={{ p: 1, }}>
                <form onSubmit={(e: any) => { e?.preventDefault(); handleAddPackage() }}>
                    <sdkMui.Grid container spacing={2} sx={{ p: { xs: 0, sm: 0, md: 0, lg: 1, xl: 1 }, pl: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0 } }}>
                        {/* <sdkMui.Grid item xs={2} textAlign={'left'}>
                            <sdkMui.Typography variant='h4' fontWeight={'bold'}>Create New Package</sdkMui.Typography>
                        </sdkMui.Grid> */}
                        <sdkMui.Grid xs={11.5} sx={{ mt: 1.5 }} textAlign={'right'}>
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
                                    dataTestID: 'Package-save-button',
                                    isButtonloading: isButtonloading
                                }}
                            />
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={0.5} textAlign={'right'}>
                            <span className='material-symbols-outlined' style={{ cursor: 'pointer' }} onClick={() => { handleFormClose() }}>close</span>
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={3} alignItems={'center'} >
                            <sdkMui.TextField variant='outlined'
                                fullWidth
                                size='small'
                                label='Product Name'
                                InputProps={{
                                    readOnly: true,
                                    startAdornment: (
                                        <>
                                            <sdkMui.Typography variant='body2'></sdkMui.Typography>
                                        </>
                                    )
                                }}
                                value={productName} />
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={3}>
                            <sdkMui.FormControl size="small" variant="outlined" required fullWidth >
                                <sdkMui.InputLabel id="demo-simple-select-label"  >Package Type</sdkMui.InputLabel>
                                <sdkMui.Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name='PackageTypeID'
                                    value={PackageInfo?.PackageTypeID}
                                    label="Package Type"
                                    onChange={(e: any) => { handlePackageInfoChange(e) }}
                                >
                                    {
                                        data?.PackageTypeData?.map((packageType: any, index: number) => (
                                            <sdkMui.MenuItem value={packageType.PackageTypeID} key={index}> {packageType?.PackageType}</sdkMui.MenuItem>
                                        ))
                                    }
                                </sdkMui.Select>
                            </sdkMui.FormControl>
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={2} >
                            <sdkMui.TextField
                                fullWidth
                                size='small'
                                name='PackageCount'
                                required
                                label={'Package Count'}
                                placeholder='Enter Package Count...'
                                value={PackageInfo?.PackageCount}
                                onChange={(e: any) => { handlePackageInfoChange(e) }}
                                sx={{ p: 0 }}
                            />
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={2}>
                            <sdkMui.TextField
                                fullWidth
                                size='small'
                                required
                                name='Length'
                                label={'Length'}
                                placeholder='Enter Length...'
                                value={PackageInfo?.Length}
                                onChange={(e: any) => { handlePackageInfoChange(e) }}
                                sx={{ p: 0 }}
                            />
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={2}>
                            <sdkMui.TextField
                                fullWidth
                                size='small'
                                required
                                name='LengthUom'
                                label={'Length Uom'}
                                placeholder='Enter Length Uom...'
                                value={PackageInfo?.LengthUom}
                                onChange={(e: any) => { handlePackageInfoChange(e) }}
                                sx={{ p: 0 }}
                            />
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={2}>
                            <sdkMui.TextField
                                fullWidth
                                size='small'
                                name='Width'
                                required
                                label={'Width'}
                                placeholder='Enter Width...'
                                value={PackageInfo?.Width}
                                onChange={(e: any) => { handlePackageInfoChange(e) }}
                                sx={{ p: 0 }}
                            />
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={2}>
                            <sdkMui.TextField
                                fullWidth
                                size='small'
                                name='WidthUom'
                                required
                                label={'Width Uom'}
                                placeholder='Enter Width Uom...'
                                value={PackageInfo?.WidthUom}
                                onChange={(e: any) => { handlePackageInfoChange(e) }}
                                sx={{ p: 0 }}
                            />
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={2}>
                            <sdkMui.TextField
                                fullWidth
                                size='small'
                                name='Height'
                                required
                                label={'Height'}
                                placeholder='Enter Height...'
                                value={PackageInfo?.Height}
                                onChange={(e: any) => { handlePackageInfoChange(e) }}
                                sx={{ p: 0 }}
                            />
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={2}>
                            <sdkMui.TextField
                                fullWidth
                                size='small'
                                name='HeightUom'
                                required
                                label={'Height Uom'}
                                placeholder='Enter Height Uom...'
                                value={PackageInfo?.HeightUom}
                                onChange={(e: any) => { handlePackageInfoChange(e) }}
                                sx={{ p: 0 }}
                            />
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={2}>
                            <sdkMui.TextField
                                fullWidth
                                size='small'
                                name='Weight'
                                required
                                label={'Weight'}
                                placeholder='Enter Weight...'
                                value={PackageInfo?.Weight}
                                onChange={(e: any) => { handlePackageInfoChange(e) }}
                                sx={{ p: 0 }}
                            />
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={2} sx={{ pb: 2 }}>
                            <sdkMui.TextField
                                fullWidth
                                size='small'
                                name='WeightUom'
                                required
                                label={'Weight Uom'}
                                placeholder='Enter Weight Uom...'
                                value={PackageInfo?.WeightUom}
                                onChange={(e: any) => { handlePackageInfoChange(e) }}
                                sx={{ p: 0 }}
                            />
                        </sdkMui.Grid>
                    </sdkMui.Grid>
                </form>
                {displayErrorMessage &&
                    <Alert data-testid="Instanceservice-Duplicate-Message" sx={{ mt: 2 }} severity="error">{messages?.DUPLICATE_PRODUCT_PACKAGE}</Alert>
                }
            </sdkMui.Box>
        </>
    )
}