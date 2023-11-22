/**
* CreatedBy    : HariPrakash
* CreatedDate  : Nov 08 2023
* ModifiedBy   : HariPrakash
* ModifiedDate : Nov 08 2023
* Description  : This file contains Store View interface
*/

export interface viewStoreInterface {
    configs: {
        dataTestID: string,
        functionObject:any
    },
    data: {
        viewStore: Array<any>
        priceListData:Array<any>
    }
}