
/**
@CreatedBy    : Muthumariappan G
@CreatedDate  : Oct 17 2023
@ModifiedBy   : Muthumariappan
@ModifiedDate : Oct 24 2023
@Description  : This is the interface file for View Customers Invoice
*/

export interface ViewAccountInvoiceInterface{
    configs:{
        dataTestID: string
    }
    data :{
        CustomerInvoiceData: Array<any>
    }
}