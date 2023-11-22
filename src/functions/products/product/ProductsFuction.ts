/**
* CreatedBy    : Uma Kohila
* CreatedDate  : Oct 11 2023
* ModifiedBy   : Uma Kohila
* ModifiedDate : Oct 11 2023
* Description  : This file contains products module Function's
*/

// Import all the neccessary files in header
import { ProductApi } from "@/apis/products/product/ProductsApi";

// Initialize the required files as a objects
const productApi = new ProductApi();

export class ProductFunction {

    async readProductListSSR() {
        let productsReq = {
            "filter": {
                "IsDeleted": false
            },
            "fields": {
                "ProductID": true,
                "ProductName": true,
                "ProductCode": true,
                "ProductUPC": true,
                "ProductSKU": true,
                "ParentProductID": true,
                "AppSettingUomID": true,
                "CurrencyID": true,
                "BaseSaleRate": true,
                "ComparisionSaleRate": true,
                "IsAsset": true,
                "IsRental": true,
                "IsGoods": true,
                "IsService": true,
                "IsEnabled": true,
                "IsSellable": true,
                "IsPurchase": true,
                "StockLimit": true,
                "IsStockLimitDisabled": true,
                "CreatedAuthID": true,
                "CreatedBy": true,
                "CreatedDate": true,
                "ModifiedAuthID": true,
                "ModifiedBy": true,
                "ModifiedDate": true,
                "IsDeleted": true,
                "ProductBulkDiscount": {
                    "select": {
                        "ProductBulkDiscountID": true,
                        "RangeMax": true,
                        "RangeMin": true,
                        "DiscountPercent": true,
                        "DiscountRate": true
                    }
                },
                "Currency": {
                    "select": {
                        "CurrencyCode": true,
                        "CurrencySymbol": true
                    }
                }
            },
            "page": 0,
            "limit": 100,
            "sort": {
                "CreatedDate": "desc"
            }
        };
        return await productApi?.readProductSSR(productsReq);
    }

    async readProductSSR() {
        let productsReq = {
            "filter": {
                "IsDeleted": false,
                "IsEnabled": true,
                "IsSellable": true,
            },
            "fields": {
                "ProductID": true,
                "ProductName": true,
                "ProductCode": true,
                "ProductUPC": true,
                "ProductSKU": true,
                "ParentProductID": true,
                "AppSettingUomID": true,
                "CurrencyID": true,
                "BaseSaleRate": true,
                "ComparisionSaleRate": true,
                "IsAsset": true,
                "IsRental": true,
                "IsGoods": true,
                "IsService": true,
                "IsEnabled": true,
                "IsSellable": true,
                "IsPurchase": true,
                "StockLimit": true,
                "IsStockLimitDisabled": true,
                "CreatedAuthID": true,
                "CreatedBy": true,
                "CreatedDate": true,
                "ModifiedAuthID": true,
                "ModifiedBy": true,
                "ModifiedDate": true,
                "IsDeleted": true,
                "ProductBulkDiscount": {
                    "select": {
                        "ProductBulkDiscountID": true,
                        "RangeMax": true,
                        "DiscountPercent": true,
                        "DiscountRate": true
                    }
                },
                "Currency": {
                    "select": {
                        "CurrencyCode": true,
                        "CurrencySymbol": true
                    }
                }
            },
            "page": 0,
            "limit": 100,
            "sort": {
                "CreatedDate": "desc"
            }
        };
        return await productApi?.readProductSSR(productsReq);
    }
    async readAllProductsSSR() {
        let productsReq = {
            "filter": {
                "IsDeleted": false
            },
            "fields": {
                "ProductID": true,
                "ProductName": true,
                "ProductCode": true,
                "ProductUPC": true,
                "ProductSKU": true,
                "ParentProductID": true,
                "AppSettingUomID": true,
                "CurrencyID": true,
                "BaseSaleRate": true,
                "ComparisionSaleRate": true,
                "IsAsset": true,
                "IsRental": true,
                "IsGoods": true,
                "IsService": true,
                "IsEnabled": true,
                "IsSellable": true,
                "IsPurchase": true,
                "StockLimit": true,
                "IsStockLimitDisabled": true,
                "CreatedAuthID": true,
                "CreatedBy": true,
                "CreatedDate": true,
                "ModifiedAuthID": true,
                "ModifiedBy": true,
                "ModifiedDate": true,
                "IsDeleted": true,
                "ProductBulkDiscount": {
                    "select": {
                        "ProductBulkDiscountID": true,
                        "RangeMax": true,
                        "DiscountPercent": true,
                        "DiscountRate": true
                    }
                },
                "Currency": {
                    "select": {
                        "CurrencyCode": true,
                        "CurrencySymbol": true
                    }
                }
            },
            "page": 0,
            "limit": 1000,
            "sort": {
                "CreatedDate": "desc"
            }
        };
        return await productApi?.readProductSSR(productsReq);
    }

    async readProductForEdit(productID: number) {
        let request = {
            "filter": {
                ProductID: productID
            },
            "fields": {},
            "page": 0,
            "limit": 10,
            "sort": {}
        }
        return await productApi?.readProduct(request)
    }

