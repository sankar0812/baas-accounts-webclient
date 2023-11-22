/**
 * CreatedBy : Vinoth
 * CreatedDate : 8 Nov 2023
*/

export interface AddStoreInterface {
    configs: {
        datatestID: String,
        router: any,
        functionObject: any
    }
    data: {
        StoreInfo: any,
        StoreTypeData: any

    }
    callbacks: {
        
        handleAddStore: Function
        handleFormClose: Function

    }

}