/**
* CreatedBy    : Uma Kohila
* CreatedDate  : Nov 08 2023
* ModifiedBy   : Uma Kohila
* ModifiedDate : Nov 08 2023
* Description  : This file contains products module Functions
*/

// Import all the neccessary files in header
import { BulkDiscountApi } from "@/apis/products/product/bulkDiscount/bulkDiscountAPI";

// Initialize the required files as a objects
const bulkDiscountApi = new BulkDiscountApi();

export class BulkDiscountFunction {

    async createProductBulkDiscount(request: any) {
        return await bulkDiscountApi?.createProductBulkDiscount(request);
    }

    async readProductSSR(productid: any) {
        let productsReq = {
            "filter": {
                "ProductID": parseInt(productid),
                "IsDeleted": false
            },
            "fields": {},
            "page": 0,
            "limit": 1000,
            "sort": {
                "CreatedDate": "desc"
            }
        };
        return await bulkDiscountApi?.readProductSSR(productsReq);
    }
    async readProductBulkDiscounts(productid: number) {
        let productsReq = {
            "filter": {
                "ProductID": productid,
                "IsDeleted": false
            },
            "fields": {},
            "page": 0,
            "limit": 100,
            "sort": {
                "ProductBulkDiscountID": "asc"
            }
        };
        return await bulkDiscountApi?.readProductBulkDiscounts(productsReq);
    }
}