/** 
 * CreatedBy ; HariPrakash
 * CreatedDate : Oct 10 2023
 * Description : This is the API file for customers Card Info
 */

import AppStore from '../../../../../appstorefile';
import { Endpoints } from '@/utils/Endpoints';
import { AxiosClient } from '@/utils/Axios';
import { AxiosServer } from '@/utils/AxiosServer';


const appstore = new AppStore()
const endpoint = new Endpoints()
const axiosclient = new AxiosClient()
const axiosserver = new AxiosServer()

export class CustomerAccountCardInfoApi {

     async readCustomerAccountCardInfoSSR(customerListReq: any) {
          return await axiosserver?.post(
               appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL_SERVER + endpoint?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENPOINT_READ_CUSTOMERS_ACCOUNTS,
               customerListReq,
               {
                    TenantKey: "TENANT-KEY-001",
                    MerchantKey: "MERCHANT-KEY-001",
                    AuthKey: "NULL",
                    ContactPersonKey: "NULL",
                    ApplicationKey: "APPLICATION-KEY",
                    InstanceKey: "INSTANCE-KEY"
               },
               {
                    username: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                    password: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
               }
          )
     }

     async readCustomerAccountCardInfo(customerListReq: any) {
          return await axiosclient?.post(
               appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL + endpoint?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENPOINT_READ_CUSTOMERS_ACCOUNTS,
               customerListReq,
               {
                    TenantKey: "TENANT-KEY-001",
                    MerchantKey: "MERCHANT-KEY-001",
                    AuthKey: "NULL",
                    ContactPersonKey: "NULL",
                    ApplicationKey: "APPLICATION-KEY",
                    InstanceKey: "INSTANCE-KEY"
               },
               {
                    username: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                    password: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
               }
          )
     }
     

}
