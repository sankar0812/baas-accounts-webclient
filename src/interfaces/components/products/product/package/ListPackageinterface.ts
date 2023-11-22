/**
 * Created By : Pradeepa S
 * Created Date : Nov 08 2023
 * Description : This file contain interface file for a package list for a particular product
 */

export interface ListPackageInteraface {
    configs: {
        datatestID: string
    }
    data: {
        listPackage: any
    }
    callbacks: {
        handleDelete: Function
    }
}