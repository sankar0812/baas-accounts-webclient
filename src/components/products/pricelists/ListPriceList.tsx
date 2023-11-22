/**
 * CreatedBy : Vinoth Kumar
 * CreatedDate : Nov 08 2023
 * Description : This file contain table component of  PriceList list
 */
import React from "react";
import { Chip, sdkMui } from "@baas/platform-web-sdk";
import { ListPriceListInterface } from "@/interfaces/components/products/pricelists/ListPriceListInterface";


function ProductPriceList({ data, configs }: ListPriceListInterface) {



    return (
        <>
            <sdkMui.Grid container spacing={2} data-testid='Products-Price-list'>
                {
                    data?.pricelist?.map((priceList: any, index: number) => (
                        <sdkMui.Grid key={index} item xs={12} sm={12} lg={3} xl={3} sx={{ p: 2 }}>
                            <sdkMui.Card key={priceList?.DisplayName} data-testid={`${priceList.DisplayName}-sdkMui.Card`}
                                onClick={() => configs?.router.push(`//merchants/${configs?.router?.query?.merchantkey}/products/pricelists/${priceList?.PriceListID}`)}
                                sx={{
                                    background: (theme) => theme.palette.background.paper, p: "0px", color: (theme) => theme.palette.primary.contrastText, width: '100%', boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1);", borderRadius: "15px", cursor: "pointer", WebkitBoxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', '&:hover': {
                                        transform: 'scale(1.05)', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
                                    }

                                }}>
                                <sdkMui.Box
                                    sx={{
                                        fontWeight: 'bold',
                                        pt: 2, pb: 2,
                                        borderRadius: '15px',
                                        borderBottomRightRadius: '0px',
                                        borderBottomLeftRadius: '0px',
                                        background: (theme) => theme.palette.primary.main,
                                        color: (theme) => theme.palette.primary.contrastText,
                                        textAlign: 'center',
                                        boxShadow: '6px 0px 15px -3px rgba(0,0,0,0.1)'
                                    }}
                                >
                                    <sdkMui.Grid container spacing={0}>
                                        <sdkMui.Grid xs={12} sm={12} lg={12} xl={12} md={12} sx={{ display: 'flex', textAlign: 'center', justifyContent: 'center', color: (theme) => theme?.palette?.text?.primary }} >
                                            <sdkMui.Stack spacing={0} direction="row" >
                                                <span
                                                    style={{
                                                        cursor: "pointer",
                                                        textAlign: "center",
                                                        fontWeight: "bold",
                                                        color: 'white'
                                                    }}
                                                    color="text.secondary"
                                                    title={priceList?.DisplayName}
                                                    data-testid={`${priceList.DisplayName}-Price_list_Title`}
                                                >
                                                    {priceList?.DisplayName}
                                                </span>
                                            </sdkMui.Stack>
                                        </sdkMui.Grid>
                                        {/* <sdkMui.Grid xs={2} sm={2} lg={2} xl={2} md={2} sx={{ display: 'flex', textAlign: 'center', justifyContent: 'center', color: (theme) => theme?.palette?.text?.primary }} >
                                            <sdkMui.Stack spacing={0} direction="row" sx={{ color: (theme) => theme.palette.primary.contrastText, }} >
                                                <span className="material-symbols-outlined" onClick={() => { handleStatusChange() }}>more_vert</span>
                                            </sdkMui.Stack>
                                        </sdkMui.Grid> */}
                                    </sdkMui.Grid>
                                </sdkMui.Box>
                                &nbsp;
                                <sdkMui.Grid container spacing={0} >
                                    <sdkMui.Grid xs={12} sm={12} lg={6} xl={6} md={6} sx={{ display: 'flex', justifyContent: "center", textAlign: "center", color: (theme) => theme?.palette?.text?.primary }} >
                                        <sdkMui.Stack spacing={0} direction="row" >
                                            <span
                                                style={{
                                                    cursor: "pointer",
                                                    textAlign: "center",
                                                    textOverflow: 'ellipsis',
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                    maxWidth: '100px',
                                                    display: 'inline-block'
                                                }}
                                                color="text.secondary"
                                                title={priceList?.PriceListCode}
                                            >
                                                {priceList?.PriceListCode}
                                            </span>
                                        </sdkMui.Stack>
                                    </sdkMui.Grid>
                                    <sdkMui.Grid xs={12} sm={12} lg={6} xl={6} md={6} sx={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: "center" }} >
                                        <sdkMui.Stack spacing={0} direction="row" data-testid={`${priceList.DisplayName}-Price-List-Chip-content`}>
                                            <Chip
                                                configs={{
                                                    label: priceList?.PriceListStatus?.PriceListStatus,
                                                    clickable: false,
                                                    color: 'primary',
                                                    size: 'small'
                                                }}
                                                callbacks={{
                                                    handleClick: () => { },
                                                    handleDelete: () => { }
                                                }}
                                            />
                                        </sdkMui.Stack>
                                    </sdkMui.Grid>
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
                                <sdkMui.Grid container spacing={0} sx={{ justifyContent: 'center', display: "flex", alignItems: "center", color: (theme) => theme?.palette?.text?.primary, pb: 2 }}>
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
                                                        justifyContent: "center",
                                                        whiteSpace: "nowrap"
                                                    }}
                                                    color="text.secondary"
                                                    title={priceList?.StartDate}
                                                >
                                                    <span className="material-symbols-outlined" style={{ fontSize: "16px", marginRight: "8%" }}>calendar_month</span>
                                                    {priceList?.StartDate === "" ? "" : new Date(priceList.StartDate).toISOString().split('T')[0]}
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
                                            {priceList?.EndDate ? (
                                                <span
                                                    style={{
                                                        maxWidth: "200px",
                                                        fontSize: "12px",
                                                        cursor: "pointer",
                                                        textAlign: "center",
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        whiteSpace: "nowrap"
                                                    }}
                                                    color="text.secondary"
                                                    title={priceList?.EndDate}
                                                >
                                                    <span className="material-symbols-outlined" style={{ fontSize: "16px", marginRight: "8%" }}>calendar_month</span>
                                                    {priceList?.EndDate === "" ? "" : new Date(priceList.EndDate).toISOString().split('T')[0]}
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
            </sdkMui.Grid >

        </>
    )
}

export { ProductPriceList }