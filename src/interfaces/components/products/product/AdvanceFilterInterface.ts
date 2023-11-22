/**
 * Created By : Pradeepa S
 * Created Date : Nov 16 2023
 * Description : This file contain interface for product advance filter
 */

export interface ProductAdvanceFilterInterface {
    configs: {
        datatestID: string
        functionObject: any
    }
    data: {
        categoryData: any
        productData: any
        filterReq: any
    }
    callbacks: {
        handleAdvanceFilterClose: Function
        handleViewData: Function
        handleFilterData: Function
    }
}