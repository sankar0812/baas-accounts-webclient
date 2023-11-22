/**
@CreatedBy        : Pradeepa S
@CreatedTime      : Sep 9 2023
@Description      : This file contains interface for Delete Product Package
**/

export interface RemoveProductPackageface {
    configs: {
        title: string,
        'data-testid': string
        deletedRecord: any
        isDialogShow: boolean
        router: any
        functionObject: any
    }
    callbacks: {
        handlePackageDeleteFormSubmit: Function,
        handlePackageDeleteFormClose: Function

    }
}