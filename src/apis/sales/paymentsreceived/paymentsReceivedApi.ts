/**
* CreatedBy    : Uma Kohila
* CreatedDate  : Oct 05 2023
* ModifiedBy   : Uma Kohila
* ModifiedDate : Oct 05 2023
* Description  : This file contains paymentsReceived module api's
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

// Export the API
export class PaymentsReceivedApi {
    async readPaymentsReceivedSSR(paymentsreceivedreq: any) {
        return await axiosServer?.post(
            appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL_SERVER + endPoints?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_PYAMENTS_RECEIVED,
            paymentsreceivedreq,
            {},
            {
                username: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                password: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
            }
        )
    }

    async readPaymentsReceived(paymentsreceivedreq: any) {
        return await axiosClient?.post(
            appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL + endPoints?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_PYAMENTS_RECEIVED,
            paymentsreceivedreq,
            {},
            {
                username: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                password: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
            }
        )
    }

    async readPaymentsReceivedCountSSR(paymentsreceivedreq: any) {
        return await axiosServer?.post(
            appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL_SERVER + endPoints?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_PAYMENTS_RECEIVED_COUNT,
            paymentsreceivedreq,
            {},
            {
                username: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                password: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
            }
        )
    }

    async readPaymentsReceivedCount(paymentsreceivedreq: any) {
        return await axiosClient?.post(
            appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL + endPoints?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_PAYMENTS_RECEIVED_COUNT,
            paymentsreceivedreq,
            {},
            {
                username: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                password: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
            }
        )
    }

    async readPaymentMethodsSSR(customerReq: any)  {
        return await axiosServer?.post(
            appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL_SERVER + endPoints?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_PAYMENT_METHOD,
            customerReq,
            {},
            {
                username: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                password: appStore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
            }
        )
    }
}