/**
 * CreatedBy : Venugopal
 * CreatedDate : Nov 10 2023
 * Description : This file contain table component of Packagetype List
 */
import React, { useState } from "react";

import { ListPackagetypeInterface } from "@/interfaces/components/settings/packagetype/ListPackagetype"
import { sdkMui } from "@baas/platform-web-sdk";

export function ListPackageType({ configs, data }: ListPackagetypeInterface) {
    const [listpackagetypedata]=useState(data?.packagetypedata)

    return (
        <>
            <sdkMui.Grid container spacing={0} data-testid ={configs?.["data-testid"]} >
                {listpackagetypedata.map((row: any, index: number) => (
                    <sdkMui.Grid item key={index} xs={12} sm={12} md={12} lg={12} xl={12} >
                        <sdkMui.Card key={index} sx={{
                        border: '1px solid #6CB4EE',
                        boxShadow:"none",
                            '&:hover': {
                                transform: 'scale(1.0)', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)'
                            },
                        }}
                        data-testid ={`${row?.PackageType}-Card`}
                        >
                            <sdkMui.Grid container spacing={1} sx={{ color: (theme) => theme?.palette?.text?.primary }} textAlign={'center'} alignItems={'center'} display={'flex'}>

                                <sdkMui.Grid item xs={12} sm={12} lg={1} xl={1} md={2} data-testid = {`${row?.PackageType}-Icon`}>
                                    <span className="material-symbols-outlined" >
                                        package_2
                                    </span>
                                </sdkMui.Grid>
                                <sdkMui.Grid item xs={12} sm={12} lg={2} xl={2} md={2} data-testid = {`${row?.PackageType}`}>
                                    <sdkMui.Typography variant="h4" fontWeight={'bold'}>{row?.PackageType}</sdkMui.Typography>
                                </sdkMui.Grid>
                                <sdkMui.Grid item xs={12} sm={12} lg={2} xl={2} md={4} data-testid = {`${row?.PackageType}-Code`} >
                                    <sdkMui.Typography>
                                        Code : {row?.PackageTypeCode || "Primary"}
                                    </sdkMui.Typography>
                                </sdkMui.Grid>
                                <sdkMui.Grid item xs={12} sm={12} lg={5} xl={5} md={4} data-testid = {`${row?.PackageType}-Description`}>
                                    <sdkMui.Typography > {row?.Description || 'N/A'}</sdkMui.Typography>
                                </sdkMui.Grid>
                                <sdkMui.Grid item xs={6} sm={6} lg={1} xl={1} md={6} >
                                    <sdkMui.Stack spacing={1} direction={'row'}>
                                        <span data-testid={`${row?.PackageType}-Edit-Icon`} className="material-symbols-outlined" style={{ fontSize: '16px', cursor: 'pointer', marginTop: '4px' }}  >
                                            edit
                                        </span>
                                        <span data-testid={`${row?.PackageType}-Edit-Icon-Text`} style={{ fontSize: '16px', cursor: 'pointer' }} >
                                            Edit
                                        </span>
                                    </sdkMui.Stack>
                                </sdkMui.Grid>
                                <sdkMui.Grid item xs={6} sm={6} lg={1} xl={1} md={6}  >
                                    <sdkMui.Stack spacing={1} direction={'row'}>
                                        <span data-testid={`${row?.PackageType}-Delete-Icon`} className="material-symbols-outlined" style={{ fontSize: '16px', cursor: 'pointer', marginTop: '4px' }} >
                                            delete
                                        </span>
                                        <span data-testid={`${row?.PackageType}-Delete-Icon-Text`} style={{ fontSize: '16px', cursor: 'pointer' }} >
                                            Delete
                                        </span>
                                    </sdkMui.Stack>
                                </sdkMui.Grid>
                            </sdkMui.Grid>
                        </sdkMui.Card>
                    </sdkMui.Grid>
                ))
                }
            </sdkMui.Grid>
        </>
    )
}