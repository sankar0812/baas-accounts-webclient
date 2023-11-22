/**
 * CreatedBy    : Uma Kohila
 * CreatedDate  : Nov 08 2023
 * Description  : This is the interface file for AddProduct BulkDiscount
 */

export interface addProductBulkDiscountInterface {
    configs: {
        functionObj: any,
        'data-testid': string
    }
    data: {
        ProductListData: Array<any>
    }
    callbacks: {
        handleAddClose: Function
    }
}