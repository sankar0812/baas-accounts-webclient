/**
* CreatedBy    : Uma Kohila
* CreatedDate  : Oct 05 2023
* ModifiedBy   : Uma Kohila
* ModifiedDate : Oct 05 2023
* Description  : This file contains paymentsReceived modules Functions
*/

import { PaymentsReceivedApi } from "@/apis/sales/paymentsreceived/paymentsReceivedApi";

const paymentsreceivedApi = new PaymentsReceivedApi();

export class PaymentsReceivedFunction {

    async readPaymentsReceivedSSR() {
        let paymentsreceivedReq = {
            "filter": {
                "IsDeleted": false,
            },
            "fields": {
                "CustomerPaymentID": true,
        "BankAccountID": true,
        "CustomerID": true,
        "PaymentMethodID": true,
        "CurrencyID": true,
        "PaidDate": true,
        "PaidAmount": true,
        "PaymentConfirmation": true,
        "BankDepositedDate": true,
        "BankPostedDate": true,
        "Remarks": true,
        "CreatedAuthID": true,
        "CreatedBy": true,
        "ModifiedAuthID": true,
        "ModifiedBy": true,
        "CustomerAccountID": true,
        "Currency":{
            "select":{
                "CurrencyCode":true
            }
        },
        "Customer": {
            "select": {
                "CustomerID": true,
                "CustomerName": true,
                "CustomerCode": true
            }
        },
        "CustomerPaymentItem": {
            "select": {
                "Invoice": {
                    "select": {
                        "InvoiceID": true,
                        "InvoiceNumber": true,
                        "InvoiceDate": true,
                        "InvoiceStatus": true
                    }
                }
            }
        }
            },
            "page": 0,
            "limit": 10,
            "sort": { "CreatedDate": "desc" },
        };
        return await paymentsreceivedApi?.readPaymentsReceivedSSR(paymentsreceivedReq);
    }

    async readPaymentsReceived(paymentsReceivedReq: any, sortReq: any, pageno: number) {
        let paymentsreceivedReq = {
            "filter": {
                "OR": [
                    {
                        "Customer": {
                            "CustomerName": {
                                "contains": paymentsReceivedReq,
                                "mode": 'insensitive'
                            }
                        }
                    },
                    {
                        "PaymentConfirmation": {
                            "contains": paymentsReceivedReq,
                            "mode": 'insensitive'
                        }
                    }
                ],
                "IsDeleted": false
            },
            "fields": {
                "CustomerPaymentID": true,
                "BankAccountID": true,
                "CustomerID": true,
                "PaymentMethodID": true,
                "CurrencyID": true,
                "PaidDate": true,
                "PaidAmount": true,
                "PaymentConfirmation": true,
                "BankDepositedDate": true,
                "BankPostedDate": true,
                "Remarks": true,
                "CreatedAuthID": true,
                "CreatedBy": true,
                "ModifiedAuthID": true,
                "ModifiedBy": true,
                "CustomerAccountID": true,
                "Currency":{
                    "select":{
                        "CurrencyCode":true
                    }
                },
                "Customer": {
                    "select": {
                        "CustomerID": true,
                        "CustomerName": true,
                        "CustomerCode": true
                    }
                },
                "CustomerPaymentItem": {
                    "select": {
                        "Invoice": {
                            "select": {
                                "InvoiceID": true,
                                "InvoiceNumber": true,
                                "InvoiceDate": true,
                                "InvoiceStatus": true
                            }
                        }
                    }
                }
            },
            "page": pageno,
            "limit": 10,
            "sort": sortReq,
        };
        return await paymentsreceivedApi?.readPaymentsReceived(paymentsreceivedReq);
    }


    async readPaymentsReceivedCountSSR() {
        let readPaymentsReceivedCountReq = {
            "filter": {}
        }
        return await paymentsreceivedApi?.readPaymentsReceivedCountSSR(readPaymentsReceivedCountReq)
    }

    async readPaymentsReceivedCount(CountReq: any) {
        let readPaymentsReceivedCountReq = {
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
                        "PaymentConfirmation": {
                            "contains": CountReq,
                            "mode": 'insensitive'
                        }
                    }
                ],
                "IsDeleted": false
            }
        }
        return await paymentsreceivedApi?.readPaymentsReceivedCount(readPaymentsReceivedCountReq)
    }

    async readPaymentMethods() {
        let paymentsMethodsReq = {
            "filter": {},
            "fields": {},
            "page": 0,
            "limit": 10,
            "sort": {"CreatedDate": "desc"}
        }
        return await paymentsreceivedApi?.readPaymentMethodsSSR(paymentsMethodsReq);
    }
}