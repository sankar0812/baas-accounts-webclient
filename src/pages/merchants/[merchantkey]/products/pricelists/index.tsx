import { ProductPriceList } from "@/components/products/pricelists/ListPriceList";
import React, { useState } from "react";
import { Button, Snackbar, Spinner } from "@baas/platform-web-sdk";
import SearchIcon from '@mui/icons-material/Search';
import AppStore from "../../../../../../appstorefile";
import { ProductPriceListFunction } from "@/functions/products/pricelists/ListPriceListFunction";
import { Breadcrumb, platformHelper, sdkMui } from "@baas/platform-web-sdk";
import { useRouter } from "next/router";
import { CreatePriceList } from "@/components/products/pricelists/createProductPriceList";
import { Messages } from "@/utils/Messages";

const appstore = new AppStore()
const messages = new Messages();
const productPriceListFunction = new ProductPriceListFunction();

export default function ListPriceList(props: any) {

    const [listpricelists, setListPricelist] = useState(props?.PriceList?.output)
    const [isBadgeLoading, setIsBadgeLoading] = useState(false)
    const [badgeCount, setIsbadgeCount] = useState(props?.PriceListCount?.output?._count)
    const [isListLoading, setIsListLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false)
    const [isCreateClosePopup, setIsCreateClosePopup] = useState(false)
    const [successMessageIsOpen, setSuccessMessageIsOpen] = useState(false)
    const [errorMessageIsOpenfor422, setErrorMessageIsOpenfor422] = useState(false)
    const [errorMessageIsOpenfor500, setErrorMessageIsOpenfor500] = useState(false)
    const [errorMessageIsOpenfor404, setErrorMessageIsOpenfor404] = useState(false)
    const router = useRouter()

    const handleAddPriceList = (response: any) => {
        if (response?.status === 200) {
            setIsAddDrawerOpen(false)
            setSuccessMessageIsOpen(true)
            handleSearchClick()
            setIsListLoading(true)
            setTimeout(() => {
                setSuccessMessageIsOpen(false)
                setIsAddDrawerOpen(false)
            }, 3000)
        } else if (response?.status === 404) {
            setIsAddDrawerOpen(true)
            setErrorMessageIsOpenfor404(true)
            setTimeout(() => {
                setErrorMessageIsOpenfor404(false)
                setIsAddDrawerOpen(false)
            }, 3000)
        } else if (response?.status === 422) {
            setIsAddDrawerOpen(true)
            setErrorMessageIsOpenfor422(true)
            setTimeout(() => {
                setErrorMessageIsOpenfor422(false)
                setIsAddDrawerOpen(false)
            }, 3000)
        }
        else {
            setIsAddDrawerOpen(true)
            setErrorMessageIsOpenfor500(true)
            setTimeout(() => {
                setErrorMessageIsOpenfor500(false)
                setIsAddDrawerOpen(false)
            }, 3000)
        }
    }
    const handleSearchClick = async () => {
        setIsListLoading(true)
        let listpricelists = await productPriceListFunction?.readPriceLists({ "CreatedDate": 'desc' }, searchTerm, 0);
        if (listpricelists?.status === 200) {
            setListPricelist(listpricelists?.output);
            setIsListLoading(false)
        }
        else if (listpricelists?.status === 404) {
            setIsListLoading(false)
            setListPricelist(null)
        }

        let badgeCount = await productPriceListFunction?.readPriceListCount(searchTerm);
        if (badgeCount?.status === 200) {
            setIsbadgeCount(badgeCount?.output?._count);
            setIsBadgeLoading(false)
        }
        else if (badgeCount?.status === 404) {
            setIsbadgeCount(0);
            setIsBadgeLoading(false)
        }

    }


    return (
        <>
            <sdkMui.Grid container spacing={2} direction={'column'}></sdkMui.Grid>
            <sdkMui.Grid item xs={12} sx={{ mt: 1 }} >
                &nbsp;
                <sdkMui.Grid item xs={12} sx={{ ml: 3, mt: 1 }} >
                    <Breadcrumb configs={{
                        breadcrumbItems: [
                            { breadcrumbItemName: "Products", href: ``, name: "Products" },
                            { breadcrumbItemName: "Price List", href: "", name: "Price List" },
                        ],
                        router: router
                    }}
                        data={{ defaltBreadcrumbItemName: "Products" }}
                    />
                </sdkMui.Grid>
                <sdkMui.Grid container spacing={0}>
                    <sdkMui.Grid item xs={1.5} sx={{ textAlign: 'center', p: 3, mt: 1 }}>
                        <b>Price List</b>
                    </sdkMui.Grid>
                    <sdkMui.Grid item xs={2} sx={{ textAlign: 'left', p: 3 }}>
                        {isBadgeLoading ?
                            <sdkMui.CircularProgress color="inherit" size={18} />
                            :
                            <sdkMui.Chip label={`Count : ${badgeCount}`} color='primary'></sdkMui.Chip>
                        }
                    </sdkMui.Grid>
                    <sdkMui.Grid item xs={6.5} sx={{ p: 3 }}>
                        <sdkMui.TextField
                            placeholder="Search"
                            type='search'
                            size='small'
                            sx={{ width: '75%' }}
                            InputProps={{
                                sx: { borderRadius: 1 },
                                endAdornment: <sdkMui.Button variant='contained' sx={{ borderRadius: 5 }} size='small' onClick={handleSearchClick}><SearchIcon /></sdkMui.Button>,
                            }}
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}

                        />
                        <span className="material-symbols-outlined" style={{ marginLeft: "20px", marginTop: "5px" }}>
                            filter_list
                        </span>
                    </sdkMui.Grid>

                    <sdkMui.Grid item xs={2} sx={{ p: 3 }} textAlign={"right"} >
                        <Button
                            configs={{
                                label: 'Add Price List',
                                dataTestID: 'PriceList-Add-Icon',
                                varient: 'contained',
                                size: 'small',
                                type: 'button',
                                startIcon: (
                                    <span style={{ marginRight: '-7px' }} className="material-symbols-outlined">
                                        add
                                    </span>
                                )
                            }}
                            callbacks={{
                                handleButtonClick: () => { setIsAddDrawerOpen(true) },
                                handleOnChange: () => { }
                            }}
                        />
                        {/* <sdkMui.Button variant='contained' size='small' onClick={() => { setIsAddDrawerOpen(true) }}><span className='material-symbols-outlined' style={{ fontSize: '12px', fontWeight: 'bold' }}>add</span>Add PriceList</sdkMui.Button> */}
                    </sdkMui.Grid>
                </sdkMui.Grid>
                <sdkMui.Grid container spacing={2}>
                </sdkMui.Grid>
                {isAddDrawerOpen &&
                    <sdkMui.Drawer
                        anchor={"right"}
                        open={isAddDrawerOpen}
                    >
                        <sdkMui.Box
                            sx={{ width: { lg: 350, xl: 350, md: 350, sm: 'fit-content', xs: 'fit-content' } }}
                            role="presentation"
                        >
                            <CreatePriceList
                                configs={{
                                    "data-testid": 'Product_Add_Store',
                                    functionObj: productPriceListFunction,
                                    merchantkey: '',
                                    router: router
                                }}
                                data={{
                                }}
                                callbacks={{
                                    handleAddPriceList: (data: any) => { handleAddPriceList(data) },
                                    handleFormClose: (isclose: boolean) => { setIsAddDrawerOpen(isclose); setIsCreateClosePopup(isclose) }
                                }} />
                        </sdkMui.Box>
                    </sdkMui.Drawer>
                }
                {listpricelists?.length > 0
                    ?
                    <>
                        {
                            isListLoading ?
                                <Spinner /> :
                                <ProductPriceList
                                    configs={{
                                        datatestID: "Product-Price-list-add-Icon",
                                        router: router

                                    }}
                                    data={{
                                        pricelist: listpricelists
                                    }}
                                />
                        }
                    </>
                    :
                    <>
                        <sdkMui.Grid sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>No Data Found</sdkMui.Grid >
                    </>
                }
                {
                    isCreateClosePopup &&
                    <sdkMui.Dialog
                        open={isCreateClosePopup}
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
                                    handleButtonClick: () => { setIsAddDrawerOpen(true); setIsCreateClosePopup(false) }
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
                                    handleButtonClick: () => { setIsAddDrawerOpen(false); setIsCreateClosePopup(false) }
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
                {successMessageIsOpen &&
                    <Snackbar
                        configs={{
                            alertDescription: messages?.PRICELIST_MESSAGES?.PRICELIST_ADD_SUCCESS_MESSAGE,
                            isSetOpen: successMessageIsOpen,
                            severity: 'success',
                            dataTestID: 'PriceList_Create_Success_Message',
                            snackbarAutoHideDuration: 3000
                        }} />
                }
                {errorMessageIsOpenfor404 &&
                    <Snackbar
                        configs={{
                            alertDescription: messages?.PRICELIST_MESSAGES?.PRICELIST_ADD_ERROR_MESSAGE_FOR_404,
                            isSetOpen: errorMessageIsOpenfor404,
                            severity: 'error',
                            dataTestID: 'PriceList_Create_Success_Message',
                            snackbarAutoHideDuration: 3000
                        }} />
                }
                {errorMessageIsOpenfor422 &&
                    <Snackbar
                        configs={{
                            alertDescription: messages?.PRICELIST_MESSAGES?.PRICELIST_ADD_ERROR_MESSAGE_FOR_422,
                            isSetOpen: errorMessageIsOpenfor422,
                            severity: 'error',
                            dataTestID: 'PriceList_Create_Success_Message',
                            snackbarAutoHideDuration: 3000
                        }} />
                }
                {errorMessageIsOpenfor500 &&
                    <Snackbar
                        configs={{
                            alertDescription: messages?.PRICELIST_MESSAGES?.PRICELIST_ADD_ERROR_MESSAGE_FOR_500,
                            isSetOpen: errorMessageIsOpenfor500,
                            severity: 'error',
                            dataTestID: 'PriceList_Create_Success_Message',
                            snackbarAutoHideDuration: 3000
                        }} />
                }
            </sdkMui.Grid>
        </>
    )

}
export const getServerSideProps = async (context: any) => {
    const { query } = context;
    const INSTANCEKEY = appstore?.INSTANCE?.INSTANCE_KEY;
    const CONNECTORURL = appstore?.AUTH?.AUTH_CONNECTOR_URL;
    const pricelistid = query.pricelistid;
    if (!platformHelper.checkUserCookieStorage(context)) {
        return {
            redirect: {
                destination: `${CONNECTORURL}/signin/${INSTANCEKEY}`,
                permanent: false,
            },
        };
    }

    //ServerSide function calling
    let PriceListCount = await productPriceListFunction?.readPriceListsSSRCount(pricelistid)
    let PriceList = await productPriceListFunction?.readsPriceListSSR()
    return {
        props: {
            PriceList: PriceList,
            PriceListCount: PriceListCount
        }
    }
}
