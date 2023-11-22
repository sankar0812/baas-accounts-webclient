/**
 * CreatedBy    : Muthumariappan G
 * CreatedDate  : Nov 07 2023
 * ModifiedBy   : Muthumariappan 
 * ModifiedDate : Nov 10 2023
 * Description  : This file contain table component of product category List
 */


import React, { useState } from "react";
import { sdkMui, Chip } from "@baas/platform-web-sdk";
import { Helper } from "@/utils/Helper";
import InfiniteScroll from 'react-infinite-scroll-component';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { ListCategoryInterface } from "@/interfaces/components/products/category/ListCategoryInterface";


const helper = new Helper()


function ListCategory({ configs, data }: ListCategoryInterface) {

    const [categorylists, setCategoryLists] = useState(data?.categoryList)
    const [activeHeader, setActiveHeader] = useState('CategoryName')
    const [orderBy, setOrderBy] = useState('asc')
    const [isLoading, setIsLoading] = useState(false)
    const [isTableScrollLoading, setIsTableScrollLoading] = useState<boolean>(false)
    const [hasMoreRecords, setHasMoreRecords] = useState(data?.categoryList?.length === 0 || data?.categoryList?.length < 10 ? false : true);
    const [sortreq, setSortReq] = useState<any>({})
    const [pageno, setPageNo] = useState<number>(1)
    const [categoriesColumnHeaders] = useState(data?.categoryListColumnDetail)

    const fetchMoreData = async () => {
        try {
            setIsTableScrollLoading(true)
            let CategoriesList = await configs?.functionObject?.readCategories(Object.entries(sortreq).length > 0 ? sortreq : { "CreatedDate": "desc" }, configs?.filter, pageno)
            setTimeout(() => {
                setPageNo(pageno + 1)
                CategoriesList?.output && setCategoryLists((oldData: any) => [...oldData, ...CategoriesList?.output])
                if (CategoriesList?.output?.length === 0 || CategoriesList?.output?.length < 10) {
                    setHasMoreRecords(false)
                }
                setIsTableScrollLoading(false)
            }, 1000)
        }
        catch (error) {
            console.error('Error fetching more data:', error);
        }
    }

    const handleTableSort = async (data: string) => {
        setIsLoading(true)
        let sortreq = orderBy === 'asc' ? { [data]: 'asc' } : { [data]: 'desc' }
        setSortReq(sortreq)
        let response = await configs?.functionObject?.readCategories(sortreq, configs?.filter, 0)
        if (response?.status === 200) {
            setIsLoading(false)
            setPageNo(0)
            setCategoryLists(response?.output)
        }
        setActiveHeader(data)
        orderBy === 'asc' && setOrderBy('desc')
        orderBy === 'desc' && setOrderBy('asc')
    }

    return (
        <>
            <sdkMui.Box
                sx={{
                    overflowY: 'auto', pb: 3
                }}
            >
                <InfiniteScroll
                    dataLength={categorylists.length}
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
                                        categoriesColumnHeaders?.map((column: any, index: number) => (
                                            column?.IsVisible &&
                                            <sdkMui.TableCell key={index}
                                                sx={{
                                                    background: (theme) => theme.palette.primary.main,
                                                    color: (theme) => theme.palette.primary.contrastText
                                                }}
                                            >
                                                {
                                                    column?.IsSortEnabled ?
                                                        <sdkMui.TableSortLabel
                                                            active={activeHeader === column?.ColumnName}
                                                            sx={{
                                                                cursor: 'pointer',
                                                                background: (theme) => theme.palette.primary.main,
                                                                color: (theme) => theme.palette.primary.contrastText
                                                            }} IconComponent={ArrowDropDownIcon}
                                                            title={orderBy === 'asc' ? "Sort by Asecending" : "Sort by Descending"}
                                                            direction={orderBy === 'asc' ? 'asc' : 'desc'}
                                                            onClick={() => { handleTableSort(column?.ColumnName) }}>
                                                            <b> {helper?.convertToTitleCase(column?.DisplayName)} </b>
                                                        </sdkMui.TableSortLabel>
                                                        :
                                                        <b> {helper?.convertToTitleCase(column?.DisplayName)}</b>
                                                }
                                            </sdkMui.TableCell>
                                        ))
                                    }
                                    <sdkMui.TableCell sx={{ maxHeight: "75vh", minHeight: 'fit-content', background: (theme) => theme.palette.primary.main, color: (theme) => theme.palette.primary.contrastText }}>
                                        <b>Delete</b>
                                    </sdkMui.TableCell>
                                </sdkMui.TableRow>
                            </sdkMui.TableHead>
                            <sdkMui.TableBody>
                                {isLoading ?
                                    <sdkMui.TableRow
                                    >
                                        <sdkMui.TableCell colSpan={categoriesColumnHeaders?.length + 1}>
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
                                        {categorylists?.map((categorydata: any, index: number) =>

                                            <sdkMui.TableRow key={index}
                                                sx={{
                                                    cursor: 'pointer', '&:hover': {
                                                        transform: 'scale(1.0)', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)'
                                                    },
                                                    alignItems:'center'
                                                }}
                                                onClick={() => { configs?.router?.push(`/merchants/${configs?.router?.query?.merchantkey}/products/categories/${categorydata?.CategoryID}`) }}
                                            >

                                                {
                                                    categoriesColumnHeaders?.find((data: any) => data?.ColumnName === 'CategoryName')?.IsVisible &&
                                                    <sdkMui.TableCell sx={{
                                                        bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary,
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        maxWidth: '200px',
                                                        cursor: 'pointer'
                                                    }} title={categorydata?.CategoryName} align="left">
                                                        {categorydata?.CategoryName}
                                                    </sdkMui.TableCell>
                                                }
                                                {
                                                    categoriesColumnHeaders?.find((data: any) => data?.ColumnName === 'CategoryCode')?.IsVisible &&
                                                    <sdkMui.TableCell sx={{
                                                        bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary,
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        maxWidth: '200px'
                                                    }} title={categorydata?.CategoryCode?.toUpperCase()} align="left">
                                                        {categorydata?.CategoryCode?.toUpperCase()}
                                                    </sdkMui.TableCell>
                                                }
                                                {
                                                    categoriesColumnHeaders?.find((data: any) => data?.ColumnName === 'Description')?.IsVisible &&
                                                    <sdkMui.TableCell sx={{
                                                        bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary,
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        maxWidth: '200px',
                                                        cursor: 'pointer'
                                                    }} title={categorydata?.Description} align="left">
                                                        {
                                                            categorydata?.Description !== null &&
                                                                categorydata?.Description !== "null" &&
                                                                categorydata?.Description !== "" ? categorydata?.Description : "N/A"}
                                                    </sdkMui.TableCell>
                                                }
                                                {
                                                    categoriesColumnHeaders?.find((data: any) => data?.ColumnName === 'ProductCount')?.IsVisible &&
                                                    <sdkMui.TableCell sx={{
                                                        bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary,
                                                    }} align='justify'>
                                                        <Chip
                                                            callbacks={{
                                                                handleClick: () => { },
                                                                handleDelete: () => { }
                                                            }}
                                                            configs={{
                                                                label: categorydata?.ProductCategory?.length !== 0 ? categorydata?.ProductCategory?.length : 0,
                                                                size: 'small',
                                                                variant: 'filled',
                                                                color: 'primary'
                                                            }}
                                                        />
                                                    </sdkMui.TableCell>
                                                }
                                                {
                                                    categoriesColumnHeaders?.find((data: any) => data?.ColumnName === 'CreatedBy')?.IsVisible &&
                                                    <sdkMui.TableCell
                                                        sx={{
                                                            bgcolor: (theme) => theme?.palette?.background?.default,
                                                            color: (theme) => theme?.palette?.text?.primary
                                                        }}
                                                        title={categorydata?.CreatedBy} align="left"
                                                    >
                                                        {categorydata?.CreatedBy || "N/A"}
                                                    </sdkMui.TableCell>
                                                }
                                                {
                                                    categoriesColumnHeaders?.find((data: any) => data?.ColumnName === 'CreatedDate')?.IsVisible &&
                                                    <sdkMui.TableCell
                                                        sx={{
                                                            bgcolor: (theme) => theme?.palette?.background?.default,
                                                            color: (theme) => theme?.palette?.text?.primary
                                                        }}
                                                    >
                                                        {helper.converttoDateFormat(categorydata?.CreatedDate, "MM/DD/YYYY") || "N/A"}
                                                    </sdkMui.TableCell>
                                                }
                                                {
                                                    categoriesColumnHeaders?.find((data: any) => data?.ColumnName === 'ModifiedBy')?.IsVisible &&
                                                    <sdkMui.TableCell
                                                        sx={{
                                                            bgcolor: (theme) => theme?.palette?.background?.default,
                                                            color: (theme) => theme?.palette?.text?.primary
                                                        }}
                                                        title={categorydata?.ModifiedBy} align="left"
                                                    >
                                                        {categorydata?.ModifiedBy || "N/A"}
                                                    </sdkMui.TableCell>
                                                }
                                                {
                                                    categoriesColumnHeaders?.find((data: any) => data?.ColumnName === 'ModifiedDate')?.IsVisible &&
                                                    <sdkMui.TableCell
                                                        sx={{
                                                            bgcolor: (theme) => theme?.palette?.background?.default,
                                                            color: (theme) => theme?.palette?.text?.primary
                                                        }}
                                                    >
                                                        {helper.converttoDateFormat(categorydata?.ModifiedDate, "MM/DD/YYYY") || "N/A"}
                                                    </sdkMui.TableCell>
                                                }
                                                <sdkMui.TableCell
                                                    sx={{
                                                        bgcolor: (theme) => theme?.palette?.background?.default,
                                                        color: (theme) => theme?.palette?.text?.primary
                                                    }}
                                                >
                                                    <span
                                                        data-testid={`${categorydata?.CategoryName}-Delete-Icon`}
                                                        className="material-symbols-outlined"
                                                        style={{ fontSize: '16px', cursor: 'pointer', marginTop: '4px' }}
                                                        onClick={(e:any) => {e?.stopPropagation()}}
                                                    >
                                                        delete
                                                    </span>
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


export { ListCategory }