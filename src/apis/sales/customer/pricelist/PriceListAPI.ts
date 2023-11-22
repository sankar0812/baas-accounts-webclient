
// CreatedBy; Sredhar A
// CreatedDate: Oct 12 2023
// Description: This is the API file for PriceList


import AppStore from '../../../../../appstorefile';
import { Endpoints } from '@/utils/Endpoints';
import { AxiosServer } from '@/utils/AxiosServer';
import { AxiosClient } from '@/utils/Axios';


const appstore = new AppStore()
const endpoint = new Endpoints()
const axiosserver = new AxiosServer()
const axiosClient = new AxiosClient();

export class PriceListApi {
    async readPriceListsSSR(customerListReq: any) {
        return await axiosserver?.post(
            appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL_SERVER + endpoint?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENPOINT_READ_PRICELIST,
            customerListReq,
            {},
            {
                username: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                password: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
            }
        )
    }

    async readPriceListStatusListsSSR(customerListReq: any) {
        return await axiosserver?.post(
            appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL_SERVER + endpoint?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_PRICE_LIST_STATUS,
            customerListReq,
            {},
            {
                username: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                password: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
            }
        )
    }

    async addPriceListFunction(customerReq: any) {
        return await axiosClient?.post(
            appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL + endpoint?.ACCOUNTS_REST_BUSINESS_ENDPOINTS?.ENDPOINT_ADD_PRICELIST,
            customerReq,
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

    async addPriceListwithCustomerAccountID(customerReq: any) {
        return await axiosClient?.post(
            appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL + endpoint?.ACCOUNTS_REST_BUSINESS_ENDPOINTS?.ENDPOINT_CREATE_PRICELIST_TO_THE_CUSTOMER,
            customerReq,
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