/** 
 * CreatedBy   ; Uma Kohila
 * CreatedDate : Nov 16 2023
 * Description : This is the API file for App Settings API's
 */

import AppStore from '../../../appstorefile';
import { Endpoints } from '@/utils/Endpoints';
import { AxiosClient } from '@/utils/Axios';


const appstore = new AppStore()
const endpoint = new Endpoints()
const axiosclient = new AxiosClient()

export class AppSettingsAPI {
    async readAppSettingsNetTerm(customerListReq: any) {
        return await axiosclient?.post(
            appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL_SERVER + endpoint?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_APP_SETTINGS_NET_TERM,
            customerListReq,
            {},
            {
                username: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                password: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
            }
        )
    }

}
