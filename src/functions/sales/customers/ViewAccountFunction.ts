/**
@CreatedBy : HariPrakash
@Createddate : Oct 12 2023
@ModifiedBy   : Muthumariappan
@ModifiedDate : Oct 24 2023
@Decription : This is the function file for Account Lists
 */
import { ViewAccountDetailApi } from "@/apis/sales/customer/CustomerAccountList/ViewAccount"

const viewAccountDetailApi = new ViewAccountDetailApi


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
                                "CustomerCode": true,
                                "City": true,
                                "Address1": true,
                                "Address2": true,
                                "State": true,
                                "PostalCode": true,
                                "Country": true
                            }
                        },
                        
                    },
                    "page": 0,
                    "limit": 10,
                    "sort": { "CreatedDate": 'desc' }
                }
                return await viewAccountDetailApi?.readViewAccountSSR(request)
            }

            async readCustomerTransactionSSR(accountid:number,CustomerID:number) {

                let request = {
                    "filter": {
                        "CustomerAccountID":accountid,
                        "CustomerID":CustomerID,
                        "IsDeleted": false
                    },
                    "fields": {
                        "CustomerAccountTransactionID":true,
                        "CustomerAccountID":true,
                        "CustomerID":true,
                        "Amount":true,
                        "TransactionNumber":true,
                        "Currency": {
                            "select": {
                                "CurrencyID": true,
                                "CurrencyCode": true,
                                "CurrencySymbol":true
                            }
                        },  
                        "CustomerAccount": {
                            "select": {
                                "AccountNumber": true,
                                "AccountCode": true,
                                "DisplayName":true
                            }
                        }
                    },
                    "page": 0,
                    "limit": 10,
                    "sort": {"CreatedDate": 'desc'}
                }
                return await viewAccountDetailApi?.readCustomerTransactionSSR(request)
                
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
                        "CustomerID": true,
                        "CustomerName": true,
                        "CustomerCode": true,
                        "City": true,
                        "Address1": true,
                        "Address2": true,
                        "State": true,
                        "PostalCode": true,
                        "Country": true
                    }
                },
                // "CustomerAccountTransaction": {
                //     "select": {
                //         "CustomerID": true,
                //         "CustomerAccountID":true,
                //         "Amount":"5000"
                       
                     
                //     }
                // },
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
        return await viewAccountDetailApi?.readViewAccount(request)
    }


    async readViewAccountCardSSR(customerID: any) {
        let request = {
            "filter":{
                "IsDeleted": false,
                "CustomerAccountID": customerID,
            },
            "fields": {
               
            },
            "page": 0,
            "limit": 100,
            "sort": { "CreatedDate": 'desc' }
        }
        return await viewAccountDetailApi?.readViewAccountCardSSR(request)
    }



    async readViewAccountCard(customerID: any) {
        let request = {
            "filter":{
                "IsDeleted": false,
                "CustomerAccountID": customerID,               
            },
            "fields": {
               
            },
            "page": 0,
            "limit": 100,
            "sort": { "CreatedDate": 'desc' }
        }
        return await viewAccountDetailApi?.readViewAccountCard(request)
    }

}