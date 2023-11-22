/**
 * CreatedBy : Pradeepa S
 * CreatedDate : Oct 04 2023
 * Modified BY : Pradeepa S
 * Modified Date : Oct 31 2023
 * Description : This file contain table component of Invoices List
 */
import React, { useState, useEffect } from "react";
import { Chip, Snackbar, sdkMui } from "@baas/platform-web-sdk";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Helper } from "@/utils/Helper";
import InfiniteScroll from 'react-infinite-scroll-component';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { ListInvoicesInterface } from "@/interfaces/components/sales/invoices/ListInvoicesInterface";
import { InvoicesPDFTemplate } from "./InvoicesPDFTemplate";
import html2pdf from "html2pdf-jspdf2";
import moment from 'moment';
import { Messages } from '@/utils/Messages';

const helper = new Helper();
const messages = new Messages();
const successTimeOut = 3000
const errorTimeOut = 4000


function ListInvoices({ configs, data, callbacks }: ListInvoicesInterface) {

    //State varaiable
    const [invoicesColumnHeaders] = useState(data?.InvoicesListColumnDetail)
    const [listInvoices, setListInvoices] = useState(data?.invoicesList)
    const [activeHeader, setActiveHeader] = useState('InvoiceDate')
    const [orderBy, setOrderBy] = useState('desc')
    const [isLoading, setIsLoading] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [openanchorEl, setOpenAnchorEl] = React.useState<null | HTMLElement>(null);
    const [PaidanchorEl, setPaidAnchorEl] = React.useState<null | HTMLElement>(null);
    const [VoidanchorEl, setVoidAnchorEl] = React.useState<null | HTMLElement>(null);
    const [isTableScrollLoading, setIsTableScrollLoading] = useState<boolean>(false)
    const [hasMoreRecords, setHasMoreRecords] = useState(data?.invoicesList?.length === 0 || data?.invoicesList?.length < 10 ? false : true);
    const [sortreq, setSortReq] = useState<any>({})
    const [selectedInvoiceID, setSelectedInvoiceID] = useState('')
    const [pageno, setPageNo] = useState<number>(1)
    const [invoiceID, setInvocieID] = useState<number>();
    const [selectedInoviceDetail, setSelectedInvoiceDetail] = useState<any>({});
    const [isPDFDownloadSuccess, setIsPDFDownloadSuccess] = useState(false);
    const [isPDFDownloadError, setIsPDFDownloadError] = useState(false);


    const fetchMoreData = async () => {
        try {
            setIsTableScrollLoading(true)
            let InvoicesList = await configs?.functionObject?.readInvoices(Object.entries(sortreq).length > 0 ? sortreq : { "CreatedDate": "desc" }, configs?.filter, pageno)
            setTimeout(() => {
                setPageNo(pageno + 1)
                InvoicesList?.output && setListInvoices((oldData: any) => [...oldData, ...InvoicesList?.output])
                if (InvoicesList?.output?.length === 0 || InvoicesList?.output?.length < 10) {
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

    //Table sorting function
    const handleTableSort = async (data: string) => {
        setPageNo(1)
        const customer = {
            Customer: orderBy === 'asc' ? { [data]: 'asc' } : { [data]: 'desc' }
        };
        setIsLoading(true)
        if (data === 'CustomerName') {
            setSortReq(customer)
            let response = await configs?.functionObject?.readInvoices(sortreq, configs?.filter, 0)
            if (response?.status === 200) {
                setIsLoading(false)
                fetchMoreData()
                setListInvoices(response?.output)
            }
            setActiveHeader(data)
            orderBy === 'asc' && setOrderBy('desc')
            orderBy === 'desc' && setOrderBy('asc')
        } else {
            let sortreq = orderBy === 'asc' ? { [data]: 'asc' } : { [data]: 'desc' }
            setSortReq(sortreq)
            let response = await configs?.functionObject?.readInvoices(sortreq, configs?.filter, 0)
            if (response?.status === 200) {
                setIsLoading(false)
                setListInvoices(response?.output)
                fetchMoreData()
            }
            setActiveHeader(data)
            orderBy === 'asc' && setOrderBy('desc')
            orderBy === 'desc' && setOrderBy('asc')
        }
    }

    const handleStatusUpdatetoOpen = async () => {
        let request = listInvoices?.find((data: any) => data?.InvoiceID === invoiceID)
        setIsLoading(true)
        let response = await configs?.functionObject?.updateInvoiceStatustoOpen(request)
        if (response?.status === 200) {
            setPageNo(1)
            let listinvoice = await configs?.functionObject?.readInvoices(Object.entries(sortreq).length > 0 ? sortreq : { "CreatedDate": "desc" }, "", 0)
            if (listinvoice?.status === 200) {
                setIsLoading(false)
                setListInvoices(listinvoice?.output)
            }
        }
    }

    const handleStatusUpdatetoVoid = async (internalCode: string) => {
        let request = listInvoices?.find((data: any) => data?.InvoiceID === invoiceID)
        setIsLoading(true)
        setPageNo(1)
        let response = await configs?.functionObject?.updateInvoiceStatustoVoid(request, internalCode)
        if (response?.status === 200) {
            setIsLoading(true)
            let listinvoice = await configs?.functionObject?.readInvoices(Object.entries(sortreq).length > 0 ? sortreq : { "CreatedDate": "desc" }, "", 0)
            if (listinvoice?.status === 200) {
                setIsLoading(false)
                setListInvoices(listinvoice?.output)
                fetchMoreData()
            }
        }
    }

    const handleSelectedRow = async () => {
        setIsPDFDownloadSuccess(false);
        setIsPDFDownloadError(false);
        setAnchorEl(null);
        let selectedRow = await configs?.functionObject?.readInvoiceDetail(invoiceID);
        if (selectedRow?.status === 200) {
            setSelectedInvoiceDetail(selectedRow?.output);
        }
        else {
            setIsPDFDownloadError(true);
        }
    }

    useEffect(() => {
        if (Object.keys(selectedInoviceDetail).length > 0) {
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
            setIsPDFDownloadSuccess(true);
            setTimeout(() => {
                setIsPDFDownloadSuccess(false);
            }, 3000)
        }
    }, [selectedInoviceDetail])

    return (
        <>
            <sdkMui.Box
                sx={{
                    overflowY: 'auto', pb: 3
                }}
            >
                {isPDFDownloadSuccess &&
                    <Snackbar
                        configs={{
                            dataTestID: 'success-pdf-download',
                            severity: 'success',
                            alertDescription: messages?.PDF_DOWNLOAD_SUCCESS,
                            isSetOpen: isPDFDownloadSuccess,
                            snackbarAutoHideDuration: successTimeOut
                        }}
                    />
                }
                {isPDFDownloadError &&
                    <Snackbar
                        configs={{
                            dataTestID: 'error-pdf-download',
                            severity: 'error',
                            alertDescription: messages?.PDF_DOWNLOAD_ERROR,
                            isSetOpen: isPDFDownloadError,
                            snackbarAutoHideDuration: errorTimeOut
                        }}
                    />
                }
                <InfiniteScroll
                    dataLength={listInvoices.length}
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
                    {configs?.View === false ?
                        <sdkMui.TableContainer id="scrollableDiv" sx={{ maxHeight: '63vh', minHeight: 'fit-content', borderRadius: '10px' }}>
                            <sdkMui.Table data-testid={configs?.["data-testid"]} sx={{ minWidth: 650 }} aria-label="sticky table" stickyHeader>
                                <sdkMui.TableHead sx={{ background: (theme) => theme.palette.primary.main, color: (theme) => theme.palette.primary.contrastText }}>
                                    <sdkMui.TableRow>
                                        {
                                            invoicesColumnHeaders?.map((column: any, index: number) => (
                                                column?.IsVisible && <sdkMui.TableCell key={index} sx={{ background: (theme) => theme.palette.primary.main, color: (theme) => theme.palette.primary.contrastText }}>{column?.IsSortEnabled ? <sdkMui.TableSortLabel active={activeHeader === column?.ColumnName} sx={{ cursor: 'pointer', background: (theme) => theme.palette.primary.main, color: (theme) => theme.palette.primary.contrastText }} IconComponent={ArrowDropDownIcon} title={orderBy === 'desc' ? "Sort by Descending" : "Sort by Asecending"} direction={orderBy === 'desc' ? 'desc' : 'asc'} onClick={() => { handleTableSort(column?.ColumnName) }}><b> {helper?.convertToTitleCase(column?.DisplayName)}</b></sdkMui.TableSortLabel> : <b> {helper?.convertToTitleCase(column?.DisplayName)}</b>}</sdkMui.TableCell>
                                            ))
                                        }
                                        <sdkMui.TableCell sx={{ maxHeight: "75vh", minHeight: 'fit-content', background: (theme) => theme.palette.primary.main, color: (theme) => theme.palette.primary.contrastText }}>
                                            <b>Action</b>
                                        </sdkMui.TableCell>
                                    </sdkMui.TableRow>
                                </sdkMui.TableHead>
                                <sdkMui.TableBody>
                                    {isLoading ?
                                        <sdkMui.TableRow
                                        >
                                            <sdkMui.TableCell colSpan={invoicesColumnHeaders?.length + 1}>
                                                <sdkMui.Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    <sdkMui.CircularProgress sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} color="inherit" size={24} />
                                                </sdkMui.Box>
                                            </sdkMui.TableCell>
                                        </sdkMui.TableRow>
                                        :
                                        <>
                                            {listInvoices?.map((invoice: any, index: number) =>
                                                <sdkMui.TableRow key={index}
                                                    onClick={(e: any) => {
                                                        e?.stopPropagation(); callbacks?.handleView(invoice, true); setSelectedInvoiceID(invoice?.InvoiceID);
                                                    }}
                                                    sx={{
                                                        cursor: 'pointer', '&:hover': {
                                                            transform: 'scale(1.0)', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)'
                                                        }
                                                    }}
                                                >
                                                    {invoicesColumnHeaders?.find((data: any) => data?.ColumnName === 'CustomerName').IsVisible &&
                                                        <sdkMui.TableCell sx={{
                                                            bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary,
                                                            whiteSpace: 'nowrap',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            maxWidth: '150px',
                                                            cursor: 'pointer'
                                                        }} title={invoice?.Customer?.CustomerName} align="left">
                                                            {invoice?.Customer?.CustomerName}
                                                        </sdkMui.TableCell>
                                                    }
                                                    {invoicesColumnHeaders?.find((data: any) => data?.ColumnName === 'CustomerAccount').IsVisible &&
                                                        <sdkMui.TableCell sx={{
                                                            bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary,
                                                            whiteSpace: 'nowrap',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            maxWidth: '150px',
                                                            cursor: 'pointer'
                                                        }} title={invoice?.CustomerAccount?.DisplayName} align="left">
                                                            {invoice?.CustomerAccount?.DisplayName}
                                                        </sdkMui.TableCell>
                                                    }
                                                    {invoicesColumnHeaders?.find((data: any) => data?.ColumnName === 'InvoiceNumber').IsVisible &&
                                                        <sdkMui.TableCell sx={{
                                                            bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary,
                                                            whiteSpace: 'nowrap',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            maxWidth: '200px'
                                                        }} title={invoice?.InvoiceNumber} align="left">
                                                            {invoice?.InvoiceNumber}
                                                        </sdkMui.TableCell>
                                                    }
                                                    {invoicesColumnHeaders?.find((data: any) => data?.ColumnName === 'InvoiceDate').IsVisible &&
                                                        <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }}>
                                                            {new Date(invoice?.InvoiceDate).toISOString().split('T')[0]}
                                                        </sdkMui.TableCell>
                                                    }
                                                    {invoicesColumnHeaders?.find((data: any) => data?.ColumnName === 'InvoiceAmount').IsVisible &&
                                                        <sdkMui.TableCell sx={{
                                                            bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary,
                                                        }} title={invoice?.InvoiceAmount} align="left">
                                                            {invoice?.Currency.CurrencyCode} {invoice?.Currency?.CurrencySymbol} {invoice?.InvoiceAmount.toFixed(2)}
                                                        </sdkMui.TableCell>
                                                    }
                                                    {invoicesColumnHeaders?.find((data: any) => data?.ColumnName === 'BalanceDue').IsVisible &&
                                                        <sdkMui.TableCell sx={{
                                                            bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary,
                                                        }} title={invoice?.BalanceDue} align="left">
                                                            {invoice?.Currency.CurrencyCode} {invoice?.Currency?.CurrencySymbol} {invoice?.BalanceDue.toFixed(2)}
                                                        </sdkMui.TableCell>
                                                    }
                                                    {invoicesColumnHeaders?.find((data: any) => data?.ColumnName === 'InvoiceStatus').IsVisible &&
                                                        <sdkMui.TableCell sx={{
                                                            bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary,
                                                        }} align="left">
                                                            <Chip
                                                                callbacks={{
                                                                    handleClick: () => { },
                                                                    handleDelete: () => { }
                                                                }}
                                                                configs={{
                                                                    label: invoice?.InvoiceStatus?.InternalCode ? invoice?.InvoiceStatus?.InternalCode : null,
                                                                    size: 'small',
                                                                    variant: 'filled',
                                                                    color: 'primary'
                                                                }}
                                                            />
                                                        </sdkMui.TableCell>
                                                    }
                                                    {invoicesColumnHeaders?.find((data: any) => data?.ColumnName === 'Adjustment').IsVisible &&
                                                        <sdkMui.TableCell sx={{
                                                            bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary,
                                                        }} title={invoice?.Adjustment} align="left">
                                                            {invoice?.Adjustment?.toFixed(2)}
                                                        </sdkMui.TableCell>
                                                    }
                                                    {invoicesColumnHeaders?.find((data: any) => data?.ColumnName === 'BackupCharges').IsVisible &&
                                                        <sdkMui.TableCell sx={{
                                                            bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary,
                                                        }} title={invoice?.BackupCharges} align="left">
                                                            {invoice?.BackupCharges.toFixed(2)}
                                                        </sdkMui.TableCell>
                                                    }
                                                    {invoicesColumnHeaders?.find((data: any) => data?.ColumnName === 'CreatedBy').IsVisible &&
                                                        <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }}>
                                                            {invoice?.CreatedBy}
                                                        </sdkMui.TableCell>
                                                    }
                                                    {invoicesColumnHeaders?.find((data: any) => data?.ColumnName === 'CreatedDate').IsVisible &&
                                                        <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }}>
                                                            {new Date(invoice?.CreatedDate).toISOString().split('T')[0]}
                                                        </sdkMui.TableCell>
                                                    }

                                                    {invoicesColumnHeaders?.find((data: any) => data?.ColumnName === 'ModifiedDate').IsVisible &&
                                                        <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }}>
                                                            {new Date(invoice?.ModifiedDate).toISOString().split('T')[0]}
                                                        </sdkMui.TableCell>
                                                    }
                                                    {invoicesColumnHeaders?.find((data: any) => data?.ColumnName === 'ModifiedBy').IsVisible &&
                                                        <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }}>
                                                            {invoice?.ModifiedBy}
                                                        </sdkMui.TableCell>
                                                    }
                                                    {invoice?.InvoiceStatus?.InvoiceStatus === 'Draft' && <>
                                                        <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }} onClick={(e: any) => { e?.stopPropagation(); }}>
                                                            <sdkMui.IconButton
                                                                aria-haspopup="true"
                                                                data-testid={`${invoice?.InvoiceID}-Action`}
                                                                onClick={(e: any) => { e?.stopPropagation(); setAnchorEl(e?.currentTarget); setInvocieID(invoice?.InvoiceID) }}
                                                            >
                                                                <MoreVertIcon />
                                                            </sdkMui.IconButton>
                                                            {anchorEl && <>
                                                                <sdkMui.Menu
                                                                    open={Boolean(anchorEl)}
                                                                    anchorEl={anchorEl}
                                                                    onClose={() => { setAnchorEl(null) }}
                                                                    keepMounted
                                                                    sx={{ display: 'flex', textAlign: 'center', height: '85%' }}
                                                                >
                                                                    <sdkMui.MenuItem onClick={() => { setAnchorEl(null) }}>
                                                                        <sdkMui.Stack spacing={1} direction={'row'}>
                                                                            <span data-testid={`${invoice?.InvoiceID}-Edit-Icon`} className="material-symbols-outlined" style={{ fontSize: '16px', cursor: 'pointer', marginTop: '4px' }}  >
                                                                                edit
                                                                            </span>
                                                                            <span data-testid={`${invoice?.InvoiceID}-Edit-Text`} style={{ fontSize: '16px', cursor: 'pointer' }} >
                                                                                Edit
                                                                            </span>
                                                                        </sdkMui.Stack>
                                                                    </sdkMui.MenuItem>
                                                                    <sdkMui.MenuItem onClick={() => { handleStatusUpdatetoOpen(); setAnchorEl(null) }}>
                                                                        <sdkMui.Stack spacing={1} direction={'row'}>
                                                                            <span data-testid={`${invoice?.InvoiceID}-MarkAsSent-Icon`} className="material-symbols-outlined" style={{ fontSize: '16px', cursor: 'pointer', marginTop: '4px' }} >
                                                                                mark_email_read
                                                                            </span>
                                                                            <span data-testid={`${invoice?.InvoiceID}-MarkAsSent-Text`} style={{ fontSize: '16px', cursor: 'pointer' }} >
                                                                                Mark as Sent
                                                                            </span>
                                                                        </sdkMui.Stack>
                                                                    </sdkMui.MenuItem>
                                                                    <sdkMui.MenuItem onClick={() => { handleStatusUpdatetoVoid(invoice?.InvoiceStatus?.InternalCode); setAnchorEl(null) }}>
                                                                        <sdkMui.Stack spacing={1} direction={'row'}>
                                                                            <span data-testid={`${invoice?.InvoiceID}-Delete-Icon`} className="material-symbols-outlined" style={{ fontSize: '16px', cursor: 'pointer', marginTop: '4px' }} >
                                                                                delete
                                                                            </span>
                                                                            <span data-testid={`${invoice?.InvoiceID}-Delete-Text`} style={{ fontSize: '16px', cursor: 'pointer' }} >
                                                                                Void
                                                                            </span>
                                                                        </sdkMui.Stack>
                                                                    </sdkMui.MenuItem>
                                                                    <sdkMui.MenuItem onClick={() => { handleSelectedRow() }}>
                                                                        <sdkMui.Stack spacing={1} direction={'row'}>
                                                                            <span data-testid={`${invoice?.InvoiceID}-PDF-Download`} className="material-symbols-outlined" style={{ fontSize: '16px', cursor: 'pointer', marginTop: '4px' }} >
                                                                                arrow_downward
                                                                            </span>
                                                                            <span data-testid={`${invoice?.InvoiceID}-PDF-Download-Text`} style={{ fontSize: '16px', cursor: 'pointer' }} >
                                                                                Download PDF
                                                                            </span>
                                                                        </sdkMui.Stack>
                                                                    </sdkMui.MenuItem>
                                                                </sdkMui.Menu>
                                                            </>}
                                                        </sdkMui.TableCell>
                                                    </>}
                                                    {invoice?.InvoiceStatus?.InvoiceStatus === 'Open' && <>
                                                        <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }} onClick={(e: any) => { e?.stopPropagation(); }}>
                                                            <sdkMui.IconButton
                                                                aria-haspopup="true"
                                                                data-testid={`${invoice?.InvoiceID}-Action`}
                                                                onClick={(e: any) => { e?.stopPropagation(); setOpenAnchorEl(e?.currentTarget); setInvocieID(invoice?.InvoiceID) }}
                                                            >
                                                                <MoreVertIcon />
                                                            </sdkMui.IconButton>
                                                            {openanchorEl && <>
                                                                <sdkMui.Menu
                                                                    open={Boolean(openanchorEl)}
                                                                    anchorEl={openanchorEl}
                                                                    onClose={() => { setOpenAnchorEl(null) }}
                                                                    keepMounted
                                                                    sx={{ display: 'flex', textAlign: 'center', height: '85%' }}
                                                                >
                                                                    <sdkMui.MenuItem onClick={() => { handleStatusUpdatetoVoid(invoice?.InvoiceStatus?.InternalCode); setOpenAnchorEl(null) }}>                                                                        <sdkMui.Stack spacing={1} direction={'row'}>
                                                                        <span data-testid={`${invoice?.InvoiceID}-Delete-Icon`} className="material-symbols-outlined" style={{ fontSize: '16px', cursor: 'pointer', marginTop: '4px' }} >
                                                                            delete
                                                                        </span>
                                                                        <span data-testid={`${invoice?.InvoiceID}-Delete-Text`} style={{ fontSize: '16px', cursor: 'pointer' }} >
                                                                            Void
                                                                        </span>
                                                                    </sdkMui.Stack>
                                                                    </sdkMui.MenuItem>
                                                                    <sdkMui.MenuItem onClick={() => { handleSelectedRow(); setOpenAnchorEl(null) }}>
                                                                        <sdkMui.Stack spacing={1} direction={'row'}>
                                                                            <span data-testid={`${invoice?.InvoiceID}-PDF-Download`} className="material-symbols-outlined" style={{ fontSize: '16px', cursor: 'pointer', marginTop: '4px' }} >
                                                                                arrow_downward
                                                                            </span>
                                                                            <span data-testid={`${invoice?.InvoiceID}-PDF-Download-Text`} style={{ fontSize: '16px', cursor: 'pointer' }} >
                                                                                Download PDF
                                                                            </span>
                                                                        </sdkMui.Stack>
                                                                    </sdkMui.MenuItem>
                                                                </sdkMui.Menu>
                                                            </>}
                                                        </sdkMui.TableCell>
                                                    </>}
                                                    {invoice?.InvoiceStatus?.InvoiceStatus === 'Paid' && <>
                                                        <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }} onClick={(e: any) => { e?.stopPropagation(); }}>
                                                            <sdkMui.IconButton
                                                                aria-haspopup="true"
                                                                data-testid={`${invoice?.InvoiceID}-Action`}
                                                                onClick={(e: any) => { e?.stopPropagation(); setPaidAnchorEl(e?.currentTarget); setInvocieID(invoice?.InvoiceID) }}
                                                            >
                                                                <MoreVertIcon />
                                                            </sdkMui.IconButton>
                                                            {PaidanchorEl && <>
                                                                <sdkMui.Menu
                                                                    open={Boolean(PaidanchorEl)}
                                                                    anchorEl={PaidanchorEl}
                                                                    onClose={() => { setPaidAnchorEl(null) }}
                                                                    keepMounted
                                                                    sx={{ display: 'flex', textAlign: 'center', height: '85%' }}
                                                                >
                                                                    <sdkMui.MenuItem onClick={() => { handleSelectedRow(); setPaidAnchorEl(null) }}>
                                                                        <sdkMui.Stack spacing={1} direction={'row'}>
                                                                            <span data-testid={`${invoice?.InvoiceID}-PDF-Download`} className="material-symbols-outlined" style={{ fontSize: '16px', cursor: 'pointer', marginTop: '4px' }} >
                                                                                arrow_downward
                                                                            </span>
                                                                            <span data-testid={`${invoice?.InvoiceID}-PDF-Download-Text`} style={{ fontSize: '16px', cursor: 'pointer' }} >
                                                                                Download PDF
                                                                            </span>
                                                                        </sdkMui.Stack>
                                                                    </sdkMui.MenuItem>
                                                                </sdkMui.Menu>
                                                            </>}
                                                        </sdkMui.TableCell>
                                                    </>}
                                                    {invoice?.InvoiceStatus?.InvoiceStatus === 'Void' && <>
                                                        <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }} onClick={(e: any) => { e?.stopPropagation(); }}>
                                                            <sdkMui.IconButton
                                                                aria-haspopup="true"
                                                                data-testid={`${invoice?.InvoiceID}-Action`}
                                                                onClick={(e: any) => { e?.stopPropagation(); setVoidAnchorEl(e?.currentTarget); setInvocieID(invoice?.InvoiceID) }}
                                                            >
                                                                <MoreVertIcon />
                                                            </sdkMui.IconButton>
                                                            {VoidanchorEl && <>
                                                                <sdkMui.Menu
                                                                    open={Boolean(VoidanchorEl)}
                                                                    anchorEl={VoidanchorEl}
                                                                    onClose={() => { setVoidAnchorEl(null) }}
                                                                    keepMounted
                                                                    sx={{ display: 'flex', textAlign: 'center', height: '85%' }}
                                                                >
                                                                    <sdkMui.MenuItem onClick={() => { handleSelectedRow(); setVoidAnchorEl(null) }}>
                                                                        <sdkMui.Stack spacing={1} direction={'row'}>
                                                                            <span data-testid={`${invoice?.InvoiceID}-PDF-Download`} className="material-symbols-outlined" style={{ fontSize: '16px', cursor: 'pointer', marginTop: '4px' }} >
                                                                                arrow_downward
                                                                            </span>
                                                                            <span data-testid={`${invoice?.InvoiceID}-PDF-Download-Text`} style={{ fontSize: '16px', cursor: 'pointer' }} >
                                                                                Download PDF
                                                                            </span>
                                                                        </sdkMui.Stack>
                                                                    </sdkMui.MenuItem>
                                                                </sdkMui.Menu>
                                                            </>}
                                                        </sdkMui.TableCell>
                                                    </>}
                                                </sdkMui.TableRow>
                                            )}
                                        </>
                                    }
                                </sdkMui.TableBody>
                            </sdkMui.Table>
                        </sdkMui.TableContainer >
                        :
                        <>

                            <sdkMui.Box id="scrollableDiv" sx={{ maxHeight: '63vh', minHeight: 'fit-content' }}>
                                {listInvoices?.map((invoice: any) => (
                                    <>

                                        <sdkMui.TableContainer>
                                            <sdkMui.Table >
                                                <sdkMui.TableBody>
                                                    <sdkMui.TableRow onClick={() => { callbacks?.handleView(invoice, true); setSelectedInvoiceID(invoice?.InvoiceID); }} selected={invoice?.InvoiceID === selectedInvoiceID}>
                                                        <sdkMui.TableCell width={"50%"}>
                                                            <sdkMui.Stack spacing={1} direction={'column'}>
                                                                <>
                                                                    <sdkMui.Typography variant='h5' fontWeight={'subtitle1'} sx={{ fontWeight: 'bold' }}>{invoice?.Customer?.CustomerName}</sdkMui.Typography>
                                                                    <sdkMui.Typography variant='body1'>{invoice?.InvoiceNumber}</sdkMui.Typography>
                                                                </>
                                                            </sdkMui.Stack>
                                                        </sdkMui.TableCell>
                                                        <sdkMui.TableCell width={"50%"} align="right">
                                                            <sdkMui.Stack spacing={1} direction={'column'}>
                                                                <>
                                                                    <sdkMui.Typography variant='h5' sx={{ fontWeight: 'bold' }}>{invoice?.InvoiceAmount.toFixed(2)}</sdkMui.Typography>
                                                                    <sdkMui.Typography variant='subtitle2' color={'inherit'}>{invoice?.InvoiceStatus?.InternalCode}</sdkMui.Typography>
                                                                </>
                                                            </sdkMui.Stack>
                                                        </sdkMui.TableCell>
                                                    </sdkMui.TableRow>
                                                </sdkMui.TableBody>
                                            </sdkMui.Table></sdkMui.TableContainer>

                                    </>
                                ))}
                            </sdkMui.Box>
                        </>
                    }
                </InfiniteScroll >
            </sdkMui.Box >
            {
                (Object.keys(selectedInoviceDetail).length > 0) &&
                <div style={{ display: 'none' }}>
                    <InvoicesPDFTemplate
                        data={{
                            invoicePDFDetail: selectedInoviceDetail
                        }}
                    />
                </div>
            }
        </>
    )
}

export { ListInvoices }