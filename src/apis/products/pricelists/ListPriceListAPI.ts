/**
@CreatedBy    : Vinoth 
@CreatedDate  : Nov 08 2023
@ModifiedBy   : Vneugopal
@ModifiedDate : Nov 16 2023
@Description  : This is the API file for PriceList List
**/

import AppStore from '../../../../appstorefile'
import { Endpoints } from '@/utils/Endpoints';
import { AxiosServer } from '@/utils/AxiosServer';
import { AxiosClient } from '@/utils/Axios';


const appstore = new AppStore()
const endpoint = new Endpoints()
const axiosserver = new AxiosServer()
const axiosClient = new AxiosClient()
export class ListPriceListApi {

    async readPriceListsSSR(PriceListCountReq: any) {
        return await axiosserver?.post(
            appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL_SERVER + endpoint?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_PRICELISTS,
            PriceListCountReq,
            {},
            {
                username: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                password: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
            }
        )

    }
    async readPriceLists(PriceListCountReq: any) {
        return await axiosClient?.post(
            appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL + endpoint?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_PRICELISTS,
            PriceListCountReq,
            {},
            {
                username: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                password: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
            }
        )

    }

    async readPriceListsSSRCount(PriceListCountReq: any) {
        return await axiosserver?.post(
            appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL_SERVER + endpoint?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_PRICELISTSCOUNT,
            PriceListCountReq,
            {},
            {
                username: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                password: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
            }
        )
    }


    async readPriceListCount(PriceListCountReq: any) {
        return await axiosClient?.post(
            appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL + endpoint?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_PRICELISTSCOUNT,
            PriceListCountReq,
            {},
            {
                username: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                password: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
            }
        )

    }
    async readPriceList(PriceListreq: any) {
        return await axiosserver?.post(
            appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL_SERVER + endpoint?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_PRICELISTS,
            PriceListreq,
            {},
            {
                username: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                password: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
            }
        )
    }
    async readPriceListStatussSSR(PriceListCountReq: any) {
        return await axiosserver?.post(
            appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL_SERVER + endpoint?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_PRICELISTSTATUS,
            PriceListCountReq,
            {},
            {
                username: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                password: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
            }
        )

    }
    async readPriceListStatus(PriceListCountReq: any) {
        return await axiosClient?.post(
            appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL_SERVER + endpoint?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_PRICELISTSTATUS,
            PriceListCountReq,
            {},
            {
                username: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                password: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
            }
        )
    }
    async readPriceListIteamsSSR(PriceListCountReq: any) {
        return await axiosserver?.post(
            appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL_SERVER + endpoint?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_PRICELISTSITEAM,
            PriceListCountReq,
            {},
            {
                username: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                password: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
            }
        )

    }
    async AddproductPriceList(PriceListCountReq: any) {
        return await axiosClient?.post(
            appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL + endpoint?.ACCOUNTS_REST_BUSINESS_ENDPOINTS?.ENDPOINT_ADD_PRODUCT_PRICELIST,
            PriceListCountReq,
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
    async updateProductPriceList(PriceListCountReq: any) {
        return await axiosClient?.patch(
            appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL + endpoint?.ACCOUNTS_REST_BUSINESS_ENDPOINTS?.ENDPOINT_ADD_PRODUCT_PRODUCTPRICELIST,
            PriceListCountReq,
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
    async removeProductPriceList(PriceListCountReq: any) {
        return await axiosClient?.patch(
            appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL + endpoint?.ACCOUNTS_REST_BUSINESS_ENDPOINTS?.ENDPOINT_REMOVE_PRODUCT_PRICE_LIST,
            PriceListCountReq,
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
    async readPriceListIteams(PriceListCountReq: any) {
        return await axiosClient?.post(
            appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL + endpoint?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_PRICELISTSITEAM,
            PriceListCountReq,
            {},
            {
                username: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                password: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
            }
        )

    }
    async updateEditPriceList(PriceListCountReq: any) {
        return await axiosClient?.patch(
            appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL + endpoint?.ACCOUNTS_REST_BUSINESS_ENDPOINTS?.ENDPOINT_EDIT_PRICELIST,
            PriceListCountReq,
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
    async statusChangePriceList(PriceListCountReq: any) {
        return await axiosClient?.patch(
            appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL + endpoint?.ACCOUNTS_REST_BUSINESS_ENDPOINTS?.ENDPOINT_STATUS_PRICELIST,
            PriceListCountReq,
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

    async addProductPriceListFunction(customerReq: any) {
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

}