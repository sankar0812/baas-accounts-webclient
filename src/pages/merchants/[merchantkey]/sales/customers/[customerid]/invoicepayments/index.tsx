/**
* CreatedBy    : Uma Kohila
* CreatedDate  : Oct 05 2023
* ModifiedBy   : Pradeepa S
* ModifiedDate : Nov 18 2023
* Description  : This file contains invoice payments module index page
*/

// Import all the neccessary files in header
import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, platformHelper, sdkMui } from "@baas/platform-web-sdk";
import { useRouter } from "next/router";
import AppStore from "../../../../../../../../appstorefile";
import { CustomerSettingsList } from "@/components/sales/customers/CustomerSettings";
import { CustomersSettingsConfig } from "@/configs/pages/sales/customers/customerSettings.Config";
import { PaymentsFunction } from "@/functions/sales/customers/payments/paymentsFunction";
import { ColumnSettingsPaymentsConfig } from "@/configs/pages/sales/customers/payments/ColumnSettingsPayments.config";
import { Helper } from "@/utils/Helper";
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ListPayments } from "@/components/sales/customers/payments/ListPayments";
import { InvoiceColumnSettings } from "@/components/sales/invoice/InvoicesColumnSettings";
import { CustomerFunction } from "@/functions/sales/customers/CustomerFunction";



// Initialize the required files as a objects
const helper = new Helper();
const appstore = new AppStore();
const customersSettingsConfig = new CustomersSettingsConfig()
const cloumnSettingsPaymentsConfig = new ColumnSettingsPaymentsConfig()
const paymentsFunction = new PaymentsFunction();
const customerFunction = new CustomerFunction();



