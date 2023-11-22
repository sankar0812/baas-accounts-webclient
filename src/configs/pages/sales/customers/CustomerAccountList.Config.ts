export class CustomerAccountList {
    handleCustomerAcccountListheaderColumn(): any {
        return [
            {
                "ColumnName": 'AccountNumber',
                "DisplayName": 'AccountNumber',
                "IsVisible": true,
                "IsSortEnabled": true,
                "defaultChecked": true
            },
            {
                "ColumnName": 'AccountCode',
                "DisplayName": 'AccountCode',
                "IsVisible": true,
                "IsSortEnabled": false,
                "defaultChecked": true
            },
            {
                "ColumnName": 'CurrencyCode',
                "DisplayName": 'CurrencyCode',
                "IsVisible": true,
                "IsSortEnabled": true,
                "defaultChecked": true
            },
            {
                "ColumnName": 'OpenedDate',
                "DisplayName": 'OpenedDate',
                "IsVisible": true,
                "IsSortEnabled": true,
                "defaultChecked": true
            },
            {
                "ColumnName": 'Username',
                "DisplayName": 'Username',
                "IsVisible": true,
                "IsSortEnabled": true,
                "defaultChecked": true
            },
            {
                "ColumnName": 'Password',
                "DisplayName": 'Password',
                "IsVisible": true,
                "IsSortEnabled": true,
                "defaultChecked": true
            },
            // {
            //     "ColumnName": 'AccountBalance',
            //     "DisplayName": 'AccountBalance',
            //     "IsVisible": true,
            //     "IsSortEnabled": true,
            //     "defaultChecked": true
            // },
            // {
            //     "ColumnName": 'Currency',
            //     "DisplayName": 'Currency',
            //     "IsVisible": true,
            //     "IsSortEnabled": true,
            //     "defaultChecked": true
            // },
            {
                "ColumnName": 'CreatedBy',
                "DisplayName": 'CreatedBy',
                "IsVisible": true,
                "IsSortEnabled": true,
                "defaultChecked": true
            },
            {
                "ColumnName": 'CreatedDate',
                "DisplayName": 'CreatedDate',
                "IsVisible": true,
                "IsSortEnabled": true,
                "defaultChecked": true
            },
            {
                "ColumnName": 'ModifiedBy',
                "DisplayName": 'ModifiedBy',
                "IsVisible": false,
                "IsSortEnabled": true,
                "defaultChecked": true
            },
            {
                "ColumnName": 'ModifiedDate',
                "DisplayName": 'ModifiedDate',
                "IsVisible": false,
                "IsSortEnabled": true,
                "defaultChecked": true
            },
            {
                "ColumnName": 'ModifiedBy',
                "DisplayName": 'ModifiedBy',
                "IsVisible": false,
                "IsSortEnabled": true,
                "defaultChecked": true
            }
        ]
    }
}