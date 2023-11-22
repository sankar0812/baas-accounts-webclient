/**
* CreatedBy    : Uma Kohila
* CreatedDate  : Oct 05 2023
* ModifiedBy   : Pradeepa S
* ModifiedDate : Oct 05 2023
* Description  : This file contains all Messages 
*/
export class Messages {

    //Invoice Messgaes
    PDF_DOWNLOAD_SUCCESS = "PDF has been downloaded Successfully...!"
    PDF_DOWNLOAD_ERROR = "Something Went Wrong PDF not Downloaded"
    INVOICE_CREATE_ERROR_MESSAGE = 'Error!! Unable to Create Invoice'
    INVOICE_CREATE_SUCCESS_MESSAGE = 'Invoice Created successfully..!'
    PRODUCT_ALREADY_EXISTS = 'Product Already Added, Choose another'
    EMPTY_ROW_CREATION = 'Enter details and Click add'

    PRODUCT_BULK_DISCOUNT_MESSAGES = {
        GREATE_SALERATE_MESSAGE: 'The sale rate/percentage is greater than the base rate.',
        EMPLTY_ROW_CREATIO_MESSAGE: 'Please Fill the all feilds',
        BULK_DISCOUNT_ERROR_MESSAGE_FOR_422: 'Database Error occured, Contact the System Administrator',
        BULK_DISCOUNT_ERROR_MESSAGE_FOR_500: 'Application Error occured, Contact the System Administrator',
        BULK_DISCOUNT_SUCESS_MESSAGE: 'Bulk Discount Added Sucessfully !!!'
    }
    ADD_CATEGORY_TO_THE_PRODUCT = {
        ADD_CATEGORY_SUCCESS_MESSAGE: 'Successfully Added Category to the Product',
        ADD_CATEGORY_ERROR_MESSAGE_FOR_422: 'Database Error occured, Contact the System Administrator',
        ADD_CATEGORY_ERROR_MESSAGE_FOR_500: 'Application Error occured, Contact the System Administrator',
    }
    REMOVE_CATEGORY_TO_THE_PRODUCT = {
        REMOVE_CATEGORY_SUCCESS_MESSAGE: 'Successfully Remove Category to the Product',
        REMOVE_CATEGORY_ERROR_MESSAGE_FOR_422: 'Database Error occured, Contact the System Administrator',
        REMOVE_CATEGORY_ERROR_MESSAGE_FOR_500: 'Application Error occured, Contact the System Administrator',
    }
    ADD_ITEM_ROW = 'Minimum Add one Row'

    Account_CREATE_SUCCESS_MESSASGE = 'Successfully Created Account!'
    DUPLICATE_Accounts_MESSASGE = 'Account already exists...'

    //Error handling message
    STATUS_ERROR_MESSAGE_FOR_500 = 'Application Error occured, Contact the System Administrator'
    STATUS_ERROR_MESSAGE_FOR_422 = 'Database Error occured, Contact the System Administrator'

    INVOICE_ALREADY_EXISTS = 'Invoice Already Added, Choose another'

    //Add product message
    PRICELIST_MESSAGES = {
        PRICELIST_ADD_SUCCESS_MESSAGE: 'Product Created Successfully..!',
        PRICELIST_ADD_ERROR_MESSAGE_FOR_422: 'Database Error occured, Contact the System Administrator',
        PRICELIST_ADD_ERROR_MESSAGE_FOR_500: 'Application Error occured, Contact the System Administrator',
        PRICELIST_ADD_ERROR_MESSAGE_FOR_404: 'NO Data Found'
    }

    PRODUCT_ADD_SUCCESS_MESSAGE = 'Product Created Successfully..!'
    PRODUCT_EDIT_MESSAGE = 'Product Updated Successfully..!'
    PARENT_PRODUCT_MESSAGE = "Base Product Changed Successfully..!"
    DUPLICATE_PRODUCT_MESSAGE = 'Product Already Exist..!'
    BASE_RATE_GREATER_MESSAGE = 'Base Rate should be less then comparison rate'
    PRODUCT_PACKAGE_ADDEDD_SUCCESSFULLY = 'Package Added Successfully..!'
    PRODUCT_PACCKAGE_DELETE_SECCUESS_MESSAGE = 'Package Removed Successfully..!'
    DUPLICATE_PRODUCT_PACKAGE = 'Product Package Already Added!'
    MINIMUM_ONE_FEILD_SHOULD_ADD = 'Give Minimum One Feild and click Apply..!'
    DATA_NOT_FOUND_FOR_FILTER = 'No data found for the given filter..!'
    DUPLICATE_PRICELIST_MESSAGE = "PriceList Already Exists..!"

    //Store message
    STORE_EDIT_MESSAGE = 'Successfully Updated Store!'
    ADD_PRICELIST_TO_STORE = 'PriceList Added to Store Successfully..!'
    PRICELIST_ALREADY_ADDED = 'PriceList Already Added!'
    DUPLICATE_STORE_MESSAGE = "Store Already Exists..!"


    //Add Category message
    CATEGORY_ADD_SUCCESS_MESSAGE = 'Category Created Successfully..!'
    DUPLICATE_CATEGORY_MESSAGE = 'Category Already Exist..!'
    DUPLICATE_PRODUCT_SELECTED = "Product Already Added, Choose another"
    PRODUCT_ASSIGNED_SUCCESSFULLY = 'Product Added Successfully..! '
    PRODUCT_REMOVED_SUCCESSFULLY = 'Product Removed successfully..!'
    CATEGORY_EDITED_SUCCESSFULLY = "Category Edited Successfully..!"
    PARENT_CATEGORY_ADDED_SUCCESSFULLY = 'Parent Category Added Successfully'
    MINIMUM_ONE_PRODUCT_ADDED = 'Minimum Add one Product...!'

    PRODUCT_PUBLISHED_ERROR_MESSAGE = "Product is not mapped for pricelist"

    ADD_PRICE_LIST_TO_THE_CUSTOMER_MESSAGES = {
        SUCCESS_MESSAGE: 'PriceList Added Successfully  !!!',
        PRICELIST_ERROR_MESSAGE_FOR_422: 'Database Error occured, Contact the System Administrator',
        PRICELIST_ERROR_MESSAGE_FOR_500: 'Application Error occured, Contact the System Administrator',
    }
}