
/**
@CreatedBy    : Muthumariappan G
@CreatedDate  : Oct 26 2023
@ModifiedBy   : Muthumariappan
@ModifiedDate : Oct 26 2023
@Description  : This file contain view customer invoice component of customers table
*/

import React from "react";
import { ViewAccountInvoiceInterface } from "@/interfaces/components/sales/customers/Accounts/view/ViewAccountInvoiceInterface";
import { sdkMui, Chip } from "@baas/platform-web-sdk";

export function ViewAccountInvoice({ data }: ViewAccountInvoiceInterface) {

    return (
        <>
            <sdkMui.Grid item data-testid="Customers-Invoice-View-Form">
                <sdkMui.Grid item xs={12} sx={{ mt: 1 }} >
                    <sdkMui.Card
                        variant="elevation"
                        sx={{
                            padding: "10px",
                            boxShadow: "8px 8px 8px 8px rgba(0,0,0,0.1)",
                            borderRadius: "16px",
                        }}
                    >
                        <sdkMui.CardContent>
                            <sdkMui.Box data-testid="Customer-Invoice-Info">
                                <sdkMui.Box>
                                    <sdkMui.Grid container spacing={2}>
                                        <sdkMui.Grid item xs={8} sx={{ display: "flex" }}>
                                            <sdkMui.Typography variant="h4">
                                                <b> Invoices Info </b>
                                            </sdkMui.Typography>
                                        </sdkMui.Grid>
                                    </sdkMui.Grid>
                                    <sdkMui.Grid item xs={12} sx={{ pb: 1, pt: 2 }}>
                                        <sdkMui.Divider color={"#000000"}></sdkMui.Divider>
                                    </sdkMui.Grid>
                                </sdkMui.Box>
                                <sdkMui.Grid item xs={12}>
                                    <sdkMui.Grid xs={12} sm={12} md={12} lg={12} xl={12}
                                        sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}
                                    >
                                        <sdkMui.Grid xs={9} sm={9} md={9} lg={9} xl={9}>
                                            <span
                                                style={{
                                                    maxWidth: "200px", fontSize: "15px", marginTop: 5, overflow: "hidden", whiteSpace: "nowrap",
                                                    textOverflow: "ellipsis", marginLeft: "5px", fontWeight: "bold"
                                                }}
                                                title={"TotalInvoiceCount"}
                                            >
                                                {"Total Invoice Count: "}
                                            </span>
                                        </sdkMui.Grid>
                                        <sdkMui.Grid xs={3} sm={3} md={3} lg={3} xl={3}>
                                            <span
                                                data-testid="Customer-Invoice-Info-Icon"
                                                className="material-symbols-outlined"
                                                style={{ fontSize: "20px", cursor: "pointer" }}
                                            >
                                                <Chip
                                                    callbacks={{
                                                        handleClick: () => { },
                                                        handleDelete: () => { },
                                                    }}
                                                    configs={{
                                                        label: data?.CustomerInvoiceData?.length.toString() || '0',
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
                                        sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}
                                    >
                                        <sdkMui.Grid xs={9} sm={9} md={9} lg={9} xl={9}>
                                            <span
                                                style={{
                                                    maxWidth: "200px", fontSize: "15px", marginTop: 5, overflow: "hidden", whiteSpace: "nowrap",
                                                    textOverflow: "ellipsis", marginLeft: "5px", fontWeight: "bold"
                                                }}
                                                title={"PaidStatus"}
                                            >
                                                {"Paid Status: "}
                                            </span>
                                        </sdkMui.Grid>
                                        <sdkMui.Grid xs={3} sm={3} md={3} lg={3} xl={3}>
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
                                                        label: data?.CustomerInvoiceData?.filter((status: any) => status?.InvoiceStatusID === 3)?.length?.toString() || '0',
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
                                        sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}
                                    >
                                        <sdkMui.Grid xs={9} sm={9} md={9} lg={9} xl={9}>
                                            <span
                                                style={{
                                                    maxWidth: "200px", fontSize: "15px", marginTop: 5, overflow: "hidden", whiteSpace: "nowrap",
                                                    textOverflow: "ellipsis", marginLeft: "5px", fontWeight: "bold"
                                                }}
                                                title={"OpenStatus"}
                                            >
                                                {"Open Status: "}
                                            </span>
                                        </sdkMui.Grid>
                                        <sdkMui.Grid xs={3} sm={3} md={3} lg={3} xl={3}>
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
                                                        label: data?.CustomerInvoiceData?.filter((status: any) => status?.InvoiceStatusID === 2)?.length?.toString() || '0',
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
                                        sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}
                                    >
                                        <sdkMui.Grid xs={9} sm={9} md={9} lg={9} xl={9}>
                                            <span
                                                style={{
                                                    maxWidth: "200px", fontSize: "15px", marginTop: 5, overflow: "hidden", whiteSpace: "nowrap",
                                                    textOverflow: "ellipsis", marginLeft: "5px", fontWeight: "bold"
                                                }}
                                                title={"DraftStatus"}
                                            >
                                                {"Draft Status: "}
                                            </span>
                                        </sdkMui.Grid>
                                        <sdkMui.Grid xs={3} sm={3} md={3} lg={3} xl={3}>
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
                                                        label: data?.CustomerInvoiceData?.filter((status: any) => status?.InvoiceStatusID === 1)?.length?.toString() || '0',
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
                                        sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}
                                    >
                                        <sdkMui.Grid xs={9} sm={9} md={9} lg={9} xl={9}>
                                            <span
                                                style={{
                                                    maxWidth: "200px", fontSize: "15px", marginTop: 5, overflow: "hidden", whiteSpace: "nowrap",
                                                    textOverflow: "ellipsis", marginLeft: "5px", fontWeight: "bold"
                                                }}
                                                title={"VoidStatus"}
                                            >
                                                {"Void Status: "}
                                            </span>
                                        </sdkMui.Grid>
                                        <sdkMui.Grid xs={3} sm={3} md={3} lg={3} xl={3}>
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
                                                        label: data?.CustomerInvoiceData?.filter((status: any) => status?.InvoiceStatusID === 4)?.length?.toString() || '0',
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