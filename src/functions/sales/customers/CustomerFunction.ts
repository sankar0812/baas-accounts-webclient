/**
* CreatedBy     : Pradeepa S
* Createddate   : Oct 4 2023
* ModifiedBy    : Muthumariappan
* ModifiedDate  : Oct 25 2023
* Decription    : This is the function file for vendor Lists
 */
import { CustomersApi } from "@/apis/sales/customer/CustomerAPI"
import { InvoicesApi } from "@/apis/sales/invoices/InvoicesAPI";

const customersApi = new CustomersApi()
const invoiceApi = new InvoicesApi()


export class CustomerFunction {

    async readCustomersSSR() {
        let request = {
            "filter": {
                "IsDeleted": false
            },
            "fields": {
                "CustomerID": true,
                "CustomerName": true,
                "CustomerCode": true,
                "Address1": true,
                "Address2": true,
                "State": true,
                "Country": true,
                "City": true,
                "PostalCode": true,
                "CreatedBy": true,
                "CreatedDate": true,
                "CreatedAuthID": true,
                "ModifiedDate": true,
                "ModifiedBy": true
            },
            "page": 0,
            "limit": 10,
            "sort": { "CreatedDate": 'desc' }
        }
        return await customersApi?.readCustomersSSR(request)
    }

    async readCustomersByIDSSR(customerID: number) {
        let request = {
            "filter": {
                "CustomerID": customerID,
                "IsDeleted": false
            },
            "fields": {
                "CustomerID": true,
                "CustomerName": true,
                "CustomerCode": true,
                "Address1": true,
                "Address2": true,
                "State": true,
                "Country": true,
                "City": true,
                "PostalCode": true,
                "CreatedBy": true,
                "CreatedDate": true,
                "CreatedAuthID": true,
                "ModifiedDate": true,
                "ModifiedBy": true
            },
            "page": 0,
            "limit": 10,
            "sort": { "CreatedDate": 'desc' }
        }
        return await customersApi?.readCustomersSSR(request)
    }

    async readCustomerByIDSSR(customerID: number) {
        let request = {
            "filter": {
                "CustomerID": customerID,
                "IsDeleted": false
            },
            "fields": {},
            "page": 0,
            "limit": 10,
            "sort": { "CreatedDate": 'desc' }
        }
        return await customersApi?.readCustomersSSR(request)
    }

    async readCustomerWithAccountsSSR() {
        let request = {
            "filter": {
                "IsDeleted": false
            },
            "fields": {
                "CustomerID": true,
                "CustomerName": true,
                "MerchantID": true,
                "TenantID": true,
                "CustomerCode": true,
                "Address1": true,
                "City": true,
                "State": true,
                "PostalCode": true,
                "Country": true,
                "CustomerAccount": {
                    "select": {
                        "CustomerID": true,
                        "CustomerAccountID": true,
                        "DisplayName": true,
                        "AccountNumber": true,
                        "OpenedDate": true,
                        "AccountCode": true
                    },
                    "where": {
                        "IsDeleted": false
                    }
                }
            },
            "page": 0,
            "limit": 10,
            "sort": {}
        }
        return await customersApi?.readCustomersSSR(request)
    }

    async readCustomerAccountsWithCustomerIDSSR(customerid: any) {
        let request = {
            "filter": {
                "CustomerID": customerid,
                "IsDeleted": false
            },
            "fields": {},
            "page": 0,
            "limit": 10,
            "sort": {}
        }
        return await customersApi?.readCustomerAccountssSSR(request)
    }

    async readPriceListsWithCustomerAccountIDSSR(customeraccountid: any) {
        let request = {
            "filter": {
                "CustomerAccountID": customeraccountid,
                "IsDeleted": false
            },
            "fields": {
                "PriceList": {
                    "select": {
                        "PriceListID": true,
                        "MerchantID": true,
                        "TenantID": true,
                        "PriceListStatusID": true,
                        "StartDate": true,
                        "EndDate": true,
                        "DisplayName": true,
                        "PriceListCode": true,
                        "IsActive": true,
                        "ActiveDate": true,
                        "InactiveDate": true,
                        "Remarks": true,
                        "CreatedAuthID": true,
                        "CreatedBy": true,
                        "CreatedDate": true,
                        "ModifiedAuthID": true,
                        "ModifiedBy": true,
                        "ModifiedDate": true,
                        "IsDeleted": true,
                        "PriceListStatus": {
                            "select": {
                                "PriceListStatusID": true,
                                "PriceListStatus": true,
                                "PriceListStatusCode": true
                            }
                        }
                    }
                }
            },
            "page": 0,
            "limit": 10,
            "sort": {}
        }
        return await customersApi?.readPriceListsWithCustomerAccountIDSSR(request)
    }

