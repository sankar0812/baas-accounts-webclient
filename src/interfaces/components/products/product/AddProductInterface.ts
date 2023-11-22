/**
 * Created By : Pradeepa S
 * Created Date : Nov 08 2023
 * Description : This file contain interface for Add product
 */

export interface AddProductInterface {
    configs: {
        dataTestID: string
        router: any
        functionObject: any
    }
    data: {
        AppSettingUomData: any
        CurrencyData: any
        ParentProductData :any
    }
    callbacks: {
        handleAddProduct: Function
        handleFormClose: Function
    }
}