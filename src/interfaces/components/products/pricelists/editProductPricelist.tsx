/**
 * CreatedBy    : Sreedhar
 * CreatedDate  : NOV 15 2023
 * Description  : This is the interface file for EditProductPriceList
 */

export interface editProductPricelistInterface {
    configs: {
        functionObj: any,
        // 'data-testid': string,
        merchantkey: string,
        router: any,
        bulkDiscountFuncObj: any
    }
    data: {
        productListData: any
        priceListStatus: any
        priceListData: any
        priceListItems: any
    }
}