/**
 * CreatedBy : HariPrakash
 * Createddate : Oct 12 2023
 * Decription : This is the function file for Customer Accounts CardInfo
 */
import { CustomerAccountCardInfoApi } from "@/apis/sales/customer/CustomerAccountList/CustomerAccountCardInfo"

const customerAccountCardInfoApi = new CustomerAccountCardInfoApi


export class ViewAccountDetailsFunction {

    async readViewAccountSSR(customerID: number) {

        let request = {
            "filter": {
                "CustomerAccountID": customerID,
                "IsDeleted": false
            },
            "fields": {
                "AccountNumber": true,
                "AccountCode": true,
                "Currency": {
                    "select": {
                        "CurrencyID": true,
                        "CurrencyCode": true,
                        "CurrencySymbol":true
                    }
                },

                "CustomerID": true,
                "OpenedDate": true,
                "Username": true,
                "Password": true,
                "CreatedBy": true,
                "CreatedDate": true,
                "CreatedAuthID": true,
                "ModifiedDate": true,
                "ModifiedBy": true,
                "AutoReplenishAmount":true,
                "LowBalanceThreshold":true,
                "CustomerAccountBalance": {
                    "select": {
                        "AccountBalance": true
                    }
                },
                "Customer": {
                    "select": {
                        "CustomerID": true,
                        "CustomerName": true,
                        "CustomerCode": true
                    }
                }
            },
            "page": 0,
            "limit": 10,
            "sort": { "CreatedDate": 'desc' }
        }
                return await customerAccountCardInfoApi?.readCustomerAccountCardInfoSSR(request)
            }
    async readViewAccount(sortreq: any, SearchReq: any, pageno: number) {
        let request = {
            "filter": {
                "OR": [
                    {
                        "CustomerName": {
                            "contains": SearchReq,
                            "mode": 'insensitive'
                        }
                    }
                ],
                "IsDeleted": false
            },
            "fields": {
                "AccountNumber": true,
                "AccountCode": true,
                "Currency": {
                    "select": {
                        "CurrencyID": true,
                        "CurrencyCode": true,
                        "CustomerCode": true
                    }
                },

                "CustomerID": true,
                "OpenedDate": true,
                "Username": true,
                "Password": true,
                "CreatedBy": true,
                "CreatedDate": true,
                "CreatedAuthID": true,
                "ModifiedDate": true,
                "ModifiedBy": true,
                "CustomerAccountBalance": {
                    "select": {
                        "AccountBalance": true,
                        "Currency": true
                    }
                },
                "Customer": {
                    "select": {
                        "CustomerID": true,
                        "CustomerName": true
                    }
                }
            },
            "page": pageno,
            "limit": 10,
            "sort": sortreq
        }
       return await customerAccountCardInfoApi?.readCustomerAccountCardInfo(request)
    }
}