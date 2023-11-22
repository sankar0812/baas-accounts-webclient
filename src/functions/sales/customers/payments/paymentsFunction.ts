/**
* CreatedBy    : Uma Kohila
* CreatedDate  : Oct 05 2023
* ModifiedBy   : Muthumariappan
* ModifiedDate : Oct 23 2023
* Description  : This file contains payments modules Functions
*/

import { PaymentApi } from "@/apis/sales/customer/payments/paymentsAPI";


const paymentsApi = new PaymentApi()


export class PaymentsFunction {
    async readPaymentsFunctionSSR() {
        let readPaymentsReq = {
            "filter": {},
            "fields": {},
            "page": 0,
            "limit": 10,
            "sort": {}
        }
        return await paymentsApi?.readPaymentMethodsSSR(readPaymentsReq);
    }

    async readPaymentsFunction() {
        let readPaymentsReq = {
            "filter": {},
            "fields": {},
            "page": 0,
            "limit": 10,
            "sort": {}
        }
        return await paymentsApi?.readPaymentMethods(readPaymentsReq);
    }

    async recordPaymentsFunction(recordPaymentsReq: any) {
        return await paymentsApi?.recordPaymentFunction(recordPaymentsReq);
    }

    async readPaymentsSSR() {
        let request = {
            "filter": {
                "IsDeleted": false
            },
            "fields": {
                "CustomerPaymentID": true,
                "CustomerID": true,
                "Customer": {
                    "select": {
                        "CustomerName": true
                    }
                },
                "PaidAmount": true,
                "PaidDate": true,
                "PaymentConfirmation": true,
                "PaymentMethod": {
                    "select": {
                        "PaymentMethod": true,
                        "PaymentMethodID": true
                    }
                },
                "Currency": {
                    "select": {
                        "CurrencySymbol": true,
                        "CurrencyCode": true
                    }
                },
                "CustomerPaymentItem": {
                    "select": {
                        "CustomerPaymentItemID": true,
                        "CustomerPaymentID": true,
                        "InvoiceID": true,
                        "InvoicePaidAmount": true
                    }
                },
                "CreatedBy": true,
                "CreatedDate": true,
                "ModifiedBy": true,
                "ModifiedDate": true
            },
            "page": 0,
            "limit": 10,
            "sort": { "CustomerPaymentID": "desc" }
        }
        return await paymentsApi?.readPaymentsSSR(request)
    }

    async readPaymentsListSSR(customerid: number) {
        let request = {
            "filter": {
                "CustomerID": customerid,
                "IsDeleted": false
            },
            "fields": {
                "CustomerPaymentID": true,
                "CustomerID": true,
                "Customer": {
                    "select": {
                        "CustomerName": true
                    }
                },
                "PaidAmount": true,
                "PaidDate": true,
                "PaymentConfirmation": true,
                "PaymentMethod": {
                    "select": {
                        "PaymentMethod": true,
                        "PaymentMethodID": true
                    }
                },
                "Currency": {
                    "select": {
                        "CurrencySymbol": true,
                        "CurrencyCode": true
                    }
                },
                "CustomerPaymentItem": {
                    "select": {
                        "CustomerPaymentItemID": true,
                        "CustomerPaymentID": true,
                        "InvoiceID": true,
                        "InvoicePaidAmount": true
                    }
                },
                "CreatedBy": true,
                "CreatedDate": true,
                "ModifiedBy": true,
                "ModifiedDate": true
            },
            "page": 0,
            "limit": 10,
            "sort": { "CustomerPaymentID": "desc" }
        }
        return await paymentsApi?.readPaymentsSSR(request)
    }

    async readPaymentsList(SearchReq: any, customerid: any, sortreq: any) {
        let request = {
            "filter": {
                "PaymentMethod": {
                    "PaymentMethod": {
                        "contains": SearchReq,
                        "mode": 'insensitive'
                    }
                },
                "CustomerID": parseInt(customerid),
                "IsDeleted": false
            },
            "fields": {
                "CustomerPaymentID": true,
                "CustomerID": true,
                "Customer": {
                    "select": {
                        "CustomerName": true
                    }
                },
                "PaidAmount": true,
                "PaidDate": true,
                "PaymentConfirmation": true,
                "PaymentMethod": {
                    "select": {
                        "PaymentMethod": true,
                        "PaymentMethodID": true
                    }
                },
                "Currency": {
                    "select": {
                        "CurrencySymbol": true,
                        "CurrencyCode": true
                    }
                },
                "CustomerPaymentItem": {
                    "select": {
                        "CustomerPaymentItemID": true,
                        "CustomerPaymentID": true,
                        "InvoiceID": true,
                        "InvoicePaidAmount": true
                    }
                },
                "CreatedBy": true,
                "CreatedDate": true,
                "ModifiedBy": true,
                "ModifiedDate": true
            },
            "page": 0,
            "limit": 10,
            "sort": sortreq
        }
        return await paymentsApi?.readPayments(request)
    }

    async readPayments(sortreq: any, SearchReq: any, pageno: number) {
        let request = {
            "filter": {
                "PaymentMethod": {
                    "PaymentMethod": {
                        "contains": SearchReq,
                        "mode": 'insensitive'
                    }
                },
                "IsDeleted": false
            },
            "fields": {
                "CustomerPaymentID": true,
                "CustomerID": true,
                "Customer": {
                    "select": {
                        "CustomerName": true
                    }
                },
                "PaidAmount": true,
                "PaidDate": true,
                "PaymentConfirmation": true,
                "PaymentMethod": {
                    "select": {
                        "PaymentMethod": true,
                        "PaymentMethodID": true
                    }
                },
                "Currency": {
                    "select": {
                        "CurrencySymbol": true,
                        "CurrencyCode": true
                    }
                },
                "CustomerPaymentItem": {
                    "select": {
                        "CustomerPaymentItemID": true,
                        "CustomerPaymentID": true,
                        "InvoiceID": true,
                        "InvoicePaidAmount": true
                    }
                },
                "CreatedBy": true,
                "CreatedDate": true,
                "ModifiedBy": true,
                "ModifiedDate": true
            },
            "page": pageno,
            "limit": 10,
            "sort": sortreq
        }
        return await paymentsApi?.readPayments(request)
    }


    async readPaymentsCountSSR(customerID: any) {
        let request = {
            "filter": {
                "CustomerID": customerID,
                "IsDeleted": false
            }
        }
        return await paymentsApi?.readPaymentsCountSSR(request)
    }


    async readPaymentsCount(SearchReq: any, customerID: any) {
        let request = {
            "filter": {
                "CustomerID": parseInt(customerID),
                "PaymentMethod": {
                    "PaymentMethod": {
                        "contains": SearchReq,
                        "mode": 'insensitive'
                    }
                },
                "IsDeleted": false
            }
        }
        return await paymentsApi?.readPaymentsCount(request)
    }

}