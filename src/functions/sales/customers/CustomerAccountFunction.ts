/**
 * CreatedBy : HariPrakash
 * Createddate : Oct 12 2023
 * Decription : This is the function file for Account Lists
 */
import { CustomersAccountApi } from "@/apis/sales/customer/CustomerAccountList/CustomerAccountList"
import { Constants } from "@/utils/Constants"
import { Helper } from "@/utils/Helper"

const customersAccountApi = new CustomersAccountApi
const constants = new Constants()
const helper = new Helper()
const AuthID = JSON.parse(helper?.getCookie(constants?.AUTH_INFO_COOKIE_NAME))?.AuthID
const AuthName = JSON.parse(helper?.getCookie(constants?.AUTH_INFO_COOKIE_NAME))?.ContactPerson?.ContactPersonName
const MerchantID = JSON.parse(helper?.getCookie(constants?.MERCHANT_INFO_COOKIE_NAME))?.MerchantID
const TenantID = JSON.parse(helper?.getCookie(constants?.TENANT_INFO_COOKIE_NAME))?.TenantID
export class CustomerAccountListFunction {
    async readCustomersAccountListSSR(customerID: number) {
        let request = {
            "filter": {
                "CustomerID": customerID,
                "IsDeleted": false
            },
            "fields": {
                "CustomerAccountID": true,
                "AccountNumber": true,
                "AccountCode": true,
                "DisplayName": true,
                "Currency": {
                    "select": {
                        "CurrencyID": true,
                        "CurrencyCode": true,
                        "CurrencySymbol": true
                    }
                },

                "CustomerID": true,
                "AccountBalance": true,
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
                        "AccountBalance": true
                    }
                },
                "Customer": {
                    "select": {
                        "CustomerID": true,
                        "CustomerName": true
                    }
                }
            },
            "page": 0,
            "limit": 100,
            "sort": { "CreatedDate": 'desc' }
        }
        return await customersAccountApi?.readCustomersAccountListSSR(request)
    }
    async readCustomersAccountList(customerID: number) {
        let request = {
            "filter": {
                "CustomerID": customerID,
                "IsDeleted": false
            },
            "fields": {
                "CustomerAccountID": true,
                "AccountNumber": true,
                "AccountCode": true,
                "DisplayName": true,
                "Currency": {
                    "select": {
                        "CurrencyID": true,
                        "CurrencyCode": true,
                        "CurrencySymbol": true
                    }
                },

                "CustomerID": true,
                "AccountBalance": true,
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
            "page": 0,
            "limit": 100,
            "sort": { "CreatedDate": "desc" }
        }
        return await customersAccountApi?.readCustomersAccountList(request)
    }
    async CreateAccount(accountsRey: any,) {
        let request = {
            UserInfo: {
                "MerchantID": MerchantID,
                "TenantID": TenantID,
                "CustomerID": parseInt(accountsRey?.CustomerID),
                "CurrencyID": accountsRey?.CurrencyID,
                "CreatedAuthID": AuthID,
                "CreatedBy": AuthName
            },
            CustomerAccountInfo: {
                "AccountNumber": accountsRey?.AccountNumber,
                "AccountCode": accountsRey?.AccountCode,
                "DisplayName": accountsRey?.DisplayName,
                "CurrencyCode": accountsRey?.CurrencyCode,
                "CurrencySymbol": accountsRey?.CurrencySymbol,
                "OpenedDate": new Date(accountsRey?.OpenedDate).toISOString(),
                "Username": accountsRey?.Username,
                "Password": accountsRey?.Password,
                "AutoReplenishAmount": parseFloat(accountsRey?.AutoReplenishAmount),
                "AppSettingNetTermID": parseFloat(accountsRey?.AppSettingNetTermID),
                "LowBalanceThreshold": parseFloat(accountsRey?.LowBalanceThreshold),
                "CreatedAuthID": AuthID,
                "CreatedBy": AuthName
            }
        }
        return await customersAccountApi?.createAccounts(request)
    }
} 