/**
 * CreatedBy : Nishanth
 * Createddate : Oct 4 2023
 * Decription : This is the function file for invoices Lists
 */
import { InvoicesApi } from "@/apis/sales/invoices/InvoicesAPI"

const invoicesAPI = new InvoicesApi


export class InvoicesFunction {

    async readInvoiceStstusSSR(status: any) {
        let req = {
            "filter": {
                "InvoiceStatus": status
            },
            "fields": {},
            "page": 0,
            "limit": 10,
            "sort": { "CreatedDate": 'asc' }
        }
        return await invoicesAPI?.readInvoiceStatusSSR(req)
    }

    //created by Pradeepa for invoice View
    async readInvoiceStatusSSR() {
        let req = {
            "filter": {
            },
            "fields": {},
            "page": 0,
            "limit": 10,
            "sort": { "CreatedDate": 'asc' }
        }
        return await invoicesAPI?.readInvoiceStatusSSR(req)
    }

    async readInvoicesSSR() {
        let request = {
            "filter": {
                "IsDeleted": false
            },
            "fields": {
                "InvoiceID": true,
                "MerchantID": true,
                "TenantID": true,
                "CurrencyID": true,
                "CustomerAccountID": true,
                "InvoiceNumber": true,
                "InvoiceDate": true,
                "InvoiceAmount": true,
                "BalanceDue": true,
                "Adjustment": true,
                "BackupCharges": true,
                "CreatedAuthID": true,
                "ModifiedAuthID": true,
                "DeletedAuthID": true,
                "CreatedBy": true,
                "CreatedDate": true,
                "ModifiedBy": true,
                "ModifiedDate": true,
                "InvoiceStatus": {
                    "select": {
                        "InvoiceStatusID": true,
                        "InvoiceStatus": true,
                        "InternalCode": true
                    }
                },
                "Currency": {
                    "select": {
                        "CurrencySymbol": true,
                        "CurrencyCode": true
                    }
                },
                "Customer": {
                    "select": {
                        "CustomerID": true,
                        "CustomerName": true
                    }
                },
                "CustomerAccount": {
                    "select": {
                        "DisplayName": true
                    }
                }
            },
            "page": 0,
            "limit": 10,
            "sort": { "CreatedDate": 'desc' }
        }
        return await invoicesAPI?.readInvoicesSSR(request)
    }


    async readInvoiceswithcustomeridSSR(customerid: any, invoiceStatusID: any) {
        let request = {
            "filter": {
                "CustomerID": parseInt(customerid),
                'InvoiceStatusID': parseInt(invoiceStatusID),
                "IsDeleted": false
            },
            "fields": {
            },
            "page": 0,
            "limit": 100,
            "sort": { "InvoiceID": "desc" }
        }
        return await invoicesAPI?.readInvoiceswithcustomeridSSR(request)
    }

    async readNetTermsSSR() {
        let request = {
            "filter": {},
            "fields": {},
            "page": 0,
            "limit": 100,
            "sort": {}
        }
        return await invoicesAPI?.readNetTermsSSR(request)
    }

    async readGenerateInvoiceNumber(CustomerID: number) {
        let request = {
            "CustomerID": CustomerID
        }
        return await invoicesAPI?.readGenerateInvoiceNumber(request)
    }

    async readCurrencysSSR() {
        let request = {
            "filter": {},
            "fields": {},
            "page": 0,
            "limit": 100,
            "sort": {}
        }
        return await invoicesAPI?.readCurrencySSR(request)
    }

    async readPriceListItem(CustomerAccountID: Number) {
        let request = {
            "CustomerAccountID": CustomerAccountID
        }
        return await invoicesAPI?.readPriceListItem(request)
    }

