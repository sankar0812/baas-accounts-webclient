/**
 * CreatedBy : Pradeepa S
 * CreatedDate : Oct 04 2023
 * Description : This file contain table component of vendor List
 */
import React, { useState } from "react";
import { Chip, sdkMui } from "@baas/platform-web-sdk";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Helper } from "@/utils/Helper";
import InfiniteScroll from 'react-infinite-scroll-component';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { ListVendorInterface } from "@/interfaces/components/pusrchases/vendor/ListVendorInterface";

const helper = new Helper()


function ListVendor({ configs, data }: ListVendorInterface) {

    //State varaiable
    const [vendorColumnHeaders] = useState(data?.VendorListColumnDetail)
    const [listVendor, setListVendor] = useState(data?.vendorList)
    const [activeHeader, setActiveHeader] = useState('VendorCode')
    const [orderBy, setOrderBy] = useState('asc')
    const [isLoading, setIsLoading] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const isMenuButtonOpen = Boolean(anchorEl);
    const [isTableScrollLoading, setIsTableScrollLoading] = useState<boolean>(false)
    const [hasMoreRecords, setHasMoreRecords] = useState(data?.vendorList?.length === 0 || data?.vendorList?.length < 10 ? false : true);
    const [sortreq, setSortReq] = useState<any>({})
    const [pageno, setPageNo] = useState<number>(1)


    const fetchMoreData = async () => {
        try {
            setIsTableScrollLoading(true)
            let VendorList = await configs?.functionObject?.readVendors(sortreq, configs?.filter, pageno)
            setTimeout(() => {
                setPageNo(pageno + 1)
                VendorList?.output && setListVendor((oldData: any) => [...oldData, ...VendorList?.output])
                if (VendorList?.output?.length === 0 || VendorList?.output?.length < 10) {
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
        let response = await configs?.functionObject?.readVendors(sortreq, configs?.filter, 0)
        if (response?.status === 200) {
            setIsLoading(false)
            setListVendor(response?.output)
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
                    dataLength={listVendor.length} //This is important field to render the next data
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
                    <sdkMui.TableContainer id="scrollableDiv" sx={{ maxHeight: '65vh', minHeight: 'fit-content', borderRadius: '10px' }}>
                        <sdkMui.Table data-testid={configs?.["data-testid"]} sx={{ minWidth: 650 }} aria-label="sticky table" stickyHeader>
                            <sdkMui.TableHead sx={{ background: (theme) => theme.palette.primary.main, color: (theme) => theme.palette.primary.contrastText }}>
                                <sdkMui.TableRow>
                                    {
                                        vendorColumnHeaders?.map((column: any, index: number) => (
                                            column?.IsVisible && <sdkMui.TableCell key={index} sx={{ background: (theme) => theme.palette.primary.main, color: (theme) => theme.palette.primary.contrastText }}>{column?.IsSortEnabled ? <sdkMui.TableSortLabel active={activeHeader === column?.ColumnName} sx={{ cursor: 'pointer', background: (theme) => theme.palette.primary.main, color: (theme) => theme.palette.primary.contrastText }} IconComponent={ArrowDropDownIcon} title={orderBy === 'asc' ? "Sort by Asecending" : "Sort by Descending"} direction={orderBy === 'asc' ? 'asc' : 'desc'} onClick={() => { handleTableSort(column?.ColumnName) }}><b> {helper?.convertToTitleCase(column?.DisplayName)}</b></sdkMui.TableSortLabel> : <b> {helper?.convertToTitleCase(column?.DisplayName)}</b>}</sdkMui.TableCell>
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
                                        <sdkMui.TableCell colSpan={vendorColumnHeaders?.length + 1}>
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
                                        {listVendor?.map((data: any, index: number) =>
                                            <sdkMui.TableRow key={index}
                                                sx={{
                                                    cursor: 'pointer', '&:hover': {
                                                        transform: 'scale(1.0)', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)'
                                                    }
                                                }}>
                                                {vendorColumnHeaders?.find((data: any) => data?.ColumnName === 'VendorName').IsVisible &&
                                                    <sdkMui.TableCell sx={{
                                                        bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary,
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        maxWidth: '200px',
                                                        cursor: 'pointer'

                                                    }} title={data.VendorName} align="left">
                                                        {data?.VendorName}
                                                    </sdkMui.TableCell>
                                                }
                                                {vendorColumnHeaders?.find((data: any) => data?.ColumnName === 'VendorCode').IsVisible &&
                                                    <sdkMui.TableCell sx={{
                                                        bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary,
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        maxWidth: '200px'
                                                    }} title={data.VendorCode.toUpperCase()} align="left">
                                                        {data?.VendorCode.toUpperCase()}
                                                    </sdkMui.TableCell>
                                                }
                                                {vendorColumnHeaders?.find((data: any) => data?.ColumnName === 'VendorAccount').IsVisible &&
                                                    <sdkMui.TableCell sx={{
                                                        bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary,
                                                    }} align="center">
                                                        <Chip
                                                            callbacks={{
                                                                handleClick: () => { },
                                                                handleDelete: () => { }
                                                            }}
                                                            configs={{
                                                                label: data?.VendorAccount?.length > 0 ? data?.VendorAccount?.length : 0,
                                                                size: 'small',
                                                                variant: 'filled',
                                                                color: 'primary'
                                                            }}
                                                        />
                                                    </sdkMui.TableCell>
                                                }
                                                {vendorColumnHeaders?.find((data: any) => data?.ColumnName === 'State').IsVisible &&
                                                    <sdkMui.TableCell sx={{
                                                        bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary,
                                                    }} title={data?.State} align="left">
                                                        {data?.State}
                                                    </sdkMui.TableCell>
                                                }
                                                {vendorColumnHeaders?.find((data: any) => data?.ColumnName === 'Country').IsVisible &&
                                                    <sdkMui.TableCell sx={{
                                                        bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary,
                                                    }} title={data?.Country} align="left">
                                                        {data?.Country}
                                                    </sdkMui.TableCell>
                                                }
                                                {vendorColumnHeaders?.find((data: any) => data?.ColumnName === 'City').IsVisible &&
                                                    <sdkMui.TableCell sx={{
                                                        bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary,
                                                    }} title={data?.City} align="left">
                                                        {data?.City}
                                                    </sdkMui.TableCell>
                                                }
                                                {vendorColumnHeaders?.find((data: any) => data?.ColumnName === 'PostalCode').IsVisible &&
                                                    <sdkMui.TableCell sx={{
                                                        bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary,
                                                    }} title={data?.PostalCode} align="left">
                                                        {data?.PostalCode}
                                                    </sdkMui.TableCell>
                                                }
                                                {vendorColumnHeaders?.find((data: any) => data?.ColumnName === 'CreatedBy').IsVisible &&
                                                    <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }}>
                                                        {data?.CreatedBy}
                                                    </sdkMui.TableCell>
                                                }
                                                {vendorColumnHeaders?.find((data: any) => data?.ColumnName === 'CreatedDate').IsVisible &&
                                                    <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }}>
                                                        {helper.converttoDateFormat(data?.CreatedDate, "MM/DD/YYYY")}
                                                    </sdkMui.TableCell>
                                                }
                                                {vendorColumnHeaders?.find((data: any) => data?.ColumnName === 'Address1').IsVisible &&
                                                    <sdkMui.TableCell sx={{
                                                        bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary,
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        maxWidth: '200px'
                                                    }} title={data?.Address1} align="left">
                                                        {data?.Address1}
                                                    </sdkMui.TableCell>
                                                }
                                                {vendorColumnHeaders?.find((data: any) => data?.ColumnName === 'Phone').IsVisible &&
                                                    <sdkMui.TableCell sx={{
                                                        bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary,
                                                    }} title={data?.Phone} align="left">
                                                        {data?.Phone || 'N/A'}
                                                    </sdkMui.TableCell>
                                                }
                                                {vendorColumnHeaders?.find((data: any) => data?.ColumnName === 'Email').IsVisible &&
                                                    <sdkMui.TableCell sx={{
                                                        bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary,
                                                    }} title={data?.Email} align="left">
                                                        {data?.Email || 'N/A'}
                                                    </sdkMui.TableCell>
                                                }
                                                {vendorColumnHeaders?.find((data: any) => data?.ColumnName === 'Website').IsVisible &&
                                                    <sdkMui.TableCell sx={{
                                                        bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary,
                                                    }} title={data?.Website} align="left">
                                                        {data?.Website || 'N/A'}
                                                    </sdkMui.TableCell>
                                                }
                                                {vendorColumnHeaders?.find((data: any) => data?.ColumnName === 'CurrencyCode').IsVisible &&
                                                    <sdkMui.TableCell sx={{
                                                        bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary,
                                                    }} title={data?.CurrencyCode} align="left">
                                                        {data?.CurrencyCode || 'N/A'}
                                                    </sdkMui.TableCell>
                                                }
                                                {vendorColumnHeaders?.find((data: any) => data?.ColumnName === 'ModifiedDate').IsVisible &&
                                                    <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }}>
                                                        {helper.converttoDateFormat(data?.ModifiedDate, "MM/DD/YYYY")}
                                                    </sdkMui.TableCell>
                                                }
                                                {vendorColumnHeaders?.find((data: any) => data?.ColumnName === 'ModifiedBy').IsVisible &&
                                                    <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }}>
                                                        {data?.ModifiedBy || 'N/A'}
                                                    </sdkMui.TableCell>
                                                }
                                                <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }}>
                                                    <sdkMui.IconButton
                                                        data-testid={`${data?.VendorName}-Action-Icon`}
                                                        onClick={handleOnClickMenu}
                                                    >
                                                        <MoreVertIcon />
                                                    </sdkMui.IconButton>
                                                    <sdkMui.Menu
                                                        data-testid={`${data?.VendorName}-Action-Icon`}
                                                        open={isMenuButtonOpen}
                                                        anchorEl={anchorEl}
                                                        onClose={handleOnMenuClose}
                                                        MenuListProps={{
                                                            'aria-labelledby': 'basic-button',
                                                        }}
                                                        sx={{ display: 'flex', textAlign: 'center', height: '85%' }}

                                                    >
                                                        <sdkMui.MenuItem onClick={() => { handleOnMenuClose() }}>
                                                            <sdkMui.Stack spacing={1} direction={'row'}>
                                                                <span data-testid={`${data?.VendorName}-Edit-Icon`} className="material-symbols-outlined" style={{ fontSize: '16px', cursor: 'pointer', marginTop: '4px' }}  >
                                                                    edit
                                                                </span>
                                                                <span data-testid={`${data?.VendorName}-Edit-Icon-Text`} style={{ fontSize: '16px', cursor: 'pointer' }} >
                                                                    Edit
                                                                </span>
                                                            </sdkMui.Stack>
                                                        </sdkMui.MenuItem>
                                                        <sdkMui.MenuItem onClick={() => { handleOnMenuClose() }}>
                                                            <sdkMui.Stack spacing={1} direction={'row'}>
                                                                <span data-testid={`${data?.VendorName}-Delete-Icon`} className="material-symbols-outlined" style={{ fontSize: '16px', cursor: 'pointer', marginTop: '4px' }} >
                                                                    delete
                                                                </span>
                                                                <span data-testid={`${data?.VendorName}-Delete-Icon-Text`} style={{ fontSize: '16px', cursor: 'pointer' }} >
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

export { ListVendor }