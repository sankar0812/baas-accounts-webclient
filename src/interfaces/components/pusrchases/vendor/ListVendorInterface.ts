/**
 * CreatedBy : Pradeepa S
 * CreatedDate : Oct 4 2023
 * Description  : This is the interface filr for vendor List
 */
export interface ListVendorInterface {
    configs: {
        'data-testid': string
        functionObject: any
        filter: any
    }
    data: {
        vendorList: Array<any>
        vendorCount: number
        VendorListColumnDetail: Array<any>
    }
}