/**
* CreatedBy    : Uma Kohila
* CreatedDate  : Oct 11 2023
* ModifiedBy   : Uma Kohila
* ModifiedDate : Oct 11 2023
* Description  : This file contains products module api's
*/

// Import all the neccessary files in header
import AppStore from '../../../../appstorefile';
import { AxiosClient } from '@/utils/Axios';
import { AxiosServer } from '@/utils/AxiosServer';
import { Endpoints } from '@/utils/Endpoints';

// Initialize the required files as a objects
const appStore = new AppStore();
const endPoints = new Endpoints();
const axiosClient = new AxiosClient();
const axiosServer = new AxiosServer();

export class ProductApi {
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

    async readProduct(productreq: any) {
        return await axiosClient?.post(
            appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL + endPoints?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_PRODUCTS,
            productreq,
            {},
            {
                username: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                password: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
            }
        )
    }

    async readAppSettingUom(UoMReq: any) {
        return await axiosServer?.post(
            appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL_SERVER + endPoints?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_APPSEETINGUOM,
            UoMReq,
            {},
            {
                username: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                password: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
            }
        )
    }

    async readProductCountSSR(readProductCount: any) {
        return await axiosServer?.post(
            appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL_SERVER + endPoints?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_PRODUCTS_COUNT,
            readProductCount,
            {},
            {
                username: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                password: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
            }
        )
    }

    async readProductCount(readProductCount: any) {
        return await axiosServer?.post(
            appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL + endPoints?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_PRODUCTS_COUNT,
            readProductCount,
            {},
            {
                username: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                password: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
            }
        )
    }

    async readProductPackagesSSR(packageReq: any) {
        return await axiosServer?.post(
            appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL_SERVER + endPoints?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_PRODUCT_PACKAGE,
            packageReq,
            {},
            {
                username: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                password: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
            }
        )
    }

    async readProductPackages(packageReq: any) {
        return await axiosClient?.post(
            appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL + endPoints?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_PRODUCT_PACKAGE,
            packageReq,
            {},
            {
                username: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                password: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
            }
        )
    }

    async addProduct(productReq: any) {
        return await axiosClient?.post(
            appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL + endPoints?.ACCOUNTS_REST_BUSINESS_ENDPOINTS?.ENDPOINT_ADD_PRODUCT,
            productReq, // request Body
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

    async changeParentProduct(changeBaseProductReq: any) {
        return await axiosClient?.post(
            appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL + endPoints?.ACCOUNTS_REST_BUSINESS_ENDPOINTS?.ENDPOINT_CHANGE_PARENT_PRODUCT,
            changeBaseProductReq, {
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

    async addProductPackage(productPackageReq: any) {
        return await axiosClient?.post(
            appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL + endPoints?.ACCOUNTS_REST_BUSINESS_ENDPOINTS?.ENDPOINT_ADD_PRODUCT_PACKAGE,
            productPackageReq, // request Body
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


    async updateProduct(updateProductReq: any) {
        return await axiosClient?.post(
            appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL + endPoints?.ACCOUNTS_REST_BUSINESS_ENDPOINTS?.ENDPOINT_EDIT_PRODUCT,
            updateProductReq,
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

    async removeProductPackage(removeProductPackage: any) {
        return await axiosClient?.post(
            appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL + endPoints?.ACCOUNTS_REST_BUSINESS_ENDPOINTS?.ENDPOINT_REMOVE_PRODUCT_PACKAGE,
            removeProductPackage, // request Body
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

    async readProductWithFilter(filterReq: any) {
        return await axiosClient?.post(
            appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL + endPoints?.ACCOUNTS_REST_BUSINESS_ENDPOINTS?.ENDPOINT_READ_PRODUCT_USING_FILTER,
            filterReq, // request Body
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

    async enablePurchaseProduct(enablePurchaseReq: any) {
        return await axiosClient?.post(
            appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL + endPoints?.ACCOUNTS_REST_BUSINESS_ENDPOINTS?.ENDPOINT_ENABLE_PURCHASE_PRODUCT,
            enablePurchaseReq,
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


    async disablePurchaseProduct(disablePurchaseReq: any) {
        return await axiosClient?.post(
            appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL + endPoints?.ACCOUNTS_REST_BUSINESS_ENDPOINTS?.ENDPOINT_DISABLE_PURCHASE_PRODUCT,
            disablePurchaseReq,
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

    async enableSaleProduct(enableSaleReq: any) {
        return await axiosClient?.post(
            appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL + endPoints?.ACCOUNTS_REST_BUSINESS_ENDPOINTS?.ENDPOINT_ENABLE_SALE_PRODUCT,
            enableSaleReq,
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

    async disableSaleProduct(disableSaleReq: any) {
        return await axiosClient?.post(
            appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL + endPoints?.ACCOUNTS_REST_BUSINESS_ENDPOINTS?.ENDPOINT_DISABLE_SALE_PRODUCT,
            disableSaleReq,
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

    async enableProductAvailability(enableavailabilityReq: any) {
        return await axiosClient?.post(
            appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL + endPoints?.ACCOUNTS_REST_BUSINESS_ENDPOINTS?.ENDPOINT_ENABLE_PRODUCT_AVAILABILITY,
            enableavailabilityReq,
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


    async disableProductAvailability(disableavailabilityReq: any) {
        return await axiosClient?.post(
            appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL + endPoints?.ACCOUNTS_REST_BUSINESS_ENDPOINTS?.ENDPOINT_DISABLE_PRODUCT_AVAILABILITY,
            disableavailabilityReq,
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
}