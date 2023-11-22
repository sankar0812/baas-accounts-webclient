/**
* CreatedBy    : Uma Kohila
* CreatedDate  : Oct 11 2023
* ModifiedBy   : Venugopal
* ModifiedDate : Nov 8 2023
* Description  : This file contains products module index page
*/

//Declare NEXT JS imports
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

//MUI imports
import SearchIcon from '@mui/icons-material/Search';

//SDk layer imports
import { Breadcrumb, Button, Snackbar, platformHelper, sdkMui } from "@baas/platform-web-sdk";

//Import required files
import { ListProducts } from "@/components/products/product/ListProducts";
import { AddProduct } from "@/components/products/product/AddProduct";
import { CurrencyFunction } from '@/functions/Currency/CurrencyFunction'
import { ProductFunction } from "@/functions/products/product/ProductsFuction";
import { Messages } from '@/utils/Messages';
import AppStore from "../../../../../../appstorefile";
import { ProductAdvanceFilter } from '@/components/products/product/AdvanceFilter'
import { CategoriesFunction } from "@/functions/products/categories/CategoriesFunction";


// Initialize the required files as a objects
const productFunction = new ProductFunction()
const currencyFunction = new CurrencyFunction();
const categoriesFunction = new CategoriesFunction()

const appstore = new AppStore()
const messages = new Messages()
const timeout = 3000

