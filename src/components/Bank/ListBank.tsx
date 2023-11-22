/**
* CreatedBy    : Sreedhar A
* CreatedDate  : Oct 04 2023
* ModifiedBy   : Muthumariappan G
* ModifiedDate : Oct 09 2023
* Description  : This file contain table component of bank Lists 
*/

import React, { useState } from "react";
import { sdkMui, Chip } from "@baas/platform-web-sdk";
import { BankTypeListInterface } from "@/interfaces/components/Bank/ListBankInterface";
import { Helper } from "@/utils/Helper";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InfiniteScroll from 'react-infinite-scroll-component';


const helper = new Helper()

function BankList({ data, configs }: BankTypeListInterface) {


    //State varaiable
    const [bankColumnHeaders] = useState(data?.BankListColumnDetail)
    const [listBank, setListBank] = useState(data?.bankList)
    const [activeHeader, setActiveHeader] = useState('BankShortName')
    const [orderBy, setOrderBy] = useState('asc')
    const [isLoading, setIsLoading] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const isMenuButtonOpen = Boolean(anchorEl);
    const [isTableScrollLoading, setIsTableScrollLoading] = useState<boolean>(false)
    const [hasMoreRecords, setHasMoreRecords] = useState(data?.bankList?.length === 0 || data?.bankList?.length < 10 ? false : true);
    const [sortreq, setSortReq] = useState<any>({})
    const [pageno, setPageNo] = useState<number>(1)


    const fetchMoreData = async () => {
        try {
            setIsTableScrollLoading(true)
            let BankList = await configs?.functionObject?.readBanks(sortreq, configs?.filter, pageno)
            setTimeout(() => {
                setPageNo(pageno + 1)
                BankList?.output && setListBank((oldData: any) => [...oldData, ...BankList?.output])
                if (BankList?.output?.length === 0 || BankList?.output?.length < 10) {
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
        let response = await configs?.functionObject?.readBanks(sortreq, configs?.filter, 0)
        if (response?.status === 200) {
            setIsLoading(false)
            setPageNo(0)
            setListBank(response?.output)
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
                    dataLength={listBank.length} //This is important field to render the next data
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
                        <sdkMui.Table data-testid={configs?.["data-testid"]} sx={{ minWidth: 650 }} aria-label="sticky table" stickyHeader>
                            <sdkMui.TableHead sx={{ background: (theme) => theme.palette.primary.main, color: (theme) => theme.palette.primary.contrastText }}>
                                <sdkMui.TableRow>
                                    {
                                        bankColumnHeaders?.map((column: any, index: number) => (
                                            column?.IsVisible && <sdkMui.TableCell key={index} sx={{ background: (theme) => theme.palette.primary.main, color: (theme) => theme.palette.primary.contrastText }}>{column?.IsSortEnabled ? <sdkMui.TableSortLabel active={activeHeader === column?.columnName} sx={{ cursor: 'pointer', background: (theme) => theme.palette.primary.main, color: (theme) => theme.palette.primary.contrastText }} IconComponent={ArrowDropDownIcon} title={orderBy === 'asc' ? "Sort by Asecending" : "Sort by Descending"} direction={orderBy === 'asc' ? 'asc' : 'desc'}
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
                                        <sdkMui.TableCell colSpan={bankColumnHeaders?.length + 1}>
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
                                        {listBank?.map((data: any, index: number) =>
                                            <sdkMui.TableRow key={index}
                                                sx={{
                                                    cursor: 'pointer', '&:hover': {
                                                        transform: 'scale(1.0)', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)'
                                                    }
                                                }}>
                                                {bankColumnHeaders?.find((data: any) => data?.columnName === "BankName").IsVisible &&
                                                    <sdkMui.TableCell sx={{
                                                        bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary,
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        maxWidth: '200px',
                                                        cursor: 'pointer'

                                                    }} title={data.BankName} align="left">
                                                        {data?.BankName}
                                                    </sdkMui.TableCell>
                                                }
                                                {bankColumnHeaders?.find((data: any) => data?.columnName === "BankShortName").IsVisible &&
                                                    <sdkMui.TableCell sx={{
                                                        bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary,
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        maxWidth: '200px'
                                                    }} title={data.BankShortName} align="left">
                                                        {data?.BankShortName}
                                                    </sdkMui.TableCell>
                                                }
                                                {bankColumnHeaders?.find((data: any) => data?.columnName === "CurrencyCode").IsVisible &&
                                                    <sdkMui.TableCell sx={{
                                                        bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary,
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        maxWidth: '200px'
                                                    }} title={data.CurrencyCode} align="left">
                                                        {data?.CurrencyCode||'N/A'}
                                                    </sdkMui.TableCell>
                                                }
                                                {bankColumnHeaders?.find((data: any) => data?.columnName === "BankAccount").IsVisible &&
                                                    <sdkMui.TableCell sx={{
                                                        bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary,
                                                    }} align="left">
                                                        <Chip
                                                            callbacks={{
                                                                handleClick: () => { },
                                                                handleDelete: () => { }
                                                            }}
                                                            configs={{
                                                                label: data?.BankAccount?.length > 0 ? data?.BankAccount?.length : 0,
                                                                size: 'small',
                                                                variant: 'filled',
                                                                color: 'primary'
                                                            }}
                                                        />
                                                    </sdkMui.TableCell>
                                                }
                                                {bankColumnHeaders?.find((data: any) => data?.columnName === "Address1").IsVisible &&
                                                    <sdkMui.TableCell sx={{
                                                        bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary,
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        maxWidth: '200px'
                                                    }} title={data.Address1} align="left">
                                                        {data?.Address1}
                                                    </sdkMui.TableCell>
                                                }
                                                {bankColumnHeaders?.find((data: any) => data?.columnName === "City").IsVisible &&
                                                    <sdkMui.TableCell sx={{
                                                        bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary,
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        maxWidth: '200px'
                                                    }} title={data.City} align="left">
                                                        {data?.City}
                                                    </sdkMui.TableCell>
                                                }
                                                {bankColumnHeaders?.find((data: any) => data?.columnName === "State").IsVisible &&
                                                    <sdkMui.TableCell sx={{
                                                        bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary,
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        maxWidth: '200px'
                                                    }} title={data.State} align="left">
                                                        {data?.State}
                                                    </sdkMui.TableCell>
                                                }
                                                {bankColumnHeaders?.find((data: any) => data?.columnName === "Country").IsVisible &&
                                                    <sdkMui.TableCell sx={{
                                                        bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary,
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        maxWidth: '200px'
                                                    }} title={data.Country} align="left">
                                                        {data?.Country}
                                                    </sdkMui.TableCell>
                                                }
                                                {bankColumnHeaders?.find((data: any) => data?.columnName === "Postal").IsVisible &&
                                                    <sdkMui.TableCell sx={{
                                                        bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary,
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        maxWidth: '200px'
                                                    }} title={data.Postal} align="left">
                                                        {data?.Postal}
                                                    </sdkMui.TableCell>
                                                }
                                                {bankColumnHeaders?.find((data: any) => data?.columnName === 'CreatedBy').IsVisible &&
                                                    <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }}>
                                                        {data?.CreatedBy}
                                                    </sdkMui.TableCell>
                                                }
                                                {bankColumnHeaders?.find((data: any) => data?.columnName === 'CreatedDate').IsVisible &&
                                                    <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }}>
                                                        {helper.converttoDateFormat(data?.CreatedDate, "MM/DD/YYYY")}
                                                    </sdkMui.TableCell>
                                                }
                                                {bankColumnHeaders?.find((data: any) => data?.columnName === 'ModifiedBy').IsVisible &&
                                                    <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }}>
                                                        {data?.ModifiedBy}
                                                    </sdkMui.TableCell>
                                                }
                                                {bankColumnHeaders?.find((data: any) => data?.columnName === 'ModifiedDate').IsVisible &&
                                                    <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }}>
                                                        {helper.converttoDateFormat(data?.ModifiedDate, "MM/DD/YYYY")}
                                                    </sdkMui.TableCell>
                                                }
                                                <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }}>
                                                    <sdkMui.IconButton
                                                        data-testid={`${data?.BankName}-Action-Icon`}
                                                        onClick={handleOnClickMenu}
                                                    >
                                                        <MoreVertIcon />
                                                    </sdkMui.IconButton>
                                                    <sdkMui.Menu
                                                        open={isMenuButtonOpen}
                                                        anchorEl={anchorEl}
                                                        onClose={handleOnMenuClose}
                                                        MenuListProps={{
                                                            'aria-labelledby': 'basic-button',
                                                        }}
                                                        sx={{ display: 'flex', textAlign: 'center', height: '85%' }}
                                                        data-testid={`${data?.BankName}-Ation-Menu`}
                                                    >
                                                        <sdkMui.MenuItem onClick={() => { handleOnMenuClose() }}>
                                                            <sdkMui.Stack spacing={1} direction={'row'}>
                                                                <span data-testid={`${data?.BankName}-Edit-Icon`} className="material-symbols-outlined" style={{ fontSize: '16px', cursor: 'pointer', marginTop: '4px' }}  >
                                                                    edit
                                                                </span>
                                                                <span data-testid={`${data?.BankName}-Edit-Icon-Text`} style={{ fontSize: '16px', cursor: 'pointer' }} >
                                                                    Edit
                                                                </span>
                                                            </sdkMui.Stack>
                                                        </sdkMui.MenuItem>
                                                        <sdkMui.MenuItem onClick={() => { handleOnMenuClose() }}>
                                                            <sdkMui.Stack spacing={1} direction={'row'}>
                                                                <span data-testid={`${data?.BankName}-Delete-Icon`} className="material-symbols-outlined" style={{ fontSize: '16px', cursor: 'pointer', marginTop: '4px' }} >
                                                                    delete
                                                                </span>
                                                                <span data-testid={`${data?.BankName}-Delete-Icon-Text`} style={{ fontSize: '16px', cursor: 'pointer' }} >
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
export { BankList }
