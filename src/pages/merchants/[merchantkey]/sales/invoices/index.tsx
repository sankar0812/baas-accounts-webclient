/**
 * CreatedBy : Nishanth
 * CreatedDate : Oct 07 2023
 * Description : This is the page file for Invoices screen 
 */

//Define Import here
import React, { useEffect, useState } from 'react';
import { Breadcrumb, Button, platformHelper, sdkMui } from '@baas/platform-web-sdk';
import AppStore from '../../../../../../appstorefile';

//required files
import { ListInvoices } from '@/components/sales/invoice/ListInvoices';
import { InvoicesFunction } from '@/functions/sales/invoices/InvoicesFuntion';
import { InvoicesColumnSettingsConfig } from '@/configs/pages/sales/invoices/InvoicesColumnSettings.Config';

//Mui ICOns
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { InvoiceColumnSettings } from '@/components/sales/invoice/InvoicesColumnSettings';
import { useRouter } from 'next/router';
import { Helper } from '@/utils/Helper';

import html2pdf from "html2pdf-jspdf2";
import moment from 'moment';
import { InvoicesPDFTemplate } from '@/components/sales/invoice/InvoicesPDFTemplate';


//Define Class objects here
const appstore = new AppStore()
const helper = new Helper()
const invoicesFunction = new InvoicesFunction()
const invoicesColumnSettingsConfig = new InvoicesColumnSettingsConfig()


