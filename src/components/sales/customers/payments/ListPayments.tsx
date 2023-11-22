/**
* CreatedBy    : Muthumariappan
* CreatedDate  : Oct 19 2023
* ModifiedBy   : Muthumariappan 
* ModifiedDate : Oct 23 2023
* Description  : This file contain table component of Customers Invoice Payments List
*/


import React, { useState } from "react";
import { sdkMui, Chip } from "@baas/platform-web-sdk";
import { Helper } from "@/utils/Helper";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ListPaymentsInterface } from "@/interfaces/components/sales/customers/payments/ListPaymentsInterface";

const helper = new Helper()

function ListPayments({ configs, data }: ListPaymentsInterface) {

    const [orderBy, setOrderBy] = useState('asc')
    const [isLoading, setIsLoading] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const isMenuButtonOpen = Boolean(anchorEl);
    const [isTableScrollLoading, setIsTableScrollLoading] = useState<boolean>(false)
    const [hasMoreRecords, setHasMoreRecords] = useState(data?.paymentList?.length === 0 || data?.paymentList?.length < 10 ? false : true);
    const [sortreq, setSortReq] = useState<any>({ "CustomerPaymentID": "desc" })
    const [pageno, setPageNo] = useState<number>(1)
    const [paymentColumnHeaders] = useState(data?.paymentListColumnDetail)
    const [listPayments, setListPayments] = useState(data?.paymentList)
    const [activeHeader, setActiveHeader] = useState('')

    const fetchMoreData = async () => {
        try {
            setIsTableScrollLoading(true)
            let ListPayments = await configs?.functionObject?.readPayments(sortreq, configs?.filter, pageno)
            setTimeout(() => {
                setPageNo(pageno + 1)
                ListPayments?.output && setListPayments((oldData: any) => [...oldData, ...ListPayments?.output])
                if (ListPayments?.output?.length === 0 || ListPayments?.output?.length < 10) {
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
        setIsLoading(true)
        let sortreq = orderBy === 'asc' ? { [data]: 'asc' } : { [data]: 'desc' }
        setSortReq(sortreq)
        let response = await configs?.functionObject?.readPayments(sortreq, configs?.filter, 0)
        if (response?.status === 200) {
            setIsLoading(false)
            setPageNo(0)
            setListPayments(response?.output)
        }
        setActiveHeader(data)
        orderBy === 'asc' && setOrderBy('desc')
        orderBy === 'desc' && setOrderBy('asc')
    }

    //Action Column onclick function
    const handleOnClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    //Action Column onClose function
    const handleOnMenuClose = () => {
        setAnchorEl(null);
    };



    return (
        <>
            <sdkMui.Box
                sx={{
                    overflowY: 'auto', pb: 3
                }}
            >
                <InfiniteScroll
                    dataLength={data?.paymentList?.length} //This is important field to render the next data
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
                    <sdkMui.TableContainer id="scrollableDiv" sx={{ maxHeight: '60vh', minHeight: 'fit-content', borderRadius: '10px' }}>
                        <sdkMui.Table sx={{ minWidth: 650 }} aria-label="sticky table" stickyHeader data-testId={`${configs?.["data-testid"]}`}>
                            <sdkMui.TableHead sx={{ background: (theme) => theme.palette.primary.main, color: (theme) => theme.palette.primary.contrastText }}>
                                <sdkMui.TableRow>
                                    {
                                        paymentColumnHeaders?.map((column: any, index: number) => (
                                            column?.IsVisible && <sdkMui.TableCell key={index}
                                                sx={{
                                                    background: (theme) => theme.palette.primary.main,
                                                    color: (theme) => theme.palette.primary.contrastText
                                                }}>
                                                {column?.IsSortEnabled ? <sdkMui.TableSortLabel active={activeHeader === column?.columnName}
                                                    sx={{
                                                        cursor: 'pointer',
                                                        background: (theme) => theme.palette.primary.main,
                                                        color: (theme) => theme.palette.primary.contrastText
                                                    }}
                                                    IconComponent={ArrowDropDownIcon}
                                                    title={orderBy === 'asc' ? "Sort by Asecending" : "Sort by Descending"}
                                                    direction={orderBy === 'asc' ? 'asc' : 'desc'}
                                                    onClick={() => { handleTableSort(column?.columnName) }}><b> {column?.DisplayName}</b></sdkMui.TableSortLabel> : <b>{column?.DisplayName}</b>}</sdkMui.TableCell>
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
                                        <sdkMui.TableCell colSpan={paymentColumnHeaders?.length + 1}>
                                            <sdkMui.Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <sdkMui.CircularProgress sx={{ display: 'flex', alignItems: 'center' }} color="inherit" size={24} />
                                            </sdkMui.Box>
                                        </sdkMui.TableCell>

                                    </sdkMui.TableRow>

                                    :
                                    <>
                                        {
                                            listPayments?.map((data: any, index: number) =>
                                                <sdkMui.TableRow key={index}
                                                    sx={{
                                                        cursor: 'pointer', '&:hover': {
                                                            transform: 'scale(1.0)', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)'
                                                        }
                                                    }}>
                                                    {paymentColumnHeaders?.find((data: any) => data?.columnName === "PaymentMethod").IsVisible &&
                                                        <sdkMui.TableCell sx={{
                                                            bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary,
                                                            whiteSpace: 'nowrap',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            maxWidth: '200px',
                                                            cursor: 'pointer'
                                                        }} title={data.PaymentMethod.PaymentMethod} align="left">
                                                            {data?.PaymentMethod.PaymentMethod}
                                                        </sdkMui.TableCell>
                                                    }
                                                    {paymentColumnHeaders?.find((data: any) => data?.columnName === "PaymentConfirmation").IsVisible &&
                                                        <sdkMui.TableCell sx={{
                                                            bgcolor: (theme) => theme?.palette?.background?.default,
                                                            color: (theme) => theme?.palette?.text?.primary,
                                                            whiteSpace: 'nowrap',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            maxWidth: '200px'
                                                        }} title={data.PaymentConfirmation} align="left">
                                                            {data?.PaymentConfirmation}
                                                        </sdkMui.TableCell>
                                                    }
                                                    {paymentColumnHeaders?.find((data: any) => data?.columnName === "PaidAmount").IsVisible &&
                                                        <sdkMui.TableCell sx={{
                                                            bgcolor: (theme) => theme?.palette?.background?.default,
                                                            color: (theme) => theme?.palette?.text?.primary,
                                                            whiteSpace: 'nowrap',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            maxWidth: '200px'
                                                        }} title={data?.PaidAmount} align="right" >
                                                            {data?.Currency.CurrencyCode} {data?.Currency?.CurrencySymbol} {data?.PaidAmount}
                                                        </sdkMui.TableCell>
                                                    }
                                                    {paymentColumnHeaders?.find((data: any) => data?.columnName === "InvoiceCount").IsVisible &&
                                                        <sdkMui.TableCell sx={{
                                                            bgcolor: (theme) => theme?.palette?.background?.default,
                                                            color: (theme) => theme?.palette?.text?.primary,
                                                        }} align="center">
                                                            <Chip

                                                                callbacks={{
                                                                    handleClick: () => { },
                                                                    handleDelete: () => { }
                                                                }}
                                                                configs={{
                                                                    label: data?.CustomerPaymentItem?.length > 0 ? data?.CustomerPaymentItem?.length : 0,
                                                                    size: 'small',
                                                                    variant: 'filled',
                                                                    color: 'primary'

                                                                }}
                                                            />
                                                        </sdkMui.TableCell>
                                                    }
                                                    {paymentColumnHeaders?.find((data: any) => data?.columnName === "PaidDate").IsVisible &&
                                                        <sdkMui.TableCell sx={{
                                                            bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary,
                                                            whiteSpace: 'nowrap',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            maxWidth: '200px'
                                                        }} title={data.PaidDate} align="center">
                                                            {data?.PaidDate}
                                                        </sdkMui.TableCell>
                                                    }
                                                    {paymentColumnHeaders?.find((data: any) => data?.columnName === 'CreatedBy').IsVisible &&
                                                        <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }}>
                                                            {data?.CreatedBy}
                                                        </sdkMui.TableCell>
                                                    }
                                                    {paymentColumnHeaders?.find((data: any) => data?.columnName === 'CreatedDate').IsVisible &&
                                                        <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }}>
                                                            {helper.converttoDateFormat(data?.CreatedDate, "MM/DD/YYYY")}
                                                        </sdkMui.TableCell>
                                                    }
                                                    {paymentColumnHeaders?.find((data: any) => data?.columnName === 'ModifiedBy').IsVisible &&
                                                        <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }}>
                                                            {data?.ModifiedBy}
                                                        </sdkMui.TableCell>
                                                    }
                                                    {paymentColumnHeaders?.find((data: any) => data?.columnName === 'ModifiedDate').IsVisible &&
                                                        <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }}>
                                                            {helper.converttoDateFormat(data?.ModifiedDate, "MM/DD/YYYY")}
                                                        </sdkMui.TableCell>
                                                    }
                                                    <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }} >
                                                        <sdkMui.IconButton
                                                            data-testId={`${data?.PaymentMethod.PaymentMethod}-Action-Icon`}
                                                            onClick={handleOnClickMenu}
                                                        >
                                                            <MoreVertIcon />
                                                        </sdkMui.IconButton>
                                                        <sdkMui.Menu
                                                            open={isMenuButtonOpen}
                                                            anchorEl={anchorEl}
                                                            onClose={handleOnMenuClose}
                                                            data-testId={`${data?.PaymentMethod.PaymentMethod}-Action-Menu`}
                                                            MenuListProps={{
                                                                'aria-labelledby': 'basic-button',
                                                            }}
                                                            sx={{ display: 'flex', textAlign: 'center', height: '85%' }}

                                                        >
                                                            <sdkMui.MenuItem onClick={() => { handleOnMenuClose() }}>
                                                                <sdkMui.Stack spacing={1} direction={'row'}>
                                                                    <span data-testId={`${data?.PaymentMethod.PaymentMethod}-Edit-Icon`}
                                                                        className="material-symbols-outlined"
                                                                        style={{ fontSize: '16px', cursor: 'pointer', marginTop: '4px' }}
                                                                    >
                                                                        edit
                                                                    </span>
                                                                    <span data-testId={`${data?.PaymentMethod.PaymentMethod}-Edit-Icon-Text`}
                                                                        style={{ fontSize: '16px', cursor: 'pointer' }}
                                                                    >
                                                                        Edit
                                                                    </span>
                                                                </sdkMui.Stack>
                                                            </sdkMui.MenuItem>
                                                            <sdkMui.MenuItem onClick={() => { handleOnMenuClose() }}>
                                                                <sdkMui.Stack spacing={1} direction={'row'}>
                                                                    <span data-testId={`${data?.PaymentMethod.PaymentMethod}-Delete-Icon`}
                                                                        className="material-symbols-outlined"
                                                                        style={{ fontSize: '16px', cursor: 'pointer', marginTop: '4px' }}
                                                                    >
                                                                        delete
                                                                    </span>
                                                                    <span data-testId={`${data?.PaymentMethod.PaymentMethod}-Delete-Icon-Text`}
                                                                        style={{ fontSize: '16px', cursor: 'pointer' }}
                                                                    >
                                                                        Delete
                                                                    </span>
                                                                </sdkMui.Stack>
                                                            </sdkMui.MenuItem>
                                                        </sdkMui.Menu>
                                                    </sdkMui.TableCell>
                                                </sdkMui.TableRow>
                                            )}
                                    </>
                                }
                            </sdkMui.TableBody>
                        </sdkMui.Table>
                    </sdkMui.TableContainer >
                </InfiniteScroll>
            </sdkMui.Box>
        </>
    )
}




export { ListPayments }


