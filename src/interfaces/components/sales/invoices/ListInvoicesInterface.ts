/**
 * CreatedBy : Nishanth
 * CreatedDate : Oct 7 2023
 * Description  : This is the interface for Invoices List
 */

export interface ListInvoicesInterface {
    configs: {
        'data-testid': string
        functionObject: any
        filter: any
        router : any
        View : boolean
    }
    data: {
        invoicesList: Array<any>
        invoicesCount: number
        InvoicesListColumnDetail: Array<any>
    }
    callbacks : {
        handleView : Function
    }
}