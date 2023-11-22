export class CustomerColumnSettings {
    handleCustomerheaderColumn(): any {
        return [
            {
                "ColumnName": 'CustomerName',
                "DisplayName": 'Customer Name',
                "IsVisible": true,
                "IsSortEnabled": true,
                "defaultChecked": true
            },
            {
                "ColumnName": 'CustomerCode',
                "DisplayName": 'Customer Code',
                "IsVisible": true,
                "IsSortEnabled": false,
                "defaultChecked": true
            },
            {
                "ColumnName": 'City',
                "DisplayName": 'City',
                "IsVisible": true,
                "IsSortEnabled": true,
                "defaultChecked": true
            },
            {
                "ColumnName": 'State',
                "DisplayName": 'State',
                "IsVisible": true,
                "IsSortEnabled": true,
                "defaultChecked": true
            },
            {
                "ColumnName": 'Country',
                "DisplayName": 'Country',
                "IsVisible": true,
                "IsSortEnabled": true,
                "defaultChecked": true
            },
            {
                "ColumnName": 'Address1',
                "DisplayName": 'Address',
                "IsVisible": false,
                "IsSortEnabled": false,
                "defaultChecked": false
            },
            {
                "ColumnName": 'PostalCode',
                "DisplayName": 'Postal Code',
                "IsVisible": false,
                "IsSortEnabled": false,
                "defaultChecked": false
            },
            {
                "ColumnName": 'CreatedBy',
                "DisplayName": 'Created By',
                "IsVisible": false,
                "IsSortEnabled": false,
                "defaultChecked": false
            },
            {
                "ColumnName": 'CreatedDate',
                "DisplayName": 'Created Date',
                "IsVisible": false,
                "IsSortEnabled": true,
                "defaultChecked": false
            },
            {
                "ColumnName": 'ModifiedBy',
                "DisplayName": 'Modified By',
                "IsVisible": false,
                "IsSortEnabled": false,
                "defaultChecked": false
            },
            {
                "ColumnName": 'ModifiedDate',
                "DisplayName": 'Modified  Date',
                "IsVisible": false,
                "IsSortEnabled": true,
                "defaultChecked": false
            }
        ]
    }
}