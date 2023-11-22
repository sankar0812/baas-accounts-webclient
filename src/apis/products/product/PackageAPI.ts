/**
 * Created By    : Pradeepa S
 * Created Date  : Nov 09 2023 
 * Modified By   : Venugopal
 * Modified Date : Nov 14 2023
 * Description   : This file contain API for package module
 */

import { Endpoints } from "@/utils/Endpoints";
import AppStore from "../../../../appstorefile";
import { AxiosServer } from "@/utils/AxiosServer";
import { AxiosClient } from "@/utils/Axios";

const endPoints = new Endpoints()
const appStore = new AppStore()
const axiosServer = new AxiosServer();
const axiosClient = new AxiosClient();



export class PackageAPI {

    async readPackageTypessSSR(packageTypeReq: any) {
        return await axiosServer?.post(
            appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL_SERVER + endPoints?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_PACKAGE_TYPE,
            packageTypeReq,
            {},
            {
                username: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                password: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
            }
        )
    }
    async readPackageType(packageTypeReq: any) {
        return await axiosClient?.post(
            appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL + endPoints?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_PACKAGE_TYPE,
            packageTypeReq,
            {},
            {
                username: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                password: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
            }
        )
    }
    async readPackageTypeCountSSR(readPackageTypeCount: any) {
        return await axiosServer?.post(
            appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL_SERVER + endPoints?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_PACKAGE_TYPE_COUNT,
            readPackageTypeCount,
            {},
            {
                username: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                password: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
            }
        )
    }

    async readPackageTypeCount(readPackageTypeCount: any) {
        return await axiosServer?.post(
            appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL + endPoints?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_PACKAGE_TYPE_COUNT,
            readPackageTypeCount,
            {},
            {
                username: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                password: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
            }
        )
    }

    async readPackageTypes(packageTypeReq: any) {
        return await axiosClient?.post(
            appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL + endPoints?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_PACKAGE_TYPE,
            packageTypeReq,
            {},
            {
                username: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                password: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
            }
        )
    }

}