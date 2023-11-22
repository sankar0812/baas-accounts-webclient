/**
* CreatedBy    : Uma Kohila
* CreatedDate  : Oct 05 2023
* ModifiedBy   : Uma Kohila
* ModifiedDate : Oct 05 2023
* Description  : This file contains paymentsReceived module index page
*/

// Import all the neccessary files in header
import React, { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { Breadcrumb, Spinner, platformHelper, sdkMui } from "@baas/platform-web-sdk";
import { ListPaymentsReceived } from "@/components/sales/paymentsreceived/ListPaymentsReceived";
import { PaymentsReceivedFunction } from "@/functions/sales/PaymentReceived/PaymentReceivedFunction";
import { PaymentsReceivedColumnSettingsConfig } from "@/configs/pages/sales/paymentsReceived/PaymentsReceivedColumnSettings.config";
import { useRouter } from "next/router";
import AppStore from "../../../../../../appstorefile";
import { InvoiceColumnSettings } from "@/components/sales/invoice/InvoicesColumnSettings";


// Initialize the required files as a objects
const paymentsReceivedFunction = new PaymentsReceivedFunction()
const paymentsReceivedColumnSettingsConfig = new PaymentsReceivedColumnSettingsConfig()
const appstore = new AppStore();

export default function Paymentsreceived(props: any) {
    const [paymentsReceived, setPaymentsReceived] = useState(props?.paymentsRecived?.output);
    const [receivedPaymentsCount, setReceivedPaymentsCount] = useState(props?.receivedPaymentsCount?.output?._count)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [isListLoading, setIsListLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('');
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isBadgeLoading, setIsBadgeLoading] = useState(false)
    const [paymentsReceivedColumnSettings] = useState(paymentsReceivedColumnSettingsConfig?.handlePaymentsReceivedColumnSettings());
    const open = Boolean(anchorEl);
    const router = useRouter()

    const handleClickListItem = async (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleSearchClick = async () => {
        setIsListLoading(true)
        setIsBadgeLoading(true)
        let response = await paymentsReceivedFunction?.readPaymentsReceived(searchTerm, { "CreatedDate": 'asc' }, 0);
        if (response?.status === 200) {
            setPaymentsReceived(response?.output);
            setIsListLoading(false)
        }
        else if (response?.status === 404) {
            setIsListLoading(false)
            setPaymentsReceived(null)
        }

        let badgeCount = await paymentsReceivedFunction?.readPaymentsReceivedCount(searchTerm);
        if (badgeCount?.status === 200) {
            setReceivedPaymentsCount(badgeCount?.output?._count);
            setIsBadgeLoading(false)
        }
        else if (badgeCount?.status === 404) {
            setReceivedPaymentsCount(0);
            setIsBadgeLoading(false)
        }
    };

    useEffect(() => {
        console.info("PaymentsReceived", props?.paymentsRecived);
    },[props?.paymentsRecived])

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

    return (
        <>
            <sdkMui.Grid container spacing={2} direction={'column'}>
                <sdkMui.Grid item xs={12} sx={{ ml: 3, mt: 1 }} >
                    <Breadcrumb configs={{
                        breadcrumbItems: [
                            { breadcrumbItemName: "Sales", href: ``, name: "sales" },
                            { breadcrumbItemName: "Payments Received", href: "", name: "Payments Received" },
                        ],
                        router: router
                    }}
                        data={{ defaltBreadcrumbItemName: "Payments Received" }}
                    />
                </sdkMui.Grid>
                <sdkMui.Grid item xs={2} sx={{ p: 0, m: 0 }}>
                    <sdkMui.Card sx={{ p: 2 }} >
                        <sdkMui.Grid container spacing={0.5} direction={'row'} sx={{ display: 'flex', alignItems: 'center' }}>
                            <sdkMui.Grid item xs={6} sx={{ textAlign: 'left' }}>
                                <sdkMui.Typography variant="h3" fontWeight={'bold'} sx={{ ml: 1 }}>
                                    Payments Received
                                </sdkMui.Typography>
                            </sdkMui.Grid>                            
                            <sdkMui.Grid item xs={12} sx={{ p: 2 }}>
                                <sdkMui.Divider style={{ visibility: 'visible' }} />
                            </sdkMui.Grid>
                            <sdkMui.Grid item xs={2} sx={{ textAlign: 'center' }}>
                                {isBadgeLoading ?
                                    <sdkMui.Chip label={`Count : 0`} color='primary'></sdkMui.Chip> 
                                    :
                                    <sdkMui.Chip label={`Count : ${receivedPaymentsCount}`} color='primary'></sdkMui.Chip>
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
                                <sdkMui.IconButton sx={{ ml: 2 }} onClick={handleClickListItem} >
                                    <span className="material-symbols-outlined" style={{ fontSize: '30px', cursor: 'pointer', opacity: '1' }} >
                                        more_vert
                                    </span>
                                </sdkMui.IconButton>
                                <sdkMui.Menu
                                    open={open}
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
                                                        columnsDetails: paymentsReceivedColumnSettings
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
                    <sdkMui.Card>
                        {isListLoading ?
                            <Spinner /> :
                            <>
                                {paymentsReceived?.length > 0 ?
                                    <ListPaymentsReceived
                                        configs={{
                                            'data-testid': "List-PaymentRecived",
                                            functObj: paymentsReceivedFunction,
                                            filter: searchTerm
                                        }}
                                        data={{
                                            paymentsreceivedLists: paymentsReceived,
                                            paymentsReceivedCount: receivedPaymentsCount,
                                            paymentsReceivedListcolumnDetail: paymentsReceivedColumnSettings
                                        }}
                                        callbacks={{
                                        }}
                                    />
                                    :
                                    <>
                                        <sdkMui.Grid sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>No Data Found</sdkMui.Grid >
                                    </>
                                }
                            </>
                        }
                    </sdkMui.Card>
                </sdkMui.Grid>
            </sdkMui.Grid>
        </>
    )
}

export const getServerSideProps = async (context: any) => {

    const { query } = context;
    const merchantkey = query.merchantkey;
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

    let paymentsRecivedData = await paymentsReceivedFunction?.readPaymentsReceivedSSR();
    let BadgeCount = await paymentsReceivedFunction?.readPaymentsReceivedCountSSR();

    return {
        props: {
            paymentsRecived: paymentsRecivedData,
            receivedPaymentsCount: BadgeCount, 
            merchantkey: merchantkey

        }
    }
}