export default function Payments(props: any) {
    const router = useRouter()
    const [paymentColumnHeaders] = useState(cloumnSettingsPaymentsConfig?.handleCloumnSettingsPayments())
    const [paymentLists, setPaymentList] = useState(props?.PaymentList)
    const [badgeCount, setBadgeCount] = useState(props?.paymentCount?.output?._count)
    const [isBadgeLoading, setIsBadgeLoading] = useState<boolean>(false)
    const [isListLoading, setIsListLoading] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const isMenuButtonOpen = Boolean(anchorEl);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // useEffect(() => {
    //     console.info("PaymentsReceived", props?.PaymentsReceived);
    // }, [props?.PaymentsReceived])

    const handleOnClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleSearchClick = async () => {
        setIsBadgeLoading(true)
        setIsListLoading(true)
        let payments = await paymentsFunction?.readPaymentsList(searchTerm, router?.query?.customerid, { "CustomerPaymentID": "desc" });
        if (payments?.status === 200) {
            setPaymentList(payments?.output);
            setIsListLoading(false)
        }
        else if (payments?.status === 404) {
            setIsListLoading(false)
            setPaymentList(null)
        } else {
            setIsListLoading(false)
            setPaymentList(null)
        }

        let BadgeCount = await paymentsFunction?.readPaymentsCount(searchTerm, router?.query?.customerid);
        if (BadgeCount?.status === 200) {
            setBadgeCount(BadgeCount?.output?._count);
            setIsBadgeLoading(false)
        }
        if (badgeCount?.status === 404) {
            setIsBadgeLoading(false)
        } else {
            setIsBadgeLoading(false)
        }
    }

    const handleColumnSettings = () => {
        setAnchorEl(null);
        setDrawerOpen(true);
    };

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

    useEffect(() => {
        if (searchTerm === '' && paymentLists?.length !== props?.PaymentList) {
            readPayments()
        }
    }, [searchTerm])


    const readPayments = async () => {
        setIsListLoading(true)
        setIsBadgeLoading(true)
        let payments = await paymentsFunction?.readPaymentsList(searchTerm, router?.query?.customerid, { "CustomerPaymentID": "desc" });
        if (payments?.status === 200) {
            setPaymentList(payments?.output);
            setIsBadgeLoading(false)
            setIsListLoading(false)
        }
        else if (payments?.status === 404) {
            setIsListLoading(false)
            setPaymentList([])
            setIsBadgeLoading(false)
        }
        else {
            setIsListLoading(false)
            setPaymentList([])
            setIsBadgeLoading(false)
        }
    }

    return (
        <>
            <sdkMui.Grid container spacing={2} direction={'column'}>
                <sdkMui.Grid item xs={12} sx={{ mt: 1 }} >
                    <Breadcrumb configs={{
                        breadcrumbItems: [
                            { breadcrumbItemName: "Customers", href: `/merchants/${router?.query?.merchantkey}/sales/customers`, name: "Customers" },
                            { breadcrumbItemName: props?.customerData?.CustomerName, href: '', name: props?.customerData?.CustomerName },
                            { breadcrumbItemName: "Invoice Payments", href: "", name: "Invoice Payments" },
                        ],
                        router: router
                    }}
                        data={{ defaltBreadcrumbItemName: "Invoice Payments" }}
                    />
                </sdkMui.Grid>
                <sdkMui.Grid item xs={12} sx={{ mt: 1 }}>
                    <sdkMui.Grid container spacing={2} direction={'row'} sx={{ display: 'flex', }}>
                        <sdkMui.Grid item xs={2} sx={{ mt: 1, textAlign: 'left' }} >
                            <CustomerSettingsList
                                configs={{
                                    moduleName: 'Invoice Payments',
                                    router: router,
                                    selectedSchemaCode: 'INVOICEPAYMENTS'
                                }}
                                data={{
                                    customerSettingsList: customersSettingsConfig?.CUSTOMERS_DETAIL
                                }}
                            />
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={10} sx={{ textAlign: 'right', p: '2px' }}>
                            <sdkMui.Card sx={{ p: 2 }}>
                                <sdkMui.Grid container spacing={0.5} sx={{ display: 'flex', alignItems: 'center' }} >
                                    <sdkMui.Grid item xs={10} sx={{ textAlign: 'left' }}>
                                        <sdkMui.Typography variant={'h3'} fontWeight={'bold'} sx={{ ml: 1 }}>
                                            Invoice Payments
                                        </sdkMui.Typography>
                                    </sdkMui.Grid>
                                    <sdkMui.Grid item xs={2} sx={{ textAlign: 'right', p: '2px' }}>
                                        <Button
                                            configs={{
                                                label: 'Add Payment',
                                                dataTestID: 'PaymentsReceived-Add-Icon',
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
                                                handleButtonClick: () => { router?.push(helper?.constructDynamicURL(`/merchants/[merchantkey]/sales/customers/${router?.query?.customerid}/invoicepayments/recordpayments`, { "merchantkey": props?.merchantkey })) },
                                                handleOnChange: () => { }
                                            }}
                                        />
                                    </sdkMui.Grid>
                                    <sdkMui.Grid item xs={12} sx={{ p: 2 }}>
                                        <sdkMui.Divider style={{ visibility: 'visible' }} />
                                    </sdkMui.Grid>
                                    <sdkMui.Grid item xs={12} >
                                        <sdkMui.Grid container spacing={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                            <sdkMui.Grid item xs={2} sx={{ textAlign: 'center' }}>
                                                {isBadgeLoading ?
                                                    <sdkMui.CircularProgress color="inherit" size={18} />
                                                    :
                                                    <sdkMui.Chip label={`Count : ${badgeCount || 0}`} color='primary'></sdkMui.Chip>
                                                }
                                            </sdkMui.Grid>
                                            <sdkMui.Grid item xs={9} sx={{ textAlign: 'center', mt: -1 }}>
                                                <sdkMui.TextField
                                                    placeholder="Search"
                                                    type='search'
                                                    fullWidth
                                                    InputProps={{
                                                        sx: { borderRadius: 5 },
                                                        endAdornment: <sdkMui.Button
                                                            variant='contained'
                                                            sx={{ borderRadius: 5 }}
                                                            onClick={handleSearchClick}
                                                        >
                                                            <SearchIcon />
                                                        </sdkMui.Button>,
                                                    }}
                                                    value={searchTerm}
                                                    onChange={(event) => setSearchTerm(event.target.value)}
                                                />
                                            </sdkMui.Grid>
                                            <sdkMui.Grid xs={1} sx={{ textAlign: 'center' }}>
                                                <sdkMui.IconButton
                                                    onClick={handleOnClickMenu}
                                                    sx={{ ml: 2 }}
                                                >
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
                                                                        {
                                                                            data.value === 'Column Settings' &&
                                                                            <span
                                                                                className="material-symbols-outlined"
                                                                                style={{ fontSize: '20px', cursor: 'pointer' }}
                                                                            >
                                                                                data_table
                                                                            </span>
                                                                        }
                                                                        {
                                                                            data.value === 'Advance Filter' &&
                                                                            <span
                                                                                className="material-symbols-outlined"
                                                                                style={{ fontSize: '20px', cursor: 'pointer' }}
                                                                            >
                                                                                filter_alt
                                                                            </span>
                                                                        }
                                                                        <sdkMui.MenuItem
                                                                            onClick={data?.Click}
                                                                            id={data?.id}
                                                                            sx={{ p: 0 }}
                                                                        >
                                                                            {data?.value}
                                                                        </sdkMui.MenuItem>
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
                                                            sx={{
                                                                width: { lg: 350, xl: 350, md: 350, sm: 'fit-content', xs: 'fit-content' }
                                                            }}
                                                            role="presentation"
                                                        >
                                                            <sdkMui.Grid item xs={12}>
                                                                <InvoiceColumnSettings
                                                                    configs={{
                                                                        title: ""
                                                                    }}
                                                                    data={{
                                                                        columnsDetails: paymentColumnHeaders
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
                                    </sdkMui.Grid>
                                </sdkMui.Grid>
                            </sdkMui.Card>
                            <sdkMui.Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                                <sdkMui.Card >
                                    {paymentLists?.length > 0 ?
                                        <>
                                            {
                                                isListLoading ?
                                                    <sdkMui.Stack sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                        <sdkMui.CircularProgress sx={{ alignItems: 'normal !important' }} />
                                                    </sdkMui.Stack>
                                                    :
                                                    <ListPayments
                                                        configs={{
                                                            "data-testid": 'List-Invoice-Payments',
                                                            functionObject: paymentsFunction,
                                                            filter: searchTerm
                                                        }}
                                                        data={{
                                                            paymentList: paymentLists,
                                                            paymentCount: badgeCount,
                                                            paymentListColumnDetail: paymentColumnHeaders
                                                        }}
                                                        callback={{}}
                                                    />
                                            }
                                        </>
                                        :
                                        <>
                                            <sdkMui.Grid sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>
                                                No Data Found
                                            </sdkMui.Grid >
                                        </>
                                    }
                                </sdkMui.Card>
                            </sdkMui.Grid>
                        </sdkMui.Grid>
                    </sdkMui.Grid>
                </sdkMui.Grid >
            </sdkMui.Grid >
        </>
    )
}



export const getServerSideProps = async (context: any) => {

    const { query } = context;
    const merchantkey = query.merchantkey;
    const INSTANCEKEY = appstore?.INSTANCE?.INSTANCE_KEY;
    const CONNECTORURL = appstore?.AUTH?.AUTH_CONNECTOR_URL;
    const customerid = query.customerid;

    if (!platformHelper.checkUserCookieStorage(context)) {
        return {
            redirect: {
                destination: `${CONNECTORURL}/signin/${INSTANCEKEY}`,
                permanent: false
            },
        };
    }

    let paymentMethods = await paymentsFunction?.readPaymentsFunctionSSR()
    let CustomerPayments = [];
    let paymentList = await paymentsFunction?.readPaymentsListSSR(parseInt(customerid))
    if (paymentList.status === 200) {
        CustomerPayments = paymentList?.output;
    }
    let paymentCount = await paymentsFunction?.readPaymentsCountSSR(parseInt(customerid))
    let customerData = await customerFunction?.readCustomersByIDSSR(parseInt(customerid));

    return {
        props: {
            merchantkey: merchantkey,
            paymentMethods: paymentMethods,
            customerData: customerData?.output[0],
            PaymentList: CustomerPayments,
            paymentCount: paymentCount
        }
    }
}