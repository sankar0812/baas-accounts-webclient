/**
@CreatedBy        : Muthumariappan G
@CreatedTime      : Oct 4 2023
@ModifiedBy       : Muthumariappan G
@ModifiedTime     : Oct 4 2023
@Description      : This file contains pages for Vendor Accounts
**/

import React, { useState } from 'react'
import { sdkMui } from "@baas/platform-web-sdk";
import { platformHelper } from "@baas/platform-web-sdk";
import { ListVendorAccounts } from '@/components/purchases/vendoraccounts/ListVendorAccounts';
import { VendorAccountsFunction } from '@/functions/purchases/vendoraccounts/VendorAccountsFunction';

// Define Class Object  
const vendorAccountsFunction = new VendorAccountsFunction()

export default function VendorAccounts(props: any){

// Define State Variable
const [listVendorAccountsData] = useState(props?.listVendorAccountsDatas)


return (
    <>
    <sdkMui.Grid container spacing={0}>
        <sdkMui.Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ display: 'flex', alignItems: 'center' }}>
            <sdkMui.Typography sx={{ fontWeight: 'bold'}}> Vendor Accounts </sdkMui.Typography>
        </sdkMui.Grid>
        <sdkMui.Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ display: 'flex', alignItems: 'center' }}>
            
        </sdkMui.Grid>
        <sdkMui.Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <ListVendorAccounts
                configs={{
                    "dataTestID": 'List-Vendor-Accounts'
                }}
                data={{
                    vendorAccountsListData: listVendorAccountsData
                }}
            />
        </sdkMui.Grid>
    </sdkMui.Grid>
    </>
    
)}



export const getServerSideProps = async (context: any) => {
    if(!platformHelper.checkUserCookieStorage(context)) {
        return {
            redirect: {
                destination: "/signin",
                permanent: false
            }
        }
    }
    let listVendorAccountsData = await vendorAccountsFunction?.readVendorAccountsSSR()

    return {
        props: {
            listVendorAccountsDatas: listVendorAccountsData
        }
    }
}
