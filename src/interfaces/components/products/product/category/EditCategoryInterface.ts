/**
 * CreatedBy    : Uma Kohila
 * CreatedDate  : Nov 08 2023
 * Description  : This is the interface file for AddProduct BulkDiscount
 */

export interface addCategoryInterface {
    configs: {
        functionObj: any,
        'data-testid': string,
        router: any
    }
    data: {
        CategoryList: Array<any>
        CategoryData: Array<any>
    }
    callbacks: {
    }
}