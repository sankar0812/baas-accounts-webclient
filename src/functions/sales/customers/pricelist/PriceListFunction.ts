/**
 * CreatedBy    : Sreedhar A
 * Createddate  : Oct 12 2023
 * ModifiedBy   : Uma Kohila
 * ModifiedTime : Oct 24 2023
 * Decription   : This is the function file for Price Lists
 */
import { PriceListApi } from "@/apis/sales/customer/pricelist/PriceListAPI";

const priceListApi = new PriceListApi()

export class PriceListFunction {
    async readPriceListSSR(CustomerID: number) {
        let request = {
            "filter": {
                "CustomerID": CustomerID,
                "IsDeleted": false
            },
            "fields": {
                "PriceListID": true,
                "DisplayName": true,
                "StartDate": true,
                "EndDate": true,
                "ActiveDate": true,
                "InactiveDate": true,
                "IsActive": true,
                "CreatedBy": true,
                "CreatedDate": true,
                "CreatedAuthID": true,

                "ModifiedBy": true,
                "PriceListItem": {
                    "select": {
                        "ProductID": true,
                        "Product": {
                            "select": {
                                "ProductName": true,
                                "ProductCode": true
                            }
                        },
                        "Rate": true,
                        "Remarks": true
                    }
                }
            },
            "page": 0,
            "limit": 10,
            "sort": { "CreatedDate": "desc" }
        }
        return await priceListApi?.readPriceListsSSR(request)
    }

    async readPriceListsforCreateSSR(PriceListStatusID: number) {
        let request = {
            "filter": {
                "PriceListStatusID": PriceListStatusID,
                "IsDeleted": false
            },
            "fields": {},
            "page": 0,
            "limit": 10,
            "sort": { "CreatedDate": "desc" }
        }
        return await priceListApi?.readPriceListsSSR(request)
    }

    async readPriceListByIDSSR(CustomerID: number, priceListID: number) {
        let request = {
            "filter": {
                "CustomerID": CustomerID,
                "PriceListID": priceListID,
                "IsDeleted": false
            },
            "fields": {
                "PriceListID": true,
                "DisplayName": true,
                "StartDate": true,
                "EndDate": true,
                "ActiveDate": true,
                "InactiveDate": true,
                "IsActive": true,
                "CreatedBy": true,
                "CreatedDate": true,
                "CreatedAuthID": true,
                "ModifiedDate": true,
                "ModifiedBy": true,
                "PriceListItem": {
                    "select": {
                        "ProductID": true,
                        "Product": {
                            "select": {
                                "ProductName": true,
                                "ProductCode": true
                            }
                        },
                        "Rate": true,
                        "Remarks": true
                    }
                }
            },
            "page": 0,
            "limit": 10,
            "sort": { "CreatedDate": "desc" }
        }
        return await priceListApi?.readPriceListsSSR(request)
    }

    async createPriceList(createReq: any) {
        return await priceListApi?.addPriceListFunction(createReq)
    }

    async readPriceListStatusSSR(PriceListStatusCode: any) {
        let request = {
            "filter": {
                "PriceListStatusCode": PriceListStatusCode,
                "IsDeleted": false
            },
            "fields": {},
            "page": 0,
            "limit": 10,
            "sort": { "CreatedDate": "desc" }
        }
        return await priceListApi?.readPriceListStatusListsSSR(request)
    }

    async createPriceListwithCustomerAccountID(request: any) {
        return await priceListApi?.addPriceListwithCustomerAccountID(request)
    }
}