
/**
@CreatedBy    : Muthumariappan G
@CreatedDate  : Oct 13 2023
@ModifiedBy   : Muthumariappan
@ModifiedDate : Oct 18 2023
@Description  : This file contain view customer component of customers table
*/

import { ViewCustomersInterface } from "@/interfaces/components/sales/customers/viewcustomer/ViewCustomersInterface";
import React, { useState } from "react";
import { Helper } from "@/utils/Helper";
import { sdkMui, Avatar as GlobalAvatar, Chip } from "@baas/platform-web-sdk";

const helper = new Helper()

export function ViewCustomers({configs, data } :  ViewCustomersInterface){

    const [viewCustomersData]= useState(data?.viewCustomersData)
    return(
        <>
        <sdkMui.Grid item data-testid={configs?.dataTestID}>
            <sdkMui.Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ mt: 1 }} >
                <sdkMui.Card
                    variant="elevation"
                    sx={{
                        padding: "10px",
                        borderRadius: "16px",
                    }}
                >
                    <sdkMui.CardContent>
                        <sdkMui.Box data-testid="Customer-Info">
                            <sdkMui.Box>
                                <sdkMui.Grid  container spacing={2}>
                                    <sdkMui.Grid item xs={12} >
                                        <sdkMui.Typography variant="h4">
                                            <b> Customer Info </b>
                                        </sdkMui.Typography>
                                    </sdkMui.Grid>
                                </sdkMui.Grid>
                                <sdkMui.Grid item xs={12} sx={{ pb: 1, pt: 2 }}>
                                    <sdkMui.Divider color={"#000000"}></sdkMui.Divider>
                                </sdkMui.Grid>
                            </sdkMui.Box>
                                <sdkMui.Grid item xs={12}>
                                        <sdkMui.Grid xs={12} sm={12} md={12} lg={12} xl={12} 
                                            sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start"}}
                                        >
                                            <sdkMui.Grid xs={10} sm={10} md={10} lg={10} xl={10}>
                                            <span
                                                style={{ maxWidth: "200px", fontSize: "15px", marginTop: 5, overflow: "hidden", whiteSpace: "nowrap",
                                                    textOverflow: "ellipsis", marginLeft: "5px", fontWeight:"bold"
                                                }}
                                                    title = {viewCustomersData?.CustomerName}
                                            >
                                                {viewCustomersData?.CustomerName || "N/A"}
                                            </span>
                                            </sdkMui.Grid>
                                            <sdkMui.Grid xs={2} sm={2} md={2} lg={2} xl={2}>
                                            <span
                                                data-testid="Customer-Info-Button"
                                                className="material-symbols-outlined"
                                                style={{ fontSize: "20px", cursor: "pointer" }}
                                            >
                                            <Chip
                                                callbacks={{
                                                    handleClick: () => { },
                                                    handleDelete: () => { },
                                                }}
                                                configs={{
                                                    label: data?.viewCustomersData?.CustomerCode,
                                                    size: "small", variant: "filled",
                                                    color: data?.viewCustomersData?.IsReadOnly ? "error" : "primary",
                                                }}
                                            />
                                        </span>
                                        </sdkMui.Grid>
                                        </sdkMui.Grid>
                                        <hr style={{ visibility: 'hidden' }} />
                                            <sdkMui.Grid xs={12} sm={12} md={12} lg={12} xl={12} 
                                                sx={{ 
                                                    display: "flex", justifyContent: "flex-start", marginLeft:"5px"
                                                }}
                                            >
                                                {viewCustomersData?.Address1 || "N/A"}
                                            </sdkMui.Grid>
                                            <hr style={{ visibility: 'hidden' }} />
                                            <sdkMui.Grid xs={12} sm={12} md={12} lg={12} xl={12} 
                                                sx={{ 
                                                    display: "flex", justifyContent: "flex-start", marginLeft:"5px"
                                                }}
                                            >
                                                {viewCustomersData?.Address2 || "N/A"}<br />
                                            </sdkMui.Grid>
                                            <hr style={{ visibility: 'hidden' }} />
                                            <sdkMui.Grid xs={12} sm={12} md={12} lg={12} xl={12} 
                                                sx={{ 
                                                    display: "flex", 
                                                    alignItems: "center", 
                                                    justifyContent: "flex-start"
                                                }}
                                            >
                                                <sdkMui.Grid xs={7} sm={7} md={7} lg={7} xl={7}>
                                                    <span
                                                        style={{ maxWidth: "200px", fontSize: "14px", marginTop: 5, overflow: "hidden",
                                                            whiteSpace: "nowrap", textOverflow: "ellipsis", marginLeft: "5px",
                                                        }}
                                                            title = {viewCustomersData?.City}
                                                    >
                                                            {viewCustomersData?.City || "N/A"}
                                                    </span>
                                                </sdkMui.Grid>
                                                <sdkMui.Grid xs={5} sm={5} md={5} lg={5} xl={5}>
                                                    <span
                                                        style={{ maxWidth: "200px", fontSize: "15px", marginTop: 5, overflow: "hidden",
                                                            whiteSpace: "nowrap", textOverflow: "ellipsis", marginLeft: "5px",
                                                        }}
                                                            title = {viewCustomersData?.State}
                                                    >
                                                            {viewCustomersData?.State || "N/A"}
                                                    </span>
                                                </sdkMui.Grid>
                                            </sdkMui.Grid>
                                            <hr style={{ visibility: 'hidden' }} />
                                            <sdkMui.Grid xs={12} sm={12} md={12} lg={12} xl={12} 
                                                sx={{ 
                                                    display: "flex", 
                                                    alignItems: "center", 
                                                    justifyContent: "flex-start"
                                                }}
                                            >
                                                <sdkMui.Grid xs={7} sm={7} md={7} lg={7} xl={7}>
                                                    <span
                                                        style={{ maxWidth: "200px", fontSize: "15px", marginTop: 5, overflow: "hidden",
                                                            whiteSpace: "nowrap", textOverflow: "ellipsis", marginLeft: "5px",
                                                        }}
                                                            title = {viewCustomersData?.Country}
                                                    >
                                                            {viewCustomersData?.Country || "N/A"}
                                                    </span>
                                                </sdkMui.Grid>
                                                <sdkMui.Grid xs={5} sm={5} md={5} lg={5} xl={5}>
                                                    <span
                                                        style={{ maxWidth: "200px", fontSize: "15px", marginTop: 5, overflow: "hidden",
                                                            whiteSpace: "nowrap", textOverflow: "ellipsis", marginLeft: "5px",
                                                        }}
                                                            title = {viewCustomersData?.PostalCode}
                                                    >
                                                            {viewCustomersData?.PostalCode || "N/A"}
                                                    </span>
                                                </sdkMui.Grid>
                                            </sdkMui.Grid>
                                            <hr style={{ visibility: 'hidden' }} />
                                                <sdkMui.Grid container spacing={2} data-testid={'Created and modified Info'}>
                                                    <sdkMui.Grid item xs={12} sx={{ pt: 1, pb: 1 }}>
                                                        <sdkMui.Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                                                            Created Info.
                                                        </sdkMui.Typography>
                                                    </sdkMui.Grid>
                                                        <sdkMui.Stack direction={"row"} spacing={2} sx={{ p: 1, ml: 4 }}>
                                                            <GlobalAvatar
                                                                configs={{
                                                                    name: viewCustomersData?.CreatedBy,
                                                                    type: "Letter", variant: "circular", bgColor: "green",
                                                                }}
                                                            />
                                                            <sdkMui.Stack direction={'column'} spacing={0}>
                                                                <sdkMui.Typography>
                                                                    {viewCustomersData?.CreatedBy}
                                                                </sdkMui.Typography>
                                                                    <sdkMui.Typography>
                                                                        {helper?.converttoDateFormat(viewCustomersData?.CreatedDate, "MM/DD/YY HH:mm")}
                                                                    </sdkMui.Typography>
                                                            </sdkMui.Stack>
                                                        </sdkMui.Stack>
                                                </sdkMui.Grid>
                                                <hr style={{visibility:"hidden"}}></hr>
                                                    <sdkMui.Grid xs={12}>
                                                        <sdkMui.Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                                                            Modified Info.
                                                        </sdkMui.Typography>
                                                            <sdkMui.Stack direction={"row"} spacing={2} sx={{ p: 2, ml: 1 }}>
                                                                <GlobalAvatar
                                                                    configs={{
                                                                        name: viewCustomersData?.CreatedBy,
                                                                        type: "Letter", variant: "circular", bgColor: "red",
                                                                    }}
                                                                />
                                                                    <sdkMui.Stack direction={'column'} spacing={0}>
                                                                        <sdkMui.Typography>
                                                                            {viewCustomersData?.ModifiedBy === null ? viewCustomersData?.CreatedBy : viewCustomersData?.ModifiedBy}
                                                                        </sdkMui.Typography>
                                                                            <sdkMui.Typography>
                                                                                {helper?.converttoDateFormat(viewCustomersData?.ModifiedDate, "MM/DD/YY HH:mm")}
                                                                            </sdkMui.Typography>
                                                                    </sdkMui.Stack>
                                                            </sdkMui.Stack>
                                                    </sdkMui.Grid>
                                                </sdkMui.Grid>
                                            </sdkMui.Box>
                            </sdkMui.CardContent>
                        </sdkMui.Card>
            </sdkMui.Grid>
        </sdkMui.Grid>
        </>
    )
}