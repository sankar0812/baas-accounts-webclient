/**
 * CreatedBy : Sreedhar
 * Createddate : Oct 12 2023
 * Decription : This is the function file for Currency 
 */
import { CurrencyApi } from "@/apis/currency/currencyApi";
const currencyApi = new CurrencyApi()
export class CurrencyFunction {

    async readCurrencySSR() {
        let request = {
            "filter": {
                "IsDeleted": false
            },
            "fields": {
            },
            "page": 0,
            "limit": 10,
            "sort": { "CreatedDate": "desc" }
        }
        return await currencyApi?.readCurrencySSR(request)
    }
}