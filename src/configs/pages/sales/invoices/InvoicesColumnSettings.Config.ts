export class InvoicesColumnSettingsConfig {

    handleInvoicesColumnSettings(): any {
        return [
            {
                "ColumnName": 'CustomerName',
                "DisplayName": 'Customer Name',
                "IsVisible": true,
                "IsSortEnabled": true,
                "defaultChecked": true
            },
            {
                "ColumnName": 'CustomerAccount',
                "DisplayName": 'Customer Account',
                "IsVisible": true,
                "IsSortEnabled": true,
                "defaultChecked": true
            },
            {
                "ColumnName": 'InvoiceNumber',
                "DisplayName": 'Invoice #',
                "IsVisible": true,
                "IsSortEnabled": true,
                "defaultChecked": true
            },
            {
                "ColumnName": 'InvoiceDate',
                "DisplayName": 'Invoice Date',
                "IsVisible": true,
                "IsSortEnabled": false,
                "defaultChecked": true
            },
            {
                "ColumnName": 'InvoiceAmount',
                "DisplayName": 'Invoice Amount',
                "IsVisible": true,
                "IsSortEnabled": false,
                "defaultChecked": true
            },
            {
                "ColumnName": 'BalanceDue',
                "DisplayName": 'Balance Due',
                "IsVisible": true,
                "IsSortEnabled": false,
                "defaultChecked": true
            },
            {
                "ColumnName": 'InvoiceStatus',
                "DisplayName": 'Invoice Status ',
                "IsVisible": true,
                "IsSortEnabled": false,
                "defaultChecked": true
            },
            {
                "ColumnName": 'Adjustment',
                "DisplayName": 'Adjustment',
                "IsVisible": false,
                "IsSortEnabled": false,
                "defaultChecked": false
            },
            {
                "ColumnName": 'BackupCharges',
                "DisplayName": 'Backup Charges',
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
                "IsSortEnabled": false,
                "defaultChecked": false
            },
            {
                "ColumnName": 'ModifiedDate',
                "DisplayName": 'Modified  Date',
                "IsVisible": false,
                "IsSortEnabled": false,
                "defaultChecked": false
            },
            {
                "ColumnName": 'ModifiedBy',
                "DisplayName": 'Modified By',
                "IsVisible": false,
                "IsSortEnabled": false,
                "defaultChecked": false
            }
        ]
    }
}
