/**
 * CreatedBy   : Uma Kohila
 * Createddate : Nov 16 2023
 * Decription  : This is the function file for App Settings Functions
 */
import { AppSettingsAPI } from "@/apis/appsettings/appsettings";

const appSettingsApi = new AppSettingsAPI()

export class AppSettingsFunction {

    async readAppSettingsNetTerm() {
        let request = {
            "filter": {
                "IsDeleted": false
            },
            "fields": {},
            "page": 0,
            "limit": 10,
            "sort": { "CreatedDate": "desc" }
        }
        return await appSettingsApi?.readAppSettingsNetTerm(request);
    }
} 