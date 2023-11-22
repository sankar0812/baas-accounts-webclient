/**
 * Created By : Pradeepa S
 * Created Date : Nov 08 2023
 * Description : This file contain list of package for a particular product
 */

import React from 'react';
import { sdkMui } from '@baas/platform-web-sdk';
import { ListPackageInteraface } from '@/interfaces/components/products/product/package/ListPackageinterface'

const ListPackageHeader = [
    {
        "ColumnName": "PackageType",
        "DisplayName": "Package Type",
        "IsVisible": true
    },
    {
        "ColumnName": "Length",
        "DisplayName": "Length",
        "IsVisible": true
    },
    {
        "ColumnName": "Width",
        "DisplayName": "Width",
        "IsVisible": true
    },
    {
        "ColumnName": "Height",
        "DisplayName": "Height",
        "IsVisible": true
    },
    {
        "ColumnName": "Weight",
        "DisplayName": "Weight",
        "IsVisible": true
    },
    {
        "ColumnName": "PackageCount",
        "DisplayName": "Package Count",
        "IsVisible": true
    }
]

export function ListPackage({ configs, data, callbacks }: ListPackageInteraface) {

    // const [ListPackage] = useState(data?.listPackage)

    return (
        <>

            {data?.listPackage?.length > 0 ? <>
                <sdkMui.TableContainer data-testid={configs?.datatestID} sx={{ maxHeight: '50vh', minHeight: 'fit-content' }}>
                    <sdkMui.Table sx={{ minWidth: 650 }} aria-label="sticky table" stickyHeader>
                        <sdkMui.TableHead>
                            <sdkMui.TableRow>
                                {ListPackageHeader?.map((header: any, index: number) => (
                                    header?.IsVisible && <sdkMui.TableCell key={index} sx={{ background: (theme) => theme.palette.primary.main, color: (theme) => theme.palette.primary.contrastText }}>
                                        {header?.DisplayName}
                                    </sdkMui.TableCell>
                                ))}
                                {
                                    <sdkMui.TableCell sx={{ background: (theme) => theme.palette.primary.main, color: (theme) => theme.palette.primary.contrastText }}>Delete</sdkMui.TableCell>
                                }
                            </sdkMui.TableRow>
                        </sdkMui.TableHead>
                        <sdkMui.TableBody>
                            {data?.listPackage?.map((rowData: any) => (
                                <>
                                    <sdkMui.TableRow
                                        sx={{
                                            alignContent: 'center',
                                            '&:last-child td, &:last-child th': { border: 0 }, cursor: "pointer",
                                            '&:hover': {
                                                transform: 'scale(1.0)', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)'
                                            }
                                        }}>
                                        {
                                            ListPackageHeader?.find((data: any) => data?.ColumnName === 'PackageType')?.IsVisible &&
                                            <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }} component="th" scope="row">
                                                {rowData?.PackageType?.PackageType}
                                            </sdkMui.TableCell>
                                        }
                                        {
                                            ListPackageHeader?.find((data: any) => data?.ColumnName === 'Length')?.IsVisible &&
                                            <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }} component="th" scope="row">
                                                {rowData?.Length} {rowData?.LengthUom}
                                            </sdkMui.TableCell>
                                        }
                                        {
                                            ListPackageHeader?.find((data: any) => data?.ColumnName === 'Width')?.IsVisible &&
                                            <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }} component="th" scope="row">
                                                {rowData?.Width} {rowData?.WidthUom}
                                            </sdkMui.TableCell>
                                        }
                                        {
                                            ListPackageHeader?.find((data: any) => data?.ColumnName === 'Height')?.IsVisible &&
                                            <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }} component="th" scope="row">
                                                {rowData?.Height} {rowData?.HeightUom}
                                            </sdkMui.TableCell>
                                        }
                                        {
                                            ListPackageHeader?.find((data: any) => data?.ColumnName === 'Weight')?.IsVisible &&
                                            <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }} component="th" scope="row">
                                                {rowData?.Weight} {rowData?.WeightUom}
                                            </sdkMui.TableCell>
                                        }
                                        {
                                            ListPackageHeader?.find((data: any) => data?.ColumnName === 'PackageCount')?.IsVisible &&
                                            <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }} component="th" scope="row">
                                                {rowData?.PackageCount}
                                            </sdkMui.TableCell>
                                        }
                                        <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }} onClick={(e: any) => { e?.stopPropagation(); callbacks?.handleDelete(true, rowData) }} component="th" scope="row">
                                            <span className='material-symbols-outlined' style={{ fontSize: '18px', }}>delete</span>
                                        </sdkMui.TableCell>
                                    </sdkMui.TableRow>
                                    { }

                                </>
                            ))
                            }
                        </sdkMui.TableBody>
                    </sdkMui.Table>
                </sdkMui.TableContainer>
            </>
                :
                <sdkMui.Grid textAlign={'center'}> No Data Found... Create New Package</sdkMui.Grid>
            }
        </>
    )
}
