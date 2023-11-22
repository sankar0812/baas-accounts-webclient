/**
 * CreatedBy : Pradeepa S
 * CreatedDate : Oct 04 2023
 * Description : This file contain table component of vendor List
 */
import React, { useState } from "react";
import { sdkMui } from "@baas/platform-web-sdk";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Helper } from "@/utils/Helper";
import InfiniteScroll from 'react-infinite-scroll-component';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { ListCustomerInterface } from "@/interfaces/components/sales/customers/ListCustomerInterface";

const helper = new Helper()


function ListCustomers({ configs, data }: ListCustomerInterface) {
    //State varaiable
    const [customerColumnHeaders] = useState(data?.customerListColumnDetail)
    const [listcustomer, setlistcustomer] = useState(data?.customerList)
    const [activeHeader, setActiveHeader] = useState('CustomerName')
    const [orderBy, setOrderBy] = useState('asc')
    const [isLoading, setIsLoading] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const isMenuButtonOpen = Boolean(anchorEl);
    const [isTableScrollLoading, setIsTableScrollLoading] = useState<boolean>(false)
    const [hasMoreRecords, setHasMoreRecords] = useState(data?.customerList?.length === 0 || data?.customerList?.length < 10 ? false : true);
    const [sortreq, setSortReq] = useState<any>({})
    const [pageno, setPageNo] = useState<number>(1)

    const fetchMoreData = async () => {
        try {
            setIsTableScrollLoading(true)
            let CustomerList = await configs?.functionObject?.readCustomers(sortreq, configs?.filter, pageno)
            setTimeout(() => {
                setPageNo(pageno + 1)
                CustomerList?.output && setlistcustomer((oldData: any) => [...oldData, ...CustomerList?.output])
                if (CustomerList?.output?.length === 0 || CustomerList?.output?.length < 10) {
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
        let response = await configs?.functionObject?.readCustomers(sortreq, configs?.filter, 0)
        if (response?.status === 200) {
            setIsLoading(false)
            setlistcustomer(response?.output)
        }
        setActiveHeader(data)
        orderBy === 'asc' && setOrderBy('desc')
        orderBy === 'desc' && setOrderBy('asc')
    }

    //Action Column onClose function
    const handleOnMenuClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <sdkMui.Box
                sx={{
                    overflowY: 'auto', pb: 2
                }}
            >
                <InfiniteScroll
                    dataLength={listcustomer.length} //This is important field to render the next data
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
                    <sdkMui.TableContainer data-testid={configs?.["data-testid"]} id="scrollableDiv" sx={{ maxHeight: '65vh', minHeight: 'fit-content', borderRadius: '10px', }}>
                        <sdkMui.Table sx={{ minWidth: 650, }} aria-label="sticky table" stickyHeader>
                            <sdkMui.TableHead sx={{ background: (theme) => theme.palette.primary.main, color: (theme) => theme.palette.primary.contrastText }}>
                                <sdkMui.TableRow
                                >
                                    {
                                        customerColumnHeaders?.map((column: any, index: number) => (
                                            column?.IsVisible && <sdkMui.TableCell key={index} sx={{ background: (theme) => theme.palette.primary.main, color: (theme) => theme.palette.primary.contrastText }}>{column?.IsSortEnabled ? <sdkMui.TableSortLabel active={activeHeader === column?.ColumnName} sx={{ cursor: 'pointer', background: (theme) => theme.palette.primary.main, color: (theme) => theme.palette.primary.contrastText }} IconComponent={ArrowDropDownIcon} title={orderBy === 'asc' ? "Sort by Asecending" : "Sort by Descending"} direction={orderBy === 'asc' ? 'asc' : 'desc'} onClick={() => { handleTableSort(column?.ColumnName) }}><b> {helper?.convertToTitleCase(column?.DisplayName)}</b></sdkMui.TableSortLabel> : <b> {helper?.convertToTitleCase(column?.DisplayName)}</b>}</sdkMui.TableCell>
                                        ))
                                    }
                                    <sdkMui.TableCell sx={{ maxHeight: "75vh", minHeight: 'fit-content', background: (theme) => theme.palette.primary.main, color: (theme) => theme.palette.primary.contrastText }}>
                                        <b>Action</b>
                                    </sdkMui.TableCell>
                                </sdkMui.TableRow >
                            </sdkMui.TableHead>
                            <sdkMui.TableBody data-testid="Cutomer-Table-Contents">
                                {isLoading ?
                                    <sdkMui.TableRow
                                    >
                                        <sdkMui.TableCell colSpan={customerColumnHeaders?.length + 1}>
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
                                        {listcustomer?.map((data: any, index: number) =>
                                            <sdkMui.TableRow key={index}
                                                sx={{
                                                    cursor: 'pointer', '&:hover': {
                                                        transform: 'scale(1.0)', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)'
                                                    }
                                                }}
                                                onClick={() => { configs?.router?.push(`/merchants/${configs?.router?.query?.merchantkey}/sales/customers/${data.CustomerID}/view`) }}>

                                                {customerColumnHeaders?.find((data: any) => data?.ColumnName === 'CustomerName').IsVisible &&
                                                    <sdkMui.TableCell sx={{
                                                        bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary,
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        maxWidth: '200px',
                                                        cursor: 'pointer'
                                                    }} title={data.CustomerName} align="left">
                                                        {data?.CustomerName || 'N/A'}
                                                    </sdkMui.TableCell>
                                                }
                                                {customerColumnHeaders?.find((data: any) => data?.ColumnName === 'CustomerCode').IsVisible &&
                                                    <sdkMui.TableCell sx={{
                                                        bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary,
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        maxWidth: '200px'
                                                    }} title={data.CustomerCode.toUpperCase()} align="left">
                                                        {data?.CustomerCode.toUpperCase() || 'N/A'}
                                                    </sdkMui.TableCell>
                                                }
                                                {customerColumnHeaders?.find((data: any) => data?.ColumnName === 'City').IsVisible &&
                                                    <sdkMui.TableCell sx={{
                                                        bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary,
                                                    }} title={data?.City} align="left">
                                                        {data?.City || 'N/A'}
                                                    </sdkMui.TableCell>
                                                }
                                                {customerColumnHeaders?.find((data: any) => data?.ColumnName === 'State').IsVisible &&
                                                    <sdkMui.TableCell sx={{
                                                        bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary,
                                                    }} title={data?.State} align="left">
                                                        {data?.State || 'N/A'}
                                                    </sdkMui.TableCell>
                                                }
                                                {customerColumnHeaders?.find((data: any) => data?.ColumnName === 'Country').IsVisible &&
                                                    <sdkMui.TableCell sx={{
                                                        bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary,
                                                    }} title={data?.Country} align="left">
                                                        {data?.Country || 'N/A'}
                                                    </sdkMui.TableCell>
                                                }
                                                {customerColumnHeaders?.find((data: any) => data?.ColumnName === 'Address1').IsVisible &&
                                                    <sdkMui.TableCell sx={{
                                                        bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary,
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        maxWidth: '200px'
                                                    }} title={data?.Address1} align="left">
                                                        {data?.Address1 || 'N/A'}
                                                    </sdkMui.TableCell>
                                                }
                                                {customerColumnHeaders?.find((data: any) => data?.ColumnName === 'PostalCode').IsVisible &&
                                                    <sdkMui.TableCell sx={{
                                                        bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary,
                                                    }} title={data?.PostalCode} align="left">
                                                        {data?.PostalCode || 'N/A'}
                                                    </sdkMui.TableCell>
                                                }
                                                {customerColumnHeaders?.find((data: any) => data?.ColumnName === 'CreatedBy').IsVisible &&
                                                    <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }}>
                                                        {data?.CreatedBy || 'N/A'}
                                                    </sdkMui.TableCell>
                                                }
                                                {customerColumnHeaders?.find((data: any) => data?.ColumnName === 'CreatedDate').IsVisible &&
                                                    <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }}>
                                                        {helper.converttoDateFormat(data?.CreatedDate, "MM/DD/YYYY") || 'N/A'}
                                                    </sdkMui.TableCell>
                                                }
                                                {customerColumnHeaders?.find((data: any) => data?.ColumnName === 'ModifiedBy').IsVisible &&
                                                    <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }}>
                                                        {data?.ModifiedBy || 'N/A'}
                                                    </sdkMui.TableCell>
                                                }
                                                {customerColumnHeaders?.find((data: any) => data?.ColumnName === 'ModifiedDate').IsVisible &&
                                                    <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }}>
                                                        {helper.converttoDateFormat(data?.ModifiedDate, "MM/DD/YYYY") || 'N/A'}
                                                    </sdkMui.TableCell>
                                                }
                                                <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }}>
                                                    <sdkMui.IconButton
                                                        data-testid={`${data?.CustomerName}-Action-Icon`}
                                                        onClick={(e: any) => { e.stopPropagation(); setAnchorEl(e?.currentTarget) }}
                                                    >
                                                        <MoreVertIcon />
                                                    </sdkMui.IconButton>
                                                    <sdkMui.Menu
                                                        data-testid={`${data?.CustomerName}-Menu-Icon`}
                                                        open={isMenuButtonOpen}
                                                        anchorEl={anchorEl}
                                                        onClose={handleOnMenuClose}
                                                        MenuListProps={{
                                                            'aria-labelledby': 'basic-button',
                                                        }}
                                                        sx={{ display: 'flex', textAlign: 'center', height: '85%' }}

                                                    >
                                                        <sdkMui.MenuItem onClick={(e:any) => { e.stopPropagation(); setAnchorEl(null) }}>
                                                            <sdkMui.Stack spacing={1} direction={'row'}>
                                                          <span data-testid={`${data?.CustomerName}-Edit-Icon`} className="material-symbols-outlined" style={{ fontSize: '16px', cursor: 'pointer', marginTop: '4px' }}  >
                                                                    edit
                                                                </span>
                                                                <span data-testid={`${data?.CustomerName}-Edit-Icon-Text`} style={{ fontSize: '16px', cursor: 'pointer' }} >
                                                                    Edit
                                                                </span>
                                                            </sdkMui.Stack>
                                                        </sdkMui.MenuItem>
                                                        <sdkMui.MenuItem onClick={(e:any) => { e.stopPropagation(); setAnchorEl(null) }}>
                                                            <sdkMui.Stack spacing={1} direction={'row'}>
                                                                <span data-testid={`${data?.CustomerName}-Delete-Icon`} className="material-symbols-outlined" style={{ fontSize: '16px', cursor: 'pointer', marginTop: '4px' }} >
                                                                    delete
                                                                </span>
                                                                <span data-testid={`${data?.CustomerName}-Delete-Icon-Text`} style={{ fontSize: '16px', cursor: 'pointer' }} >
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
                </InfiniteScroll >
            </sdkMui.Box>
        </>
    )
}

export { ListCustomers }