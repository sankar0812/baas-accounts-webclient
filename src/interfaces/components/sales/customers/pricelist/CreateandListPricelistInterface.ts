/**
 * CreatedBy    : Uma Kohila
 * CreatedDate  : Nov 16 2023
 * Description  : This is the interface file for PriceList List screen
 */
export interface CreateandListPricelistInterface {
    configs: {
        'data-testid': string,
        router: any,
        functionObj: any,
        pricelistFuncObj: any
    }
    data: {
        CustomerAccounts: Array<any>,
        PriceListData: Array<any>
    }
}