/**
* CreatedBy    : Uma Kohila
* CreatedDate  : Oct 05 2023
* ModifiedBy   : Muthumariappan
* ModifiedDate : Nov 10 2023
* Description  : This file contains all  endpoints
*/

export class Endpoints {

    // Provide the Accounts Rest Data Access Endpoints here
    ACCOUNTS_REST_DATA_ACCESS_ENDPOINTS = {
        ENDPOINT_READ_BANKS: '/api/rest/accounts/dataaccess/1.0.0/bank/v1/banks',
        ENDPOINT_READ_MERCHANTS: '/api/rest/accounts/dataaccess/1.0.0/merchant/v1/merchants',
        ENDPOINT_READ_VENDORS: '/api/rest/accounts/dataaccess/1.0.0/vendor/v1/vendors',
        ENDPOINT_READ_VENDORS_COUNT: '/api/rest/accounts/dataaccess/1.0.0/vendor/v1/vendors/metrics',
        ENDPOINT_READ_BANKS_COUNT: '/api/rest/accounts/dataaccess/1.0.0/bank/v1/banks/metrics',
        READ_PYAMENTS_RECEIVED: '/api/rest/accounts/dataaccess/1.0.0/customer/v1/customerpayments',
        ENDPOINT_READ_PRODUCTS: '/api/rest/accounts/dataaccess/1.0.0/product/v1/products',
        ENDPOINT_READ_PRODUCTS_COUNT: '/api/rest/accounts/dataaccess/1.0.0/product/v1/products/metrics',
        ENPOINT_READ_PRICELIST: '/api/rest/accounts/dataaccess/1.0.0/pricelist/v1/pricelists',
        ENDPOINTS_CREATE_Accounts: '/api/rest/accounts/dataaccess/1.0.0/customer/v1/customeraccount',
        ENDPOINT_READ_PYAMENTS_RECEIVED: '/api/rest/accounts/dataaccess/1.0.0/customer/v1/customerpayments',
        ENDPOINT_READ_PRICELIST: '/api/rest/accounts/dataaccess/1.0.0/price/v1/pricelistitems',
        ENPOINT_READ_CUSTOMERS_ACCOUNTS: "/api/rest/accounts/dataaccess/1.0.0/customer/v1/customeraccounts",
        ENDPOINT_READ_TERM: '/api/rest/accounts/dataaccess/1.0.0/appsetting/v1/appsettingnetterms',
        ENDPOINT_READ_BANK_ACCOUNTS: '/api/rest/accounts/dataaccess/1.0.0/bank/v1/bankaccounts',
        ENDPOINT_READ_CURRENCIES: '/api/rest/accounts/dataaccess/1.0.0/currency/v1/currencys',
        ENDPOINT_READ_PAYMENTS_RECEIVED_COUNT: '/api/rest/accounts/dataaccess/1.0.0/customer/v1/customerpayments/metrics',
        ENDPOINT_READ_CUSTOMER_TRANSACTION: '/api/rest/accounts/dataaccess/1.0.0/customer/v1/customeraccounttransactions',
        ENPOINT_READ_STOREPRICELIST: '/api/rest/accounts/dataaccess/1.0.0/pricelist/v1/priceliststores',

        ENDPOINT_READ_PAYMENT_METHOD: '/api/rest/accounts/dataaccess/1.0.0/payment/v1/paymentmethods',
        ENPOINT_READ_INVOICE_PAYMENTS: "/api/rest/accounts/dataaccess/1.0.0/customer/v1/customerpayments",

        ENPOINT_READ_CUSTOMERS: '/api/rest/accounts/dataaccess/1.0.0/customer/v1/customers',
        ENPOINT_READ_CUSTOMERS_COUNT: '/api/rest/accounts/dataaccess/1.0.0/customer/v1/customers/metrics',
        ENDPOINT_READ_CUSTOMERS: '/api/rest/accounts/dataaccess/1.0.0/customer/v1/customers',
        ENDPOINT_READ_CUSTOMERS_COUNT: '/api/rest/accounts/dataaccess/1.0.0/customer/v1/customers/metrics',
        ENDPOINT_READ_CUSTOMERS_CONTACT: '/api/rest/accounts/dataaccess/1.0.0/customer/v1/customercontacts',
        ENDPOINT_READ_CUSTOMER_ACCOUNT_CARD: '/api/rest/accounts/dataaccess/1.0.0/customer/v1/customeraccountcards',
        READ_PAYMENTS_RECEIVED_COUNT: '/api/rest/accounts/dataaccess/1.0.0/customer/v1/customerpayments/metrics',
        ENDPOINT_READ_CUSTOMER_ACCOUNT: '/api/rest/accounts/dataaccess/1.0.0/customer/v1/customeraccounts',
        ENDPOINT_READ_INVOICES: '/api/rest/accounts/dataaccess/1.0.0/invoice/v1/invoices',
        ENDPOINT_READ_INVOICES_COUNT: '/api/rest/accounts/dataaccess/1.0.0/invoice/v1/invoices/metrics',
        ENDPOINT_READ_INVOICE_STATUS: '/api/rest/accounts/dataaccess/1.0.0/invoice/v1/invoicestatuses',
        ENDPOINT_READ_INVOICE_ITEM_COUNT: '/api/rest/accounts/dataaccess/1.0.0/invoice/v1/invoiceitems/metrics',
        ENDPOINT_READ_PRODUCTPRICE: '/api/rest/accounts/dataaccess/1.0.0/product/v1/productprices',
        ENDPOINT_READ_STORES: "/api/rest/accounts/dataaccess/1.0.0/store/v1/stores",
        ENPOINTS_READ_STORES_COUNT: "/api/rest/accounts/dataaccess/1.0.0/store/v1/stores/metrics",
        ENDPOINT_READ_PRODUCT_BULK_DISCOUNT: '/api/rest/accounts/dataaccess/1.0.0/product/v1/productbulkdiscounts',
        ENDPOINT_READ_PRICE_LIST_WITH_CUSTOMER_ACCOUNTS: '/api/rest/accounts/dataaccess/1.0.0/pricelist/v1/pricelistcustomeraccounts',


        ENDPOINT_READ_STORE_TYPE: '/api/rest/accounts/dataaccess/1.0.0/store/v1/storetypes',
        ENDPOINT_READ_PRICELISTS: '/api/rest/accounts/dataaccess/1.0.0/pricelist/v1/pricelists',
        ENDPOINT_READ_PRICELISTSTATUS: '/api/rest/accounts/dataaccess/1.0.0/pricelist/v1/priceliststatuses',
        ENDPOINT_READ_PRICELISTSCOUNT: "/api/rest/accounts/dataaccess/1.0.0/pricelist/v1/pricelists/metrics",
        ENDPOINT_READ_PRICELISTSITEAM: '/api/rest/accounts/dataaccess/1.0.0/pricelist/v1/pricelistitems',


        ENDPOINT_READ_CATEGORIES: '/api/rest/accounts/dataaccess/1.0.0/category/v1/categorys',
        ENDPOINT_READ_CATEGORIES_COUNT: '/api/rest/accounts/dataaccess/1.0.0/category/v1/categorys/metrics',
        ENDPOINT_READ_APPSEETINGUOM: '/api/rest/accounts/dataaccess/1.0.0/appsetting/v1/appsettinguoms',
        ENDPOINT_READ_PRODUCT_PACKAGE: '/api/rest/accounts/dataaccess/1.0.0/product/v1/productpackages',
        ENDPOINT_READ_PACKAGE_TYPE: '/api/rest/accounts/dataaccess/1.0.0/package/v1/packagetypes',
        ENDPOINT_READ_PACKAGE_TYPE_COUNT: '/api/rest/accounts/dataaccess/1.0.0/package/v1/packagetypes/metrics',
        ENDPOINT_READ_PRODUCT_CATEGORY: '/api/rest/accounts/dataaccess/1.0.0/product/v1/productcategorys',
        ENDPOINT_READ_PRICE_LIST_STATUS: '/api/rest/accounts/dataaccess/1.0.0/pricelist/v1/priceliststatuses',
        ENDPOINT_READ_APP_SETTINGS_NET_TERM: '/api/rest/accounts/dataaccess/1.0.0/appsetting/v1/appsettingnetterms'
    }


