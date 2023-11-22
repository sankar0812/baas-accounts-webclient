/**
 * Created By : Pradeepa S
 * Created Date : Nov 14 2023
 * Description  : This file contain interface for add category
 */

export interface AddCategoryInterface {
    configs: {
        datatestID: string
        router: any,
        functionObject: any
    }
    data: {
        ParentCategoryData: any
        EditableCategoryData : any
    }
    callbacks: {
        handleAddCategory: Function,
        handleFormClose: Function
    }
}