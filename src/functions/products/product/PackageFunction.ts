/**
 * Created BY   : Pradeepa S
 * Created Date : Nov 09 2023
 * Modified By  : Venugopal
 * Modified Dtae: Nov 14 2023
 * Description  : This file contain function for a package module
 */
import { PackageAPI } from "@/apis/products/product/PackageAPI";

const packageAPI = new PackageAPI()

export class PackageFunction {
    async readPackageTypesSSR() {
        let request = {
            "filter": {
                "IsDeleted": false
            },
            "fields": {},
            "page": 0,
            "limit": 10,
            "sort": {}
        }
        return await packageAPI?.readPackageTypessSSR(request)
    }
    async readPackageType(searchTerm: any, sortReq: any, pageno: number) {
        let packageTypeReq = {
            "filter": {
                "OR": [
                    {
                        "PackageType": {
                            "contains": searchTerm,
                            "mode": 'insensitive'
                        }
                    },
                    {
                        "PackageTypeCode": {
                            "contains": searchTerm,
                            "mode": 'insensitive'
                        }
                    }
                ],
                "IsDeleted": false,
            },
            "fields": {
                
            },
            "page": pageno,
            "limit": 10,
            "sort": sortReq,
        };
        return await packageAPI?.readPackageType(packageTypeReq);
    }

    async readPackageTypeCountSSR() {
        let readPackageTypeCount = {
            "filter": {
                "IsDeleted": false
            }
        }
        return await packageAPI?.readPackageTypeCountSSR(readPackageTypeCount)
    }


    async readPackageTypeCount(packageTypeReq: any) {
        let readPackageTypeCount = {
            "filter": {
                "OR": [
                    {
                        "PackageType": {
                            "contains": packageTypeReq,
                            "mode": 'insensitive'
                        }
                    },
                    {
                        "PackageTypeCode": {
                            "contains": packageTypeReq,
                            "mode": 'insensitive'
                        }
                    }
                ]
            }
        }
        return await packageAPI?.readPackageTypeCount(readPackageTypeCount)
    }
}