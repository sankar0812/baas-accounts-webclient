/**
* CreatedBy    : Uma Kohila
* CreatedDate  : Oct 13 2023
* ModifiedBy   : Uma Kohila
* ModifiedDate : Oct 13 2023
* Description  : This file contains AddPayments interface
*/

export interface RecordPaymentsInterface {
    configs: {
        'data-testid': string,
        functObj: any,
        isDialogShow: boolean,
        title: string,
        invoiceFunctionObject: any
    },
    data: {
        CurrencyLists?: Array<any>
        PaymentMethods: Array<any>
        InvoiceList: Array<any>
    }
    callbacks?: {
        handleRecordPaymentFormClose: Function
    }
}