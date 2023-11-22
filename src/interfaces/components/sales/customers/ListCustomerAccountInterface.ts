/**
 * CreatedBy : HariPrakash
 * CreatedDate : Oct 10 2023
 * Description  : This is the interface file for customer Account List
 */
export interface ListCustomerAccountInterface {
    configs: {
        'data-testid': string
        functionObject: any
        router: any
    }
    data: {
        AccountList: Array<any>
        // curreny:Array<any>
        // customerAccountListColumnDetail: Array<any>


    }
}