
/**
* CreatedBy    : Sreedhar A
* CreatedDate  : Oct 04 2023
* ModifiedBy   : Muthumariappan G
* ModifiedDate : Oct 09 2023
* Description  : This is the function file for bank Lists 
*/


import { BankApi } from "@/apis/bank/bank";

const bankApi = new BankApi
export class BankFunction {
    async readBanksSSR() {
        let request = {
            "filter": {
                "IsDeleted": false,
            },
            "fields": {
                "MerchantID": true,
                "TenantID": true,
                "BankName": true,
                "BankShortName": true,
                "Address1": true,
                "Address2": true,
                "City": true,
                "State": true,
                "Country": true,
                "Postal": true,
                "Phone": true,
                "Email": true,
                // "Currency": {
                //     "select": {
                //         "CurrencyID": true,
                //         "CurrencyCode": true
                //     }
                // },
                "CurrencyID": true,
                "CreatedAuthID": true,
                "CreatedBy": true,
                "CreatedDate": true,
                "ModifiedAuthID": true,
                "ModifiedBy": true,
                "ModifiedDate": true,
                "IsDeleted": true,
                "DeletedAuthID": true,
                "DeletedBy": true,
                "DeletedDate": true,
                "BankAccount": 0
            },
            "page": 0,
            "limit": 10,
            "sort": { "CreatedDate": "desc" },
        }
        return await bankApi?.readBanksSSR(request);
    }

    async readBanks(sortreq: any, SearchReq: any, pageno: number) {
        let request = {
            "filter": {
                "OR": [
                    {
                        "BankName": {
                            "contains": SearchReq,
                            "mode": 'insensitive'
                        }
                    },
                    {
                        "BankShortName": {
                            "contains": SearchReq,
                            "mode": 'insensitive'
                        }
                    }
                ],
                "IsDeleted": false
            },
            "fields": {
                "MerchantID": true,
                "TenantID": true,
                "BankName": true,
                "BankShortName": true,
                "Address1": true,
                "Address2": true,
                "City": true,
                "State": true,
                "Country": true,
                "Postal": true,
                "Phone": true,
                "Email": true,
                // "Currency": {
                //     "select": {
                //         "CurrencyID": true,
                //         "CurrencyCode": true
                //     }
                // },
                "CurrencyID": true,
                "CreatedAuthID": true,
                "CreatedBy": true,
                "CreatedDate": true,
                "ModifiedAuthID": true,
                "ModifiedBy": true,
                "ModifiedDate": true,
                "IsDeleted": true,
                "DeletedAuthID": true,
                "DeletedBy": true,
                "DeletedDate": true,
                "BankAccount": 0
            },
            "page": pageno,
            "limit": 10,
            "sort": sortreq,
        }
        return await bankApi?.readBanks(request);
    }


    async readBanksSSRCount() {
        let request = {
            "filter": {
                "IsDeleted": false
            }
        }
        return await bankApi?.readBanksSSRCount(request)
    }

    async readBanksCount(CountReq: any) {
        let request = {
            "filter": {
                "OR": [
                    {
                        "BankName": {
                            "contains": CountReq,
                            "mode": 'insensitive'
                        }
                    },
                    {
                        "BankShortName": {
                            "contains": CountReq,
                            "mode": 'insensitive'
                        }
                    }
                ],
            }
        }
        return await bankApi?.readBanksCount(request)
    }

    async readBankAccountsSSR() {
        let request = {
            "filter": {},
            "fields": {},
            "page": 0,
            "limit": 10,
            "sort": { "CreatedDate": "desc" }
        }
        return await bankApi?.readBankAccountSSR(request)
    }

}