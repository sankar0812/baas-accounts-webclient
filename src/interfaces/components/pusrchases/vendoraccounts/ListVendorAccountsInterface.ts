/**
@CreatedBy        : Muthumariappan G
@CreatedTime      : Oct 4 2023
@ModifiedBy       : Muthumariappan G
@ModifiedTime     : Oct 4 2023
@Description      : This is the interface file for list accounts
**/


export interface ListVendorAccountsInterface {
    configs: {
        dataTestID: string
    }
    data: {
        vendorAccountsListData: Array<any>
    }
    callbacks?: {
    }
}