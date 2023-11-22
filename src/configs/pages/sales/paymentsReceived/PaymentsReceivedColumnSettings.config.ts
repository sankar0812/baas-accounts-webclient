export class PaymentsReceivedColumnSettingsConfig {

    handlePaymentsReceivedColumnSettings(): any {
        return [
            {
                ColumnName: "CustomerName",
                DisplayName: "Customer Name",
                IsVisible: true,
                IsSortEnabled: true,
                defaultChecked: true
            },
            {
                ColumnName: "CustomerCode",
                DisplayName: "Customer Code",
                IsVisible: false,
                IsSortEnabled: false,
                defaultChecked: false
            },
            {
                ColumnName: "InvoiceCount",
                DisplayName: "Invoice Count",
                IsVisible: true,
                IsSortEnabled: false,
                defaultChecked: true
            },
            {
                ColumnName: "PaidAmount",
                DisplayName: "PaidAmount",
                IsVisible: true,
                IsSortEnabled: false,
                defaultChecked: true
            },
            {
                ColumnName: "PaymentConfirmation",
                DisplayName: "Reference Number ",
                IsVisible: true,
                IsSortEnabled: false,
                defaultChecked: true
            },
            {
                ColumnName: "PaidDate",
                DisplayName: "PaidDate",
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
