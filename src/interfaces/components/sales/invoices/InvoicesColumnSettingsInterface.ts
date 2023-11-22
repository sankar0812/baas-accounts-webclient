export interface InvoicesColumnSettingsInterface {
    configs: {
        title: String
    }
    data: {
        columnsDetails: Array<object>
    }
    callbacks: {
        handleClose: Function
    }
}