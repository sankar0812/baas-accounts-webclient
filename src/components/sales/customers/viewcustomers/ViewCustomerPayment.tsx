
/**
@CreatedBy    : Muthumariappan G
@CreatedDate  : Oct 17 2023
@ModifiedBy   : Muthumariappan
@ModifiedDate : Oct 18 2023
@Description  : This file contain view customer payment component of customers table
*/

import React from "react";
import { sdkMui, Chip } from "@baas/platform-web-sdk";

export function ViewCustomerPayment(){

    return(
        <>
            <sdkMui.Grid item data-testid="Customers-Payment-View-Form">
                <sdkMui.Grid item xs={12} sx={{ mt: 1 }} >
                    <sdkMui.Card
                        variant="elevation"
                            sx={{
                                padding: "10px",
                                boxShadow: "8px 12px 20px 26px rgba(0,0,0,0.1)",
                                borderRadius: "16px",
                            }}
                    >
                        <sdkMui.CardContent>
                            <sdkMui.Box data-testid="Customer-Payment-Info">
                                <sdkMui.Box> 
                                    <sdkMui.Grid  container spacing={2}>
                                        <sdkMui.Grid item xs={8} sx={{display:"flex"}}>
                                            <sdkMui.Typography variant="h4">
                                                <b> Payments Info </b>
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
                                        <sdkMui.Grid xs={8} sm={8} md={8} lg={8} xl={8}>
                                            <span
                                                style={{ maxWidth: "200px", fontSize: "15px", marginTop: 5, overflow: "hidden", whiteSpace: "nowrap",
                                                    textOverflow: "ellipsis", marginLeft: "5px", fontWeight:"bold"
                                                }}
                                                    title = {"ToalInvoiceAmount"}
                                            >
                                                {"Total Invoice Amount: "}
                                            </span>
                                        </sdkMui.Grid>
                                            <sdkMui.Grid xs={4} sm={4} md={4} lg={4} xl={4}>
                                                <span
                                                    data-testid="Customer-Payment-Info-Icon"
                                                    className="material-symbols-outlined"
                                                    style={{ fontSize: "20px", cursor: "pointer" }}
                                                >
                                                    <Chip
                                                        callbacks={{
                                                            handleClick: () => { },
                                                            handleDelete: () => { },
                                                        }}
                                                        configs={{
                                                            label: "USD$1000.00",
                                                            size: "small", variant: "filled",
                                                            color: "primary",
                                                        }}
                                                    />
                                                </span>
                                            </sdkMui.Grid>
                                    </sdkMui.Grid>
                                </sdkMui.Grid>
                                <hr style={{ visibility: 'hidden' }} />
                            <sdkMui.Grid item xs={12}>
                                    <sdkMui.Grid xs={12} sm={12} md={12} lg={12} xl={12} 
                                        sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start"}}
                                    >
                                        <sdkMui.Grid xs={8} sm={8} md={8} lg={8} xl={8}>
                                            <span
                                                style={{ maxWidth: "200px", fontSize: "15px", marginTop: 5, overflow: "hidden", whiteSpace: "nowrap",
                                                    textOverflow: "ellipsis", marginLeft: "5px", fontWeight:"bold"
                                                }}
                                                    title = {"ToalPaidAmount"}
                                            >
                                                {"Total Paid Amount: "}
                                            </span>
                                        </sdkMui.Grid>
                                            <sdkMui.Grid xs={4} sm={4} md={4} lg={4} xl={4}>
                                                <span
                                                    className="material-symbols-outlined"
                                                    style={{ fontSize: "20px", cursor: "pointer" }}
                                                >
                                                    <Chip
                                                        callbacks={{
                                                            handleClick: () => { },
                                                            handleDelete: () => { },
                                                        }}
                                                        configs={{
                                                            label: "USD$500.00",
                                                            size: "small", variant: "filled",
                                                            color: "primary",
                                                        }}
                                                    />
                                                </span>
                                            </sdkMui.Grid>
                                    </sdkMui.Grid>
                                </sdkMui.Grid>
                                <hr style={{ visibility: 'hidden' }} />
                                <sdkMui.Grid item xs={12}>
                                    <sdkMui.Grid xs={12} sm={12} md={12} lg={12} xl={12} 
                                        sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start"}}
                                    >
                                        <sdkMui.Grid xs={8} sm={8} md={8} lg={8} xl={8}>
                                            <span
                                                style={{ maxWidth: "200px", fontSize: "15px", marginTop: 5, overflow: "hidden", whiteSpace: "nowrap",
                                                    textOverflow: "ellipsis", marginLeft: "5px", fontWeight:"bold"
                                                }}
                                                    title = {"OverallBalanceDue"}
                                            >
                                                {"Overall Balance Due: "}
                                            </span>
                                        </sdkMui.Grid>
                                            <sdkMui.Grid xs={4} sm={4} md={4} lg={4} xl={4}>
                                                <span
                                                    className="material-symbols-outlined"
                                                    style={{ fontSize: "20px", cursor: "pointer" }}
                                                >
                                                    <Chip
                                                        callbacks={{
                                                            handleClick: () => { },
                                                            handleDelete: () => { },
                                                        }}
                                                        configs={{
                                                            label: " USD$500.00",
                                                            size: "small", variant: "filled",
                                                            color: "primary",
                                                        }}
                                                    />
                                                </span>
                                            </sdkMui.Grid>
                                    </sdkMui.Grid>
                                </sdkMui.Grid>
                                <hr style={{ visibility: 'hidden' }} />
                        </sdkMui.Box>
                    </sdkMui.CardContent>
                </sdkMui.Card>
                </sdkMui.Grid>
            </sdkMui.Grid>
        </>
    )

}