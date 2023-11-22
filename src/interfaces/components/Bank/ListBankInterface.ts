/**
* CreatedBy    : Sreedhar A
* CreatedDate  : Oct 04 2023
* ModifiedBy   : Muthumariappan G
* ModifiedDate : Oct 09 2023
* Description  : This is the interface file for bank Lists 
*/

export interface BankTypeListInterface {
    configs: {
        'data-testid': string
        functionObject : any
        filter: any
    }
    data: {
        bankList: Array<any>
        bankCount: number
        BankListColumnDetail: Array<any>
    }
}