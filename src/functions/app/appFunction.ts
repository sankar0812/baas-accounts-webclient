/**
 * CreatedBy    : Uma Kohila
 * CreatedDate  : Sep 25 2023
 * ModifiedBy   : Uma Kohila
 * ModifiedDate : Sep 25 2023
 * Description  : This file contains Service Create component
 */

// Import all the neccessary files in header
import { AppApi } from "@/apis/app/appApi";
import { Constants } from "@/utils/Constants";
import AppStore from "../../../appstorefile";

// Initialize the required files as a objects 
const appApi = new AppApi();
const constants = new Constants();
const appstore = new AppStore();

// Export the API request as a Function
export class AppFunction {
    async readModules() {
        let moduleRequestBody = {
            "ApplicationKey": appstore?.APPLICATION?.APPLICATION_KEY,
            "ApplicationServiceKey": appstore?.APPLICATION?.APPLICATION_SERVICE_KEY,
            "ModuleTypeCode": constants?.MODULE_TYPE_CODES?.MODULE_TYPE_CODE_SIDEBAR
        }
        return await appApi?.readModules(moduleRequestBody)
    }
}
