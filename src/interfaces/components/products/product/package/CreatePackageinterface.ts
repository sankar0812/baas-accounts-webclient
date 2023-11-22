/**
 * Created By : Pradeepa S
 * Created Date : Nov 08 2023
 * Description : This file contain interface for create package for a particular product
 */

export interface CreatePackageInterface {
    configs: {
        datatestID: string
        router: any
        functionObject: any
    }
    data: {
        PackageTypeData: any
    }
    callbacks: {
        handleCreatePackage: Function
        handleClosePackageForm: Function
    }
}