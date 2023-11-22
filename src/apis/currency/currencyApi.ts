/** 
 * CreatedBy ; Sreedhar
 * CreatedDate : Oct 10 2023
 * Description : This is the API file for customers
 */

import AppStore from '../../../appstorefile';
import { Endpoints } from '@/utils/Endpoints';
import { AxiosServer } from '@/utils/AxiosServer';
const appstore = new AppStore()
const endpoint = new Endpoints()
const axiosserver = new AxiosServer()
export class CurrencyApi {
    async readCurrencySSR(currencyReq: any) {
        return await axiosserver?.post(
            appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL_SERVER + endpoint?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_CURRENCIES,
            currencyReq,
            
            {},
            {
                username: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                password: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
            }
        )
    }
}

