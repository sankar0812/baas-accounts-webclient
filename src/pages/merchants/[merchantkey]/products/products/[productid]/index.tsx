/**
 * Created By : Pradeepa S
 * Created Date : Nov 8 2023
 * Description : This page conatin detail View of particular product
 */

//Next JS imports
import React, { useState } from "react";

//SDk layer imports
import { Breadcrumb, Button, Snackbar, platformHelper, sdkMui } from "@baas/platform-web-sdk";

//MUI imports
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

//Import required files
import AppStore from "../../../../../../../appstorefile";
import { CreatePacakge } from "@/components/products/product/package/AddPackage";
import { ListPackage } from '@/components/products/product/package/ListPackage';
import { ProductFunction } from "@/functions/products/product/ProductsFuction";
import { PackageFunction } from "@/functions/products/product/PackageFunction";
import { EditProduct } from "@/components/products/product/EditProduct";
import { CurrencyFunction } from '@/functions/Currency/CurrencyFunction'
import { useRouter } from "next/router";
import { Messages } from "@/utils/Messages";
import { AddProductPriceList } from "@/components/products/product/bulkDiscount/addProductBulkDiscount";
import { ProductBulkDiscounts } from "@/components/products/product/bulkDiscount/productBulkDiscounts";
import { BulkDiscountFunction } from "@/functions/products/product/bulkDiscount/bulkDiscountFunction";
import { RemoveProductPackage } from '@/components/products/product/package/RemovePackage';
import { AddCategory } from "@/components/products/product/categories/EditCategory";
import { CategoriesFunction } from "@/functions/products/product/categories/CategoriesFunction";


//Declare Objects here
const appstore = new AppStore()
const currencyFunction = new CurrencyFunction()
const messages = new Messages()
const productFunction = new ProductFunction()
const packageFunction = new PackageFunction()
const timeout = 3000
const bulkDiscountFunction = new BulkDiscountFunction()
const categoriesFunction = new CategoriesFunction()

