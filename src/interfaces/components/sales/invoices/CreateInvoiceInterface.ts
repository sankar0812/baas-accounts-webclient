/**
 * CreatedBy : Pradeepa
 * CreatedDate : Oct 13 2023
*/

export interface CreateInvoiceInterface {
    configs: {
        datatestID: string
        router: any
        functionObject: any
    }
    data: {
        CustomerInfo: any
        TermInfo :any
        CurrencyInfo:any
    }
}