    async readPriceListsWithCustomerAccountID(customeraccountid: any) {
        let request = {
            "filter": {
                "CustomerAccountID": customeraccountid,
                "IsDeleted": false
            },
            "fields": {
                "PriceList": {
                    "select": {
                        "PriceListID": true,
                        "MerchantID": true,
                        "TenantID": true,
                        "PriceListStatusID": true,
                        "StartDate": true,
                        "EndDate": true,
                        "DisplayName": true,
                        "PriceListCode": true,
                        "IsActive": true,
                        "ActiveDate": true,
                        "InactiveDate": true,
                        "Remarks": true,
                        "CreatedAuthID": true,
                        "CreatedBy": true,
                        "CreatedDate": true,
                        "ModifiedAuthID": true,
                        "ModifiedBy": true,
                        "ModifiedDate": true,
                        "IsDeleted": true,
                        "PriceListStatus": {
                            "select": {
                                "PriceListStatusID": true,
                                "PriceListStatus": true,
                                "PriceListStatusCode": true
                            }
                        }
                    }
                }
            },
            "page": 0,
            "limit": 10,
            "sort": {}
        }
        return await customersApi?.readPriceListsWithCustomerAccountID(request)
    }

    async readCustomers(sortreq: any, SearchReq: any, pageno: number) {
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
                "CustomerID": true,
                "CustomerName": true,
                "CustomerCode": true,
                "Address1": true,
                "Address2": true,
                "State": true,
                "Country": true,
                "City": true,
                "PostalCode": true,
                "CreatedBy": true,
                "CreatedDate": true,
                "CreatedAuthID": true,
                "ModifiedDate": true,
                "ModifiedBy": true
            },
            "page": pageno,
            "limit": 10,
            "sort": sortreq
        }
        return await customersApi?.readCustomers(request)
    }

    async readCustomersSSRCount() {
        let request = {
            "filter": {
                "IsDeleted": false
            }
        }
        return await customersApi?.readCustomersSSRCount(request)
    }


    async readCustomersCount(CountReq: any) {
        let request = {
            "filter": {
                "OR": [
                    {
                        "CustomerName": {
                            "contains": CountReq,
                            "mode": 'insensitive'
                        }
                    }
                ],
            }
        }
        return await customersApi?.readCustomersCount(request)
    }



    async readCustomersContactSSR(customerID: number) {
        let request = {
            "filter": {
                "IsDeleted": false,
                "CustomerID": customerID,
            },
            "fields": {
                "CustomerContactID": true,
                "FullName": true,
                "Email": true,
                "Phone": true,
                "Mobile": true,
                "Title": true,
                "CreatedBy": true,
                "CreatedDate": true,
                "CreatedAuthID": true,
                "ModifiedBy": true,
                "ModifiedDate": true,
                "ModifiedAuthID": true,
            },
            "page": 0,
            "limit": 100,
            "sort": { "CreatedDate": 'desc' }
        }
        return await customersApi?.readCustomersContactSSR(request)
    }


    async readCustomersContact(customerID: number) {
        let request = {
            "filter": {
                "IsDeleted": false,
                "CustomerID": customerID,
            },
            "fields": {
                "CustomerContactID": true,
                "FullName": true,
                "Email": true,
                "Phone": true,
                "Mobile": true,
                "Title": true,
                "CreatedBy": true,
                "CreatedDate": true,
                "CreatedAuthID": true,
                "ModifiedBy": true,
                "ModifiedDate": true,
                "ModifiedAuthID": true,
            },
            "page": 0,
            "limit": 100,
            "sort": { "CreatedDate": 'desc' }
        }
        return await customersApi?.readCustomersContact(request)
    }
    async readInvoicesSSR(customerid: any) {
        let request = {
            "filter": {
                "IsDeleted": false,
                "CustomerID": customerid
            },
            "fields": {
            },
            "page": 0,
            "limit": 1000,
            "sort": { "CreatedDate": 'asc' }
        }
        return await invoiceApi?.readInvoicesSSR(request)
    }



    async readInvoices(customerid: any,) {
        let request = {
            "filter": {
                "IsDeleted": false,
                "CustomerID": customerid
            },
            "fields": {
            },
            "page": 0,
            "limit": 1000,
            "sort": { "CreatedDate": 'asc' }
        }
        return await invoiceApi?.readInvoices(request)

    }


}



