export default function ProductDetailView(props: any) {
    const router = useRouter()
    const [productPackageData, setProductPackageData] = useState(props?.packageData?.output)
    const [packageTypeData] = useState(props?.PackageTypeData?.output)
    const [productData] = useState(props?.productData?.output[0])
    const [isPackageListLoading, setIsPackageListLoading] = useState(false)
    const [isPackageCreateEnabled, setIsPackageCreateEnabled] = useState(false)
    const [isDiscountCreateEnabled, setIsDiscountCreateEnabled] = useState(false)
    const [isPopUpVisible, setIsPopUpVisible] = useState(false)
    const [IsServerErrorMessageOpen, setIsServerErrorMessageOpen] = useState(false)
    const [IsEntityErrorMessageOpen, setIsEntityErrorMessageOpen] = useState(false)
    const [productCreateSuccessMessageOpen, setProductCreateSuccessMessageOpen] = useState(false)
    const [ProductsLists] = useState(props?.ProductLists?.output)
    const [deletedRecord, setDeletedRecord] = useState()
    const [IsDeletePopupVisible, setIsDeletePopupVisible] = useState(false);
    const [isDeleteSuccessMessageOpen, setIsDeleteSuccessMessageOpen] = useState(false)
    const [categoryLists] = useState(props?.categoryLists?.output)
    const [Merchantkey] = useState(props?.Merchantkey)
    const [ProductCategoryList] = useState(props?.ProductCategoryList?.output)

    const AccordianTitle = [
        {
            "Title": <sdkMui.Typography variant="h4" fontWeight={"bold"}> Product Info.</sdkMui.Typography>,
            "component": <EditProduct
                configs={{
                    dataTestID: "Edit-Product",
                    router: router,
                    merchantkey: Merchantkey
                }}
                data={{
                    editProductData: productData,
                    baseProducts: ProductsLists,
                    currencyData: props?.CurrencyData?.output,
                    AppsettingUOMData: props?.appSettingUoM?.output
                }}
            />
        },
        {
            "Title": <sdkMui.Typography variant="h4" fontWeight={"bold"}> Bulk Discount</sdkMui.Typography>,
            "component": isDiscountCreateEnabled ? <AddProductPriceList
                configs={{
                    "data-testid": 'Add_BulkDiscount',
                    functionObj: bulkDiscountFunction
                }}
                data={{
                    ProductListData: productData
                }}
                callbacks={{ handleAddClose: () => { setIsDiscountCreateEnabled(false) } }} />
                : <ProductBulkDiscounts configs={{ "data-testid": "BulkDiscountList", functionObj: bulkDiscountFunction, productID: parseInt(`${router?.query?.productid}`) }} data={{}} callbacks={{ handleAddDiscount: () => { setIsDiscountCreateEnabled(true) } }} />
        },
        {
            "Title": <sdkMui.Typography variant="h4" fontWeight={"bold"}> Package</sdkMui.Typography>,
            "component":
                <>
                    {isPackageCreateEnabled && <CreatePacakge
                        configs={{
                            datatestID: 'Product_Package_Create',
                            router: router,
                            functionObject: productFunction
                        }}
                        data={{
                            PackageTypeData: packageTypeData
                        }}
                        callbacks={{
                            handleClosePackageForm: (isClose: boolean) => { setIsPackageCreateEnabled(isClose); setIsPopUpVisible(isClose) },
                            handleCreatePackage: (data: any) => { handleAddProductPackage(data) }
                        }} />
                    }
                </>,
            "component1": <>

                {!isPackageCreateEnabled &&
                    <>
                        <sdkMui.Grid container spacing={2} >
                            <sdkMui.Grid item xs={12} textAlign={productPackageData?.length > 0 ? 'right' : 'center'} sx={{ p: 1 }}>
                                <sdkMui.Button size="small" variant="contained" sx={{ fontSize: '12px' }} onClick={() => { setIsPackageCreateEnabled(true) }}>{"+ " + " Add Package"}</sdkMui.Button>
                            </sdkMui.Grid>
                            <sdkMui.Grid item xs={12}>
                                {isPackageListLoading ?
                                    <sdkMui.CircularProgress />
                                    :
                                    <ListPackage
                                        configs={{ datatestID: 'list_Pakage' }}
                                        data={{ listPackage: productPackageData }}
                                        callbacks={{
                                            handleDelete: (isclose: boolean, data: any) => { setDeletedRecord(data); setIsDeletePopupVisible(isclose) }
                                        }} />
                                }
                            </sdkMui.Grid>
                        </sdkMui.Grid>
                    </>
                }
            </>

        },
        {
            "Title": <sdkMui.Typography variant="h4" fontWeight={"bold"}> Category</sdkMui.Typography>,
            "component": <AddCategory
                configs={{
                    "data-testid": 'Add_Category_to_the_Product',
                    functionObj: categoriesFunction,
                    router: router
                }}
                data={{
                    CategoryList: categoryLists,
                    CategoryData: ProductCategoryList
                }}
                callbacks={{}}
            />
        }
    ]

    const readProductPackage = async () => {
        let response = await productFunction?.readProductPackages(parseInt(`${router?.query?.productid}`))
        if (response?.status === 200) {
            setProductPackageData(response?.output)
            setIsPackageListLoading(false)
        }
        else if (response?.status === 404) {
            setProductPackageData([])
            setIsPackageListLoading(false)
        }
    }

    const handleAddProductPackage = (response: any) => {
        if (response?.status === 200) {
            readProductPackage()
            setIsPackageCreateEnabled(false)
            setIsPackageListLoading(true)
            setProductCreateSuccessMessageOpen(true)
            setTimeout(() => {
                setIsPackageListLoading(false)
                setProductCreateSuccessMessageOpen(false)
            }, timeout)
        } else if (response?.status === 422) {
            setIsPackageCreateEnabled(false)
            setIsEntityErrorMessageOpen(true)
            setTimeout(() => {
                setIsEntityErrorMessageOpen(false)
            }, timeout)
        }
        else {
            setIsPackageCreateEnabled(false)
            setIsServerErrorMessageOpen(true)
            setTimeout(() => {
                setIsServerErrorMessageOpen(false)
            }, timeout)
        }
    }

    const handleRemoveProductPackage = async (response: any) => {
        setIsDeletePopupVisible(false)
        setIsPackageListLoading(true)
        if (response?.status === 200) {
            setIsPackageListLoading(false)
            setIsDeletePopupVisible(false);
            readProductPackage();
            setIsDeleteSuccessMessageOpen(true);
            setTimeout(() => {
                setIsDeleteSuccessMessageOpen(false);
            }, timeout);
        } else if (response?.status === 422) {
            setIsPackageListLoading(false)
            setIsDeletePopupVisible(false);
            setIsEntityErrorMessageOpen(true);
            setTimeout(() => {
                setIsEntityErrorMessageOpen(false);
            }, timeout);
        } else {
            setIsPackageListLoading(false)
            setIsDeletePopupVisible(false);
            setIsServerErrorMessageOpen(true);
            setTimeout(() => {
                setIsServerErrorMessageOpen(false);
            }, timeout);
        }
    }


    return (
        <>

            <sdkMui.Grid container spacing={2}>
                <sdkMui.Grid item xs={11.5} >
                    <Breadcrumb configs={{
                        breadcrumbItems: [
                            { breadcrumbItemName: "Products", href: ``, name: "products" },
                            { breadcrumbItemName: "Product", href: "", name: "product" },
                            { breadcrumbItemName: `${props?.productData?.output[0].ProductName}`, href: "", name: `${props?.productData?.output[0].ProductName}` },
                        ],
                        router: router
                    }}
                        data={{ defaltBreadcrumbItemName: "Products" }}
                    />
                </sdkMui.Grid>
                <sdkMui.Grid item xs={0.5} textAlign={'center'}>
                    <span className='material-symbols-outlined' style={{ cursor: "pointer" }} onClick={() => { router.push(`/merchants/${router?.query?.merchantkey}/products/products`) }}> close </span>
                </sdkMui.Grid>
                <sdkMui.Grid item xs={12} sx={{ pb: 5 }}>
                    <sdkMui.Grid container spacing={0.25}>
                        {AccordianTitle.map((accordian) => (
                            <>
                                <sdkMui.Grid item xs={12} sx={{ p: 1 }}>
                                    <sdkMui.Accordion expanded>
                                        <sdkMui.AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <sdkMui.Typography>{accordian?.Title}</sdkMui.Typography>
                                        </sdkMui.AccordionSummary>
                                        <sdkMui.AccordionDetails>
                                            {accordian?.component}
                                            {accordian?.component1}
                                        </sdkMui.AccordionDetails>
                                    </sdkMui.Accordion>
                                </sdkMui.Grid>
                            </>

                        ))}
                    </sdkMui.Grid>
                </sdkMui.Grid>
            </sdkMui.Grid>
            {
                isPopUpVisible &&
                <sdkMui.Dialog
                    open={isPopUpVisible}
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
                                handleButtonClick: () => { setIsPackageCreateEnabled(true); setIsPopUpVisible(false) }
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
                                handleButtonClick: () => { setIsPackageCreateEnabled(false); setIsPopUpVisible(false) }
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
                <RemoveProductPackage
                    configs={{
                        title: "Delete Confirmation",
                        'data-testid': "Remove_Package",
                        deletedRecord: deletedRecord,
                        isDialogShow: IsDeletePopupVisible,
                        router: router,
                        functionObject: productFunction
                    }}
                    callbacks={{
                        handlePackageDeleteFormSubmit: (data: any) => { handleRemoveProductPackage(data) },
                        handlePackageDeleteFormClose: () => { setIsDeletePopupVisible(false) }
                    }} />
            }
            {
                productCreateSuccessMessageOpen &&
                <Snackbar
                    configs={{
                        severity: 'success',
                        alertDescription: messages?.PRODUCT_PACKAGE_ADDEDD_SUCCESSFULLY,
                        isSetOpen: productCreateSuccessMessageOpen,
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
            {isDeleteSuccessMessageOpen && (
                <Snackbar
                    configs={{
                        severity: "success",
                        alertDescription: messages?.PRODUCT_PACCKAGE_DELETE_SECCUESS_MESSAGE,
                        snackbarAutoHideDuration: timeout,
                        isSetOpen: isDeleteSuccessMessageOpen,
                        dataTestID: "deleted success fully",
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
        </>
    )
}


export const getServerSideProps = async (context: any) => {

    const { query } = context;
    const productid = query?.productid
    const merchantkey = query?.merchantkey
    const productID = parseInt(query?.productid)
    const INSTANCEKEY = appstore?.INSTANCE?.INSTANCE_KEY;
    const CONNECTORURL = appstore?.AUTH?.AUTH_CONNECTOR_URL;

    if (!platformHelper.checkUserCookieStorage(context)) {
        return {
            redirect: {
                destination: `${CONNECTORURL}/signin/${INSTANCEKEY}`,
                permanent: false,
            },
        };
    }

    let ProductCategoryList = await categoriesFunction?.readCategoriesforProductIDSSR(parseInt(productid));
    let packageData = await productFunction?.readProductPackagesSSR(productID)
    let packageTypeData = await packageFunction?.readPackageTypesSSR()
    let ProductLists = await productFunction?.readAllProductsSSR()
    let CurrencyData = await currencyFunction?.readCurrencySSR();
    let appSettingUoM = await productFunction?.readAppSettingUoM();
    let productData = await bulkDiscountFunction?.readProductSSR(productid)
    let categoryLists = await categoriesFunction?.readCategoriesforProductEditSSR()

    return {
        props: {
            packageData: packageData,
            PackageTypeData: packageTypeData,
            productData: productData,
            CurrencyData: CurrencyData,
            appSettingUoM: appSettingUoM,
            ProductLists: ProductLists,
            categoryLists: categoryLists,
            Merchantkey: merchantkey,
            ProductCategoryList: ProductCategoryList
        }
    }
}