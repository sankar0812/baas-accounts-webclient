/**
 * Created By : Pradeepa S
 * Created Date : Nov 15 2023
 * Description : This file contain interface file View Category
 */

export interface ViewCategoryInterface {
    configs: {
        datatestID: string
        router: any
        functionObject: any
    }
    data: {
        editableData: any
        productData: any
        parentCategoryData: any
        productCategoryData: any
    }
    callbacks: {
        handleAddProductToCategory: Function
    }
}