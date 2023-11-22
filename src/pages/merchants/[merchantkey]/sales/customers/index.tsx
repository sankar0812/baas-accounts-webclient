/**
 * CreatedBy : Pradeepa S
 * CreatedDate : OCT 10 2023
 * Description : This is the page file for slaes customer
 */


//Define Import here
import React, { useEffect, useState } from 'react';
import { Breadcrumb, platformHelper, sdkMui } from '@baas/platform-web-sdk';
import AppStore from '../../../../../../appstorefile';

//required files
import { ListCustomers } from '@/components/sales/customers/ListCustomers';
import { CustomerFunction } from '@/functions/sales/customers/CustomerFunction';
import { CustomerColumnSettings } from '@/configs/pages/sales/customers/CustomerColumnSettings.Config';
//Mui ICOns
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { InvoiceColumnSettings } from '@/components/sales/invoice/InvoicesColumnSettings';
import { useRouter } from 'next/router';

//Define Class objects here
const appstore = new AppStore()
const customerFunction = new CustomerFunction()
const customerColumnSettings = new CustomerColumnSettings()

export default function Vendor(props: any) {

    //Define usestates here
    const [listCustomers, setListCustomers] = useState(props?.customerList?.output)
    const [badgeCount, setIsbadgeCount] = useState(props?.customerCount?.output?._count)
    const [isBadgeLoading, setIsBadgeLoading] = useState(false)
    const [isListLoading, setIsListLoading] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const isMenuButtonOpen = Boolean(anchorEl);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [customerColumnHeaders] = useState(customerColumnSettings?.handleCustomerheaderColumn())

    const router = useRouter()

    const handleOnClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };


    const handleSearchClick = async () => {
        setIsBadgeLoading(true)
        setIsListLoading(true)
        let vendors = await customerFunction?.readCustomers({ "CreatedDate": 'desc' }, searchTerm, 0);
        if (vendors?.status === 200) {
            setListCustomers(vendors?.output);
            setIsListLoading(false)
        }
        else if (vendors?.status === 404) {
            setIsListLoading(false)
            setListCustomers(null)
        }


        let badgeCount = await customerFunction?.readCustomersCount(searchTerm);
        if (badgeCount?.status === 200) {
            setIsbadgeCount(badgeCount?.output?._count);
            setIsBadgeLoading(false)
        }
        else if (badgeCount?.status === 404) {
            setIsbadgeCount(0);
            setIsBadgeLoading(false)
        }

    };

    const handleColumnSettings = () => {
        setAnchorEl(null);
        setDrawerOpen(true);
    }

    const menu = [
        {
            id: "column-settings",
            value: "Column Settings",
            Click: () => handleColumnSettings()
        },
        {
            id: "Advance_Filetr",
            value: "Advance Filter",
            Click: () => { setAnchorEl(null) }
        }
    ]


    const readVendors = async () => {
        setIsListLoading(true)
        setIsBadgeLoading(true)
        let vendors = await customerFunction?.readCustomers({ "CreatedDate": 'desc' }, "", 0);
        if (vendors?.status === 200) {
            setListCustomers(vendors?.output);
            setIsListLoading(false)
        }
        else if (vendors?.status === 404) {
            setIsListLoading(false)
            setListCustomers(null)
        }

        let badgeCount = await customerFunction?.readCustomersCount("");
        if (badgeCount?.status === 200) {
            setIsbadgeCount(badgeCount?.output?._count);
            setIsBadgeLoading(false)
        }
        else if (badgeCount?.status === 404) {
            setIsbadgeCount(0);
            setIsBadgeLoading(false)
        }
    }

    useEffect(() => {
        if (searchTerm === '') {
            readVendors()
        }
    }, [searchTerm])

    return (
        <>
            <sdkMui.Grid container spacing={2} direction={'column'}>
                <sdkMui.Grid item xs={12} sx={{ ml: 3, mt: 1 }} >
                    <Breadcrumb configs={{
                        breadcrumbItems: [
                            { breadcrumbItemName: "Sales", href: ``, name: "Sales" },
                            { breadcrumbItemName: "Customers", href: "", name: "Customers" },
                        ],
                        router: router
                    }}
                        data={{ defaltBreadcrumbItemName: "Customers" }}
                    />
                </sdkMui.Grid>
                <sdkMui.Grid item xs={2} sx={{ p: 0, m: 0 }} >
                    <sdkMui.Card sx={{ p: 2 }}>
                        <sdkMui.Grid container spacing={0.5} direction={'row'} sx={{ display: 'flex', alignItems: 'center' }}>
                            <sdkMui.Grid item xs={12} sx={{ textAlign: 'left' }}>

                                <sdkMui.Typography variant={'h3'} fontWeight={'bold'} sx={{ ml: 1 }}>Customers</sdkMui.Typography>
                            </sdkMui.Grid>
                            <sdkMui.Grid item xs={12} sx={{ p: 2 }}>
                                <sdkMui.Divider style={{ visibility: 'visible' }} />
                            </sdkMui.Grid>
                            <sdkMui.Grid item xs={2} sx={{ textAlign: 'center' }}>
                                {isBadgeLoading ?
                                    <sdkMui.CircularProgress color="inherit" size={18} />
                                    :
                                    <sdkMui.Chip label={`Count : ${badgeCount}`} color='primary'></sdkMui.Chip>
                                }
                            </sdkMui.Grid>
                            <sdkMui.Grid item xs={9} sx={{ textAlign: 'center', mt: -1 }}>
                                <sdkMui.TextField
                                    placeholder="Search"
                                    type='search'
                                    fullWidth
                                    InputProps={{
                                        sx: { borderRadius: 5 },
                                        endAdornment: <sdkMui.Button variant='contained' sx={{ borderRadius: 5 }} onClick={handleSearchClick}><SearchIcon /></sdkMui.Button>,
                                    }}
                                    value={searchTerm}
                                    onChange={(event) => setSearchTerm(event.target.value)}
                                />
                            </sdkMui.Grid>
                            <sdkMui.Grid xs={1} sx={{ textAlign: 'center' }}>
                                <sdkMui.IconButton
                                    onClick={handleOnClickMenu}
                                    sx={{ ml: 2 }}>
                                    <MoreVertIcon />
                                </sdkMui.IconButton>
                                <sdkMui.Menu
                                    open={isMenuButtonOpen}
                                    anchorEl={anchorEl}
                                    onClose={() => setAnchorEl(null)}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                    sx={{ display: 'flex', textAlign: 'center', height: '85%' }}

                                >
                                    <sdkMui.Stack spacing={2} direction={'column'} sx={{ p: 1 }}>
                                        {
                                            menu?.map((data: any) => (
                                                <>
                                                    <sdkMui.Stack spacing={1} direction={'row'}>
                                                        {data.value === 'Column Settings' &&
                                                            <span className="material-symbols-outlined" style={{ fontSize: '20px', cursor: 'pointer' }}  >
                                                                data_table
                                                            </span>}
                                                        {data.value === 'Advance Filter' && <span className="material-symbols-outlined" style={{ fontSize: '20px', cursor: 'pointer' }}  >
                                                            filter_alt
                                                        </span>}
                                                        <sdkMui.MenuItem onClick={data?.Click} id={data?.id} sx={{ p: 0 }}>{data?.value}</sdkMui.MenuItem>
                                                    </sdkMui.Stack>
                                                </>
                                            ))
                                        }
                                    </sdkMui.Stack>
                                </sdkMui.Menu>
                                {
                                    drawerOpen &&
                                    <sdkMui.Drawer
                                        anchor={"right"}
                                        open={drawerOpen}
                                    >
                                        <sdkMui.Box
                                            sx={{ width: { lg: 350, xl: 350, md: 350, sm: 'fit-content', xs: 'fit-content' } }}
                                            role="presentation"
                                        >
                                            <sdkMui.Grid item xs={12}>
                                                <InvoiceColumnSettings
                                                    configs={{
                                                        title: ""
                                                    }}
                                                    data={{
                                                        columnsDetails: customerColumnHeaders
                                                    }}
                                                    callbacks={{
                                                        handleClose: () => { setDrawerOpen(false) }
                                                    }}
                                                />
                                            </sdkMui.Grid>
                                        </sdkMui.Box>
                                    </sdkMui.Drawer>
                                }
                            </sdkMui.Grid>
                        </sdkMui.Grid>
                    </sdkMui.Card>
                </sdkMui.Grid>
                <sdkMui.Grid item xs={10} >
                    {
                        isListLoading ?
                            <sdkMui.Stack sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <sdkMui.CircularProgress sx={{ alignItems: 'normal !important' }} />
                            </sdkMui.Stack> :
                            <>{listCustomers?.length > 0 ?
                                <>
                                    <sdkMui.Card>
                                        <ListCustomers
                                            configs={{
                                                "data-testid": 'Vendor_List',
                                                functionObject: customerFunction,
                                                filter: searchTerm,
                                                router: router
                                            }}
                                            data={{
                                                customerList: listCustomers,
                                                customerCount: badgeCount,
                                                customerID: listCustomers?.CustomerID,
                                                customerListColumnDetail: customerColumnHeaders
                                            }}
                                        />
                                    </sdkMui.Card>
                                </> : <>
                                    <sdkMui.Grid sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>No Data Found</sdkMui.Grid >
                                </>} </>

                    }
                </sdkMui.Grid>
            </sdkMui.Grid >
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
                permanent: false,
            },
        };
    }

    //ServerSide function calling
    let customerList = await customerFunction?.readCustomersSSR()
    let customerCount = await customerFunction?.readCustomersSSRCount()

    return {
        props: {
            customerList: customerList,
            customerCount: customerCount,
        }
    }
}