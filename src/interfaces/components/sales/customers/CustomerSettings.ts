/**
@CreatedBy        : Uma Kohila
@CreatedTime      : Oct 14 2023
@ModifiedBy       : Uma Kohila
@ModifiedTime     : Oct 14 2023
@Description      : This file contains interface for Customer Settings List
**/


export interface CustomerSettingsListInterface {
    configs: {
        selectedSchemaCode: string
        moduleName: string
        router: any
    }
    data: {
        customerSettingsList: Array<any>
    }
    callbacks?: {}
}