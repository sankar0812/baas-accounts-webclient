

export class BankColumnSettingsConfig {

    handleBankCloumnSettings() : any {
        return [
            {
                DisplayName: "Bank Name",
                columnName:"BankName",
                IsVisible: true,
                defaultChecked: true,
                IsSortEnabled: false
            },
            {
                DisplayName: "Code",
                columnName:"BankShortName",
                IsVisible: true,
                defaultChecked: true,
                IsSortEnabled: true
            },
            {
                DisplayName: "Currency Code",
                columnName:"CurrencyCode",
                IsVisible: true,
                defaultChecked: true,
                IsSortEnabled: false
            },
            {
                DisplayName: "Bank Account",
                columnName:"BankAccount",
                IsVisible: true,
                defaultChecked: true,
                IsSortEnabled: false
            },
            {
                DisplayName: "Address",
                columnName:"Address1",
                IsVisible: false,
                defaultChecked: false,
                IsSortEnabled: false
            },
            {
                DisplayName: "City",
                columnName:"City",
                IsVisible: false,
                defaultChecked: false,
                IsSortEnabled: false
            },
            {
                DisplayName: "State",
                columnName:"State",
                IsVisible: false,
                defaultChecked: false,
                IsSortEnabled: false
            },
            {
                DisplayName: "Country",
                columnName:"Country",
                IsVisible: false,
                defaultChecked: false,
                IsSortEnabled: false
            },            
            {
                DisplayName: "Postal Code",
                columnName:"Postal",
                IsVisible: false,
                defaultChecked: false,
                IsSortEnabled: false
            },
            {
                DisplayName: "Created By",
                columnName:"CreatedBy",
                IsVisible: false,
                defaultChecked: false,
                IsSortEnabled: false
            },
            {
                DisplayName: "Created Date",
                columnName:"CreatedDate",
                IsVisible: true,
                defaultChecked: false,
                IsSortEnabled: true
            },
            {
                DisplayName: "Modified By",
                columnName:"ModifiedBy",
                IsVisible: false,
                defaultChecked: false,
                IsSortEnabled: false
            },
            {
                DisplayName: "Modified Date",
                columnName:"ModifiedDate",
                IsVisible: false,
                defaultChecked: false,
                IsSortEnabled: false
            }
        ]
    }
}