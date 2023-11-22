export class CustomerColumnSettings {
    handleCustomerheaderColumn(): any {
        return [
            {
                "ColumnName": 'DisplayName',
                "DisplayName": 'Display Name',
                "IsVisible": true,
                "IsSortEnabled": true,
                "defaultChecked": true
            },
            {
                "ColumnName": 'StartDate',
                "DisplayName": 'Start Date',
                "IsVisible": true,
                "IsSortEnabled": false,
                "defaultChecked": true
            },
            {
                "ColumnName": 'EndDate',
                "DisplayName": 'End Date',
                "IsVisible": true,
                "IsSortEnabled": true,
                "defaultChecked": true
            },
        ]
    }
}