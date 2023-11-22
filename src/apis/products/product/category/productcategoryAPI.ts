/**
* CreatedBy    : Uma Kohila
* CreatedDate  : Nov 08 2023
* ModifiedBy   : Uma Kohila
* ModifiedDate : Nov 08 2023
* Description  : This file contains products Category module api's
*/

import AppStore from '../../../../../appstorefile';
import { Endpoints } from '@/utils/Endpoints';
import { AxiosClient } from '@/utils/Axios';
import { AxiosServer } from '@/utils/AxiosServer';


const appstore = new AppStore()
const endpoint = new Endpoints()
const axiosclient = new AxiosClient()
const axiosserver = new AxiosServer()

export class CategoriesApi {

    async readCategoriesSSR(categoriesListReq: any) {
        return await axiosserver?.post(
            appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL_SERVER + endpoint?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_CATEGORIES,
            categoriesListReq,
            {},
            {
                username: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                password: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
            }
        )
    }

    async readProductCategoriesSSR(categoriesListReq: any) {
        return await axiosserver?.post(
            appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL_SERVER + endpoint?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_PRODUCT_CATEGORY,
            categoriesListReq,
            {},
            {
                username: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                password: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
            }
        )
    }

    async readProductCategories(categoriesListReq: any) {
        return await axiosclient?.post(
            appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL + endpoint?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_PRODUCT_CATEGORY,
            categoriesListReq,
            {},
            {
                username: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                password: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
            }
        )
    }

    async addCategoryToTheProduct(categoryReq: any) {
        return await axiosclient?.post(
            appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL + endpoint?.ACCOUNTS_REST_BUSINESS_ENDPOINTS?.ENDPOINT_ADD_CATEGORY_TO_THE_PRODUCT,
            categoryReq, // request Body
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

    async removeCategoryToTheProduct(categoryReq: any) {
        return await axiosclient?.post(
            appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL + endpoint?.ACCOUNTS_REST_BUSINESS_ENDPOINTS?.ENDPOINT_REMOVE_CATEGORY_TO_THE_PRODUCT,
            categoryReq, // request Body
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
