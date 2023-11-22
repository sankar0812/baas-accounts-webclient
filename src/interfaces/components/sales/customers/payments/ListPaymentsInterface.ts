
/**
 * CreatedBy    : Muthumariappan
 * CreatedDate  : Oct 19 2023
 * Description  : This is the interface file for customers payment list
 */
export interface ListPaymentsInterface {
    configs: {
        'data-testid': string
        functionObject : any
        filter: any
    }
    data: {
        paymentList: Array<any>
        paymentCount: number
        paymentListColumnDetail: Array<any>
    }
    callback: {}
}