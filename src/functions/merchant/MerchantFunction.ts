/**
 * CreatedBy : Pradeepa S
 * Createddate : Oct 13 2023
 * Decription : This is the function file for Merchant
 */
import { MerchantsApi } from "@/apis/merchant/MerchantAPI"

const merchantsApi = new MerchantsApi


export class MerchantFunction {

    async readmerchantsSSR(){
        let request = {
            "filter": {},
            "fields": {},
            "page": 0,
            "limit": 100,
            "sort": {}
        }
        return await merchantsApi?.readmerchantsSSR(request)
    }
}

