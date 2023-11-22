/**
* CreatedBy    : Uma Kohila
* CreatedDate  : Oct 05 2023
* Description  : This file contains paymentsReceived module List component
*/

// Import all the neccessary files in header
import React, { useState } from "react";
import { Chip, sdkMui } from "@baas/platform-web-sdk";
import Paper from '@mui/material/Paper';
import { ListPaymentsRecivedInterface } from "@/interfaces/components/sales/paymentsreceived/ListPaymentsReceivedInterface";
import { Helper } from "@/utils/Helper";
import InfiniteScroll from 'react-infinite-scroll-component';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

// Initialize the required files as a objects
const helper = new Helper()

// Export the component
export function ListPaymentsReceived({ data, configs }: ListPaymentsRecivedInterface) {
    const [orderBy, setOrderBy] = useState('asc');
    const [anchorEl, setAnchorEl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [paymentsReceivedColumnHeaders] = useState(data?.paymentsReceivedListcolumnDetail)
    const [listPayemtsReceived, setISListPayemtsReceived] = useState(data?.paymentsreceivedLists)
    const open = Boolean(anchorEl);
    const [sortreq, setSortReq] = useState<any>({})
    const [pageno, setPageNo] = useState<number>(1)
    const [activeHeader, setActiveHeader] = useState('CustomerName')
    const [isTableScrollLoading, setIsTableScrollLoading] = useState<boolean>(false)
    const [hasMoreRecords, setHasMoreRecords] = useState(data?.paymentsreceivedLists?.length === 0 || data?.paymentsreceivedLists?.length < 10 ? false : true);

    const fetchMoreData = async () => {
        try {
            setIsTableScrollLoading(true)
            let paymentReceivedList = await configs?.functObj?.readPaymentsReceived(configs?.filter, sortreq, pageno)
            setTimeout(() => {
                setPageNo(pageno + 1)
                paymentReceivedList?.output && setISListPayemtsReceived((oldData: any) => [...oldData, ...paymentReceivedList?.output])
                if (paymentReceivedList?.output?.length === 0 || paymentReceivedList?.output?.length < 10) {
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

    const handleTableSort = async (data: any) => {
        const customer = {
            Customer: orderBy === 'asc' ? { [data]: 'asc' } : { [data]: 'desc' }
        };
        setPageNo(0)
        if (data === "CustomerName") {
            let sortreq = customer
            setSortReq(sortreq)
            let response = await configs?.functObj?.readPaymentsReceived(configs?.filter, sortreq, 0)
            setIsLoading(true)
            if (response?.status === 200) {
                setIsLoading(false)
                setISListPayemtsReceived(response?.output)
            }
            setActiveHeader(data)
            orderBy === 'asc' && setOrderBy('desc')
            orderBy === 'desc' && setOrderBy('asc')
        } else {
            let sortreq = orderBy === 'asc' ? { [data]: 'asc' } : { [data]: 'desc' }
            setSortReq(sortreq)
            let response = await configs?.functObj?.readPaymentsReceived(configs?.filter, sortreq,0)
            if (response?.status === 200) {
                setIsLoading(false)
                setISListPayemtsReceived(response?.output)
            }
            setActiveHeader(data)
            orderBy === 'asc' && setOrderBy('desc')
            orderBy === 'desc' && setOrderBy('asc')
        }
    }

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            {
                <sdkMui.Box
                data-testid='List-PaymentRecived'
                    sx={{
                        overflowY: 'auto', pb: 3
                    }}
                >
                    <InfiniteScroll
                        dataLength={listPayemtsReceived.length} //This is important field to render the next data
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
                        <sdkMui.TableContainer data-testid='Table-Headers' id="scrollableDiv" component={Paper} sx={{ maxHeight: "63vh", minHeight: 'fit-content', borderRadius: '15px' }}>
                            <sdkMui.Table sx={{ minWidth: 650}} aria-label="sticky table" stickyHeader>
                                <sdkMui.TableHead>
                                    <sdkMui.TableRow >
                                        {
                                            paymentsReceivedColumnHeaders?.map((column: any, index: number) =>
                                            column?.IsVisible && <sdkMui.TableCell key={index} sx={{ background: (theme) => theme.palette.primary.main, color: (theme) => theme.palette.primary.contrastText }}>{column?.IsSortEnabled ? <sdkMui.TableSortLabel active={activeHeader === column?.ColumnName} sx={{ cursor: 'pointer', background: (theme) => theme.palette.primary.main, color: (theme) => theme.palette.primary.contrastText }} IconComponent={ArrowDropDownIcon} title={orderBy === 'asc' ? "Sort by Asecending" : "Sort by Descending"} direction={orderBy === 'asc' ? 'asc' : 'desc'} onClick={() => { handleTableSort(column?.ColumnName) }}><b> {helper?.convertToTitleCase(column?.DisplayName)}</b></sdkMui.TableSortLabel> : <b> {helper?.convertToTitleCase(column?.DisplayName)}</b>}</sdkMui.TableCell>
                                            )
                                        }
                                        <sdkMui.TableCell sx={{ background: (theme) => theme.palette.primary.main, color: (theme) => theme.palette.primary.contrastText, maxHeight: "75vh", minHeight: 'fit-content' }}>
                                            <b>Action</b>
                                        </sdkMui.TableCell>
                                    </sdkMui.TableRow>
                                </sdkMui.TableHead>
                                {isLoading ?
                                    <sdkMui.CircularProgress color="inherit" size={24} sx={{
                                        position: 'absolute',
                                        top: 20,
                                        left: 20,
                                    }} />
                                    :
                                    <sdkMui.TableBody>
                                        {listPayemtsReceived?.map((row: any, index: number) => (
                                            <sdkMui.TableRow key={index}
                                                sx={{
                                                    alignContent: 'center',
                                                    '&:last-child td, &:last-child th': { border: 0 }, cursor: "pointer",
                                                    '&:hover': {
                                                        transform: 'scale(1.0)', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)'
                                                    }
                                                }}
                                            >
                                                {
                                                    paymentsReceivedColumnHeaders?.find((data: any) => data?.ColumnName === 'CustomerName')?.IsVisible &&
                                                    <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }} >
                                                        {row?.Customer?.CustomerName}
                                                    </sdkMui.TableCell>
                                                }
                                                {
                                                    paymentsReceivedColumnHeaders?.find((data: any) => data?.ColumnName === 'CustomerCode')?.IsVisible &&
                                                    <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }} >
                                                        {row?.Customer?.CustomerCode}
                                                    </sdkMui.TableCell>
                                                }
                                                {
                                                    paymentsReceivedColumnHeaders?.find((data: any) => data?.ColumnName === 'InvoiceCount')?.IsVisible &&
                                                    <sdkMui.TableCell data-testid='Invoice-Count-Badge' sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }}  >
                                                        <Chip
                                                            callbacks={{
                                                                handleClick: () => { },
                                                                handleDelete: () => { }
                                                            }}
                                                            configs={{
                                                                label: row?.CustomerPaymentItem?.length,
                                                                color: "primary",
                                                                size: 'medium',
                                                                clickable: false,                                                                
                                                            }}
                                                        />
                                                    </sdkMui.TableCell>
                                                }
                                                {
                                                    paymentsReceivedColumnHeaders?.find((data: any) => data?.ColumnName === 'PaidAmount')?.IsVisible &&
                                                    <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }}  align="left">
                                                        {row?.Currency?.CurrencyCode+ '$ ' + row?.PaidAmount?.toFixed(2) }
                                                    </sdkMui.TableCell>
                                                }
                                                {
                                                    paymentsReceivedColumnHeaders?.find((data: any) => data?.ColumnName === 'PaymentConfirmation')?.IsVisible &&
                                                    <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }} >
                                                        {row?.PaymentConfirmation}
                                                    </sdkMui.TableCell>
                                                }
                                                {
                                                    paymentsReceivedColumnHeaders?.find((data: any) => data?.ColumnName === 'PaidDate')?.IsVisible &&
                                                    <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }} >
                                                        {helper.converttoDateFormat(row.PaidDate, 'MM/DD/YYYY')}
                                                    </sdkMui.TableCell>
                                                }
                                                {
                                                    paymentsReceivedColumnHeaders?.find((data: any) => data?.ColumnName === 'CreatedBy')?.IsVisible &&
                                                    <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }} >
                                                        {row.CreatedBy}
                                                    </sdkMui.TableCell>
                                                }
                                                {
                                                    paymentsReceivedColumnHeaders?.find((data: any) => data?.ColumnName === 'CreatedDate')?.IsVisible &&
                                                    <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }} >
                                                        {helper.converttoDateFormat(row.CreatedDate, 'MM/DD/YYYY')}
                                                    </sdkMui.TableCell>
                                                }
                                                {
                                                    paymentsReceivedColumnHeaders?.find((data: any) => data?.ColumnName === 'ModifiedBy')?.IsVisible &&
                                                    <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }} >
                                                        {row.ModifiedBy}
                                                    </sdkMui.TableCell>
                                                }
                                                {
                                                    paymentsReceivedColumnHeaders?.find((data: any) => data?.ColumnName === 'ModifiedDate')?.IsVisible &&
                                                    <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }} >
                                                        {helper.converttoDateFormat(row.ModifiedDate, 'MM/DD/YYYY')}
                                                    </sdkMui.TableCell>
                                                }
                                                <sdkMui.TableCell sx={{ alignItems: 'center', bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary, alignContent: 'center' }} aria-controls={open ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} >
                                                    <sdkMui.IconButton
                                                    data-testid={`${row?.PaymentConfirmation}-Action-Icon`}
                                                     onClick={handleClick}>
                                                        <MoreVertIcon />
                                                    </sdkMui.IconButton>
                                                </sdkMui.TableCell>
                                                <sdkMui.Menu
                                                        open={open}
                                                        anchorEl={anchorEl}
                                                        onClose={handleClose}
                                                        MenuListProps={{
                                                            'aria-labelledby': 'basic-button',
                                                        }}
                                                        sx={{ display: 'flex', textAlign: 'center', height: '85%' }}

                                                    >
                                                        <sdkMui.MenuItem onClick={() => { handleClose() }}>
                                                            <sdkMui.Stack spacing={1} direction={'row'}>
                                                                <span data-testid={`${row?.PaymentConfirmation}-Edit-Icon`} className="material-symbols-outlined" style={{ fontSize: '16px', cursor: 'pointer', marginTop: '4px' }}  >
                                                                    edit
                                                                </span>
                                                                <span data-testid='Edit-Icon-Text' style={{ fontSize: '16px', cursor: 'pointer' }} >
                                                                    Edit
                                                                </span>
                                                            </sdkMui.Stack>
                                                        </sdkMui.MenuItem>
                                                        <sdkMui.MenuItem onClick={() => { handleClose() }}>
                                                            <sdkMui.Stack spacing={1} direction={'row'}>
                                                                <span data-testid={`${row?.PaymentConfirmation}-Delete-Icon`}  className="material-symbols-outlined" style={{ fontSize: '16px', cursor: 'pointer', marginTop: '4px' }} >
                                                                    delete
                                                                </span>
                                                                <span data-testid='Delete-Icon-Text' style={{ fontSize: '16px', cursor: 'pointer' }} >
                                                                    Delete
                                                                </span>
                                                            </sdkMui.Stack>
                                                        </sdkMui.MenuItem>
                                                    </sdkMui.Menu>
                                            </sdkMui.TableRow>
                                        ))}
                                    </sdkMui.TableBody>
                                }
                            </sdkMui.Table>
                        </sdkMui.TableContainer>
                    </InfiniteScroll>
                </sdkMui.Box>
            }
        </>
    )
}