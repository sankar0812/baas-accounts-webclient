/**
* CreatedBy    : Uma Kohila
* CreatedDate  : Oct 05 2023
* ModifiedBy   : Venugopal
* ModifiedDate : Nov 9 2023
* Description  : This file contains paymentsReceived module List component
*/

import React, { useState } from "react";
import { Chip, sdkMui } from "@baas/platform-web-sdk";
import { ListProductInterface } from "@/interfaces/components/products/product/ListProductsInterface";
import InfiniteScroll from 'react-infinite-scroll-component';
import logoimg from '@/assets/images/products.png';


export function ListProducts({ data, configs }: ListProductInterface) {

    const [isLoading] = useState(false);
    const [listProducts, setISListProducts] = useState(data?.productLists)
    const [sortreq] = useState<any>({})
    const [pageno, setPageNo] = useState<number>(1)
    const [isTableScrollLoading, setIsTableScrollLoading] = useState<boolean>(false)
    const [hasMoreRecords, setHasMoreRecords] = useState(data?.productLists?.length === 0 || data?.productLists?.length < 10 ? false : true);

    const fetchMoreData = async () => {
        try {
            setIsTableScrollLoading(true)
            let productsList = await configs?.functiontObj?.readProduct(configs?.filter, sortreq, pageno)
            setTimeout(() => {
                setPageNo(pageno + 1)
                productsList?.output && setISListProducts((oldData: any) => [...oldData, ...productsList?.output])
                if (productsList?.output?.length === 0 || productsList?.output?.length < 10) {
                    setHasMoreRecords(false)
                }
                setIsTableScrollLoading(false)
            }, 1000)
        }
        catch (error) {
            // Handle errors if any
            console.error('Error fetching more data:', error);
        }
    }


    return (
        <>
            <InfiniteScroll
                dataLength={listProducts?.length}
                next={fetchMoreData}
                hasMore={hasMoreRecords}
                scrollThreshold={0.8}
                scrollableTarget="scrollableDiv"
                loader={
                    isTableScrollLoading &&
                    <>
                        <sdkMui.Typography variant="caption" sx={{ display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                            <sdkMui.Box sx={{ position: 'relative', display: 'inline-flex', alignItems: "center", justifyContent: "center" }}>
                                <sdkMui.CircularProgress />
                                <sdkMui.Box
                                    sx={{
                                        top: 0,
                                        left: 0,
                                        bottom: 0,
                                        right: 0,
                                        position: 'absolute',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <sdkMui.Typography
                                        variant="h6"
                                        component="div"
                                        color="text.secondary"
                                    >{pageno}</sdkMui.Typography>
                                </sdkMui.Box>
                            </sdkMui.Box>
                        </sdkMui.Typography>
                    </>
                }
            >
                <sdkMui.TableContainer id="scrollableDiv" sx={{ maxHeight: "63vh", minHeight: 'fit-content' }}>
                    <sdkMui.Table data-testid={configs?.['data-testid']} sx={{ minWidth: 650, cursor: "pointer" }} aria-label="sticky table" stickyHeader>
                        {isLoading ?
                            <sdkMui.TableRow
                            >
                                <sdkMui.TableCell>
                                    <sdkMui.Stack sx={{ display: "flex", alignItems: "center", justifyContent: "center", pl: 10 }}>
                                        <sdkMui.CircularProgress color="inherit" size={24} />
                                    </sdkMui.Stack>
                                </sdkMui.TableCell>
                            </sdkMui.TableRow>

                            :
                            <sdkMui.TableBody>

                                {listProducts?.map((product: any, index: number) => (
                                    <sdkMui.TableRow key={index}
                                        sx={{
                                            '&:last-child td, &:last-child th': { border: 0 }, cursor: "pointer"
                                        }}
                                        onClick={() => { configs?.router.push(`/merchants/BBOS-MERCHANT-KEY/products/products/${product?.ProductID}`) }}
                                    >
                                        <sdkMui.Card sx={{
                                            p: 2, borderRadius: '8px', '&:hover': {
                                                transform: 'scale(1.0)', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)'
                                            }
                                        }} data-testid={`${product?.ProductName}-Card`}>
                                            <sdkMui.Grid container spacing={2} alignItems={'center'}>
                                                <sdkMui.Grid item xs={1.6} alignItems={'center'} data-testid={`${product?.ProductName}-Image`}>
                                                    <img
                                                        src={logoimg.src} alt={"ProductImage"} sizes='(max-width: 100px) 50px, 50px' width={100} height={100}
                                                        style={{
                                                            filter: 'drop-shadow(0px 0px 4px gray)'
                                                        }}
                                                    />
                                                </sdkMui.Grid>
                                                <sdkMui.Grid item xs={8} data-testid={`${product?.ProductName}-Details`} >
                                                    <sdkMui.Stack spacing={0.5} direction={'column'} data-testid={`${product?.ProductName}`}>
                                                        <sdkMui.Typography variant="h4" fontWeight={'bold'}>{product?.ProductName}</sdkMui.Typography>

                                                        <sdkMui.Grid container spacing={0} sx={{ pt: 1 }}>
                                                            <sdkMui.Grid item xs={3}>
                                                                <sdkMui.Stack spacing={2} direction={'row'} alignItems={'initial'} data-testid={`${product?.ProductName}-Code`}>
                                                                    <sdkMui.Typography variant="subtitle1" fontWeight={'bold'} color={'gray'}>Code : </sdkMui.Typography>
                                                                    <sdkMui.Typography variant="body1" color={'gray'}>{product?.ProductCode}</sdkMui.Typography>
                                                                </sdkMui.Stack>
                                                            </sdkMui.Grid>
                                                            <sdkMui.Grid item xs={3}>
                                                                <sdkMui.Stack spacing={2} direction={'row'} alignItems={'initial'} data-testid={`${product?.ProductName}-Code`}>
                                                                    <sdkMui.Typography variant="subtitle1" fontWeight={'bold'} color={'gray'}>Purchasable : </sdkMui.Typography>
                                                                    <Chip
                                                                        configs={{
                                                                            label: product?.IsPurchase === true ? "true" : "false",
                                                                            clickable: false,
                                                                            color: product?.IsPurchase === true ? 'primary' : "error",
                                                                            size: 'medium',

                                                                        }}
                                                                        callbacks={{
                                                                            handleClick: () => { },
                                                                            handleDelete: () => { }
                                                                        }}
                                                                    />
                                                                </sdkMui.Stack>

                                                            </sdkMui.Grid>
                                                            <sdkMui.Grid item xs={3}>
                                                                <sdkMui.Stack spacing={2} direction={'row'} alignItems={'initial'} data-testid={`${product?.ProductName}-isSellable`}>
                                                                    <sdkMui.Typography variant="subtitle1" fontWeight={'bold'} color={'gray'}>Sellable : </sdkMui.Typography>
                                                                    <Chip
                                                                        configs={{
                                                                            label: product?.IsSellable === true ? "true" : "false",
                                                                            clickable: false,
                                                                            color: product?.IsSellable === true ? 'primary' : "error",
                                                                            size: 'medium',

                                                                        }}
                                                                        callbacks={{
                                                                            handleClick: () => { },
                                                                            handleDelete: () => { }
                                                                        }}
                                                                    />
                                                                </sdkMui.Stack>
                                                            </sdkMui.Grid>

                                                        </sdkMui.Grid>
                                                        <sdkMui.Grid container spacing={0} sx={{ pt: 1 }}>
                                                            <sdkMui.Grid item xs={3}>
                                                                <sdkMui.Stack spacing={2} direction={'row'} alignItems={'initial'} data-testid={`${product?.ProductName}-SKU`}>
                                                                    <sdkMui.Typography variant="subtitle1" fontWeight={'bold'} color={'gray'}>SKU : </sdkMui.Typography>
                                                                    <sdkMui.Typography variant="body1" color={'gray'}>{product?.ProductSKU !== null && product?.ProductSKU !== "null" ? product?.ProductSKU : "N/A"}</sdkMui.Typography>
                                                                </sdkMui.Stack>
                                                            </sdkMui.Grid>

                                                            <sdkMui.Grid item xs={4}>
                                                                <sdkMui.Stack spacing={2} direction={'row'} alignItems={'initial'} data-testid={`${product?.ProductName}-UPC-Code`}>
                                                                    <sdkMui.Typography variant="subtitle1" fontWeight={'bold'} color={'gray'}>UPC-Code : </sdkMui.Typography>
                                                                    <sdkMui.Typography variant="body1" color={'gray'}>{product?.ProductUPC !== null && product?.ProductUPC !== "null" ? product?.ProductUPC : "N/A"}</sdkMui.Typography>
                                                                </sdkMui.Stack>

                                                            </sdkMui.Grid>
                                                            <sdkMui.Grid item xs={2}>
                                                                <sdkMui.Stack spacing={2} direction={'row'} alignItems={'initial'} data-testid={`${product?.ProductName}-goods`}>
                                                                    <sdkMui.Typography variant="subtitle1" fontWeight={'bold'} color={'gray'}>goods : </sdkMui.Typography>
                                                                    <Chip
                                                                        configs={{
                                                                            label: product?.IsGoods === true ? "true" : "false",
                                                                            clickable: false,
                                                                            color: product?.IsGoods === true ? 'primary' : "error",
                                                                            size: 'medium',

                                                                        }}
                                                                        callbacks={{
                                                                            handleClick: () => { },
                                                                            handleDelete: () => { }
                                                                        }}
                                                                    />
                                                                </sdkMui.Stack>
                                                            </sdkMui.Grid>
                                                            <sdkMui.Grid item xs={2}>
                                                                <sdkMui.Stack spacing={2} direction={'row'} alignItems={'initial'} data-testid={`${product?.ProductName}-service`}>
                                                                    <sdkMui.Typography variant="subtitle1" fontWeight={'bold'} color={'gray'}>service : </sdkMui.Typography>
                                                                    <Chip
                                                                        configs={{
                                                                            label: product?.IsService === true ? "true" : "false",
                                                                            clickable: false,
                                                                            color: product?.IsService === true ? 'primary' : "error",
                                                                            size: 'medium',

                                                                        }}
                                                                        callbacks={{
                                                                            handleClick: () => { },
                                                                            handleDelete: () => { }
                                                                        }}
                                                                    />
                                                                </sdkMui.Stack>
                                                            </sdkMui.Grid>

                                                        </sdkMui.Grid>


                                                        <sdkMui.Stack spacing={1} direction={'column'} data-testid={`${product?.ProductName}-Discount`}>
                                                            <sdkMui.Typography variant="subtitle1" fontWeight={'bold'} >Discount :</sdkMui.Typography>
                                                            <sdkMui.Stack spacing={0.5} direction={'row'}>
                                                                {/* <sdkMui.Box sx={{ border: "1px solid #E0E0E0", width: '10%', p: 0.7 }}>
                                                                    <sdkMui.Stack spacing={0} direction={'column'}>
                                                                        <sdkMui.Typography variant="h6">{product?.Currency?.CurrencyCode + ' ' + product?.Currency?.CurrencySymbol + ' ' + product?.BaseSaleRate || "N/A"}</sdkMui.Typography>
                                                                        <sdkMui.Typography variant="h6">{"Rate"}</sdkMui.Typography>
                                                                    </sdkMui.Stack>
                                                                </sdkMui.Box> */}
                                                                {/* <sdkMui.Box sx={{ border: "1px solid #E0E0E0", width: '90%', p: 0.5 }}> */}
                                                                {product?.ProductBulkDiscount?.length > 0
                                                                    ?
                                                                    <>
                                                                        <sdkMui.Stack spacing={0} direction={'row'} width={'100%'}>
                                                                            {product?.ProductBulkDiscount.map((data: any) => (
                                                                                <>
                                                                                    <sdkMui.Box sx={{ border: "1px solid #E0E0E0", p: 0.7 }}>
                                                                                        <sdkMui.Stack spacing={0.5} direction={'column'}>
                                                                                            <sdkMui.Stack direction={"row"} sx={{ alignContent: 'center' }} spacing={0.5}>
                                                                                                <span className='material-symbols-outlined' style={{ fontSize: '10px', fontWeight: 'bold', marginTop: '4px' }}>arrow_forward_ios</span>
                                                                                                <sdkMui.Typography variant="h6">{data?.RangeMin || 'N/A'}</sdkMui.Typography>
                                                                                                {data?.RangeMax !== "" && <>
                                                                                                    &nbsp; &nbsp;& &nbsp;
                                                                                                    <span className='material-symbols-outlined' style={{ fontSize: '10px', fontWeight: 'bold', marginTop: '4px' }}>arrow_back_ios</span>
                                                                                                    <sdkMui.Typography variant="h6">{data?.RangeMax || 'N/A'}</sdkMui.Typography>
                                                                                                </>}
                                                                                            </sdkMui.Stack>
                                                                                            <sdkMui.Typography variant="h6">{product?.Currency?.CurrencyCode + ' ' + product?.Currency?.CurrencySymbol + ' ' + data?.DiscountRate || "N/A"}</sdkMui.Typography>
                                                                                        </sdkMui.Stack>
                                                                                    </sdkMui.Box>
                                                                                </>
                                                                            ))}
                                                                        </sdkMui.Stack>
                                                                    </> :
                                                                    <>N/A</>}
                                                                {/* </sdkMui.Box > */}
                                                            </sdkMui.Stack>
                                                        </sdkMui.Stack>
                                                    </sdkMui.Stack>
                                                </sdkMui.Grid>
                                                <sdkMui.Grid item xs={2} borderLeft={"1px solid gray"}>

                                                    <sdkMui.Stack spacing={4} direction={'column'} alignItems={'left'}>
                                                        <sdkMui.Stack spacing={0} direction={'column'} alignItems={'left'} data-testid={`${product?.ProductName}-Rate`}>
                                                            <sdkMui.Typography variant="subtitle1">{product?.Currency?.CurrencyCode + ' ' + product?.Currency?.CurrencySymbol + ' ' + product?.BaseSaleRate}</sdkMui.Typography>
                                                            {product?.ComparisionSaleRate ?
                                                                <sdkMui.Typography sx={{ fontSize: "15px", textDecoration: "line-through" }}>{product?.Currency?.CurrencyCode + ': ' + product?.Currency?.CurrencySymbol + product?.ComparisionSaleRate}</sdkMui.Typography>
                                                                :
                                                                <sdkMui.Typography sx={{ fontSize: "15px", }}>{'N/A'}</sdkMui.Typography>
                                                            }
                                                        </sdkMui.Stack>
                                                        <sdkMui.Grid data-testid={`${product?.ProductName}-Status`}>
                                                            <Chip
                                                                configs={{
                                                                    label: product?.IsEnabled === true ? "Active" : "In-Active",
                                                                    clickable: false,
                                                                    color: product?.IsEnabled === true ? 'primary' : "error",
                                                                    size: 'medium',

                                                                }}
                                                                callbacks={{
                                                                    handleClick: () => { },
                                                                    handleDelete: () => { }
                                                                }}
                                                            />
                                                        </sdkMui.Grid>
                                                    </sdkMui.Stack>
                                                </sdkMui.Grid>
                                            </sdkMui.Grid>

                                        </sdkMui.Card>
                                    </sdkMui.TableRow>
                                ))}
                            </sdkMui.TableBody>
                        }
                    </sdkMui.Table>
                </sdkMui.TableContainer>
            </InfiniteScroll >
        </>
    )
}