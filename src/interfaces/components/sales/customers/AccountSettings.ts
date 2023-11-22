/**
@CreatedBy        : HariPrakash
@CreatedTime      : Oct 18 2023
@ModifiedBy       : HariPrakash
@ModifiedTime     : Oct 18 2023
@Description      : This file contains interface for Accounts Settings List
**/


export interface AccountSettingsListInterface {
    configs: {
        selectedSchemaCode: string
        moduleName: string
        router: any
    }
    data: {
        accountSettingsList: Array<any>
    }
    callbacks?: {}
}