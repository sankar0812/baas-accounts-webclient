/**
@CreatedBy        : Kannan
@CreatedTime      : Nov 8 2023
@ModifiedBy       : Kannan
@ModifiedTime     : Nov 8 2023
@Description      : This is the interface file for list Store
**/


export interface ListStoreInterface {
    configs: {
        router: any
        dataTestID: string
        functionObject:any
        filter:any
        router:any
    }
    data: {
        storeListData: any,
        StoreCount:number
    }
    callbacks?: {
    }
}