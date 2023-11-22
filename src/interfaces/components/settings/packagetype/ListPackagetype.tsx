/**
* CreatedBy    : Venugopal
* CreatedDate  : Nov 10 2023
* Description  : This file contains packagetype interface
*/

export interface ListPackagetypeInterface {
    configs: {
        'data-testid': string,
        filter: any
    },
    data: {
        packagetypedata: Array<any>
        packagetypecount :number
    }
    callbacks?: {
    }
}