    async readProduct(searchReq: any, sortReq: any, pageno: number) {
        let productReq = {
            "filter": {
                "OR": [
                    {
                        "ProductName": {
                            "contains": searchReq,
                            "mode": 'insensitive'
                        }
                    },
                    {
                        "ProductCode": {
                            "contains": searchReq,
                            "mode": 'insensitive'
                        }
                    }
                ],
                "IsDeleted": false,
            },
            "fields": {
                "ProductID": true,
                "ProductName": true,
                "ProductCode": true,
                "ProductUPC": true,
                "ProductSKU": true,
                "ParentProductID": true,
                "AppSettingUomID": true,
                "CurrencyID": true,
                "BaseSaleRate": true,
                "ComparisionSaleRate": true,
                "IsAsset": true,
                "IsRental": true,
                "IsGoods": true,
                "IsService": true,
                "IsEnabled": true,
                "IsSellable": true,
                "IsPurchase": true,
                "StockLimit": true,
                "IsStockLimitDisabled": true,
                "CreatedAuthID": true,
                "CreatedBy": true,
                "CreatedDate": true,
                "ModifiedAuthID": true,
                "ModifiedBy": true,
                "ModifiedDate": true,
                "IsDeleted": true,
                "ProductBulkDiscount": {
                    "select": {
                        "ProductBulkDiscountID": true,
                        "RangeMax": true,
                        "RangeMin": true,
                        "DiscountPercent": true,
                        "DiscountRate": true
                    }
                },
                "Currency": {
                    "select": {
                        "CurrencyCode": true,
                        "CurrencySymbol": true
                    }
                }
            },
            "page": pageno,
            "limit": 10,
            "sort": sortReq,
        };
        return await productApi?.readProduct(productReq);
    }

    async readProductCountSSR() {
        let readProductCountReq = {
            "filter": {}
        }
        return await productApi?.readProductCountSSR(readProductCountReq)
    }

    async readAppSettingUoM() {
        let request = {
            "filter": {
                "IsDeleted": false
            },
            "fields": {},
            "page": 0,
            "limit": 100,
            "sort": {}
        }
        return await productApi?.readAppSettingUom(request)
    }

    async readProductCount(ProductsCountReq: any) {
        let readProductCountReq = {
            "filter": {
                "OR": [
                    {
                        "ProductName": {
                            "contains": ProductsCountReq,
                            "mode": 'insensitive'
                        }
                    },
                    {
                        "ProductCode": {
                            "contains": ProductsCountReq,
                            "mode": 'insensitive'
                        }
                    }
                ]
            }
        }
        return await productApi?.readProductCount(readProductCountReq)
    }

    async readProductPackagesSSR(productid: number) {
        let request = {
            "filter": {
                "IsDeleted": false,
                "ProductID": productid
            },
            "fields": {
                "ProductPackageID": true,
                "ProductID": true,
                "Length": true,
                "LengthUom": true,
                "Width": true,
                "WidthUom": true,
                "Height": true,
                "HeightUom": true,
                "Weight": true,
                "WeightUom": true,
                "PackageCount": true,
                "IsEnabled": true,
                "CreatedAuthID": true,
                "CreatedBy": true,
                "PackageType": {
                    "select": {
                        "PackageTypeID": true,
                        "PackageType": true,
                        "PackageTypeCode": true
                    }
                }
            },
            "page": 0,
            "limit": 100,
            "sort": { "CreatedDate": 'desc' }
        }
        return await productApi?.readProductPackagesSSR(request)
    }

    async readProductPackages(productid: number) {
        let request = {
            "filter": {
                "IsDeleted": false,
                "ProductID": productid
            },
            "fields": {
                "ProductPackageID": true,
                "ProductID": true,
                "PackageTypeID": true,
                "Length": true,
                "LengthUom": true,
                "Width": true,
                "WidthUom": true,
                "Height": true,
                "HeightUom": true,
                "Weight": true,
                "WeightUom": true,
                "PackageCount": true,
                "IsEnabled": true,
                "CreatedAuthID": true,
                "CreatedBy": true,
                "PackageType": {
                    "select": {
                        "PackageType": true,
                        "PackageTypeCode": true
                    }
                }
            },
            "page": 0,
            "limit": 100,
            "sort": { "CreatedDate": 'desc' }
        }
        return await productApi?.readProductPackages(request)
    }

    async addProduct(productReq: any) {
        return await productApi?.addProduct(productReq)
    }

    async updateProduct(productReq: any) {
        return await productApi?.updateProduct(productReq)
    }

    async changeParentProduct(changeParentProductReq: any) {
        return await productApi?.changeParentProduct(changeParentProductReq)
    }

    async enablePurchaseProduct(enablePurchaseReq: any) {
        return await productApi?.enablePurchaseProduct(enablePurchaseReq)
    }

    async disablePurchaseProduct(disablePurchaseReq: any) {
        return await productApi?.disablePurchaseProduct(disablePurchaseReq)
    }

    async enableSaleProduct(enableSaleReq: any) {
        return await productApi?.enableSaleProduct(enableSaleReq)
    }

    async disableSaleProduct(disableSaleReq: any) {
        return await productApi?.disableSaleProduct(disableSaleReq)
    }

    async enableProductAvailability(enableavailabilityReq: any) {
        return await productApi?.enableProductAvailability(enableavailabilityReq)
    }

    async disableProductAvailability(disableavailabilityReq: any) {
        return await productApi?.disableProductAvailability(disableavailabilityReq)
    }


    async addProductPackage(productPackageReq: any) {
        return await productApi?.addProductPackage(productPackageReq)
    }

    async removeProductPackage(productPackageReq: any) {
        return await productApi?.removeProductPackage(productPackageReq)
    }

    async readProductWithFilter(productInfo: any, categoryInfo: []) {
        let request = {
            "ProductInfo": {
                "ProductUPC": productInfo?.ProductUPC,
                "ProductSKU": productInfo?.ProductSKU,
                "ProductCode": productInfo?.ProductCode,
                "ParentProductID": productInfo?.ParentProductID,
                "IsGoods": productInfo?.IsGoods,
                "IsService": productInfo?.IsService
            },
            "CategoryInfo": {
                "CategoryID": categoryInfo.length === 0 ? 0 : {
                    "in": categoryInfo
                }
            }
        }
        return await productApi?.readProductWithFilter(request)
    }
}