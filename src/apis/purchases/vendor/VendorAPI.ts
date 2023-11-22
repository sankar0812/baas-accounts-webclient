/**
 * CreatedBy ; Pradeepa S
 * CreatedDate : Oct 4 2023
 * Description : This is the API file for vendors
 */

import AppStore from '../../../../appstorefile';
import { Endpoints } from '@/utils/Endpoints';
import { AxiosClient } from '@/utils/Axios';
import { AxiosServer } from '@/utils/AxiosServer';


const appstore = new AppStore()
const endpoint = new Endpoints()
const axiosclient = new AxiosClient()
const axiosserver = new AxiosServer()
export class VendorsApi {

     async readVendorsSSR(vendorListReq: any) {
          return await axiosserver?.post(
               appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL_SERVER + endpoint?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_VENDORS,
               vendorListReq,
               {},
               {
                    username: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                    password: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
               }
          )
     }

     async readVendors(vendorListReq: any) {
          return await axiosclient?.post(
               appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL + endpoint?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_VENDORS,
               vendorListReq,
               {},
               {
                    username: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                    password: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
               }
          )
     }

     async readVendorsSSRCount(vendorCountReq: any) {
          return await axiosserver?.post(
               appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL_SERVER + endpoint?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_VENDORS_COUNT,
               vendorCountReq,
               {},
               {
                    username: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                    password: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
               }
          )
     }

     async readVendorsCount(vendorCountReq: any) {
          return await axiosclient?.post(
               appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL + endpoint?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_VENDORS_COUNT,
               vendorCountReq,
               {},
               {
                    username: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                    password: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
               }
          )
     }
}
