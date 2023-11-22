/**
@CreatedBy    : Muthumariappan G
@CreatedDate  : Oct 17 2023
@ModifiedBy   : Muthumariappan
@ModifiedDate : Oct 24 2023
@Description  : This is the interface file for View Customers Payment
*/

export interface ViewAccountPaymentInterface{
    configs:{
        dataTestID: string
    }
    data:{
        viewCustomerPaymentData: Array<any>
    }
}