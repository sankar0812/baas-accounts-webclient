import React, { useState, useEffect } from "react";
import { Button, sdkMui } from "@baas/platform-web-sdk";
import { InvoicesColumnSettingsInterface } from '../../../interfaces/components/sales/invoices/InvoicesColumnSettingsInterface';

export function InvoiceColumnSettings({ configs, data, callbacks }: InvoicesColumnSettingsInterface) {
    const [columnTitle] = useState(configs?.title);
    const [columnDetails, setColumnDetails] = useState(data?.columnsDetails);

    const handleOnCheck = (index: number) => {
        const updatedColumnDetails:any = [...columnDetails];
        updatedColumnDetails[index].IsVisible = !updatedColumnDetails[index].IsVisible;
        setColumnDetails(updatedColumnDetails);
    }

    const handleClose = () =>{
        callbacks?.handleClose()
    }

    const handleClearAll = () => {
        const updatedColumnDetails = [...columnDetails];
        updatedColumnDetails.forEach((item: any) => {
            item.IsVisible = item.defaultChecked;
        });
        setColumnDetails(updatedColumnDetails);
        callbacks?.handleClose();
    }

    useEffect(() => {
        console.info(data?.columnsDetails)
    }, [data?.columnsDetails])

    return (
        <>
            <sdkMui.Grid container spacing={0} sx={{ p: 3 }}>
                <sdkMui.Grid xs={10} sm={10} md={10} lg={10} xl={10} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <b>Column Settings</b>
                </sdkMui.Grid>
                <sdkMui.Grid xs={2} sm={2} md={2} lg={2} xl={2} sx={{ display: 'flex', justifyContent: 'center' }} >
                    <span className="material-symbols-outlined" style={{fontSize:'20px',cursor:'pointer'}} onClick={handleClose}>close</span>
                </sdkMui.Grid>
            </sdkMui.Grid>
            <sdkMui.Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ ml: 3 }}>
                {columnTitle}
            </sdkMui.Grid>
            {
                columnDetails?.map((data: any, index: number) => (
                    <sdkMui.Grid
                        key={index}
                        container
                        spacing={0}
                        alignItems="center"
                        justifyContent="center"
                        sx={{ mt: 1, textAlign: 'center' }}
                    >
                        <sdkMui.Grid item xs={0.5} sm={0.5} md={0.5} lg={0.5} xl={0.5} sx={{ display: 'flex', float: 'left' }}>
                            {index + 1}.
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={1.5} sm={1.5} md={1.5} lg={1.5} xl={1.5} sx={{ display: 'flex', float: 'left' }}>
                            <sdkMui.Checkbox
                                disabled={data?.defaultChecked}
                                checked={data?.IsVisible}
                                onChange={() => handleOnCheck(index)}
                            />
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={7} sm={7} md={7} lg={7} xl={7} sx={{display:'flex' , float:'left'}}>
                            {data?.DisplayName}
                        </sdkMui.Grid>
                    </sdkMui.Grid>
                ))
            }
            <sdkMui.Grid container spacing={1} sx={{ mt: 2 }}>
                <sdkMui.Grid xs={6} sm={6} md={6} lg={6} xl={6} sx={{ display: 'flex', float: 'right', justifyContent: 'right' }}>
                    <Button
                        configs={{
                            className: "",
                            type: "button",
                            label: "Apply",
                            varient: "contained",
                            isButtonDisabled: false,
                            color: "primary",
                            size: "small",
                            startIcon: <span className="material-symbols-outlined">done</span>,
                            dataTestID: 'apply-btn'
                        }}
                        callbacks={{
                            handleOnChange: () => { },
                            handleButtonClick: () => { callbacks?.handleClose() }
                        }}
                    />
                </sdkMui.Grid>
                <sdkMui.Grid xs={6} sm={6} md={6} lg={6} xl={6} sx={{ display: 'flex', float: 'left', justifyContent: 'left', pl: 2 }}>
                    <Button
                        configs={{
                            className: "",
                            type: "button",
                            label: "Clear All",
                            varient: "contained",
                            isButtonDisabled: false,
                            color: "error",
                            size: "small",
                            startIcon: <span className="material-symbols-outlined">close</span>,
                            dataTestID: 'clear-btn'
                        }}
                        callbacks={{
                            handleOnChange: () => { },
                            handleButtonClick: () => { handleClearAll() }
                        }}
                    />
                </sdkMui.Grid>
            </sdkMui.Grid>
        </>
    );
}