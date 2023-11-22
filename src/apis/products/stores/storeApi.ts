/**
 * 
 * @CreatedBy   : kannan
 * @CreatedTime : Nov 8 2023
 * @description : This file contains Api for Store
 */


import { Endpoints } from "@/utils/Endpoints";
import { AxiosClient } from "@/utils/Axios";;
import { AxiosServer } from "@/utils/AxiosServer";
import AppStore from "../../../../appstorefile";

const axiosServer = new AxiosServer();
const axiosClient = new AxiosClient();
const appStore = new AppStore();
const endpoints = new Endpoints();

export class ListStoreApi {

    async readListStore(request: any) {
        return axiosClient?.post(appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL + endpoints?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_STORES,
            request,
            {},
            {
                username: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                password: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
            }

        )
    }

    async readListStoreSSR(request: any) {
        return axiosServer?.post(appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL_SERVER + endpoints?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_STORES,
            request,
            {},
            {
                username: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                password: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
            }

        )
    }

    async readStoreTypeSSR(storeTypeReq: any) {
        return axiosServer?.post(appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL_SERVER + endpoints?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_STORE_TYPE,
            storeTypeReq,
            {},
            {
                username: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                password: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
            }

        )
    }


    async readStoresSSRCount(storeCountReq: any) {
        return await axiosServer?.post(
            appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL_SERVER + endpoints?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENPOINTS_READ_STORES_COUNT,
            storeCountReq,
            {},
            {
                username: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                password: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
            }
        )
    }

    async readStoresCount(storeCountReq: any) {
        return await axiosClient?.post(
            appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL + endpoints?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENPOINTS_READ_STORES_COUNT,
            storeCountReq,
            {},
            {
                username: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                password: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
            }
        )
    }

    async addStore(storereq: any) {
        return await axiosClient?.post(
            appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL + endpoints?.ACCOUNTS_REST_BUSINESS_ENDPOINTS?.ENDPOINT_ADD_STORE,
            storereq,
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

    async readStorePriceListSSSR(request: any) {
        return axiosServer?.post(appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL_SERVER + endpoints?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENPOINT_READ_STOREPRICELIST,
            request,
            {},
            {
                username: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                password: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
            }
        )
    }
    async readStorePriceLists(request: any) {
        return axiosClient?.post(appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL + endpoints?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENPOINT_READ_STOREPRICELIST,
            request,
            {},
            {
                username: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                password: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
            }
        )
    }
    async updateStore(request: any) {
        return await axiosClient?.post(appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL + endpoints?.ACCOUNTS_REST_BUSINESS_ENDPOINTS?.ENDPOINT_UPDATE_STORE,
            request,
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
            })
    }

    async addPriceListToTheStore(request: any) {
        return await axiosClient?.post(appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL + endpoints?.ACCOUNTS_REST_BUSINESS_ENDPOINTS?.ENDPOINT_ADD_PRICELIST_TO_STORE,
            request,
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
            })
    }
}

