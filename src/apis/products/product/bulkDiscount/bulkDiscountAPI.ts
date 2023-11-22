/**
* CreatedBy    : Uma Kohila
* CreatedDate  : Nov 08 2023
* ModifiedBy   : Uma Kohila
* ModifiedDate : Nov 08 2023
* Description  : This file contains products module api's
*/

// Import all the neccessary files in header
import AppStore from '../../../../../appstorefile';
import { AxiosClient } from '@/utils/Axios';
import { AxiosServer } from '@/utils/AxiosServer';
import { Endpoints } from '@/utils/Endpoints';

// Initialize the required files as a objects
const appStore = new AppStore();
const endPoints = new Endpoints();
const axiosClient = new AxiosClient();
const axiosServer = new AxiosServer();

export class BulkDiscountApi {
    async createProductBulkDiscount(productreq: any) {
        return await axiosClient?.post(
            appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL + endPoints?.ACCOUNTS_REST_BUSINESS_ENDPOINTS?.ENDPOINT_CREATE_BULKDISCOUNT,
            productreq,
            {
                TenantKey: "TENANT-KEY-001",
                MerchantKey: "MERCHANT-KEY-001",
                AuthKey: "NULL",
                ContactPersonKey: "NULL",
                ApplicationKey: "APPLICATION-KEY",
                InstanceKey: "INSTANCE-KEY"
            },
            {
                username: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                password: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
            }
        )
    }

    async readProductSSR(productsreq: any) {
        return await axiosServer?.post(
            appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL_SERVER + endPoints?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_PRODUCTS,
            productsreq,
            {},
            {
                username: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                password: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
            }
        )
    }
    async readProductBulkDiscounts(productsreq: any) {
        return await axiosClient?.post(
            appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL + endPoints?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_PRODUCT_BULK_DISCOUNT,
            productsreq,
            {},
            {
                username: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                password: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
            }
        )
    }
}