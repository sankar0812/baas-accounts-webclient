/**
@CreatedBy        : Muthumariappan G
@CreatedTime      : Oct 4 2023
@ModifiedBy       : Muthumariappan G
@ModifiedTime     : Oct 4 2023
@Description      : This file contains Function for Accounts
**/

import { VendorAccountsApi } from "@/apis/purchases/vendoraccounts/VendorAccountsApi";

const vendorAccountsApi = new VendorAccountsApi()

export class VendorAccountsFunction {

    async readVendorAccountsSSR() {
        return await vendorAccountsApi?.readVendorAccountsSSR()
    }

    async readVendorAccounts() {
        return await vendorAccountsApi?.readVendorAccounts()
    }
}