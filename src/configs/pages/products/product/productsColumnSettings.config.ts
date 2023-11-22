export class ProductsColumnSettingsConfig {

    handleProductsColumnSettings(): any {
        return [
            {
                ColumnName: "ProductName",
                DisplayName: "Product Name",
                IsVisible: true,
                IsSortEnabled: true,
                defaultChecked: true
            },
            {
                ColumnName: "ProductCode",
                DisplayName: "Product Code",
                IsVisible: true,
                IsSortEnabled: false,
                defaultChecked: true
            },
            {
                ColumnName: "SaleRate",
                DisplayName: "Sale Rate",
                IsVisible: true,
                IsSortEnabled: false,
                defaultChecked: true
            },
            {
                ColumnName: "UoM",
                DisplayName: "Unit of Measure",
                IsVisible: true,
                IsSortEnabled: false,
                defaultChecked: true
            },
            {
                ColumnName: "IsAsset",
                DisplayName: "IsAsset ",
                IsVisible: true,
                IsSortEnabled: false,
                defaultChecked: true
            },
            {
                ColumnName: "IsRental",
                DisplayName: "IsRental",
                IsVisible: true,
                IsSortEnabled: true,
                defaultChecked: true
            },
            {
                ColumnName: "CreatedBy",
                DisplayName: "Created By ",
                IsVisible: false,
                IsSortEnabled: false,
                defaultChecked: false
            },
            {
                ColumnName: "CreatedDate",
                DisplayName: "Created Date ",
                IsVisible: false,
                IsSortEnabled: false,
                defaultChecked: false
            },
            {
                ColumnName: "ModifiedBy",
                DisplayName: "Modified By ",
                IsVisible: false,
                IsSortEnabled: false,
                defaultChecked: false
            },
            {
                ColumnName: "ModifiedDate",
                DisplayName: "Modified Date ",
                IsVisible: false,
                IsSortEnabled: false,
                defaultChecked: false
            },
        ]
    }
}