    // Provide the Accounts Rest Business Endpoints here
    ACCOUNTS_REST_BUSINESS_ENDPOINTS = {
        ENDPOINTS_CREATE_ACCOUNTS: "/api/rest/accounts/business/1.0.0/customer/v1/addcustomeraccount",
        ENDPOINT_RECORD_PAYMENT: "/api/rest/accounts/business/1.0.0/customer/v1/addpayment",
        ENDPOINT_ADD_INVOICE: '/api/rest/accounts/business/1.0.0/invoice/v1/add',
        ENDPOINT_GETPRODUCT_INFO: '/api/rest/accounts/business/1.0.0/pricelist/v1/getpricelist',
        ENDPOINT_GENERATE_INVOICE_NUMBER: '/api/rest/accounts/business/1.0.0/invoice/v1/generatenumber',
        ENDPOINT_OPEN_STATUS_UPDATE: '/api/rest/accounts/business/1.0.0/invoice/v1/changetoopen',
        ENDPOINT_VOID_STATUS_UPDATE: '/api/rest/accounts/business/1.0.0/invoice/v1/changetovoid',
        ENDPOINT_ADD_PRODUCT: '/api/rest/accounts/business/1.0.0/product/v1/add',

        ENDPOINT_EDIT_PRODUCT: '/api/rest/accounts/business/1.0.0/product/v1/update',
        ENDPOINT_CHANGE_PARENT_PRODUCT: '/api/rest/accounts/business/1.0.0/product/v1/changeparentproduct',

        ENDPOINT_ENABLE_PURCHASE_PRODUCT: '/api/rest/accounts/business/1.0.0/product/v1/enablepurchase',
        ENDPOINT_DISABLE_PURCHASE_PRODUCT: '/api/rest/accounts/business/1.0.0/product/v1/disablepurchase',

        ENDPOINT_ENABLE_SALE_PRODUCT: '/api/rest/accounts/business/1.0.0/product/v1/enablesale',
        ENDPOINT_DISABLE_SALE_PRODUCT: '/api/rest/accounts/business/1.0.0/product/v1/disablesale',

        ENDPOINT_ENABLE_PRODUCT_AVAILABILITY: '/api/rest/accounts/business/1.0.0/product/v1/enableavailability',
        ENDPOINT_DISABLE_PRODUCT_AVAILABILITY: '/api/rest/accounts/business/1.0.0/product/v1/disableavailability',

        ENDPOINT_ADD_PRODUCT_PACKAGE: '/api/rest/accounts/business/1.0.0/product/v1/addpackage',
        ENDPOINT_ADD_CATEGORY: '/api/rest/accounts/business/1.0.0/category/v1/add',
        ENDPOINT_CREATE_BULKDISCOUNT: '/api/rest/accounts/business/1.0.0/product/v1/addblukdiscount',
        ENDPOINT_ADD_PRICELIST: '/api/rest/accounts/business/1.0.0/pricelist/v1/add',
        ENDPOINT_EDIT_PRICELIST:'/api/rest/accounts/business/1.0.0/pricelist/v1/change',
        ENDPOINT_STATUS_PRICELIST:'/api/rest/accounts/business/1.0.0/pricelist/v1/statuschange',
        // ENDPOINT_OPEN_STATUS_UPDATE: '/api/rest/accounts/business/1.0.0/invoice/v1/changetoopen',
        // ENDPOINT_VOID_STATUS_UPDATE: '/api/rest/accounts/business/1.0.0/invoice/v1/changetovoid',
        // ENDPOINT_ADD_PRODUCT: '/api/rest/accounts/business/1.0.0/product/v1/add',
        // ENDPOINT_ADD_PRODUCT_PACKAGE: '/api/rest/accounts/business/1.0.0/product/v1/addpackage',
        // ENDPOINT_ADD_CATEGORY: '/api/rest/accounts/business/1.0.0/category/v1/add',
        // ENDPOINT_CREATE_BULKDISCOUNT: '/api/rest/accounts/business/1.0.0/product/v1/addblukdiscount',
        ENDPOINT_ADD_PRODUCT_PRICELIST: '/api/rest/accounts/business/1.0.0/pricelist/v1/addproduct',
        ENDPOINT_ADD_PRODUCT_PRODUCTPRICELIST: '/api/rest/accounts/business/1.0.0/pricelist/v1/removeproduct',
        // ENDPOINT_EDIT_PRODUCT: '/api/rest/accounts/business/1.0.0/product/v1/update',
        // ENDPOINT_CHANGE_PARENT_PRODUCT: '/api/rest/accounts/business/1.0.0/product/v1/changeparentproduct',
        // ENDPOINT_ENABLE_PURCHASE_PRODUCT: '/api/rest/accounts/business/1.0.0/product/v1/enablepurchase',
        // ENDPOINT_DISABLE_PURCHASE_PRODUCT: '/api/rest/accounts/business/1.0.0/product/v1/disablepurchase',
        // ENDPOINT_ENABLE_SALE_PRODUCT: '/api/rest/accounts/business/1.0.0/product/v1/enablesale',
        // ENDPOINT_DISABLE_SALE_PRODUCT: '/api/rest/accounts/business/1.0.0/product/v1/disablesale',
        // ENDPOINT_ENABLE_PRODUCT_AVAILABILITY: '/api/rest/accounts/business/1.0.0/product/v1/enableavailability',
        // ENDPOINT_DISABLE_PRODUCT_AVAILABILITY: '/api/rest/accounts/business/1.0.0/product/v1/disableavailability',
        ENDPOINT_REMOVE_PRODUCT_PACKAGE: '/api/rest/accounts/business/1.0.0/product/v1/removepackage',
        ENDPOINT_CHANGE_CATEGORY: '/api/rest/accounts/business/1.0.0/category/v1/change',
        ENDPOINT_CHANGE_ROOT_CATEGORY: '/api/rest/accounts/business/1.0.0/category/v1/addrootcategory',
        ENDPOINT_ADD_PRODUCT_TO_CATEGORY: '/api/rest/accounts/business/1.0.0/product/v1/addcategory',
        ENDPOINT_REMOVE_PRODUCT_TO_CATEGORY: '/api/rest/accounts/business/1.0.0/product/v1/removecategory',
        ENDPOINT_ADD_STORE: '/api/rest/accounts/business/1.0.0/store/v1/add',
        ENDPOINT_ADD_CATEGORY_TO_THE_PRODUCT: '/api/rest/accounts/business/1.0.0/product/v1/addcategory',
        ENDPOINT_REMOVE_CATEGORY_TO_THE_PRODUCT: '/api/rest/accounts/business/1.0.0/product/v1/removecategory',
        ENDPOINT_READ_PRODUCT_USING_FILTER: '/api/rest/accounts/business/1.0.0/product/v1/filter',
        ENDPOINT_CREATE_PRICELIST_TO_THE_CUSTOMER: '/api/rest/accounts/business/1.0.0/customer/v1/addpricelist',
        ENDPOINT_UPDATE_STORE : '/api/rest/accounts/business/1.0.0/store/v1/change',
        ENDPOINT_ADD_PRICELIST_TO_STORE : '/api/rest/accounts/business/1.0.0/store/v1/addpricelist',
        ENDPOINT_REMOVE_PRODUCT_PRICE_LIST: '/api/rest/accounts/business/1.0.0/pricelist/v1/removeproduct'
        
    }

    // Provide the Auth Rest Business Endpoints here
    AUTH_REST_BUSINESS_ENDPOINTS = {
        AUTH_REST_BUSINESS_GET_MODULES: "/api/rest/auth/business/1.0.0/permission/v1/getmodules",
        AUTH_REST_BUSINESS_GET_INVOICE_DETAIL: "/api/rest/accounts/business/1.0.0/invoice/v1/download",

    }
}