/**
 * CreatedBy : Pradeepa S
 * CreatedDate : Oct 10 2023
 * Description  : This is the interface filr for customer List
 */
export interface ListCustomerInterface {
    configs: {
        'data-testid': string
        functionObject: any
        filter: any,
        router: any
    }
    data: {
        customerList: Array<any>
        customerCount: number
        customerID: number
        customerListColumnDetail: Array<any>
    }
}