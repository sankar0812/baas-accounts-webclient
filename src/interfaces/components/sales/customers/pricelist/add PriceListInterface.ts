/**
 * CreatedBy    : Uma Kohila
 * CreatedDate  : Oct 24 2023
 * Description  : This is the interface file for AddPriceList
 */

export interface addPricelistInterface {
    configs: {
        functionObj: any,
        'data-testid': string,
        merchantkey: string,
        router: any
    }
    data?: {
        productListData: Array<any>
        currencyListData: Array<any>
    }
}