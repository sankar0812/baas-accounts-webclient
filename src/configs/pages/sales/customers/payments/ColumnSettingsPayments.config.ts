

export class ColumnSettingsPaymentsConfig {

    handleCloumnSettingsPayments() : any {
        return [
            {
                DisplayName: "Payment Method",
                columnName:"PaymentMethod",
                IsVisible: true,
                defaultChecked: true,
                IsSortEnabled: false
            },
            {
                DisplayName: "Payment Confirmation",
                columnName:"PaymentConfirmation",
                IsVisible: true,
                defaultChecked: true,
                IsSortEnabled: true
            },
            {
                DisplayName: "Paid Amount",
                columnName:"PaidAmount",
                IsVisible: true,
                defaultChecked: true,
                IsSortEnabled: false
            },
            {
                DisplayName: "Invoice Count",
                columnName:"InvoiceCount",
                IsVisible: true,
                defaultChecked: true,
                IsSortEnabled: false
            },
            {
                DisplayName: "Paid Date",
                columnName:"PaidDate",
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