/**
@CreatedBy        : Hari Prakash
@CreatedTime      : Sep 9 2023
@ModifiedBy       : Hari Prakash
@ModifiedTime     : Sep 9 2023
@Description      : This file contains Delete Environment Type modal
**/

import { sdkMui } from "@baas/platform-web-sdk";
import React, { useState } from 'react';
import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';
import { Button } from '@baas/platform-web-sdk';
import { RemoveProductPackageface } from '@/interfaces/components/products/product/package/RemovePacakgeInterface';
import { Constants } from "@/utils/Constants";
import { Helper } from "@/utils/Helper";

const helper = new Helper()
const constants = new Constants()
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


//createBy and created Auth Id details
const AuthID = JSON.parse(helper?.getCookie(constants?.AUTH_INFO_COOKIE_NAME))?.AuthID
const AuthName = JSON.parse(helper?.getCookie(constants?.AUTH_INFO_COOKIE_NAME))?.ContactPerson?.ContactPersonName

export function RemoveProductPackage({ configs, callbacks }: RemoveProductPackageface) {
    const [isDeleteButtonLoading, setIsDeleteButtonLoading] = useState(false);
    const [isCancelButtonDisabled] = useState(false)

    const handleDelete = async () => {
        let request = {
            "ProductPackageID": configs?.deletedRecord?.ProductPackageID,
            "ModifiedAuthID": AuthID,
            "ModifiedBy": AuthName,
            "DeletedAuthID": AuthID,
            "DeletedBy": AuthName
        }
        setIsDeleteButtonLoading(true);
        let response = await configs?.functionObject?.removeProductPackage(request)
        if (response?.status === 200) {
            callbacks.handlePackageDeleteFormSubmit(response);
            callbacks?.handlePackageDeleteFormClose();
            setIsDeleteButtonLoading(false);
        }
    };
    const handleCancel = async () => {
        callbacks?.handlePackageDeleteFormClose();
    };


    return (
        <>
            <sdkMui.Dialog
                open={configs?.isDialogShow}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
            >
                <sdkMui.DialogTitle data-testid='Delete-Model-Title' sx={{ fontSize: '16px', fontWeight: 'bold' }}>{configs?.title}</sdkMui.DialogTitle>
                <sdkMui.DialogContent >
                    <sdkMui.DialogContentText sx={{ pl: 2 }} data-testid='Delete-Model-Confirm-Message' id="alert-dialog-slide-description">
                        Do you want to remove {configs?.deletedRecord?.EnvironmentType}?
                    </sdkMui.DialogContentText>
                </sdkMui.DialogContent>
                <sdkMui.DialogActions>
                    <Button
                        callbacks={{
                            handleButtonClick: () => { handleCancel() }
                        }}
                        configs={{
                            label: 'Cancel',
                            color: 'secondary',
                            size: 'small',
                            type: 'button',
                            startIcon: (
                                <span style={{ marginRight: '-7px' }} className="material-symbols-outlined">
                                    cancel
                                </span>
                            ),
                            varient: 'contained',
                            isButtonDisabled: isCancelButtonDisabled,
                            isButtonloading: isCancelButtonDisabled,
                            dataTestID: 'EnvironmentType-Delete-Model-Cancel-Button'
                        }}
                    />
                    <Button
                        callbacks={{
                            handleButtonClick: handleDelete,
                        }}
                        configs={{
                            label: 'Delete',
                            color: 'error',
                            size: 'small',
                            type: 'button',
                            startIcon: (
                                <span style={{ marginRight: '-7px' }} className="material-symbols-outlined">
                                    delete
                                </span>
                            ),
                            varient: 'contained',
                            isButtonDisabled: isDeleteButtonLoading,
                            isButtonloading: isDeleteButtonLoading,
                            dataTestID: 'EnvironmentType-Delete-Model-Delete-Button'
                        }}
                    />
                </sdkMui.DialogActions>
            </sdkMui.Dialog>
        </>
    );
}
