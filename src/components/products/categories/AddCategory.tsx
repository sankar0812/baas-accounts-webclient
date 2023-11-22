/**
 * Created By : Pradeepa S
 * Created Date : Nov 14 2023
 * Description : This Page contain add category functionlaity
 */

import React, { useEffect, useState } from 'react';
import { AddCategoryInterface } from '@/interfaces/components/products/category/AddCategoryInterface';
import { Button, sdkMui } from '@baas/platform-web-sdk';
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

export function AddCategory({ configs, callbacks }: AddCategoryInterface) {
    const UserInfo = {
        "CreatedAuthID": AuthID,
        "CreatedBy": AuthName,
        "ModifiedAuthID": AuthID,
        "ModifiedBy": AuthName
    }
    const [CategoryInfo, setCategoryInfo] = useState({
        "CategoryName": '',
        "CategoryCode": '',
        "Description": ''
    })
    const [isSaveButtonLoading, setIsSaveButtonLoading] = useState(false)
    const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true)
    const [displayErrorMessage, setDisplayErrorMessage] = useState(false)

    const handleCategoryInfoChange = (e: any) => {
        setCategoryInfo((prevState: any) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            };
        });
    }

    const handleAddCategory = async () => {
        setIsSaveButtonLoading(true)
        let request = { UserInfo, CategoryInfo }
        let response = await configs?.functionObject?.addCategory(request)
        if (response?.status === 409) {
            setDisplayErrorMessage(true)
            setTimeout(() => {
                setDisplayErrorMessage(false)
                setIsSaveButtonLoading(false)
            }, 3000)
        }
        else {
            callbacks?.handleAddCategory(response)
            setIsSaveButtonLoading(false)
        }
    }

    const handleFormClose = () => {
        let createCategoryInfo = {
            "CategoryName": '',
            "CategoryCode": '',
            "Description": ''
        }
        if (_.isEqual(createCategoryInfo, CategoryInfo)) {
            callbacks?.handleFormClose(false)
        }
        else {
            callbacks?.handleFormClose(true)
        }
    }

    useEffect(() => {
        let ediData = {
            "CategoryName": '',
            "CategoryCode": '',
            "Description": ''
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
            <sdkMui.Grid container spacing={2} alignItems={'center'} sx={{ background: (theme) => theme.palette.primary.main, color: (theme) => theme.palette.primary.contrastText }}>
                <sdkMui.Grid item xs={10} data-testid={'Add_Category_Title'} >
                    <sdkMui.Typography variant='h4' textAlign={'center'} fontWeight={'bold'} sx={{ p: 2, pt: 2 }}>Add New Category</sdkMui.Typography>
                </sdkMui.Grid>
                <sdkMui.Grid item xs={2} sx={{ textAlign: 'right' }} data-testid={'Add_Category_Form_Close'} >
                    <span className='material-symbols-outlined' style={{ cursor: 'pointer', fontSize: '20px', fontWeight: 'bold', padding: '8px' }} onClick={() => { handleFormClose() }}>close</span>
                </sdkMui.Grid>
            </sdkMui.Grid>

            <sdkMui.Box sx={{ p: 2 }}>
                <sdkMui.Grid item xs={12} sx={{ mt: 1 }}>
                    <form onSubmit={(e: any) => { e?.preventDefault(); handleAddCategory() }} data-testid={configs?.datatestID}>
                        <sdkMui.Grid container spacing={2}>
                            <sdkMui.Grid item xs={12}>
                                <sdkMui.TextField
                                    data-testid={'Category_Name_TextField'}
                                    name='CategoryName'
                                    label={'Category Name'}
                                    required
                                    fullWidth
                                    value={CategoryInfo?.CategoryName}
                                    placeholder='Enter Category Name ....'
                                    variant='standard'
                                    onChange={(e: any) => handleCategoryInfoChange(e)}
                                />
                            </sdkMui.Grid>
                            <sdkMui.Grid item xs={12}>
                                <sdkMui.TextField
                                    data-testid={'Category_Code_TextField'}
                                    name='CategoryCode'
                                    label={'Category Code'}
                                    required
                                    fullWidth
                                    value={CategoryInfo?.CategoryCode}
                                    placeholder='Enter Category Code ....'
                                    variant='standard'
                                    onChange={(e: any) => handleCategoryInfoChange(e)}
                                />
                            </sdkMui.Grid>
                            <sdkMui.Grid item xs={12}>
                                <sdkMui.TextField
                                    data-testid={'Description_TextField'}
                                    name='Description'
                                    label={'Description'}
                                    fullWidth
                                    value={CategoryInfo?.Description}
                                    placeholder='Enter Description ....'
                                    variant='standard'
                                    onChange={(e: any) => handleCategoryInfoChange(e)}
                                />
                            </sdkMui.Grid>
                            <sdkMui.Grid item xs={12} sx={{ mt: 3, textAlign: 'center' }}>
                                <Button
                                    callbacks={{
                                        handleButtonClick: () => { }
                                    }}
                                    configs={{
                                        label: 'Create Category',
                                        color: 'primary',
                                        size: 'small',
                                        type: "submit",
                                        varient: 'contained',
                                        isButtonDisabled: isSaveButtonDisabled,
                                        dataTestID: 'Category-save-button',
                                        isButtonloading: isSaveButtonLoading
                                    }}
                                />
                            </sdkMui.Grid>

                        </sdkMui.Grid>
                    </form>
                </sdkMui.Grid>
                {displayErrorMessage &&
                    <Alert data-testid="Instanceservice-Duplicate-Message" sx={{ mt: 2 }} severity="error">{messages?.DUPLICATE_CATEGORY_MESSAGE}</Alert>
                }
            </sdkMui.Box>
        </>
    )
}