/**
 * CreatedBy    : Uma Kohila
 * CreatedDate  : Sep 25 2023
 * ModifiedBy   : Uma Kohila
 * ModifiedDate : Sep 25 2023
 * Description  : This file contains Application common api's
 */

// Import all the neccessary files in header
import { AxiosClient } from "@/utils/Axios";
import Auth from "../../../appstorefile";
import { Endpoints } from "@/utils/Endpoints";

// Initialize the required files as a objects 
const axios = new AxiosClient();
const auth = new Auth();
const endpoints = new Endpoints();

// Export the API
export class AppApi {
    async readModules(RequestBody: object) {
        return await axios.post(auth?.AUTH?.AUTH_GATEWAY_URL + endpoints?.AUTH_REST_BUSINESS_ENDPOINTS?.AUTH_REST_BUSINESS_GET_MODULES,
            RequestBody, // request Body
            {
                // Declare the Business API Headers
                TenantKey: "TENANT-KEY-001",
                MerchantKey: "MERCHANT-KEY-001",
                AuthKey: "NULL",
                ContactPersonKey: "NULL",
                ApplicationKey: "APPLICATION-KEY",
                InstanceKey: "INSTANCE-KEY",
                ServiceLogEvent: "SERVICE-LOG-EVENT"
            },
            {
                // Declare the UserName and Password here for BasicAuthentication
                username: auth?.AUTH?.AUTH_GATEWAY_USERNAME,
                password: auth?.AUTH?.AUTH_GATEWAY_PASSWORD
            }
        )
    }
}