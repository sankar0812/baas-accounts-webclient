/**
 * CreatedBy    : Muthumariappan
 * CreatedDate  : Nov 7 2023
 * Description  : This is the interface file for product category list
 */
export interface ListCategoryInterface {
    configs: {
        'data-testid': string
        functionObject: any
        router: any
        filter: any
    }
    data: {
        categoryList: any
        categoryCount: number
        categoryListColumnDetail: Array<any>
    }
    // callback: {}
}