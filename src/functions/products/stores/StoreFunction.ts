/**
@CreatedBy        : HariPrakash
@CreatedTime      : Nov 14 2023
@ModifiedBy       : Venugopal
@ModifiedDate     : Nov 16 2023
@Description      : This file contains Function for Stores
**/


import { ListPriceListApi } from "@/apis/products/pricelists/ListPriceListAPI";
import { ListStoreApi } from "@/apis/products/stores/storeApi";

const listStoreApi = new ListStoreApi()
const priceListAPi = new ListPriceListApi()

export class StoreFunction {

    async readListStoreSSR() {
        let request = {
            "filter": {
                "IsDeleted": false,
            },
            "fields": {
                "StoreID": true,
                "StoreTypeID": true,
                "StoreName": true,
                "StoreCode": true,
                "IsEnabled": true,
                "Description": true,
                "StartDate": true,
                "CreatedBy": true,
                "CreatedDate": true,
                "ModifiedBy": true,
                "ModifiedDate": true,
                "EndDate": true,
                "StoreType": {
                    "select": {
                        "StoreTypeName": true,
                        "StoreTypeCode": true
                    }
                }
            },
            "page": 0,
            "limit": 1000,
            "sort": { "CreatedDate": 'desc' }
        }
        return await listStoreApi?.readListStoreSSR(request)
    }
    async readListStoreByIDSSR(storeID: number) {
        let request = {
            "filter": {
                "IsDeleted": false,
                "StoreID": storeID,
            },
            "fields": {
                "StoreID": true,
                "MerchantID": true,
                "StoreTypeID": true,
                "TenantID": true,
                "StoreName": true,
                "StoreCode": true,
                "IsEnabled": true,
                "Description": true,
                "StartDate": true,
                "EndDate": true,
                "CreatedAuthID": true,
                "CreatedBy": true,
                "CreatedDate": true,
                "ModifiedAuthID": true,
                "ModifiedBy": true,
                "ModifiedDate": true,
                "IsDeleted": true,
                "StoreType": {
                    "select": {
                        "StoreTypeName": true,
                        "StoreTypeCode": true,
                    }
                }
            },
            "page": 0,
            "limit": 10,
            "sort": { "CreatedDate": 'asc' }
        }
        return await listStoreApi?.readListStoreSSR(request)
    }
    async readListStore(sortreq: any, SearchReq: any, pageno: number) {

        let request = {
            "filter": {
                "OR": [
                    {
                        "StoreName": {
                            "contains": SearchReq,
                            "mode": 'insensitive'
                        }
                    }
                ],
                "IsDeleted": false
            },
            "fields": {
                "StoreID": true,
                "MerchantID": true,
                "TenantID": true,
                "StoreName": true,
                "StoreCode": true,
                "IsEnabled": true,
                "Description": true,
                "StartDate": true,
                "EndDate": true,
                "CreatedAuthID": true,
                "CreatedBy": true,
                "CreatedDate": true,
                "ModifiedAuthID": true,
                "ModifiedBy": true,
                "ModifiedDate": true,
                "IsDeleted": true,
                "StoreType": {
                    "select": {
                        "StoreTypeName": true,
                        "StoreTypeCode": true
                    }
                }
            },
            "page": pageno,
            "limit": 1000,
            "sort": sortreq
        }
        return await listStoreApi?.readListStore(request)
    }


    async readStoreTypesSSR() {
        let request = {
            "filter": {
                "IsDeleted": false
            },
            "fields": {},
            "page": 0,
            "limit": 10,
            "sort": {}
        }
        return await listStoreApi?.readStoreTypeSSR(request)
    }

    async readStoresSSRCount() {
        let request = {
            "filter": {
                "IsDeleted": false
            }
        }
        return await listStoreApi?.readStoresSSRCount(request)
    }

    async readStoresCount(CountReq: any) {
        let request = {
            "filter": {
                "OR": [
                    {
                        "StoreName": {
                            "contains": CountReq,
                            "mode": 'insensitive'
                        }
                    },
                ],
            }
        }
        return await listStoreApi?.readStoresCount(request)
    }
    async readStorePriceListSSR(storeID: number) {

        let request = {
            "filter": {
                "IsDeleted": false,
                "StoreID": storeID
            },
            "fields": {
                "PriceListID": true,
            },
            "page": 0,
            "limit": 1000,
            "sort": {}
        }
        return await listStoreApi?.readStorePriceListSSSR(request)
    }
    async readStorePriceList() {

        let request = {
            "filter": {

            },
            "fields": {
                "DisplayName": true,
            },
            "page": 0,
            "limit": 1000,
            "sort": {}
        }
        return await listStoreApi?.readStorePriceLists(request)
    }
    async readPriclistStoreEdit(storeID: number) {
        let request = {
            "filter": {
                "IsDeleted": false,
                "StoreID": storeID
            },
            "fields": {},
            "page": 0,
            "limit": 1000,
            "sort": {}
        }
        return await listStoreApi?.readStorePriceLists(request)
    }

    async updateStore(request: any) {
        return await listStoreApi?.updateStore(request)
    }

    async addStore(productReq: any) {
        return await listStoreApi?.addStore(productReq)
    }

    async addPriceListToTheStore(productReq: any) {
        return await listStoreApi?.addPriceListToTheStore(productReq)
    }

    async readsPriceListByIDSSR(PriceListIDs: Array<any>) {
        let request = {
            "filter": {
                "PriceListID": {
                    "in": PriceListIDs
                }
            },
            "fields": {
                "PriceListID": true,
                "DisplayName": true,
                "StartDate": true,
                "EndDate": true,
                "ActiveDate": true,
                "PriceListCode": true,
                "InactiveDate": true,
                "IsActive": true,
                "CreatedBy": true,
                "CreatedDate": true,
                "CreatedAuthID": true,
                "ModifiedBy": true

            },
            "page": 0,
            "limit": 1000,
            "sort": { "CreatedDate": "desc" }
        }
        return await priceListAPi?.readPriceLists(request)
    }
}





