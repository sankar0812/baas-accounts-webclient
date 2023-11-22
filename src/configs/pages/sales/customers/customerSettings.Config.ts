/**
@CreatedBy        : Muthumariappan G
@CreatedTime      : Oct 14 2023
@Description      : This file contains config for Customers
**/

export class CustomersSettingsConfig {
    CUSTOMERS_DETAIL = [
        {
            "SchemaID": 1,
            "SchemaName": "View",
            "SchemaCode": "VIEW",
            "SchemaIcon": "loyalty",
            "RedirectionURL": "/merchants/[merchantkey]/sales/customers/[customerid]/view",
            "SchemaOrder": 1
        },
        {
            "SchemaID": 2,
            "SchemaName": "Accounts",
            "SchemaCode": "ACCOUNTS",
            "SchemaIcon": "rule_settings",
            "RedirectionURL": "/merchants/[merchantkey]/sales/customers/[customerid]/accounts",
            "SchemaOrder": 2
        },
        {
            "SchemaID": 3,
            "SchemaName": "Price List",
            "SchemaCode": "PRICELIST",
            "SchemaIcon": "globe_asia",
            "RedirectionURL": "/merchants/[merchantkey]/sales/customers/[customerid]/pricelists",
            "SchemaOrder": 3
        },
        {
            "SchemaID": 4,
            "SchemaName": "Invoice Payments",
            "SchemaCode": "INVOICEPAYMENTS",
            "SchemaIcon": "loyalty",
            "RedirectionURL": "/merchants/[merchantkey]/sales/customers/[customerid]/invoicepayments",
            "SchemaOrder": 4
        },
        {
            "SchemaID": 5,
            "SchemaName": "Transaction",
            "SchemaCode": "TRANSACTION",
            "SchemaIcon": "apps",
            "RedirectionURL": "/merchants/[merchantkey]/sales/customers/[customerid]/transaction",
            "SchemaOrder": 5
        }
    ]
}