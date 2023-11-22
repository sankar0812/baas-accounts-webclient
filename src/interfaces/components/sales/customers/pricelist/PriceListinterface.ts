/**
 * CreatedBy : Sreedhar A
 * CreatedDate : Oct 12 2023
 * Description  : This is the interface filr for Price List
 */
export interface pricelistInterface {
    configs: {
        'data-testid': string,
        router :any
    }
    data: {
        PriceList: Array<any>
        
    }
}