    async readInvoices(sortreq: any, SearchReq: any, pageno: number) {
        let request = {
            "filter": {
                "OR": [
                    {
                        "Customer": {
                            "CustomerName": {
                                "contains": SearchReq,
                                "mode": 'insensitive'
                            }
                        }
                    },
                    {
                        "InvoiceNumber": {
                            "contains": SearchReq,
                            "mode": 'insensitive'
                        }
                    }
                ],
                "IsDeleted": false
            },
            "fields": {
                "InvoiceID": true,
                "MerchantID": true,
                "TenantID": true,
                "CurrencyID": true,
                "CustomerAccountID": true,
                "InvoiceNumber": true,
                "InvoiceDate": true,
                "InvoiceAmount": true,
                "BalanceDue": true,
                "Adjustment": true,
                "BackupCharges": true,
                "CreatedAuthID": true,
                "ModifiedAuthID": true,
                "DeletedAuthID": true,
                "CreatedBy": true,
                "CreatedDate": true,
                "ModifiedBy": true,
                "ModifiedDate": true,
                "InvoiceStatus": {
                    "select": {
                        "InvoiceStatusID": true,
                        "InvoiceStatus": true,
                        "InternalCode": true
                    }
                },
                "Currency": {
                    "select": {
                        "CurrencySymbol": true,
                        "CurrencyCode": true
                    }
                },
                "Customer": {
                    "select": {
                        "CustomerID": true,
                        "CustomerName": true
                    }
                },
                "CustomerAccount": {
                    "select": {
                        "DisplayName": true
                    }
                }
            },
            "page": pageno,
            "limit": 10,
            "sort": sortreq
        }
        return await invoicesAPI?.readInvoices(request)
    }

    async readInvoicesSSRCount() {
        let request = {
            "filter": {
                "IsDeleted": false
            }
        }
        return await invoicesAPI?.readInvoicesSSRCount(request)
    }

    async readInvoicesCount(CountReq: any) {
        let request = {
            "filter": {
                "OR": [
                    {
                        "Customer": {
                            "CustomerName": {
                                "contains": CountReq,
                                "mode": 'insensitive'
                            }
                        }
                    },
                    {
                        "InvoiceNumber": {
                            "contains": CountReq,
                            "mode": 'insensitive'
                        }
                    }
                ],
            }
        }
        return await invoicesAPI?.readInvoicesCount(request)
    }

    async readInvoiceDetail(req: any) {
        let request = {
            "InvoiceID": req
        }
        return await invoicesAPI?.readInvoiceDetail(request)
    }

    async createInvoice(invoiceReq: any) {
        return await invoicesAPI?.createInvoice(invoiceReq)
    }

    async updateInvoiceStatustoOpen(updateReq: any) {
        let request = {
            "userInfo": {
                "MerchantID": updateReq?.MerchantID,
                "TenantID": updateReq?.TenantID,
                "CurrencyID": updateReq?.CurrencyID,
                "CreatedAuthID": updateReq?.CreatedAuthID,
                "CreatedBy": updateReq?.CreatedBy,
                "ModifiedAuthID": updateReq?.ModifiedAuthID,
                "ModifiedBy": updateReq?.ModifiedBy
            },
            "StatusOpenInput": {
                "InvoiceID": updateReq?.InvoiceID,
                "InternalCode": "OPEN",
                "CustomerAccountID": updateReq?.CustomerAccountID,
                "CustomerID": updateReq?.Customer?.CustomerID
            }
        }
        return await invoicesAPI?.updateInvoiceStatustoOpen(request)
    }

    async updateInvoiceStatustoVoid(updateReq: any, internalCode: string) {
        let request = {
            "userInfo": {
                "MerchantID": updateReq?.MerchantID,
                "TenantID": updateReq?.TenantID,
                "CurrencyID": updateReq?.CurrencyID,
                "CreatedAuthID": updateReq?.CreatedAuthID,
                "CreatedBy": updateReq?.CreatedBy,
                "ModifiedAuthID": updateReq?.ModifiedAuthID,
                "ModifiedBy": updateReq?.ModifiedBy
            },
            "StatusOpenInput": {
                "InvoiceID": updateReq?.InvoiceID,
                "InternalCode": internalCode,
                "CustomerAccountID": updateReq?.CustomerAccountID,
                "CustomerID": updateReq?.Customer?.CustomerID
            }
        }
        return await invoicesAPI?.updateInvoiceStatustoVoid(request)
    }
}