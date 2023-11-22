/**
 * CreatedBy : 
 * CreatedDate : Oct 13 2023
*/

export interface CreateAccountsInterface {
    configs: {
        datatestID: string
        router: any,
        functionObject: any
        isSubmitButtonDisabled:any

    }
    data: {
        Currency:Array<any>
        AppSettingsNetTermData: Array<any>
    }
    callbacks: {
        handleAccountCreateFormSubmit: Function
        handleAccountCreateFormClose: Function
    }
}