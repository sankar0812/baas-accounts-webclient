/**
 * CreatedBy ; Pradeepa S
 * CreatedDate : Oct 10 2023
 * Description : This is the API file for customers
 */

import AppStore from '../../../../appstorefile';
import { Endpoints } from '@/utils/Endpoints';
import { AxiosClient } from '@/utils/Axios';
import { AxiosServer } from '@/utils/AxiosServer';


const appstore = new AppStore()
const endpoint = new Endpoints()
const axiosclient = new AxiosClient()
const axiosserver = new AxiosServer()

export class CustomersApi {

     async readCustomersSSR(customerListReq: any) {
          return await axiosserver?.post(
               appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL_SERVER + endpoint?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_CUSTOMERS,
               customerListReq,
               {},
               {
                    username: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                    password: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
               }
          )
     }

     async readCustomerAccountssSSR(customerListReq: any) {
          return await axiosserver?.post(
               appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL_SERVER + endpoint?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_CUSTOMER_ACCOUNT,
               customerListReq,
               {},
               {
                    username: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                    password: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
               }
          )
     }

     async readPriceListsWithCustomerAccountIDSSR(customerListReq: any) {
          return await axiosserver?.post(
               appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL_SERVER + endpoint?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_PRICE_LIST_WITH_CUSTOMER_ACCOUNTS,
               customerListReq,
               {},
               {
                    username: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                    password: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
               }
          )
     }

     async readPriceListsWithCustomerAccountID(customerListReq: any) {
          return await axiosclient?.post(
               appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL + endpoint?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_PRICE_LIST_WITH_CUSTOMER_ACCOUNTS,
               customerListReq,
               {},
               {
                    username: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                    password: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
               }
          )
     }

     async readCustomers(customerListReq: any) {
          return await axiosclient?.post(
               appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL + endpoint?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_CUSTOMERS,
               customerListReq,
               {},
               {
                    username: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                    password: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
               }
          )
     }

     async readCustomersSSRCount(customerCountReq: any) {
          return await axiosserver?.post(
               appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL_SERVER + endpoint?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_CUSTOMERS_COUNT,
               customerCountReq,
               {},
               {
                    username: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                    password: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
               }
          )
     }

     async readCustomersCount(customerCountReq: any) {
          return await axiosclient?.post(
               appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL + endpoint?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_CUSTOMERS_COUNT,
               customerCountReq,
               {},
               {
                    username: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                    password: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
               }
          )
     }

     async readCustomersContactSSR(customerContactReq: any) {
          return await axiosserver?.post(
               appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL_SERVER + endpoint?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_CUSTOMERS_CONTACT,
               customerContactReq,
               {},
               {
                    username: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                    password: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
               }
          )
     }


     async readCustomersContact(customerContactReq: any) {
          return await axiosclient?.post(
               appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL_SERVER + endpoint?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_CUSTOMERS_CONTACT,
               customerContactReq,
               {},
               {
                    username: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                    password: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
               }
          )
     }


}
