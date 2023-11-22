/**
@CreatedBy        : Sreedhar A
@CreatedTime      : oct 25 2023
**/
import React, { useState } from "react";
import Paper from '@mui/material/Paper';
import { sdkMui, Avatar as GlobalAvatar } from "@baas/platform-web-sdk";
import { ViewPriceListinterface } from "@/interfaces/components/sales/customers/pricelist/ViewPricelistInterFace";
import { Helper } from "@/utils/Helper";
export function ViewPriceList({ data }: ViewPriceListinterface) {
    const [viewData] = useState<any>(data?.viewRecord);
    const helper = new Helper()
    const pricelistHeaders = [
        {
            "ColumnName": 'ProductName',
            "DisplayName": 'Product Name',
            "IsVisible": true
        },
        {
            "ColumnName": 'ProductCode',
            "DisplayName": 'Product Code',
            "IsVisible": true

        },
        {
            "ColumnName": 'Rate',
            "DisplayName": 'Rate',
            "IsVisible": true
        },
    ]
    return (
        <>
            <sdkMui.Grid container spacing={0} data-testid='ViewPriceList'>
                <sdkMui.Grid item xs={12} sm={12} sx={{  display: 'flex', justifyContent: 'center',color: (theme) => theme?.palette?.text?.primary}}>
                    <sdkMui.Card data-testid={`${viewData?.DisplayName}-sdkMui.Card`}
                        sx={{
                            background: (theme) => theme.palette.background.paper,
                            p:3,
                            color: (theme) => theme.palette.primary.contrastText,
                            boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
                            borderRadius: "20px",
                            width: '80%',
                            cursor: "pointer",
                            WebkitBoxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        }}>
                        <sdkMui.Grid container spacing={0}>
                            <sdkMui.Grid xs={12} sm={12} lg={10} xl={10} md={10} sx={{ color: (theme) => theme?.palette?.text?.primary }}>
                                <sdkMui.Stack spacing={0} direction="row">
                                    <span
                                        style={{
                                            cursor: "pointerfind",
                                            textAlign: "center"
                                        }}
                                        color="text.secondary"
                                        title={viewData?.DisplayName}
                                    >
                                        <b>{"PriceList Name:"}</b> {viewData?.DisplayName}
                                    </span>
                                </sdkMui.Stack>
                            </sdkMui.Grid>
                            <sdkMui.Grid xs={12} sm={12} lg={2} xl={2} md={2} sx={{ color: (theme) => theme?.palette?.text?.primary }}>
                                <sdkMui.Stack spacing={0} direction="row">
                                    {viewData?.StartDate ? (
                                        <span
                                            style={{
                                                cursor: "pointer",
                                                textAlign: "center",
                                                display: "flex",
                                                justifyContent: "center"
                                            }}
                                            color="text.secondary"
                                            title={viewData?.StartDate}
                                        >
                                            <b>{"Start Date"}:</b> {helper.converttoDateFormat(viewData?.StartDate, "MM/DD/YYYY")}
                                        </span>
                                    ) : (
                                        <span>
                                            <b>{"Start Date: -"}</b>
                                        </span>
                                    )
                                    }
                                </sdkMui.Stack>
                            </sdkMui.Grid>
                        </sdkMui.Grid>
                        &nbsp;
                        <sdkMui.Grid container spacing={0}>
                            <sdkMui.Grid xs={12} sm={12} lg={10} xl={10} md={10} sx={{ color: (theme) => theme?.palette?.text?.primary }} >
                                <sdkMui.Stack spacing={0} direction="row">
                                    <span
                                        style={{
                                            cursor: "pointer",
                                            textAlign: "center",
                                        }}
                                        color="text.secondary"
                                    >
                                        <b>{"Currency Code:"}</b>
                                        &nbsp;
                                        {data?.Currency?.map((currency: any) => (
                                            <b key={currency.CurrencyID}>
                                                {`${currency?.CurrencyCode}${currency?.CurrencySymbol}`}
                                            </b>
                                        ))}
                                    </span>
                                </sdkMui.Stack>
                            </sdkMui.Grid>
                            <sdkMui.Grid xs={12} sm={12} lg={2} xl={2} md={2} sx={{ color: (theme) => theme?.palette?.text?.primary }}>
                                <sdkMui.Stack spacing={0} direction="row">
                                    {viewData?.EndDate ? (
                                        <span
                                            style={{
                                                cursor: "pointer",
                                                textAlign: "center",
                                                display: "flex",
                                                justifyContent: "center"
                                            }}
                                            color="text.secondary"
                                            title={viewData?.EndDate}
                                        >
                                            <b>{"End Date"}:</b>{helper.converttoDateFormat(viewData?.EndDate, "MM/DD/YYYY")}
                                        </span>
                                    ) : (
                                        <span>
                                            <b>{"End Date: -"}</b>
                                        </span>
                                    )
                                    }
                                </sdkMui.Stack>
                            </sdkMui.Grid>
                        </sdkMui.Grid>
                        &nbsp;
                        <sdkMui.Grid container spacing={0}>
                            <sdkMui.Grid xs={12} sm={12} lg={10} xl={10} md={10}
                                sx={{
                                    background: (theme) => theme.palette.background.paper,
                                    color: (theme) => theme?.palette?.text?.primary,
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis"
                                }}>
                                <sdkMui.Grid item xs={12}>
                                <sdkMui.Grid item xs={12} sx={{ pt: 1 }}>
                                <sdkMui.Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                                                Created Info.
                                            </sdkMui.Typography>
                                        </sdkMui.Grid>
                                        <sdkMui.Stack direction={"row"} spacing={2} sx={{ p: 1, ml: 4 }}>
                                            <GlobalAvatar
                                                configs={{
                                                    name: viewData?.CreatedBy,
                                                    type: "Letter", variant: "circular", bgColor: "green",
                                                }}
                                            />
                                            <sdkMui.Stack direction={'column'} spacing={0}>
                                                <sdkMui.Typography>
                                                    {viewData?.CreatedBy}
                                                </sdkMui.Typography>
                                                <sdkMui.Typography>
                                                    {helper?.converttoDateFormat(viewData?.CreatedDate, "MM/DD/YY ")}
                                                </sdkMui.Typography>
                                            </sdkMui.Stack>
                                        </sdkMui.Stack>
                                </sdkMui.Grid>
                            </sdkMui.Grid>
                            <sdkMui.Grid xs={12} sm={12} lg={2} xl={2} md={2}
                                sx={{
                                    background: (theme) => theme.palette.background.paper,
                                    color: (theme) => theme?.palette?.text?.primary,
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis"
                                }}>
                                <sdkMui.Grid item xs={12} sx={{ pt: 1, pb: 1 }}>
                                    <sdkMui.Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                                        <sdkMui.Grid item xs={12} sx={{ pt: 1 }}>
                                            <sdkMui.Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                                                Modified Info:
                                            </sdkMui.Typography>
                                        </sdkMui.Grid>
                                        <sdkMui.Stack direction={"row"} spacing={2} sx={{ p: 1, ml: 4 }}>
                                            <GlobalAvatar
                                                configs={{
                                                    name: viewData?.CreatedBy,
                                                    type: "Letter", variant: "circular", bgColor: "red",
                                                }}
                                            />
                                            <sdkMui.Stack direction={'column'} spacing={0}>
                                                <sdkMui.Typography>
                                                    {viewData?.ModifiedBy === null ? viewData?.CreatedBy : viewData?.ModifiedBy}
                                                </sdkMui.Typography>
                                                <sdkMui.Typography>
                                                    {helper?.converttoDateFormat(viewData?.ModifiedDate, "MM/DD/YY ")}
                                                </sdkMui.Typography>
                                            </sdkMui.Stack>
                                        </sdkMui.Stack>
                                    </sdkMui.Typography>
                                </sdkMui.Grid>
                            </sdkMui.Grid>
                        </sdkMui.Grid>
                    </sdkMui.Card>
                </sdkMui.Grid >
            </sdkMui.Grid >
            &nbsp;
            <sdkMui.TableContainer component={Paper} sx={{ maxHeight: { xs: "70vh", sm: "70vh", md: "70vh", lg: "80vh", xl: "80vh" }, minHeight: 'fit-content', borderRadius: '15px' }}>
                <sdkMui.Table sx={{ minWidth: 650 }} aria-label="sticky table" stickyHeader>
                    <sdkMui.TableHead sx={{ background: (theme) => theme.palette.primary.main, color: (theme) => theme.palette.primary.contrastText }}>
                        <sdkMui.TableRow sx={{ background: (theme) => theme.palette.primary.main, color: (theme) => theme.palette.primary.contrastText }}>
                            {
                                pricelistHeaders?.map((column: any, index: number) => (
                                    column?.IsVisible && <sdkMui.TableCell key={index} sx={{ background: (theme) => theme.palette.primary.main, color: (theme) => theme.palette.primary.contrastText }}><b> {helper?.convertToTitleCase(column?.DisplayName)}</b></sdkMui.TableCell>
                                ))
                            }
                        </sdkMui.TableRow>
                    </sdkMui.TableHead>
                    <sdkMui.TableBody>
                        {viewData?.PriceListItem?.map((singleData: any, index: number) =>
                            <sdkMui.TableRow
                                key={index}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer', '&:hover': {
                                        transform: 'scale(1.0)', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)'
                                    }
                                }}
                            >
                                {pricelistHeaders?.find((data: any) => data?.ColumnName === 'ProductName') &&
                                    <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }}>
                                        {singleData?.Product?.ProductName}
                                    </sdkMui.TableCell>
                                }
                                {pricelistHeaders?.find((data: any) => data?.ColumnName === 'ProductCode') &&
                                    <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary, }}>
                                        <sdkMui.Box sx={{ display: "flex", alignItems: "center" }}>
                                            <sdkMui.Typography
                                                component="div"
                                                sx={{
                                                    maxWidth: "100px",
                                                    whiteSpace: 'nowrap'
                                                }}>
                                                {singleData?.Product?.ProductCode}
                                            </sdkMui.Typography>
                                        </sdkMui.Box>
                                    </sdkMui.TableCell>
                                }
                                {pricelistHeaders?.find((data: any) => data?.ColumnName === 'ProductCode') &&
                                    <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary, }}>
                                        <sdkMui.Box sx={{ display: "flex", alignItems: "center" }}>
                                            <sdkMui.Stack spacing={0} direction="row">
                                                <span
                                                    style={{
                                                        cursor: "pointer",
                                                        whiteSpace: "nowrap",
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis"
                                                    }}
                                                    color="text.secondary"
                                                >
                                                    <b>{"Rate"}:</b>
                                                    &nbsp;
                                                    {data?.Currency?.map((currency: any) => (
                                                        <b key={currency.CurrencyID}>
                                                            {currency?.CurrencySymbol}
                                                        </b>
                                                    ))}
                                                    {singleData?.Rate}
                                                </span>
                                            </sdkMui.Stack>
                                        </sdkMui.Box>
                                    </sdkMui.TableCell>
                                }
                            </sdkMui.TableRow>
                        )}
                    </sdkMui.TableBody>
                </sdkMui.Table>
            </sdkMui.TableContainer>
        </>
    )
}