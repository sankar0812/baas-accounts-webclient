/**
 * CreatedBy : Pradeepa S
 * Createddate : Oct 4 2023
 * Decription : This is the function file for vendor Lists
 */
import { VendorsApi } from "@/apis/purchases/vendor/VendorAPI"

const vendorAPI = new VendorsApi


export class VendorFunction {

    async readVendorsSSR() {
        let request = {
            "filter": {
                "IsDeleted": false
            },
            "fields": {
                "VendorID": true,
                "MerchantID": true,
                "TenantID": true,
                "CurrencyID": true,
                "VendorCode": true,
                "VendorName": true,
                "Address1": true,
                "Address2": true,
                "City": true,
                "State": true,
                "PostalCode": true,
                "Country": true,
                "Phone": true,
                "Email": true,
                "Website": true,
                "CreatedAuthID": true,
                "CreatedBy": true,
                "VendorAccount": {
                    "select": {
                        "DisplayName": true
                    }
                }
            },
            "page": 0,
            "limit": 10,
            "sort": { "CreatedDate": 'asc' }
        }
        return await vendorAPI?.readVendorsSSR(request)
    }
    async readVendors(sortreq: any, SearchReq: any, pageno: number) {
        let request = {
            "filter": {
                "OR": [
                    {
                        "VendorName": {
                            "contains": SearchReq,
                            "mode": 'insensitive'
                        }
                    },
                    {
                        "VendorCode": {
                            "contains": SearchReq,
                            "mode": 'insensitive'
                        }
                    }
                ],
                "IsDeleted": false
            },
            "fields": {
                "VendorID": true,
                "MerchantID": true,
                "TenantID": true,
                "CurrencyID": true,
                "VendorCode": true,
                "VendorName": true,
                "Address1": true,
                "Address2": true,
                "City": true,
                "State": true,
                "PostalCode": true,
                "Country": true,
                "Phone": true,
                "Email": true,
                "Website": true,
                "CreatedAuthID": true,
                "CreatedBy": true,
                "VendorAccount": {
                    "select": {
                        "DisplayName": true
                    }
                }
            },
            "page": pageno,
            "limit": 10,
            "sort": sortreq
        }
        return await vendorAPI?.readVendors(request)
    }

    async readVendorsSSRCount() {
        let request = {
            "filter": {
                "IsDeleted": false
            }
        }
        return await vendorAPI?.readVendorsSSRCount(request)
    }

    async readVendorsCount(CountReq: any) {
        let request = {
            "filter": {
                "OR": [
                    {
                        "VendorName": {
                            "contains": CountReq,
                            "mode": 'insensitive'
                        }
                    },
                    {
                        "VendorCode": {
                            "contains": CountReq,
                            "mode": 'insensitive'
                        }
                    }
                ],
            }
        }
        return await vendorAPI?.readVendorsCount(request)
    }
}