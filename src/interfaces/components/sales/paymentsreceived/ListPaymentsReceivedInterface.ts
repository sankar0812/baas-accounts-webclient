/**
* CreatedBy    : Uma Kohila
* CreatedDate  : Oct 05 2023
* ModifiedBy   : Uma Kohila
* ModifiedDate : Oct 05 2023
* Description  : This file contains List paymentsReceived interface
*/

export interface ListPaymentsRecivedInterface {
    configs: {
        'data-testid': string,
        functObj: any,
        filter: any
    },
    data: {
        paymentsreceivedLists: Array<any>
        paymentsReceivedCount: number
        paymentsReceivedListcolumnDetail: Array<any>
    }
    callbacks?: {
    }
}