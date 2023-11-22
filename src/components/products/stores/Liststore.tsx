/**
@CreatedBy        : Kannan
@CreatedTime      : Nov 8 2023
@ModifiedBy       : Kannan
@ModifiedTime     : Nov 8 2023
@Description      : This is the component file for list Store
**/



import React, { useState } from "react";
import { Helper } from "@/utils/Helper";
import { Chip, sdkMui } from "@baas/platform-web-sdk";
import { ListStoreInterface } from "@/interfaces/components/products/stores/ListStoreInterface";




export function ListStores({ data, configs }: ListStoreInterface) {

    const helper = new Helper()

    const [listStore] = useState(data?.storeListData)

    return (
        <>
            <sdkMui.Grid container spacing={1} data-testid='Store-list'>

                {
                    listStore?.map((singleData: any, index: number) => (

                        <sdkMui.Grid item key={index} xs={12} sm={12} md={3} lg={3} xl={3} >
                            <sdkMui.Card key={singleData?.DisplayName} data-testid={`${singleData.DisplayName}-sdkMui.Card`}
                                onClick={() => configs?.router?.push(`/merchants/${configs?.router?.query?.merchantkey}/products/stores/${singleData?.StoreID}`)}
                                sx={{
                                    background: (theme) => theme.palette.background.paper, p: 1, boxShadow: "0px 20px 15px -3px rgba(0,0,0,0.1);", borderRadius: "15px", cursor: "pointer", WebkitBoxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                }}
                            >

                                <sdkMui.Grid container spacing={1.5} sx={{ color: (theme) => theme?.palette?.text?.primary }} data-testid={`${singleData?.StoreName}`}>
                                    <sdkMui.Grid item xs={12} sm={12} lg={12} xl={12} md={12} sx={{
                                        display: 'flex', justifyContent: 'center', textAlign: "center",
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        maxWidth: '200px'
                                    }}>

                                        <sdkMui.Typography variant="h4" fontWeight={'bold'}>

                                            {singleData?.StoreName}
                                        </sdkMui.Typography>
                                    </sdkMui.Grid>
                                    <sdkMui.Grid item xs={6} sm={6} lg={5} xl={5} md={5} textAlign={'center'} data-testid={`${singleData?.StoreCode}`}>
                                        <sdkMui.Typography>
                                            <Chip
                                                configs={{
                                                    label: singleData?.StoreCode,
                                                    clickable: false,
                                                    color: 'primary',
                                                    size: 'small'
                                                }}
                                                callbacks={{
                                                    handleClick: () => { },
                                                    handleDelete: () => { }
                                                }}
                                            />
                                        </sdkMui.Typography>
                                    </sdkMui.Grid>
                                    <sdkMui.Grid item xs={6} sm={6} lg={6.5} xl={6.5} md={6.5} sx={{ textAlign: { xs: 'center', sm: 'center', md: 'center', lg: 'right', xl: 'right' } }}>
                                        <Chip
                                            configs={{
                                                label: singleData?.IsActive === true ? "Active" : "In-Active",
                                                clickable: false,
                                                color: singleData?.IsActive === true ? 'primary' : "error",
                                                size: 'small'
                                            }}
                                            callbacks={{
                                                handleClick: () => { },
                                                handleDelete: () => { }
                                            }}
                                        />
                                    </sdkMui.Grid>
                                    <sdkMui.Grid item xs={6} sm={6} lg={5} xl={5} md={5} sx={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: "center" }}>
                                        <sdkMui.Typography variant="subtitle1" fontSize={'12px'} fontWeight={'bold'}>Start Date</sdkMui.Typography>
                                    </sdkMui.Grid>
                                    <sdkMui.Grid item xs={6} sm={6} lg={6} xl={6} md={6} sx={{ textAlign: { xs: "center", sm: "center", md: "center", lg: "right", xl: "right" } }}>
                                        <sdkMui.Typography variant="subtitle1" fontSize={'12px'} fontWeight={'bold'}>End Date</sdkMui.Typography>
                                    </sdkMui.Grid>
                                    <sdkMui.Grid xs={6} sm={6} lg={6} xl={6} md={6} sx={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: "center" }}  >
                                        <sdkMui.Typography fontSize={'12px'}>{helper.converttoDateFormat(new Date(singleData?.StartDate).toISOString().split('T')[0], "MM/DD/YYYY")}</sdkMui.Typography>
                                    </sdkMui.Grid>
                                    <sdkMui.Grid xs={6} sm={6} lg={6} xl={6} md={6} sx={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: "center" }} >
                                        <sdkMui.Typography fontSize={'12px'}>{singleData?.EndDate !== null ? helper.converttoDateFormat(new Date(singleData?.EndDate).toISOString().split('T')[0], "MM/DD/YYYY") : "-"}</sdkMui.Typography>
                                    </sdkMui.Grid>
                                    <sdkMui.Grid item xs={6} sm={6} lg={6} xl={6} md={6} sx={{ textAlign: "left" }}>
                                        <sdkMui.Typography variant="h2" sx={{ pl: 2 }} fontSize={'14px'} fontWeight={'bold'}>{singleData?.StoreType?.StoreTypeName}</sdkMui.Typography>
                                    </sdkMui.Grid>

                                    <sdkMui.Grid item xs={12} sm={12} lg={12} xl={12} md={12} textAlign={'center'} justifyContent={'center'} display={'flex'}>
                                        <sdkMui.Typography variant="body1"
                                            sx={{
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                maxWidth: '200px',
                                            }}> {singleData?.Description || 'N/A'}</sdkMui.Typography>
                                    </sdkMui.Grid>
                                </sdkMui.Grid>
                            </sdkMui.Card>
                        </sdkMui.Grid>
                    ))
                }
            </sdkMui.Grid >
        </>
    )
}