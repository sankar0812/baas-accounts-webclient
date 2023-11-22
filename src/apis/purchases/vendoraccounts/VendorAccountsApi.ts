/**
@CreatedBy        : Muthumariappan G
@CreatedTime      : Oct 4 2023
@ModifiedBy       : Muthumariappan G
@ModifiedTime     : Oct 4 2023
@Description      : This file contains Api for accounts
**/

import vendorAccountsMockData from '@/mock/vendoraccounts.data.mock.json'

export class VendorAccountsApi {
    async readVendorAccounts() {
        return await vendorAccountsMockData
    }

    async readVendorAccountsSSR() {
        return await vendorAccountsMockData
    }
}