export default function Invoices(props: any) {

    //Define usestates here
    const [listInvoices, setListInvoices] = useState(props?.invoicesList?.output)
    const [badgeCount, setIsbadgeCount] = useState(props?.invoicesCount?.output?._count)
    const [isBadgeLoading, setIsBadgeLoading] = useState(false)
    const [isListLoading, setIsListLoading] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const isMenuButtonOpen = Boolean(anchorEl);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [invoiceObject, setInvoiceObject] = useState<any>({})
    const [isViewEnabled, setIsViewEnabled] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const [downloadPDf, setDownloadPDf] = useState(false);
    const [isdownloadPDfLoading, setIsdownloadPDfLoading] = useState(false);
    const [selectedInoviceDetail, setSelectedInvoiceDetail] = useState<any>({});
    const [invoicesColumnHeaders] = useState(invoicesColumnSettingsConfig?.handleInvoicesColumnSettings())

    const router = useRouter()

    const handleOnClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };


    const handleSearchClick = async () => {
        setIsBadgeLoading(true)
        setIsListLoading(true)
        setIsViewEnabled(false)
        let invoices = await invoicesFunction?.readInvoices({ "CreatedDate": 'desc' }, searchTerm, 0);
        if (invoices?.status === 200) {
            setListInvoices(invoices?.output);
            setIsListLoading(false)
        }
        else if (invoices?.status === 404) {
            setIsListLoading(false)
            setListInvoices(null)
        }


        let badgeCount = await invoicesFunction?.readInvoicesCount(searchTerm);
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

    const handleStatusUpdateToOpen = async (data: any) => {
        setIsListLoading(true)
        setIsdownloadPDfLoading(true)
        let response = await invoicesFunction?.updateInvoiceStatustoOpen(data)
        if (response?.status === 200) {
            setIsdownloadPDfLoading(false)
            readInvoices()
        }
    }

    const readInvoices = async () => {
        setIsListLoading(true)
        setIsBadgeLoading(true)
        let invoices = await invoicesFunction?.readInvoices({ "CreatedDate": 'desc' }, "", 0);
        if (invoices?.status === 200) {
            setListInvoices(invoices?.output);
            setIsListLoading(false)
        }
        else if (invoices?.status === 404) {
            setIsListLoading(false)
            setListInvoices(null)
        }

        let badgeCount = await invoicesFunction?.readInvoicesCount("");
        if (badgeCount?.status === 200) {
            setIsbadgeCount(badgeCount?.output?._count);
            setIsBadgeLoading(false)
        }
        else if (badgeCount?.status === 404) {
            setIsbadgeCount(0);
            setIsBadgeLoading(false)
        }
    }

    const handleSelectedRow = async (invoiceID: any) => {
        setIsdownloadPDfLoading(true)
        let selectedRow = await invoicesFunction?.readInvoiceDetail(invoiceID);
        if (selectedRow?.status === 200) {
            setSelectedInvoiceDetail(selectedRow?.output);
            setIsdownloadPDfLoading(false)
        }
        else {
            setIsdownloadPDfLoading(false)
        }
    }

    useEffect(() => {
        if (Object.keys(selectedInoviceDetail).length > 0 && downloadPDf === true) {
            let htmlFormat = document.getElementById('jsxTemplate')
            let opt = {
                margin: 0.5,
                filename: `${selectedInoviceDetail?.InvoiceInfo?.InvoiceNumber + "  " + moment().format('MM/DD/YYYY h:mm')}.pdf`,
                image: { type: "png", quality: 0.98 },
                html2canvas: {
                    scale: 1,
                    imageTimeout: 0
                },
                jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
            };
            html2pdf().set(opt).from(htmlFormat).save();
            setDownloadPDf(false)
        }
    }, [selectedInoviceDetail, downloadPDf])

    useEffect(() => {
        if (searchTerm === '' && listInvoices?.length !== props?.invoicesList?.output) {
            readInvoices()
        }
    }, [searchTerm])

    return (
        <>
            <sdkMui.Grid container spacing={2} direction={'column'}>
                <sdkMui.Grid item xs={12} sx={{ ml: 3, mt: 1 }} >
                    <Breadcrumb configs={{
                        breadcrumbItems: [
                            { breadcrumbItemName: "Sales", href: ``, name: "Sales" },
                            { breadcrumbItemName: "Invoices", href: "", name: "Invoices" },
                        ],
                        router: router
                    }}
                        data={{ defaltBreadcrumbItemName: "Invoices" }}
                    />
                </sdkMui.Grid>
                {!isViewEnabled && <sdkMui.Grid item xs={2} sx={{ p: 0, m: 0 }} >
                    <sdkMui.Card sx={{ p: 2 }}>
                        <sdkMui.Grid container spacing={0.5} direction={'row'} sx={{ display: 'flex', alignItems: 'center' }}>
                            <sdkMui.Grid item xs={12} sx={{ textAlign: 'left' }}>
                                <sdkMui.Grid container spacing={2} direction={'row'}>
                                    <sdkMui.Grid item xs={10} sx={{ textAlign: 'left' }}>
                                        <sdkMui.Typography variant={'h3'} fontWeight={'bold'} sx={{ ml: 1 }}>Invoices</sdkMui.Typography>
                                    </sdkMui.Grid>
                                    <sdkMui.Grid item xs={2} sx={{ textAlign: 'center', p: 1 }}>
                                        <Button configs={{
                                            type: 'button',
                                            label: "Invoice",
                                            varient: 'contained',
                                            startIcon: <span className='material-symbols-outlined' style={{ fontSize: '12px', fontWeight: 'bold' }}>add</span>,
                                            color: 'primary',
                                            size: 'small'
                                        }} callbacks={{
                                            handleButtonClick: () => { router?.push(helper?.constructDynamicURL("/merchants/[merchantkey]/sales/invoices/add", { merchantkey: router?.query?.merchantkey })) }
                                        }} />
                                    </sdkMui.Grid>
                                </sdkMui.Grid>
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
                                                        columnsDetails: invoicesColumnHeaders
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
                </sdkMui.Grid>}
                <sdkMui.Grid item xs={12} >
                    <sdkMui.Grid container spacing={0} alignItems={'center'} sx={{ display: 'flex' }}>

                        {isViewEnabled && <>
                            <sdkMui.Grid item xs={1.5} sx={{ textAlign: 'left', p: 1 }} >
                                <sdkMui.Typography variant={'h4'} fontWeight={'bold'} sx={{ ml: 2 }}>All Invoices</sdkMui.Typography>
                            </sdkMui.Grid>
                            <sdkMui.Grid item xs={3.5} sx={{ p: 1 }}>
                                <sdkMui.TextField
                                    placeholder="Search"
                                    type='search'
                                    size='small'
                                    sx={{ width: '100%' }}
                                    InputProps={{
                                        sx: { borderRadius: 5 },
                                        endAdornment: <sdkMui.Button variant='contained' sx={{ borderRadius: 5 }} size='small' onClick={handleSearchClick}><SearchIcon /></sdkMui.Button>,
                                    }}
                                    value={searchTerm}
                                    onChange={(event) => setSearchTerm(event.target.value)}
                                />
                            </sdkMui.Grid>
                            <sdkMui.Grid item xs={6.5} sx={{ p: 1 }} textAlign={'right'}>
                                <sdkMui.Button variant='contained' size='small' onClick={() => { router?.push(helper?.constructDynamicURL("/merchants/[merchantkey]/sales/invoices/createinvoice", { merchantkey: router?.query?.merchantkey })) }}>
                                    <span className='material-symbols-outlined' style={{ fontSize: '12px', fontWeight: 'bold' }}>add</span>
                                    <sdkMui.Typography variant='subtitle2'>add</sdkMui.Typography></sdkMui.Button>
                            </sdkMui.Grid>
                            <sdkMui.Grid item xs={0.5} sx={{ p: 1 }} textAlign={'right'}>
                                <span className='material-symbols-outlined' style={{ cursor: 'pointer' }} onClick={() => {
                                    setIsViewEnabled(false)
                                }}> close
                                </span>
                            </sdkMui.Grid>
                        </>
                        }
                    </sdkMui.Grid>

                    <sdkMui.Grid container spacing={0} sx={{ display: 'flex' }}>
                        <sdkMui.Grid item xs={isViewEnabled ? 4 : 12} >
                            <sdkMui.Card sx={{ borderRadius: isViewEnabled ? '10px' : null }}>
                                {listInvoices?.length > 0 ?
                                    <>
                                        {
                                            isListLoading ?
                                                <sdkMui.Stack sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                    <sdkMui.CircularProgress sx={{ alignItems: 'normal !important' }} />
                                                </sdkMui.Stack>
                                                :
                                                <ListInvoices
                                                    configs={{
                                                        "data-testid": 'Invoices_List',
                                                        functionObject: invoicesFunction,
                                                        filter: searchTerm,
                                                        router: router,
                                                        View: isViewEnabled
                                                    }}
                                                    data={{
                                                        invoicesList: listInvoices,
                                                        invoicesCount: badgeCount,
                                                        InvoicesListColumnDetail: invoicesColumnHeaders
                                                    }}
                                                    callbacks={{
                                                        handleView: (invoice: any, isViewEnabled: boolean) => { setInvoiceObject(invoice); handleSelectedRow(invoice?.InvoiceID); setIsViewEnabled(isViewEnabled) }
                                                    }} />
                                        }
                                    </>
                                    :
                                    <sdkMui.Grid sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>No Data Found</sdkMui.Grid >}
                            </sdkMui.Card>
                        </sdkMui.Grid>
                        {isViewEnabled && <sdkMui.Grid item xs={8}>
                            <sdkMui.Grid container alignItems={'center'} spacing={1} sx={{ pt: 3 }}>
                                {invoiceObject?.InvoiceStatus?.InvoiceStatus === 'Open' &&
                                    <>
                                        <sdkMui.Grid item xs={2} textAlign={'center'}>
                                            <sdkMui.Button color='primary' variant='contained' size='small' sx={{ fontSize: '12px' }}> Record Payment</sdkMui.Button>
                                        </sdkMui.Grid>
                                    </>
                                }
                                <sdkMui.Grid item xs={2} sx={{ textAlign: 'left' }}>
                                    <sdkMui.Button size='small' variant='outlined' onClick={() => { setDownloadPDf(true) }} >
                                        <sdkMui.Stack spacing={0.5} direction={'row'}>
                                            <sdkMui.Typography sx={{ fontSize: '12px' }}>Download as</sdkMui.Typography>
                                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                                                picture_as_pdf
                                            </span>
                                        </sdkMui.Stack>
                                    </sdkMui.Button>
                                </sdkMui.Grid>
                                {invoiceObject?.InvoiceStatus?.InvoiceStatus === 'Draft' &&
                                    <>
                                        <sdkMui.Grid item xs={2} sx={{ textAlign: 'left', color: (theme) => (theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.main) }}>
                                            <sdkMui.Button size='small' variant='contained' color='inherit' style={{ fontSize: '13px' }} onClick={() => { handleStatusUpdateToOpen(invoiceObject) }}>
                                                Mark as sent
                                            </sdkMui.Button>
                                        </sdkMui.Grid>
                                    </>}
                            </sdkMui.Grid>
                            <sdkMui.Grid xs={12} sx={{ maxHeight: '63vh', overflowX: 'scroll', p: 1 }}>
                                {isdownloadPDfLoading ?
                                    <sdkMui.CircularProgress sx={{ alignItems: 'normal !important' }} /> :
                                    <InvoicesPDFTemplate
                                        data={{
                                            invoicePDFDetail: selectedInoviceDetail
                                        }}
                                    />
                                }
                            </sdkMui.Grid>
                        </sdkMui.Grid>}
                    </sdkMui.Grid>
                </sdkMui.Grid>
            </sdkMui.Grid>
            {/* </sdkMui.Grid > */}
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
    let invoicesList = await invoicesFunction?.readInvoicesSSR()
    let invoicesCount = await invoicesFunction?.readInvoicesSSRCount()


    return {
        props: {
            invoicesList: invoicesList,
            invoicesCount: invoicesCount
        }
    }
}