
/**
 * Created By   : Muthumariappan
 * Created Date : Nov 11 2023
 * Description  : This file contain interface for tedit product
 */

export interface EditProductInterface {
    configs: {
        router: any,
        merchantkey: any,
        dataTestID: string
    }
    data: {
        editProductData: any
        baseProducts: Array<any>
        currencyData: any
        AppsettingUOMData: any
    }
}