/**
 * CreatedBy     : Uma Kohila
 * CreatedDate   : Oct 27 2023
 * Description   : This file contains record payments interface
 */


export interface RecordPaymentInterface {
    configs: {
        'data-testid': string,
        functionObject: any,
        customerid: any,
        merchantkey: string,
        router: any
    }
    data: {
        CustomerAccounts: Array<any>
        CurrencyList: Array<any>
        InvoiceList: Array<any>
        BankAccountsList: Array<any>
        PaymentMethodList: Array<any>
    }
}