export default function Paymentsreceived(props: any) {
    const router = useRouter()

    const [productsList, setProductsList] = useState(props?.productData?.output);
    const [productsCount, setProductsCount] = useState<any>(props?.productsCount?.output?._count)
    const [isListLoading, setIsListLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('');
    const [currencylist] = useState(props?.CurrencyData?.output)
    const [enableCreateButton, setEnableCreateButton] = useState(false)
    const [appSettingUomData] = useState(props?.appSettingUoM?.output)
    const [createSuccessMessage, setCreateSuccessMessageOpen] = useState(false)
    const [isAddProductDrawerPopUpClose, setIsAddProductDrawerPopUpClose] = useState(false)
    const [isAdvanceFilterOpen, setIsAdvanceFilterOpen] = useState(false)
    const [IsServerErrorMessageOpen, setIsServerErrorMessageOpen] = useState(false)
    const [filterRequest,setFilterRequest] = useState()
    const [IsEntityErrorMessageOpen, setIsEntityErrorMessageOpen] = useState(false)
    const [isBadgeLoading, setIsBadgeLoading] = useState(false)

    const handleSearchClick = async () => {
        setIsListLoading(true)
        setIsBadgeLoading(true)
        let response = await productFunction?.readProduct(searchTerm, { "CreatedDate": 'desc' }, 0);
        let badgeCount = await productFunction?.readProductCount(searchTerm);

        if (response?.status === 200) {
            setIsListLoading(false)
            setIsBadgeLoading(false)
            setProductsList(response?.output);
            setProductsCount(badgeCount?.output?._count);
        } else {
            setProductsList(response?.output);
            setIsListLoading(false);
            setIsBadgeLoading(false)
            setProductsCount(0);
        }
    };

    const handleReadProduct = async () => {
        setIsListLoading(true)
        setIsBadgeLoading(true)
        let response = await productFunction?.readProduct(searchTerm, { "CreatedDate": 'desc' }, 0)
        let badgeCount = await productFunction?.readProductCount(searchTerm);
        if (response?.status === 200) {
            setIsListLoading(false)
            setIsBadgeLoading(false)
            setProductsList(response?.output)
            setProductsCount(badgeCount?.output?._count);
        }
    }

    const handleADDProduct = (data: any) => {
        if (data?.status === 200) {
            handleReadProduct()
            setEnableCreateButton(false)
            setCreateSuccessMessageOpen(true)
            setTimeout(() => {
                setCreateSuccessMessageOpen(false)
            }, timeout)
        } else if (data?.status === 422) {
            setEnableCreateButton(false)
            setIsEntityErrorMessageOpen(true)
            setTimeout(() => {
                setIsEntityErrorMessageOpen(false)
            }, timeout)
        }
        else {
            setEnableCreateButton(false)
            setIsServerErrorMessageOpen(true)
            setTimeout(() => {
                setIsServerErrorMessageOpen(false)
            }, timeout)
        }
    }

    useEffect(() => {
        console.info("Products", props?.productData);
    }, [props?.ProductsListData])


    useEffect(() => {
        if (searchTerm === '' && productsList?.length !== props?.productData?.output) {
            handleReadProduct()
        }
    }, [searchTerm])

    return (
        <>
            <sdkMui.Grid container spacing={2} direction={'column'}>
                <sdkMui.Grid container spacing={2} direction={'column'}>
                    <sdkMui.Grid item xs={12} sx={{ ml: 3, mt: 3, mb: 2 }} >
                        <Breadcrumb configs={{
                            breadcrumbItems: [
                                { breadcrumbItemName: "Products", href: ``, name: "products" },
                                { breadcrumbItemName: "Product", href: "", name: "product" },
                            ],
                            router: router
                        }}
                            data={{ defaltBreadcrumbItemName: "Products" }}
                        />
                    </sdkMui.Grid>
                </sdkMui.Grid>
                <sdkMui.Grid item xs={12}>
                    <sdkMui.Grid container spacing={0} alignItems={'center'} sx={{ display: 'flex' }}>
                        <sdkMui.Grid item xs={1.5} sx={{ textAlign: 'left', p: 1 }} >
                            <sdkMui.Typography variant={'h4'} fontWeight={'bold'} sx={{ ml: 2 }}>Products</sdkMui.Typography>
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={1.5} sx={{ textAlign: 'left' }}>
                            {isBadgeLoading ?
                                <sdkMui.CircularProgress color="inherit" size={18} />
                                :
                                <sdkMui.Chip label={`Count : ${productsCount}`} color='primary'></sdkMui.Chip>
                            }
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={6} sx={{ p: 1 }}>
                            <sdkMui.TextField
                                placeholder="Search"
                                type='search'
                                size='small'
                                sx={{ width: '100%' }}
                                InputProps={{
                                    sx: { borderRadius: 1 },
                                    endAdornment: <sdkMui.Button variant='contained' sx={{ borderRadius: 5 }} size='small' onClick={handleSearchClick}><SearchIcon /></sdkMui.Button>,
                                }}
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                            />

                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={1} textAlign={'left'}>
                            <span className="material-symbols-outlined" onClick={() => { setIsAdvanceFilterOpen(true) }} style={{ cursor: 'pointer' }}>
                                filter_alt
                            </span>
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={2} sx={{ p: 1 }} textAlign={'right'}>
                            <sdkMui.Button variant='contained' size='small' onClick={() => { setEnableCreateButton(true) }}>
                                <span className='material-symbols-outlined' style={{ fontSize: '12px', fontWeight: 'bold' }}>add</span> <span style={{ fontSize: '12px' }}>Add Product</span>
                            </sdkMui.Button>
                        </sdkMui.Grid>
                    </sdkMui.Grid>
                </sdkMui.Grid>
                <sdkMui.Grid container spacing={0} sx={{ display: 'flex' }}>
                    <sdkMui.Grid item xs={12}>
                        {productsList?.length > 0
                            ?
                            <>
                                {
                                    isListLoading ?
                                        <sdkMui.Stack sx={{ display: "flex", alignItems: "center", justifyContent: "center", p: 4 }}>
                                            <sdkMui.CircularProgress color="inherit" size={26} />
                                        </sdkMui.Stack>
                                        :
                                        <ListProducts
                                            configs={{
                                                'data-testid': "List-Products",
                                                functiontObj: productFunction,
                                                filter: searchTerm,
                                                router: router
                                            }}
                                            data={{
                                                productLists: productsList,
                                                productCount: productsCount
                                            }}
                                            callbacks={{
                                            }}
                                        />
                                }
                            </>
                            :

                            <sdkMui.Card sx={{ borderRadius: '10px' }} >
                                <sdkMui.Grid sx={{ display: 'flex', justifyContent: 'center', fontSize: '16px' }}>No Data Found</sdkMui.Grid >
                            </sdkMui.Card>
                        }
                    </sdkMui.Grid>
                </sdkMui.Grid>
                <sdkMui.Drawer
                    anchor={"right"}
                    open={enableCreateButton}
                >
                    <sdkMui.Box
                        sx={{ width: { lg: 350, xl: 350, md: 350, sm: 'fit-content', xs: 'fit-content' } }}
                        role="presentation"
                    >
                        <AddProduct
                            configs={{
                                dataTestID: 'Add_Product',
                                router: router,
                                functionObject: productFunction
                            }}
                            data={{
                                AppSettingUomData: appSettingUomData,
                                CurrencyData: currencylist,
                                ParentProductData: productsList
                            }}
                            callbacks={{
                                handleAddProduct: (data: any) => { handleADDProduct(data); },
                                handleFormClose: (isClose: boolean) => { setIsAddProductDrawerPopUpClose(isClose); setEnableCreateButton(isClose) },
                            }} />
                    </sdkMui.Box>
                </sdkMui.Drawer>
                {isAdvanceFilterOpen &&
                    <sdkMui.Drawer
                        anchor={"right"}
                        open={isAdvanceFilterOpen}
                    >
                        <sdkMui.Box
                            sx={{ width: { lg: 400, xl: 400, md: 400, sm: 'fit-content', xs: 'fit-content' } }}
                            role="presentation"
                        >
                            <ProductAdvanceFilter
                                configs={{
                                    datatestID: 'Product_Advance_Filter',
                                    functionObject: productFunction
                                }}
                                data={{
                                    categoryData: props?.categoryData?.output,
                                    productData: props?.parentProductData?.output,
                                    filterReq : filterRequest
                                }}
                                callbacks={{
                                    handleAdvanceFilterClose: (isClose: boolean) => { setIsAdvanceFilterOpen(isClose); },
                                    handleViewData: (data: Array<any>) => {
                                        setProductsCount(data?.length)
                                        setProductsList(data); setIsListLoading(true)
                                        setTimeout(() => {
                                            setIsListLoading(false)
                                        }), 3000
                                    },
                                    handleFilterData : (filterReq:any) => {setFilterRequest(filterReq)}
                                }}
                            />
                        </sdkMui.Box>
                    </sdkMui.Drawer>
                }
                {
                    isAddProductDrawerPopUpClose &&
                    <sdkMui.Dialog
                        open={isAddProductDrawerPopUpClose}
                        keepMounted
                    >
                        <sdkMui.DialogContent>
                            <sdkMui.DialogContentText>
                                <b>Your changes will be lost, Are you sure want to close..?</b>
                            </sdkMui.DialogContentText>
                        </sdkMui.DialogContent>
                        <sdkMui.DialogActions>
                            <Button
                                callbacks={{
                                    handleButtonClick: () => { setEnableCreateButton(true); setIsAddProductDrawerPopUpClose(false) }
                                }}
                                configs={{
                                    label: 'No',
                                    color: 'secondary',
                                    size: 'small',
                                    type: 'button',
                                    varient: 'contained',
                                }}
                            />
                            <Button
                                callbacks={{
                                    handleButtonClick: () => { setEnableCreateButton(false); setIsAddProductDrawerPopUpClose(false) }
                                }}
                                configs={{
                                    label: 'Yes',
                                    color: 'error',
                                    size: 'small',
                                    type: 'button',
                                    varient: 'contained',
                                }}
                            />
                        </sdkMui.DialogActions>
                    </sdkMui.Dialog>
                }
                {
                    createSuccessMessage &&
                    <Snackbar
                        configs={{
                            severity: 'success',
                            alertDescription: messages?.PRODUCT_ADD_SUCCESS_MESSAGE,
                            isSetOpen: createSuccessMessage,
                            snackbarAutoHideDuration: timeout
                        }}
                    />
                }
                {IsServerErrorMessageOpen && (
                    <Snackbar
                        configs={{
                            severity: "error",
                            alertDescription: messages?.STATUS_ERROR_MESSAGE_FOR_500,
                            isSetOpen: IsServerErrorMessageOpen,
                            snackbarAutoHideDuration: timeout,
                        }}
                    />
                )}
                {IsEntityErrorMessageOpen && (
                    <Snackbar
                        configs={{
                            severity: "error",
                            alertDescription: messages?.STATUS_ERROR_MESSAGE_FOR_422,
                            isSetOpen: IsEntityErrorMessageOpen,
                            snackbarAutoHideDuration: timeout,
                        }}
                    />
                )}
            </sdkMui.Grid>
        </>
    )
}

export const getServerSideProps = async (context: any) => {

    const INSTANCEKEY = appstore?.INSTANCE?.INSTANCE_KEY;
    const CONNECTORURL = appstore?.AUTH?.AUTH_CONNECTOR_URL;

    if (!platformHelper.checkUserCookieStorage(context)) {
        return {
            redirect: {
                destination: `${CONNECTORURL}/signin/${INSTANCEKEY}`,
                permanent: false
            },
        };
    }

    let BadgeCount = await productFunction?.readProductCountSSR();
    let CurrencyData = await currencyFunction?.readCurrencySSR();
    let appSettingUoM = await productFunction?.readAppSettingUoM();
    let productData = await productFunction?.readProductSSR()
    let parentProductData = await productFunction?.readProductListSSR()
    let categoryData = await categoriesFunction?.readCategoriesSSR()


    return {
        props: {
            productData: productData,
            parentProductData:parentProductData,
            productsCount: BadgeCount,
            CurrencyData: CurrencyData,
            appSettingUoM: appSettingUoM,
            categoryData: categoryData
        }
    }
}