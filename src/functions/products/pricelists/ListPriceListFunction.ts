/**
 * CreatedBy    : Vinoth
 * Createddate  : Nov 08 2023
 * Decription   : This is the function file for Products Price Lists
 */
import { ListPriceListApi } from "../../../apis/products/pricelists/ListPriceListAPI";

const ListpriceListApi = new ListPriceListApi()
export class ProductPriceListFunction {
    async readsPriceListSSR() {
        let request = {
            "filter": {
                "IsDeleted": false
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
                    },
                    "where": {
                        "IsDeleted": false
                    }
                },
                "PriceListStatusID": true,
                "PriceListStatus": {
                    "select": {
                        "PriceListStatus": true,
                        "PriceListStatusCode": true
                    }
                }
            },
            "page": 0,
            "limit": 1000,
            "sort": { "CreatedDate": "desc" }
        }
        return await ListpriceListApi?.readPriceListsSSR(request)
    }
    async readsPriceListIDSSR(PriceListID: number) {
        let request = {
            "filter": {
                "IsDeleted": false,
                "PriceListID": PriceListID,
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
                "ModifiedBy": true,
                "PriceListItem": {
                    "select": {
                        "PriceListItemID": true,
                        "ProductID": true,
                        "Product": {
                            "select": {
                                "ProductName": true,
                                "ProductCode": true,
                                "ProductID": true,
                                "BaseSaleRate": true,
                            }
                        },
                        "Rate": true,
                        "Remarks": true
                    },
                    "where": {
                        "IsDeleted": false
                    }
                },
                "PriceListStatusID": true,
                "PriceListStatus": {
                    "select": {
                        "PriceListStatus": true,
                        "PriceListStatusCode": true
                    }
                }
            },
            "page": 0,
            "limit": 1000,
            "sort": { "CreatedDate": "desc" }
        }
        return await ListpriceListApi?.readPriceListsSSR(request)
    }
    async readPriceLists(sortreq: any, SearchReq: any, pageno: number) {
        let request = {
            "filter": {
                "OR": [{
                    "DisplayName": {
                        "contains": SearchReq,
                        "mode": 'insensitive'
                    }
                }],
                "IsDeleted": false
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
                    },
                    "where": {
                        "IsDeleted": false
                    }
                },
                "PriceListStatus": {
                    "select": {
                        "PriceListStatus": true,
                        "PriceListStatusCode": true
                    }
                }
            },
            "page": pageno,
            "limit": 100,
            "sort": sortreq
        }
        return await ListpriceListApi?.readPriceLists(request)
    }
    async readPriceListsSSRCount(PriceListID: any) {
        let request = {
            "filter": {
                "PriceListID": PriceListID,
                "IsDeleted": false
            }
        }
        return await ListpriceListApi?.readPriceListsSSRCount(request)
    }

    async readPriceListCount(CountReq: any) {

        let request = {
            "filter": {
                "OR": [
                    {
                        "DisplayName": {
                            "contains": CountReq,
                            "mode": 'insensitive'
                        }
                    },
                    {
                        "PriceListCode": {
                            "contains": CountReq,
                            "mode": 'insensitive'
                        }
                    }
                ],
            }
        }


        return await ListpriceListApi?.readPriceListCount(request)
    }
    async readPriceListStatussSSR() {
        let request = {
            "filter": {
                "IsDeleted": false
            },
            "fields": {
                "PriceListStatusID": true,
                "PriceListStatus": true,
                "PriceListStatusCode": true
            },
            "page": 0,
            "limit": 1000,
            "sort": { "CreatedDate": "asc" }
        }
        return await ListpriceListApi?.readPriceListStatussSSR(request)
    }

    async readPriceListStatusCode(status: any) {
        let request = {
            "filter": {
                "PriceListStatusCode": status,
                "IsDeleted": false
            },
            "fields": {
                "PriceListStatusID": true,
                "PriceListStatus": true,
                "PriceListStatusCode": true
            },
            "page": 0,
            "limit": 1000,
            "sort": { "CreatedDate": "asc" }
        }
        return await ListpriceListApi?.readPriceListStatus(request)
    }

    async readPriceListIteamsSSR(PriceListID: number) {
        let request = {
            "filter": {
                "PriceListID": PriceListID,
                "IsDeleted": false
            },
            "fields": {
                "PriceListItemID": true,
                "PriceList": {
                    "select": {
                        "PriceListID": true,
                        "StartDate": true,
                        "EndDate": true,
                        "DisplayName": true,
                        "PriceListCode": true,
                        "Remarks": true,
                        "PriceListStatusID": true
                    }
                },
                "Product": {
                    "select": {
                        "ProductID": true,
                        "ProductName": true,
                        "ProductCode": true,
                        "BaseSaleRate": true
                    }
                },
                "PriceListItemBulkDiscount": {
                    "select": {
                        "RangeMin": true,
                        "RangeMax": true,
                        "DiscountPeriod": true,
                        "DiscountType": true,
                        "DiscountRate": true
                    }
                }
            },
            "page": 0,
            "limit": 1000,
            "sort": { "CreatedDate": 'asc' }
        }
        return await ListpriceListApi?.readPriceListIteamsSSR(request)
    }
    async readPriceListIteams(PriceListID: number) {
        let request = {
            "filter": {
                "PriceListID": PriceListID,
                "IsDeleted": false
            },
            "fields": {
                "PriceListItemID": true,
                "PriceList": {
                    "select": {
                        "PriceListID": true,
                        "StartDate": true,
                        "EndDate": true,
                        "DisplayName": true,
                        "PriceListCode": true,
                        "Remarks": true,
                        "PriceListStatusID": true
                    }
                },
                "Product": {
                    "select": {
                        "ProductID": true,
                        "ProductName": true,
                        "ProductCode": true,
                        "BaseSaleRate": true
                    }
                },
                "PriceListItemBulkDiscount": {
                    "select": {
                        "RangeMin": true,
                        "RangeMax": true,
                        "DiscountPeriod": true,
                        "DiscountType": true,
                        "DiscountRate": true
                    }
                }
            },
            "page": 0,
            "limit": 1000,
            "sort": { "CreatedDate": 'asc' }
        }
        return await ListpriceListApi?.readPriceListIteams(request)
    }
    async AddProductPriceList(createReq: any) {
        return await ListpriceListApi?.AddproductPriceList(createReq)

    }
    async addPriceList(pricelistreq: any) {
        return await ListpriceListApi?.addProductPriceListFunction(pricelistreq)
    }
    async RemoveProductPriceList(deleteReq: any) {
        return await ListpriceListApi?.updateProductPriceList(deleteReq)
    }
    async removeProductPriceList(deleteReq: any) {
        return await ListpriceListApi?.removeProductPriceList(deleteReq)
    }
    async EditChangePriceList(EditReq: any) {
        return await ListpriceListApi?.updateEditPriceList(EditReq)
    }
    async statusChangePriceList(EditReq: any) {
        return await ListpriceListApi?.statusChangePriceList(EditReq)
    }
    async readPriceListForStoreEdit() {
        let request = {
            "filter": {
                "PriceListStatusID": 2,
                "IsDeleted": false
            },
            "fields": {
            },
            "page": 0,
            "limit": 10,
            "sort": { "CreatedDate": "desc" }
        }
        return await ListpriceListApi?.readPriceListsSSR(request)
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
        return await ListpriceListApi?.readPriceListsSSR(request)
    }

}
