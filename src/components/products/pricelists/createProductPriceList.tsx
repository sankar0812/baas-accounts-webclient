/**
 * Created By   : Uma Kohila
 * Created Date : Nov 21 2023
 * Description  : This component contain add PriceList functionality
 */

import React, { useEffect, useState } from 'react';
import { Button, sdkMui } from '@baas/platform-web-sdk';
import { addProductPricelistInterface } from '@/interfaces/components/products/pricelists/addProductPriceListInterface';
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
const TenantID = JSON.parse(helper?.getCookie(constants?.TENANT_INFO_COOKIE_NAME))?.TenantID
const MerchantID = JSON.parse(helper?.getCookie(constants?.MERCHANT_INFO_COOKIE_NAME))?.MerchantID
const AuthName = JSON.parse(helper?.getCookie(constants?.AUTH_INFO_COOKIE_NAME))?.ContactPerson?.ContactPersonName

export function CreatePriceList({ configs, callbacks }: addProductPricelistInterface) {

    //useStates
    const [UserInfo] = useState({
        "MerchantID": MerchantID,
        "TenantID": TenantID,
        "CreatedAuthID": AuthID,
        "CreatedBy": AuthName,
        "ModifiedAuthID": AuthID,
        "ModifiedBy": AuthName
    })
    const [PricelistInfo, setPriceListInfo] = useState({
        "DisplayName": '',
        "PriceListCode": '',
        "Description": '',
        "StartDate": new Date().toISOString().split('T')[0],
        "PriceListStatusID": 1
    })

    const [isSaveButtonLoading, setIsSaveButtonLoading] = useState(false)
    const [isSaveButtonDisabled, setIsSaveButtonDiasbaled] = useState(true)
    const [displayErrorMessage, setDisplayErrorMessage] = useState(false)

    const handlePriceListInfoChange = (e: any) => {
        setPriceListInfo((prevState: any) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            };
        });

    }

    const handleAddPriceList = async () => {
        setIsSaveButtonLoading(true)
        let request = { UserInfo, PricelistInfo }
        request.PricelistInfo.StartDate = new Date(request?.PricelistInfo?.StartDate).toISOString()
        let response = await configs?.functionObj?.addPriceList(request)
        if (response?.status === 409) {
            setDisplayErrorMessage(true)
            setTimeout(() => {
                setDisplayErrorMessage(false)
                setIsSaveButtonLoading(false)
            }, 3000)
        }
        else {
            callbacks?.handleAddPriceList(response);            
        }
    }

    const handleFormClose = () => {
        let createPriceListInfo = {
            "DisplayName": '',
            "PriceListCode": '',
            "Description": '',
            "StartDate": new Date().toISOString().split('T')[0],
            "PriceListStatusID": 1
        }
        let UserInfoData = {
            "MerchantID": MerchantID,
            "TenantID": TenantID,
            "CreatedAuthID": AuthID,
            "CreatedBy": AuthName,
            "ModifiedAuthID": AuthID,
            "ModifiedBy": AuthName
        }
        if (_.isEqual(createPriceListInfo, PricelistInfo) && (_.isEqual(UserInfoData, UserInfo))) {
            callbacks?.handleFormClose(false)
        }
        else {
            callbacks?.handleFormClose(true)
        }
    }

    useEffect(() => {
        const CreateData = {
            "DisplayName": '',
            "PriceListCode": '',
            "Description": '',
            "StartDate": new Date().toISOString().split('T')[0],
            "PriceListStatusID": 1
        }
        if (_.isEqual(CreateData, PricelistInfo)) {
            setIsSaveButtonDiasbaled(true)
        }
        else {
            setIsSaveButtonDiasbaled(false)
        }
    }, [PricelistInfo])

    return (
        <>
            <sdkMui.Grid container spacing={2} alignItems={'center'} sx={{ background: (theme) => theme.palette.primary.main, color: (theme) => theme.palette.primary.contrastText }}>
                <sdkMui.Grid item xs={10} data-testid={'Add_PriceList_Title'} >
                    <sdkMui.Typography variant='h4' textAlign={'center'} fontWeight={'bold'} sx={{ p: 2, pt: 2 }}>Add New Price List</sdkMui.Typography>
                </sdkMui.Grid>
                <sdkMui.Grid item xs={2} sx={{ textAlign: 'right' }} data-testid={'Add-PriceList-Form-Close'} >
                    <span className='material-symbols-outlined' style={{ cursor: 'pointer', fontSize: '20px', fontWeight: 'bold', padding: '8px' }} onClick={() => { handleFormClose() }}>close</span>
                </sdkMui.Grid>
            </sdkMui.Grid>

            <sdkMui.Box sx={{ p: 2 }}>
                <sdkMui.Grid item xs={12} sx={{ mt: 1 }}>
                    <form onSubmit={(e: any) => { e?.preventDefault(); handleAddPriceList() }} data-testid={configs?.['data-testid']}>
                        <sdkMui.Grid container spacing={2}>
                            <sdkMui.Grid item xs={12}>
                                <sdkMui.TextField
                                    name='DisplayName'
                                    label={'PriceList Name'}
                                    required
                                    fullWidth
                                    value={PricelistInfo?.DisplayName}
                                    placeholder='Enter PriceList Name ....'
                                    variant='standard'
                                    onChange={(e: any) => handlePriceListInfoChange(e)}
                                />
                            </sdkMui.Grid>
                            <sdkMui.Grid item xs={12}>
                                <sdkMui.TextField
                                    data-testid={'PriceList_Code_TextField'}
                                    name='PriceListCode'
                                    label={'PriceList Code'}
                                    required
                                    fullWidth
                                    value={PricelistInfo?.PriceListCode}
                                    placeholder='Enter PriceList Code ....'
                                    variant='standard'
                                    onChange={(e: any) => handlePriceListInfoChange(e)}
                                />
                            </sdkMui.Grid>
                            <sdkMui.Grid item xs={12}>
                                <sdkMui.TextField
                                    data-testid={'PriceList_Description_TextField'}
                                    name='Description'
                                    label={'Description'}
                                    fullWidth
                                    value={PricelistInfo?.Description}
                                    placeholder='Enter Description....'
                                    variant='standard'
                                    onChange={(e: any) => handlePriceListInfoChange(e)}
                                />
                            </sdkMui.Grid>
                            <sdkMui.Grid item xs={12}>
                                <sdkMui.TextField
                                    data-testid={'PriceList_Date_TextField'}
                                    type='date'
                                    name='StartDate'
                                    label={'Start Date'}
                                    required
                                    fullWidth
                                    value={PricelistInfo?.StartDate}
                                    placeholder='Choose Date'
                                    variant='standard'
                                    onChange={(e: any) => handlePriceListInfoChange(e)}
                                />
                            </sdkMui.Grid>
                            <sdkMui.Grid item xs={12} sx={{ mt: 3, textAlign: 'center' }}>
                                <Button
                                    callbacks={{
                                        handleButtonClick: () => { }
                                    }}
                                    configs={{
                                        label: 'Create PriceList',
                                        color: 'primary',
                                        size: 'small',
                                        type: "submit",
                                        varient: 'contained',
                                        dataTestID: 'Add-PriceList-Button',
                                        isButtonloading: isSaveButtonLoading,
                                        isButtonDisabled: isSaveButtonDisabled
                                    }}
                                />
                            </sdkMui.Grid>

                        </sdkMui.Grid>
                    </form>
                </sdkMui.Grid>
                {displayErrorMessage &&
                    <Alert data-testid="AddPriceList-Duplicate-Message" sx={{ mt: 2 }} severity="error">{messages?.DUPLICATE_PRICELIST_MESSAGE}</Alert>
                }
            </sdkMui.Box>

        </>
    )

}