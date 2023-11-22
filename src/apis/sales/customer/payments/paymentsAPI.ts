/**
 * CreatedBy   : Muthumariappan
 * CreatedDate : Oct 19 2023
* ModifiedBy   : Muthumariappan 
* ModifiedDate : Oct 23 2023
 * Description : This is the API file for customers invoice payments
 */

import AppStore from '../../../../../appstorefile';
import { Endpoints } from '@/utils/Endpoints';
import { AxiosClient } from '@/utils/Axios';
import { AxiosServer } from '@/utils/AxiosServer';


const appstore = new AppStore()
const endpoint = new Endpoints()
const axiosclient = new AxiosClient()
const axiosserver = new AxiosServer()

export class PaymentApi {

    async readPaymentsSSR(listPaymentsReq: any) {
        return await axiosserver?.post(
            appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL_SERVER + endpoint?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENPOINT_READ_INVOICE_PAYMENTS,
            listPaymentsReq,
            {},
            {
                username: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                password: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
            }
        )
    }



    async readPayments(listPaymentsReq: any) {
        return await axiosclient?.post(
            appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL + endpoint?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENPOINT_READ_INVOICE_PAYMENTS,
            listPaymentsReq,
            {},
            {
                username: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                password: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
            }
        )
    }



    async readPaymentsCountSSR(countPaymentsReq: any) {
        return await axiosserver?.post(
            appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL_SERVER + endpoint?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.READ_PAYMENTS_RECEIVED_COUNT,
            countPaymentsReq,
            {},
            {
                username: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                password: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
            }
        )
    }



    async readPaymentsCount(countPaymentsReq: any) {
        return await axiosclient?.post(
            appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL + endpoint?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.READ_PAYMENTS_RECEIVED_COUNT,
            countPaymentsReq,
            {},
            {
                username: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                password: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
            }
        )
    }

    async readPaymentMethodsSSR(customerReq: any) {
        return await axiosserver?.post(
            appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL_SERVER + endpoint?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_PAYMENT_METHOD,
            customerReq,
            {},
            {
                username: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                password: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
            }
        )
    }

    async readPaymentMethods(customerReq: any) {
        return await axiosserver?.post(
            appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL + endpoint?.ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS?.ENDPOINT_READ_PAYMENT_METHOD,
            customerReq,
            {},
            {
                username: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_USERNAME,
                password: appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_PASSWORD
            }
        )
    }

    async recordPaymentFunction(customerReq: any) {
        return await axiosserver?.post(
            appstore?.ACCOUNTS?.ACCOUNTS_GATEWAY_URL + endpoint?.ACCOUNTS_REST_BUSINESS_ENDPOINTS?.ENDPOINT_RECORD_PAYMENT,
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