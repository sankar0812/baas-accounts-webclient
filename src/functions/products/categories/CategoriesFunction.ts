/*
* CreatedBy     : Muthumariappan
* Createddate   : Nov 7 2023
* ModifiedBy    : Uma Kohila
* ModifiedDate  : Nov 14 2023
* Decription    : This is the function file for Products Categories Lists
*/


import { CategoriesApi } from "@/apis/products/categories/CategoriesApi";

const categoriesApi = new CategoriesApi()

export class CategoriesFunction {

    async readCategoriesSSR() {
        let request = {
            "filter": {
                "IsDeleted": false
            },
            "fields": {
                "CategoryID": true,
                "ParentCategoryID": true,
                "CategoryName": true,
                "CategoryCode": true,
                "Description": true,
                "CreatedAuthID": true,
                "CreatedBy": true,
                "CreatedDate": true,
                "ModifiedAuthID": true,
                "ModifiedBy": true,
                "ModifiedDate": true,
                "IsDeleted": true,
                "ProductCategory": {
                    "select": {
                        "Product": {
                            "select": {
                                "ProductID": true
                            }
                        }
                    },
                    "where": {
                        "IsDeleted": false
                    }
                }
            },
            "page": 0,
            "limit": 10,
            "sort": { "CreatedDate": "desc" }
        }
        return await categoriesApi?.readCategoriesSSR(request)
    }

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

    async readCategoryForViewSSR(categortID: number) {
        let request = {
            "filter": {
                "IsDeleted": false,
                "CategoryID": categortID
            },
            "fields": {},
            "page": 0,
            "limit": 100,
            "sort": { "CreatedDate": "desc" }
        }
        return await categoriesApi?.readCategoriesSSR(request)
    }

    async readCategories(SortReq:any,SearchReq: any, Pageno: number) {
        let request = {
            "filter": {
                "OR": [
                    {
                        "CategoryName": {
                            "contains": SearchReq,
                            "mode": 'insensitive'
                        }
                    }
                ],
                "IsDeleted": false
            },
            "fields": {
                "CategoryID": true,
                "ParentCategoryID": true,
                "CategoryName": true,
                "CategoryCode": true,
                "Description": true,
                "CreatedAuthID": true,
                "CreatedBy": true,
                "CreatedDate": true,
                "ModifiedAuthID": true,
                "ModifiedBy": true,
                "ModifiedDate": true,
                "IsDeleted": true,
                "ProductCategory": {
                    "select": {
                        "Product": {
                            "select": {
                                "ProductID": true
                            }
                        }
                    },
                    "where": {
                        "IsDeleted": false
                    }
                }
            },
            "page": Pageno,
            "limit": 10,
            "sort": SortReq
        }
        return await categoriesApi?.readCategories(request)
    }

    async readCategoriesCountSSR() {
        let request = {
            "filter": {
                "IsDeleted": false
            },

        }
        return await categoriesApi?.readCategoriesSSRCount(request)
    }

    async readCategoriesCount(CountReq: any) {
        let request = {
            "filter": {
                "OR": [
                    {
                        "CategoryName": {
                            "contains": CountReq,
                            "mode": 'insensitive'
                        }
                    }
                ],
                "IsDeleted": false
            }
        }
        return await categoriesApi?.readCategoriesCount(request)
    }

    async addCategory(categoryReq: any) {
        return await categoriesApi?.addCategory(categoryReq)
    }

    async changeCategory(categoryReq: any) {
        return await categoriesApi?.changeCategory(categoryReq)
    }

    async changeRootCategory(userInfo: any, CategoryId: number, parentcategoryID: number) {
        let categoryReq = {
            "UserInfo": {
                "ModifiedAuthID": userInfo?.ModifiedAuthID,
                "ModifiedBy": userInfo?.ModifiedBy,
                "ModifiedDate": new Date().toISOString()
            },
            "CategoryInfo": {
                "CategoryID": CategoryId,
                "ParentCategoryID": parentcategoryID
            }
        }
        return await categoriesApi?.changeRootCategory(categoryReq)
    }

    async readProductCategories(categoryID: any) {
        let request = {
            "filter": {
                "CategoryID": categoryID,
                "IsDeleted": false
            },
            "fields": {
                "ProductCategoryID": true,
                "ProductID": true,
                "CategoryID": true,
                "Remarks": true,
                "CreatedAuthID": true,
                "CreatedBy": true,
                "CreatedDate": true,
                "ModifiedAuthID": true,
                "ModifiedBy": true,
                "Product": {
                    "select": {
                        "ProductName": true,
                        "ProductID": true
                    }
                }
            },
            "page": 0,
            "limit": 100,
            "sort": {}
        }
        return await categoriesApi?.readProductCategories(request)
    }

    async readProductCategoriesSSR(categoryID: any) {
        let request = {
            "filter": {
                "CategoryID": categoryID,
                "IsDeleted": false
            },
            "fields": {
                "ProductCategoryID": true,
                "ProductID": true,
                "CategoryID": true,
                "Remarks": true,
                "CreatedAuthID": true,
                "CreatedBy": true,
                "CreatedDate": true,
                "ModifiedAuthID": true,
                "ModifiedBy": true,
                "Product": {
                    "select": {
                        "ProductName": true,
                        "ProductID": true
                    }
                }
            },
            "page": 0,
            "limit": 100,
            "sort": {}
        }
        return await categoriesApi?.readProductCategoriesSSR(request)
    }

    async assignProducttoCategory(UserInfo: any, CategoryInfo: any) {
        let productCategoryReq = {
            "UserInfo": {
                "CreatedAuthID": UserInfo?.CreatedAuthID,
                "CreatedBy": UserInfo?.CreatedBy,
                "ModifiedAuthID": UserInfo?.ModifiedAuthID,
                "ModifiedBy": UserInfo?.ModifiedBy
            },
            "CategoryInfo": CategoryInfo
        }
        return await categoriesApi?.addProducttoCategory(productCategoryReq)
    }

    async removeProducttoCategory(removeproductCategoryReq: any) {
        return await categoriesApi?.removeProducttoCategory(removeproductCategoryReq)
    }
}