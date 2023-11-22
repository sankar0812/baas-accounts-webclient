/**
 * CreatedBy    : Uma Kohila S
 * CreatedDate  : Oct 24 2023
 * Description  : This file contain AddPriceList component of Price List
 */
import React, { useState, useEffect } from "react";
import { bulkDiscountListInterface } from "@/interfaces/components/products/product/bulkDiscount/bulkDiscountListInterface";
import { sdkMui } from "@baas/platform-web-sdk";


function ProductBulkDiscounts({ configs, callbacks }: bulkDiscountListInterface) {
    const [blukDiscountInfo, setBlukDiscountInfo] = useState<any>([])
    const TableHeaders = [
        {
            DisplayName: "Min. Qty.",
            IsVisible: true
        },
        {
            DisplayName: "Max. Qty.",
            IsVisible: true
        },
        {
            DisplayName: "Disc. Type",
            IsVisible: true
        },
        {
            DisplayName: "Disc. Rate",
            IsVisible: true
        },
        {
            DisplayName: "Disc. Percent",
            IsVisible: true
        },
        {
            DisplayName: "Disc. Period",
            IsVisible: true
        }
    ]
    useEffect(() => {
        const readDiscounts = async () => {
            let response = await configs?.functionObj?.readProductBulkDiscounts(configs?.productID)
            setBlukDiscountInfo([])
            if (response?.status === 200) {
                setBlukDiscountInfo(response?.output)
            }
        }
        readDiscounts();
    }, [])
    return (
        <>
            <sdkMui.Box sx={{ display: 'flex', alignItems: 'center', justifyItems: 'center' }}>
                <sdkMui.Grid container spacing={2} sx={{ display: 'flex' }}>
                    {blukDiscountInfo?.length > 0 &&
                        <sdkMui.Grid item xs={12} textAlign={'right'}>
                            <sdkMui.Button size="small" variant="contained" sx={{ fontSize: '12px' }} onClick={() => { callbacks?.handleAddDiscount() }}>{"+ " + "Add Discount"}</sdkMui.Button>
                        </sdkMui.Grid>
                    }
                    <sdkMui.Grid item xs={12} >
                        <sdkMui.TableContainer sx={{ maxHeight: { xs: "40vh", sm: "40vh", md: "40vh", lg: "50vh", xl: "50vh" }, minHeight: 'fit-content', cursor: 'pointer', pr: 1, pb: 1 }}>
                            <sdkMui.Table sx={{ color: 'black' }} stickyHeader>
                                <sdkMui.TableHead>
                                    <sdkMui.TableRow>
                                        {TableHeaders?.map((headers: any, index: any) => <sdkMui.TableCell key={index} sx={{ fontSize: '14px', textAlign: 'center', background: (theme) => theme.palette.primary.main, color: (theme) => theme.palette.primary.contrastText }}>{headers?.DisplayName}
                                        </sdkMui.TableCell>)}
                                    </sdkMui.TableRow>
                                </sdkMui.TableHead>
                                <sdkMui.TableBody>
                                    {blukDiscountInfo?.length > 0 ?
                                        <>
                                            {blukDiscountInfo?.map((row: any, index: number) => (
                                                <sdkMui.TableRow key={index}>
                                                    <sdkMui.TableCell sx={{ textAlign: "center" }}><sdkMui.Typography variant='h6'> {row?.RangeMin || 'N/A'}</sdkMui.Typography> </sdkMui.TableCell>
                                                    <sdkMui.TableCell sx={{ textAlign: 'center' }}><sdkMui.Typography variant='h6'> {row?.RangeMax || 'N/A'} </sdkMui.Typography></sdkMui.TableCell>
                                                    <sdkMui.TableCell sx={{ textAlign: 'center' }}><sdkMui.Typography variant='h6'>{row?.DiscountType || 'N/A'}</sdkMui.Typography> </sdkMui.TableCell>
                                                    <sdkMui.TableCell sx={{ textAlign: "right" }}><sdkMui.Typography variant='h6'> {row?.DiscountType === "Rate" ? "USD $ " + parseFloat(row?.DiscountRate).toFixed(2) : "N/A"} </sdkMui.Typography></sdkMui.TableCell>
                                                    <sdkMui.TableCell sx={{ textAlign: 'right' }}> <sdkMui.Typography variant='h6'>{row?.DiscountType === "Rate" ? "N/A" : parseFloat(row?.DiscountPercent).toFixed(2) + " %"} </sdkMui.Typography></sdkMui.TableCell>
                                                    <sdkMui.TableCell sx={{ textAlign: 'center' }}><sdkMui.Typography variant='h6'>{row?.DiscountPeriod || 'N/A'}</sdkMui.Typography> </sdkMui.TableCell>
                                                    {/* <sdkMui.TableCell sx={{ textAlign: 'left' }} >
                                                        <span className='material-symbols-outlined' style={{ cursor: 'pointer', textAlign: 'center', fontSize: '20px' }} onClick={() => { { handleRowDelete(index); } }} >delete</span>
                                                    </sdkMui.TableCell> */}
                                                </sdkMui.TableRow>
                                            ))}
                                        </> : <>
                                            <sdkMui.TableRow >
                                                <sdkMui.TableCell colSpan={6} sx={{ textAlign: 'center' }}>
                                                    <sdkMui.Stack direction={"column"} spacing={2} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                        <sdkMui.Typography >Discounts Not Added...</sdkMui.Typography>
                                                        <sdkMui.Button size="small" variant="contained" sx={{ fontSize: '12px', width: 100 }} onClick={() => { callbacks?.handleAddDiscount() }}>{"+ " + "Discount"}</sdkMui.Button>
                                                    </sdkMui.Stack>
                                                </sdkMui.TableCell>
                                            </sdkMui.TableRow>
                                        </>
                                    }
                                </sdkMui.TableBody>
                            </sdkMui.Table>
                        </sdkMui.TableContainer>
                    </sdkMui.Grid>
                </sdkMui.Grid>
            </sdkMui.Box >
        </>
    )
}
export { ProductBulkDiscounts }