/**
 * Created By : Pradeepa S
 * Created Date : Nov 16 2023
 * Description : This file contain component for product advance filter
 */

import React, { useEffect, useState } from "react";
import { Button, Snackbar, sdkMui } from "@baas/platform-web-sdk";
import { ProductAdvanceFilterInterface } from '@/interfaces/components/products/product/AdvanceFilterInterface';
import _ from 'lodash';
import { Messages } from "@/utils/Messages";
import DoneIcon from '@mui/icons-material/Done';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const messages = new Messages()

export function ProductAdvanceFilter({ configs, data, callbacks }: ProductAdvanceFilterInterface) {
    const [CategoryData, setCategoryData] = useState<any>(data?.filterReq?.categoryData)
    const [ParentProductID, setParentProductID] = useState<any>('')
    const [isGoodsEnable] = useState(data?.filterReq?.productData?.IsGoods === undefined ? false : data?.filterReq?.productData?.IsGoods)
    const [isServiceEnable] = useState(data?.filterReq?.productData?.IsService)
    const [minimunOneDataAlert, setMinimumOneDataAlert] = useState(false)
    const [filterData, setFilterData] = useState({
        "ProductUPC": data?.filterReq?.productData?.ProductUPC,
        "ProductSKU": data?.filterReq?.productData?.ProductSKU,
        "ProductCode": data?.filterReq?.productData?.ProductCode,
        "ParentProductID": data?.filterReq?.productData?.ParentProductID,
        "IsGoods": data?.filterReq?.productData?.IsGoods,
        "IsService": data?.filterReq?.productData?.IsService,
    })


    let CategoeyFilterID: Array<any> = []

    const handleFilterDataChange = (e: any) => {
        setFilterData((prevState: any) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleAdvanceFilter = async (categoryData: any, productData: any) => {
        categoryData?.map((category: any) => (CategoeyFilterID?.push(category?.CategoryID)))
        const prodData = {
            "ProductUPC": '',
            "ProductSKU": '',
            "ProductCode": '',
            "ParentProductID": ParentProductID,
            "IsGoods": isGoodsEnable,
            "IsService": isServiceEnable,
        }

        if (categoryData?.length > 0 || !_.isEqual(prodData, filterData)) {
            let response = await configs?.functionObject?.readProductWithFilter(productData, CategoeyFilterID)
            if (response?.status === 200) {
                callbacks?.handleViewData(response?.output)
                callbacks?.handleAdvanceFilterClose(false)
                let filterData = { productData, categoryData }
                callbacks?.handleFilterData(filterData)
            }
            if (response?.status === 404) {
                callbacks?.handleViewData(response?.output)
                callbacks?.handleAdvanceFilterClose(false)
                let filterData = { productData, categoryData }
                callbacks?.handleFilterData(filterData)
            }
        }
        else {
            setMinimumOneDataAlert(true)
            setTimeout(() => {
                setMinimumOneDataAlert(false)
            }, 3000)
        }
    }

    const handleResetFilterData = async () => {
        let filterreq = { productData : {
            "ProductUPC": '',
            "ProductSKU": '',
            "ProductCode": '',
            "ParentProductID": '',
            "IsGoods": false,
            "IsService": false,
        }, categoryData:[]}
        let response = await configs?.functionObject?.readProduct('', { "CreatedDate": 'desc' }, 0)
        callbacks?.handleViewData(response?.output)
        callbacks?.handleFilterData(filterreq)
        callbacks?.handleAdvanceFilterClose(false)
    }

    useEffect(() => {
        if (data?.filterReq?.productData?.ParentProductID !== undefined) {
            setParentProductID(data?.productData?.find((product: any) => product?.ProductID === data?.filterReq?.productData?.ParentProductID)?.ProductName)
        }
    })

    return (
        <>
            <sdkMui.Grid data-testid={configs?.datatestID} container spacing={2} alignItems={'center'} sx={{ p: 1.3, background: (theme) => theme.palette.primary.main, color: (theme) => theme.palette.primary.contrastText }}>
                <sdkMui.Grid item xs={10} textAlign={'left'}>
                    <sdkMui.Typography variant="h3" sx={{ pl: 2 }} >Advance Filter</sdkMui.Typography>
                </sdkMui.Grid>
                <sdkMui.Grid item xs={2} textAlign={'right'}  >
                    <span className="material-symbols-outlined" style={{ cursor: 'pointer' }} onClick={() => { callbacks?.handleAdvanceFilterClose(false) }}>
                        close
                    </span>
                </sdkMui.Grid>
            </sdkMui.Grid >
            <sdkMui.Box sx={{ p: 2 }}>
                <form onSubmit={(e: any) => { e?.preventDefault(); handleAdvanceFilter(CategoryData, filterData) }} onReset={() => { handleResetFilterData() }}>
                    <sdkMui.Grid data-testid={configs?.datatestID} container spacing={2} alignItems={'center'}>
                        <sdkMui.Grid item xs={12} >
                            <sdkMui.Stack spacing={0.5} direction={'column'}>
                                <sdkMui.Typography variant="subtitle1"> Category :</sdkMui.Typography>
                                <sdkMui.Autocomplete
                                    id="combo-box-demo"
                                    value={CategoryData}
                                    size='small'
                                    onChange={(event, newInputValues) => {
                                        setCategoryData(newInputValues);
                                    }}
                                    placeholder='Select Category'
                                    options={data?.categoryData || []}
                                    getOptionLabel={(option) => option?.CategoryName || ''}
                                    // getOptionSelected={(option, value) => option.CategoryName === value.CategoryName}
                                    multiple
                                    renderInput={(params) => <sdkMui.TextField {...params} size='small' label="Category" variant='outlined' />}
                                />
                            </sdkMui.Stack>
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={12}>
                            <sdkMui.Stack spacing={0.5} direction={'column'}>
                                <sdkMui.Typography variant="subtitle1">UPC :</sdkMui.Typography>
                                <sdkMui.TextField
                                    size="small"
                                    name='ProductUPC'
                                    label='Product UPC'
                                    fullWidth
                                    value={filterData?.ProductUPC}
                                    onChange={(e: any) => handleFilterDataChange(e)} />
                            </sdkMui.Stack>
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={12}>
                            <sdkMui.Stack spacing={0.5} direction={'column'}>
                                <sdkMui.Typography variant="subtitle1">SKU :</sdkMui.Typography>
                                <sdkMui.TextField
                                    size="small"
                                    name='ProductSKU'
                                    label='Product SKU'
                                    fullWidth
                                    value={filterData?.ProductSKU}
                                    onChange={(e: any) => handleFilterDataChange(e)} />
                            </sdkMui.Stack>
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={12}>
                            <sdkMui.Stack spacing={0.5} direction={'column'}>
                                <sdkMui.Typography variant="subtitle1">Code :</sdkMui.Typography>
                                <sdkMui.TextField
                                    size="small"
                                    name='ProductCode'
                                    placeholder="Enter Product Code"
                                    label='Product Code'
                                    fullWidth
                                    value={filterData?.ProductCode}
                                    onChange={(e: any) => handleFilterDataChange(e)} />
                            </sdkMui.Stack>
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={12}>
                            <sdkMui.Stack spacing={0.5} direction={'column'}>
                                <sdkMui.Typography variant="subtitle1">Base Product :</sdkMui.Typography>
                                <sdkMui.Autocomplete
                                    id="combo-box-demo"
                                    value={ParentProductID}
                                    onChange={(event, newInputValue) => {
                                        setParentProductID(newInputValue);
                                        setFilterData((prevState: any) => {
                                            return {
                                                ...prevState,
                                                "ParentProductID": data?.productData?.find((parent: any) => parent?.ProductName === newInputValue)?.ProductID
                                            }
                                        })
                                    }}
                                    placeholder='Choose Product'
                                    options={data?.productData?.map((option: any) => option?.ProductName || "")}
                                    fullWidth
                                    renderInput={(params) => <sdkMui.TextField {...params} size='small' label="Base Product" variant='outlined' />}
                                />
                            </sdkMui.Stack>
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={5} alignItems={'center'}>
                            <sdkMui.Stack spacing={0.5} direction={'row'} textAlign={'left'} alignItems={'center'}>
                                <sdkMui.Typography variant="h5" fontWeight={'bold'} >IsGoods </sdkMui.Typography>
                                <sdkMui.Switch defaultChecked={isGoodsEnable} onChange={(e: any) => {
                                    setFilterData((prevState: any) => {
                                        return {
                                            ...prevState,
                                            "IsGoods": e.target.checked
                                        }
                                    });
                                }} />

                            </sdkMui.Stack>
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={5} alignItems={'center'}>
                            <sdkMui.Stack spacing={0.5} direction={'row'} textAlign={'left'} alignItems={'center'}>
                                <sdkMui.Typography variant="h5" fontWeight={'bold'}>IsService </sdkMui.Typography>
                                <sdkMui.Switch defaultChecked={isServiceEnable} onChange={(e: any) => {
                                    setFilterData((prevState: any) => {
                                        return {
                                            ...prevState,
                                            "IsService": e.target.checked
                                        }
                                    });
                                }} />
                            </sdkMui.Stack>
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={12} sx={{ p: 2 }}>
                            <hr style={{ visibility: 'hidden' }} />
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={12} textAlign={'center'}>
                            <sdkMui.Stack spacing={4} direction={'row'} justifyContent={'center'}>
                                <Button configs={{
                                    type: "submit",
                                    label: "Apply",
                                    varient: 'contained',
                                    color: 'primary',
                                    size: 'small',
                                    startIcon: <DoneIcon />
                                }} callbacks={{
                                    handleButtonClick: () => { }
                                }} />

                                <Button configs={{
                                    type: "reset",
                                    label: "Reset",
                                    varient: 'contained',
                                    color: 'primary',
                                    size: 'small',
                                    startIcon: <RestartAltIcon />
                                }} callbacks={{
                                    handleButtonClick: () => { }
                                }} />
                            </sdkMui.Stack>
                        </sdkMui.Grid>
                    </sdkMui.Grid>
                </form>
            </sdkMui.Box>
            {
                minimunOneDataAlert &&
                <Snackbar
                    configs={{
                        isSetOpen: minimunOneDataAlert,
                        severity: 'error',
                        alertDescription: messages?.MINIMUM_ONE_FEILD_SHOULD_ADD,
                        snackbarAutoHideDuration: 3000
                    }} />
            }
        </>
    )
}
