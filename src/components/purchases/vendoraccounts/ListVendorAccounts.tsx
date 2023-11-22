/**
@CreatedBy        : Muthumariappan G
@CreatedTime      : Oct 4 2023
@ModifiedBy       : Muthumariappan G
@ModifiedTime     : Oct 4 2023
@Description      : This is the component file for list accounts
**/

import React from "react";
import Paper from '@mui/material/Paper';
import { Helper } from "@/utils/Helper";
import { sdkMui } from "@baas/platform-web-sdk";
import { ListVendorAccountsInterface } from "@/interfaces/components/purchases/vendoraccounts/ListVendorAccountsInterface";

const helper = new Helper()
const ListVendorAccountsHeaders = [
    {
        "ColumnName": "VendorName",
        "DisplayName": "Vendor Name",
        "IsVisible": true
    },
    {
        "ColumnName": "AccountNumber",
        "DisplayName": "Account Number",
        "IsVisible": true
    },
    {
        "ColumnName": "AccountCode",
        "DisplayName": "Account Code",
        "IsVisible": true  
    },
    {
        "ColumnName": "DisplayName",
        "DisplayName": "Display Name",
        "IsVisible": true  
    },
    {
        "ColumnName": "AccountBalance",
        "DisplayName": "Account Balance",
        "IsVisible": true  
    },
    {
        "ColumnName": "CurrencyCode",
        "DisplayName": "Currency Code",
        "IsVisible": true  
    },
    {
        "ColumnName": "OpenedDate",
        "DisplayName": "Opened Date",
        "IsVisible": true  
    },
    {
        "ColumnName": "CreatedDate",
        "DisplayName": "Create Date",
        "IsVisible": true  
    }
]

export function ListVendorAccounts({ configs, data} : ListVendorAccountsInterface) {

    return(
        <>
        <sdkMui.TableContainer component={Paper} sx={{ marginTop:"10px", maxHeight: { xs: "70vh", sm: "70vh", md: "70vh", lg: "80vh", xl: "80vh" }, minHeight: 'fit-content', borderRadius: '15px' }}>
            <sdkMui.Table data-testid = {configs?.dataTestID} sx={{ minWidth: 650 }} aria-label="sticky table" stickyHeader>
                <sdkMui.TableHead>
                    <sdkMui.TableRow>
                        {
                            ListVendorAccountsHeaders?.map(( column: any, index: number ) => (
                                column?.IsVisible && 
                                <sdkMui.TableCell key={index} 
                                    sx={{ background: (theme) => theme.palette.primary.main, 
                                            color: (theme) => theme.palette.primary.contrastText 
                                    }}>
                                    <b> {helper?.convertToTitleCase(column?.DisplayName)}</b>
                                </sdkMui.TableCell>
                            ))
                        }
                    </sdkMui.TableRow>
                </sdkMui.TableHead>
                <sdkMui.TableBody>
                    {
                        data?.vendorAccountsListData?.map((data: any, index: number) => 
                            <sdkMui.TableRow key={index} 
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer', '&:hover': {
                                        transform: 'scale(1.0)', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)'
                                    }
                            }}>
                                {
                                    ListVendorAccountsHeaders?.find((data: any) => data?.ColumnName === 'VendorName') && 
                                        <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }}>
                                            {data?.VendorName}
                                        </sdkMui.TableCell>
                                }
                                {
                                    ListVendorAccountsHeaders?.find((data: any) => data?.ColumnName === 'AccountNumber') && 
                                        <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }}>
                                            {data?.AccountNumber}
                                        </sdkMui.TableCell>
                                }
                                {
                                    ListVendorAccountsHeaders?.find((data: any) => data?.ColumnName === 'AccountCode') && 
                                        <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }}>
                                            {data?.AccountCode}
                                        </sdkMui.TableCell>
                                }
                                {
                                    ListVendorAccountsHeaders?.find((data: any) => data?.ColumnName === 'DisplayName') && 
                                        <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }}>
                                            {data?.DisplayName}
                                        </sdkMui.TableCell>
                                }
                                {
                                    ListVendorAccountsHeaders?.find((data: any) => data?.ColumnName === 'AccountBalance') && 
                                        <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }}>
                                            {data?.AccountBalance}
                                        </sdkMui.TableCell>
                                }
                                {
                                    ListVendorAccountsHeaders?.find((data: any) => data?.ColumnName === 'CurrencyCode') && 
                                        <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }}>
                                            {data?.CurrencyCode}
                                        </sdkMui.TableCell>
                                }
                                {
                                    ListVendorAccountsHeaders?.find((data: any) => data?.ColumnName === 'OpenedDate') && 
                                        <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }}>
                                            {data?.OpenedDate}
                                        </sdkMui.TableCell>
                                }
                                {
                                    ListVendorAccountsHeaders?.find((data: any) => data?.ColumnName === 'CreatedDate') && 
                                        <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }}>
                                            {data?.CreatedDate}
                                        </sdkMui.TableCell>
                                }
                                
                            </sdkMui.TableRow>
                        )}
                </sdkMui.TableBody>
            </sdkMui.Table>
        </sdkMui.TableContainer>
        </>
    )
}