/**
 * CreatedBy    : Sreedhar
 * CreatedDate  : NOV 7 2023
 * Description  : This is the interface file for AddProductPriceList
 */

export interface addProductPricelistInterface {
    configs: {
        functionObj: any,
        'data-testid': string,
        merchantkey: string,
        router: any
    }
    data: {
        productListData?: []
    }
    callbacks: {
        handleAddPriceList: Function
        handleFormClose: Function
    }
}