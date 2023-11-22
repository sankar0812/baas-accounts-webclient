/**
 * CreatedBy : Sreedhar S
 * CreatedDate : Oct 04 2023
 * Description : This file contain table component of Price List
 */
import React from "react";
import { Chip, sdkMui } from "@baas/platform-web-sdk";
import { Helper } from "@/utils/Helper";
import { pricelistInterface } from "@/interfaces/components/sales/customers/pricelist/PriceListinterface";

const helper = new Helper()

function PriceList({ data, configs }: pricelistInterface) {
    return (
        <>
            <sdkMui.Grid container spacing={2} data-testid='Price-list'>

                {
                    data?.PriceList?.map((priceList: any, index: number) => (
                        <sdkMui.Grid key={index} item xs={12} sm={12} lg={3} xl={3} sx={{ p: 2 }}>
                            <sdkMui.Card key={priceList?.DisplayName} data-testid={`${priceList.DisplayName}-sdkMui.Card`}
                                onClick={() => configs?.router.push(`/merchants/${configs?.router?.query?.merchantkey}/sales/customers/${configs?.router?.query?.customerid}/pricelist/${priceList?.PriceListID}`)}

                                sx={{
                                    background: (theme) => theme.palette.background.paper, p: "14px", color: (theme) => theme.palette.primary.contrastText, width: '100%', boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1);", borderRadius: "15px", cursor: "pointer", WebkitBoxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', '&:hover': {
                                        transform: 'scale(1.05)', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)'
                                    }
                                }}>
                                <sdkMui.Grid xs={12} sm={12} lg={12} xl={12} md={12} sx={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: "center", color: (theme) => theme?.palette?.text?.primary }} >
                                    <sdkMui.Stack spacing={0} direction="row" >
                                        <span
                                            style={{
                                                cursor: "pointer",
                                                textAlign: "center",
                                                fontWeight: "bold"
                                            }}
                                            color="text.secondary"
                                            title={priceList?.DisplayName}
                                            data-testid={`${priceList.DisplayName}-Price_list_Tittle`}
                                        >
                                            {priceList?.DisplayName}
                                        </span>
                                    </sdkMui.Stack>
                                </sdkMui.Grid>
                                &nbsp;
                                <sdkMui.Grid xs={12} sm={12} lg={12} xl={12} md={12} sx={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: "center" }} >
                                    <sdkMui.Stack spacing={0} direction="row" data-testid={`${priceList.DisplayName}-Price-List-Chip-content`}>
                                        <Chip
                                            configs={{
                                                label: priceList?.IsActive === true ? "Active" : "In-Active",
                                                clickable: false,
                                                color: priceList?.IsActive === true ? 'primary' : "error",
                                                size: 'small'
                                            }}
                                            callbacks={{
                                                handleClick: () => { },
                                                handleDelete: () => { }
                                            }}
                                        />
                                    </sdkMui.Stack>
                                </sdkMui.Grid>
                                &nbsp;
                                <sdkMui.Grid container spacing={0} sx={{ justifyContent: 'center', display: "flex", alignItems: "center", color: (theme) => theme?.palette?.text?.primary }}>
                                    <sdkMui.Grid xs={12} sm={12} lg={6} xl={6} md={6} sx={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: "center", color: (theme) => theme?.palette?.text?.primary }}>
                                        <sdkMui.Stack spacing={0} direction="row">
                                            <span
                                                style={{

                                                    fontSize: "12px",
                                                    cursor: "pointer",
                                                    textAlign: "center",
                                                    display: "flex",
                                                    justifyContent: "center"
                                                }}
                                                color="text.secondary"
                                            >
                                                <span className="div"><b>Start Date</b></span>

                                            </span>
                                        </sdkMui.Stack>
                                    </sdkMui.Grid>
                                    <sdkMui.Grid xs={12} sm={12} lg={6} xl={6} md={6} sx={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: "center", color: (theme) => theme?.palette?.text?.primary }}>
                                        <sdkMui.Stack spacing={0} direction="row">
                                            <span
                                                style={{

                                                    fontSize: "12px",
                                                    cursor: "pointer",
                                                    textAlign: "center",
                                                    display: "flex",
                                                    justifyContent: "center"
                                                }}
                                                color="text.secondary"
                                            >
                                                <span className="div"><b>End Date</b></span>

                                            </span>
                                        </sdkMui.Stack>
                                    </sdkMui.Grid>
                                </sdkMui.Grid>
                                <sdkMui.Grid container spacing={0} sx={{ justifyContent: 'center', display: "flex", alignItems: "center", color: (theme) => theme?.palette?.text?.primary }}>
                                    <sdkMui.Grid xs={12} sm={12} lg={6} xl={6} md={6} sx={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: "center", color: (theme) => theme?.palette?.text?.primary }}>
                                        <sdkMui.Stack spacing={0} direction="row" data-testid={`${priceList.DisplayName}-start-date`}>
                                            {priceList?.StartDate ? (
                                                <span
                                                    style={{
                                                        maxWidth: "200px",
                                                        fontSize: "12px",
                                                        cursor: "pointer",
                                                        textAlign: "center",
                                                        display: "flex",
                                                        justifyContent: "center"
                                                    }}
                                                    color="text.secondary"
                                                    title={priceList?.StartDate}
                                                >
                                                    <span className="material-symbols-outlined" style={{ fontSize: "16px", marginRight: "8%" }}>calendar_month</span>
                                                    {helper.converttoDateFormat(priceList?.StartDate, "MM/DD/YYYY")}
                                                </span>
                                            ) : (
                                                <span>
                                                    -
                                                </span>
                                            )
                                            }
                                        </sdkMui.Stack>
                                    </sdkMui.Grid>
                                    <sdkMui.Grid xs={12} sm={12} lg={6} xl={6} md={6} sx={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: "center", color: (theme) => theme?.palette?.text?.primary }}>
                                        <sdkMui.Stack spacing={0} direction="row" data-testid={`${priceList.DisplayName}-end-date`}>
                                            {priceList?.EndDate === '' ? (
                                                <span
                                                    style={{
                                                        maxWidth: "200px",
                                                        fontSize: "12px",
                                                        cursor: "pointer",
                                                        textAlign: "center",
                                                        display: "flex",
                                                        justifyContent: "center"
                                                    }}
                                                    color="text.secondary"
                                                    title={priceList?.EndDate}
                                                >
                                                    <span className="material-symbols-outlined" style={{ fontSize: "16px", marginRight: "8%" }}>calendar_month</span>
                                                    {helper.converttoDateFormat(priceList?.EndDate, "MM/DD/YYYY")}
                                                </span>
                                            ) : (
                                                <span>
                                                    -
                                                </span>
                                            )
                                            }
                                        </sdkMui.Stack>
                                    </sdkMui.Grid>
                                </sdkMui.Grid>
                            </sdkMui.Card>
                        </sdkMui.Grid>
                    ))
                }
            </sdkMui.Grid>

        </>
    )
}

export { PriceList }