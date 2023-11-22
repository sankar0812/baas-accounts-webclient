/**
 * Created By : Vinoth S
 * Created Date : Nov 14 2023
 * Description : This component contain add store functionality
 */

import React, { useEffect, useState } from 'react';
import { Button, sdkMui } from '@baas/platform-web-sdk';
import { SelectChangeEvent } from '@mui/material/Select'
import { AddStoreInterface } from '@/interfaces/components/products/stores/AddStoresInterface'
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

export function AddStore({ configs, data, callbacks }: AddStoreInterface) {

    //useStates
    const [selectedStoreTypeID, setselectedStoreTypeID] = useState('')

    const [UserInfo, setUserInfo] = useState({
        "MerchantID": '',
        "TenantID": '',
        "CreatedAuthID": AuthID,
        "CreatedBy": AuthName,
        "ModifiedAuthID": AuthID,
        "ModifiedBy": AuthName
    })
    const [StoreInfo, setStoreInfo] = useState({
        "StoreTypeID": selectedStoreTypeID,
        "StoreName": '',
        "StoreCode": '',
        "Description": '',
        "StartDate": new Date().toISOString().split('T')[0],
    })

    const [isSaveButtonLoading, setIsSaveButtonLoading] = useState(false)
    const [isSaveButtonDisabled, setIsSaveButtonDiasbaled] = useState(true)
    const [displayErrorMessage, setDisplayErrorMessage] = useState(false)

    const handleStoreInfoChange = (e: any) => {
        setStoreInfo((prevState: any) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            };
        });

    }

    const handleAddStore = async () => {
        setIsSaveButtonLoading(true)
        let request = { UserInfo, StoreInfo }
        request.StoreInfo.StartDate = new Date(request?.StoreInfo?.StartDate).toISOString()
        let response = await configs?.functionObject?.addStore(request)
        if (response?.status === 409) {
            setDisplayErrorMessage(true)
            setTimeout(() => {
                setDisplayErrorMessage(false)
                setIsSaveButtonLoading(false)
            }, 3000)
        }
        else {
            callbacks?.handleAddStore(response)
        }
    }


    const handleStoreTypeDropDownChange = (event: SelectChangeEvent) => {
        setselectedStoreTypeID(event?.target?.value)
        setUserInfo((prevState: any) => {
            return {
                ...prevState,
                "MerchantID": data?.StoreTypeData?.find((data: any) => data?.StoreTypeName === event?.target?.value)?.MerchantID,
                "TenantID": data?.StoreTypeData?.find((data: any) => data?.StoreTypeName === event?.target?.value)?.TenantID
            };
        });
        setStoreInfo((prevState: any) => {
            return {
                ...prevState,
                "StoreTypeID": data?.StoreTypeData?.find((data: any) => data?.StoreTypeName === event?.target?.value)?.StoreTypeID
            }
        })
    }

    const handleFormClose = () => {
        let createStoreInfo = {
            "StoreTypeID": selectedStoreTypeID,
            "StoreName": '',
            "StoreCode": '',
            "Description": '',
            "StartDate": new Date().toISOString().split('T')[0],
        }
        let UserInfoData = {
            "MerchantID": '',
            "TenantID": '',
            "CreatedAuthID": AuthID,
            "CreatedBy": AuthName,
            "ModifiedAuthID": AuthID,
            "ModifiedBy": AuthName
        }
        if (_.isEqual(createStoreInfo, StoreInfo) && (_.isEqual(UserInfoData, UserInfo))) {
            callbacks?.handleFormClose(false)
        }
        else {
            callbacks?.handleFormClose(true)
        }
    }

    useEffect(() => {
        const CreateData = {
            "StoreTypeID": selectedStoreTypeID,
            "StoreName": '',
            "StoreCode": '',
            "Description": '',
            "StartDate": new Date().toISOString().split('T')[0],
        }
        if (_.isEqual(CreateData, StoreInfo)) {
            setIsSaveButtonDiasbaled(true)
        }
        else {
            setIsSaveButtonDiasbaled(false)
        }
    }, [StoreInfo])

    return (
        <>
            <sdkMui.Grid container spacing={2} alignItems={'center'} sx={{ background: (theme) => theme.palette.primary.main, color: (theme) => theme.palette.primary.contrastText }}>
                <sdkMui.Grid item xs={10} data-testid={'Add_Store_Title'} >
                    <sdkMui.Typography variant='h4' textAlign={'center'} fontWeight={'bold'} sx={{ p: 2, pt: 2 }}>Add New Store</sdkMui.Typography>
                </sdkMui.Grid>
                <sdkMui.Grid item xs={2} sx={{ textAlign: 'right' }} data-testid={'Add-Store-Form-Close'} >
                    <span className='material-symbols-outlined' style={{ cursor: 'pointer', fontSize: '20px', fontWeight: 'bold', padding: '8px' }} onClick={() => { handleFormClose() }}>close</span>
                </sdkMui.Grid>
            </sdkMui.Grid>

            <sdkMui.Box sx={{ p: 2 }}>
                <sdkMui.Grid item xs={12} sx={{ mt: 1 }}>
                    <form onSubmit={(e: any) => { e?.preventDefault(); handleAddStore() }} data-testid={configs?.datatestID}>
                        <sdkMui.Grid container spacing={2}>

                            <sdkMui.Grid item xs={12}>
                                <sdkMui.FormControl size="small" variant="standard" fullWidth>
                                    <sdkMui.InputLabel id="demo-simple-select-label" variant="standard" >Store Type</sdkMui.InputLabel>
                                    <sdkMui.Select
                                        data-testid={'Store_Name_TextField'}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name='StoreTypeID'
                                        value={selectedStoreTypeID}
                                        label="Store Type"
                                        onChange={(e: any) => { handleStoreTypeDropDownChange(e) }}
                                        size="small"
                                    >
                                        {
                                            data?.StoreTypeData?.map((storeType: any, index: number) => (
                                                <sdkMui.MenuItem value={storeType.StoreTypeName} key={index}> {storeType?.StoreTypeName}</sdkMui.MenuItem>
                                            ))
                                        }
                                    </sdkMui.Select>
                                </sdkMui.FormControl>
                            </sdkMui.Grid>
                            <sdkMui.Grid item xs={12}>
                                <sdkMui.TextField
                                    name='StoreName'
                                    label={'Store Name'}
                                    required
                                    fullWidth
                                    value={StoreInfo?.StoreName}
                                    placeholder='Enter Product Name ....'
                                    variant='standard'
                                    onChange={(e: any) => handleStoreInfoChange(e)}
                                />
                            </sdkMui.Grid>
                            <sdkMui.Grid item xs={12}>
                                <sdkMui.TextField
                                    data-testid={'Store_Code_TextField'}
                                    name='StoreCode'
                                    label={'Store Code'}
                                    required
                                    fullWidth
                                    value={StoreInfo?.StoreCode}
                                    placeholder='Enter Store Code ....'
                                    variant='standard'
                                    onChange={(e: any) => handleStoreInfoChange(e)}
                                />
                            </sdkMui.Grid>
                            <sdkMui.Grid item xs={12}>
                                <sdkMui.TextField
                                    data-testid={'Store_Description_TextField'}
                                    name='Description'
                                    label={'Description'}
                                    fullWidth
                                    value={StoreInfo?.Description}
                                    placeholder='Enter Description....'
                                    variant='standard'
                                    onChange={(e: any) => handleStoreInfoChange(e)}
                                />
                            </sdkMui.Grid>
                            <sdkMui.Grid item xs={12}>
                                <sdkMui.TextField
                                    data-testid={'Store_Date_TextField'}
                                    type='date'
                                    name='StartDate'
                                    label={'Start Date'}
                                    required
                                    fullWidth
                                    value={StoreInfo?.StartDate}
                                    placeholder='Choose Date'
                                    variant='standard'
                                    onChange={(e: any) => handleStoreInfoChange(e)}
                                />
                            </sdkMui.Grid>
                            <sdkMui.Grid item xs={12} sx={{ mt: 3, textAlign: 'center' }}>
                                <Button
                                    callbacks={{
                                        handleButtonClick: () => { }
                                    }}
                                    configs={{
                                        label: 'Create Store',
                                        color: 'primary',
                                        size: 'small',
                                        type: "submit",
                                        varient: 'contained',
                                        dataTestID: 'Add-Store-Button',
                                        isButtonloading: isSaveButtonLoading,
                                        isButtonDisabled: isSaveButtonDisabled
                                    }}
                                />
                            </sdkMui.Grid>

                        </sdkMui.Grid>
                    </form>
                </sdkMui.Grid>
                {displayErrorMessage &&
                    <Alert data-testid="AddStore-Duplicate-Message" sx={{ mt: 2 }} severity="error">{messages?.DUPLICATE_STORE_MESSAGE}</Alert>
                }
            </sdkMui.Box>

        </>
    )

}