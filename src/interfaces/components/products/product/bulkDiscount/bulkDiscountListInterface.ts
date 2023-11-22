/**
 * CreatedBy    : Uma Kohila
 * CreatedDate  : Nov 08 2023
 * Description  : This is the interface file for AddProduct BulkDiscount
 */

export interface bulkDiscountListInterface {
    configs: {
        functionObj: any,
        'data-testid': string,
        productID: number
    }
    data: {

    }
    callbacks: {
        handleAddDiscount: Function
    }
}