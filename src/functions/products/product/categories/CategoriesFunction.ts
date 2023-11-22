/*
* CreatedBy     : Muthumariappan
* Createddate   : Nov 7 2023
* ModifiedBy    : Uma Kohila
* ModifiedDate  : Nov 14 2023
* Decription    : This is the function file for Products Categories Lists
*/


import { CategoriesApi } from "@/apis/products/product/category/productcategoryAPI";

const categoriesApi = new CategoriesApi()

export class CategoriesFunction {

    async readCategoriesforProductEditSSR() {
        let request = {
            "filter": {
                "IsDeleted": false
            },
            "fields": {},
            "page": 0,
            "limit": 100,
            "sort": { "CreatedDate": "desc" }
        }
        return await categoriesApi?.readCategoriesSSR(request)
    }

    async readCategoriesforProductIDSSR(ProductID: any) {
        let request = {
            "filter": {
                "IsDeleted": false,
                "ProductID": ProductID
            },
            "fields": {
                "ProductCategoryID": true,
                "ProductID": true,
                "CategoryID": true,
                "Remarks": true,
                "Category": {
                    "select": {
                        "CategoryName": true
                    }
                }
            },
            "page": 0,
            "limit": 100,
            "sort": { "CreatedDate": "desc" }
        }
        return await categoriesApi?.readProductCategoriesSSR(request)
    }

    async readCategoriesforProductID(ProductID: any) {
        let request = {
            "filter": {
                "IsDeleted": false,
                "ProductID": ProductID
            },
            "fields": {
                "ProductCategoryID": true,
                "ProductID": true,
                "CategoryID": true,
                "Remarks": true,
                "Category": {
                    "select": {
                        "CategoryName": true
                    }
                }
            },
            "page": 0,
            "limit": 100,
            "sort": { "CreatedDate": "desc" }
        }
        return await categoriesApi?.readProductCategories(request)
    }

    async addCategoryToTheProduct(categoryReq: any) {
        return await categoriesApi?.addCategoryToTheProduct(categoryReq)
    }

    async removeCategoryfROMTheProduct(request: any) {
        return await categoriesApi?.removeCategoryToTheProduct(request)
    }
}