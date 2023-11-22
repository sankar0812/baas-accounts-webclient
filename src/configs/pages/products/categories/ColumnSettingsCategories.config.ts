
export class ColumnSettingsCategoriesConfig {
    handleCloumnSettingsCategories() : any {
        return[
            {
                DisplayName:"Category Name",
                ColumnName: "CategoryName",
                IsVisible: true,
                defaultChecked: true,
                IsSortEnabled: false
            },
            {
                DisplayName:"Category Code",
                ColumnName: "CategoryCode",
                IsVisible: true,
                defaultChecked: true,
                IsSortEnabled: false
            },
            {
                DisplayName:"Description",
                ColumnName: "Description",
                IsVisible: true,
                defaultChecked: true,
                IsSortEnabled: false
            },
            {
                DisplayName:"Product Count",
                ColumnName: "ProductCount",
                IsVisible: true,
                defaultChecked: true,
                IsSortEnabled: false
            },
            {
                DisplayName: "Created By",
                ColumnName:"CreatedBy",
                IsVisible: true,
                defaultChecked: true,
                IsSortEnabled: true
            },
            {
                DisplayName: "Created Date",
                ColumnName:"CreatedDate",
                IsVisible: true,
                defaultChecked: true,
                IsSortEnabled: true
            },
            {
                DisplayName: "Modified By",
                ColumnName:"ModifiedBy",
                IsVisible: false,
                defaultChecked: false,
                IsSortEnabled: true
            },
            {
                DisplayName: "Modified Date",
                ColumnName:"ModifiedDate",
                IsVisible: false,
                defaultChecked: false,
                IsSortEnabled: true
            }
        ]
    }
}