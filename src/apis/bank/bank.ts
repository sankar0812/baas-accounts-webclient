/**
* CreatedBy    : Sreedhar A
* CreatedDate  : Oct 04 2023
* ModifiedBy   : Muthumariappan G
* ModifiedDate : Oct 09 2023
* Description  : This file contains paymentpaid api's
*/

// Import all the neccessary files in header

import { Endpoints } from "@/utils/Endpoints";
import AppStore from "../../../appstorefile";
import { AxiosServer } from "@/utils/AxiosServer";
import { AxiosClient } from '@/utils/Axios';


// Initialize the required files as a objects

const axiosClient = new AxiosClient()
const axiosServer = new AxiosServer()
const endpoints = new Endpoints()
const appStore = new AppStore()


export class BankApi {
    async readBanksSSR(bankListReq: any) {
        return await axiosServer?.post(
            appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL_SERVER + endpoints?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_BANKS,
            bankListReq,
            {},
            {
                username: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                password: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
            }
        )
    }

    async readBanks(bankListReq: any) {
        return await axiosClient?.post(
            appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL + endpoints?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_BANKS,
            bankListReq,
            {},
            {
                username: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                password: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
            }
        )
    }

    async readBanksSSRCount(bankCountReq: any) {
        return await axiosServer?.post(
            appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL_SERVER + endpoints?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_BANKS_COUNT,
            bankCountReq,
            {},
            {
                username: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                password: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
            }
        )
    }

    async readBanksCount(bankCountReq: any) {
        return await axiosClient?.post(
            appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL + endpoints?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_BANKS_COUNT,
            bankCountReq,
            {},
            {
                username: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                password: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
            }
        )
    }
    async readBankAccountSSR(bankCountReq: any) {
        return await axiosServer?.post(
            appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL_SERVER + endpoints?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_BANK_ACCOUNTS,
            bankCountReq,
            {},
            {
                username: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                password: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
            }
        )
    }


}

