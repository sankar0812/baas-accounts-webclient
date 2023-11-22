/**
* CreatedBy    : Uma Kohila
* CreatedDate  : Oct 11 2023
* ModifiedBy   : Uma Kohila
* ModifiedDate : Oct 11 2023
* Description  : This file contains product interface
*/

export interface ListProductInterface {
    configs: {
        'data-testid': string,
        functiontObj: any,
        filter: any
        router: any
    },
    data: {
        productLists: Array<any>
        productCount: number
    }
    callbacks?: {
    }
}