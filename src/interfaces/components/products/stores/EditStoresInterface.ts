/**
* CreatedBy    : Venugopal
* CreatedDate  : Nov 15 2023
* Description  : This file contains Store Edit interface
*/

export interface editStoreInterface {
    configs: {
        dataTestID: string,
        router: any
    },
    data: {
        EditStoreInfo: any,
        storePriceLIst: any,
        pricelistData: Array<any>
        storeTypeData: Array<any>
    }
}