/** 
@CreatedBy ; HariPrakash
@CreatedDate : Oct 18 2023
@ModifiedBy   : Muthumariappan
@ModifiedDate : Oct 24 2023
@Description : This is the API file for AccountDetail
 */

import AppStore from '../../../../../appstorefile';
import { Endpoints } from '@/utils/Endpoints';
import { AxiosClient } from '@/utils/Axios';
import { AxiosServer } from '@/utils/AxiosServer';


const appstore = new AppStore()
const endpoint = new Endpoints()
const axiosclient = new AxiosClient()
const axiosserver = new AxiosServer()

export class ViewAccountDetailApi {

     async readViewAccountSSR(accountDetailReq: any) {
          return await axiosserver?.post(
               appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL_SERVER + endpoint?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENPOINT_READ_CUSTOMERS_ACCOUNTS,
               accountDetailReq,
               {},
               {
                    username: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                    password: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
               }
          )
     }
     async readCustomerTransactionSSR(transaction: any) {
        return await axiosserver?.post(
     appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL_SERVER + endpoint?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_CUSTOMER_TRANSACTION,
     transaction,
     {},
     {
          username: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
          password: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
     }
)
}

     async readViewAccount(accountDetailReq: any) {
          return await axiosclient?.post(
               appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL + endpoint?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENPOINT_READ_CUSTOMERS_ACCOUNTS,
               accountDetailReq,
               {},
               {
                    username: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                    password: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
               }
          )
     }


     async readViewAccountCardSSR(accountCardReq: any) {
          return await axiosserver?.post(
               appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL_SERVER + endpoint?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_CUSTOMER_ACCOUNT_CARD,
               accountCardReq,
               {},
               {
                    username: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                    password: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
               }
          )
     }

     async readViewAccountCard(accountCardReq: any) {
          return await axiosclient?.post(
               appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL + endpoint?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_CUSTOMER_ACCOUNT_CARD,
               accountCardReq,
               {},
               {
                    username: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                    password: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
               }
          )
     }
     
}
