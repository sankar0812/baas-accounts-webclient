/**
 * Created By: Pradeepa S
 * Created Date : Nov 15 2023
 * Description : This file contain detail view of category screen
 */

import React, { useState } from "react";
import { ViewCategory } from '@/components/products/categories/ViewCategory';
import { platformHelper } from "@baas/platform-web-sdk";
import AppStore from "../../../../../../../appstorefile";
import { CategoriesFunction } from "@/functions/products/categories/CategoriesFunction";
import { ProductFunction } from "@/functions/products/product/ProductsFuction";
import { useRouter } from "next/router";

const appstore = new AppStore()
const categoriesFunction = new CategoriesFunction()
const productFunction = new ProductFunction()

export default function CategoryDetail(props: any) {
    const router = useRouter()
    const [viewData] = useState(props?.categoryViewData?.output)

    return (
        <>
            <ViewCategory
                configs={{
                    datatestID: "View_Category",
                    router: router,
                    functionObject: categoriesFunction
                }} data={{
                    editableData: viewData,
                    productData: props?.productData?.output,
                    parentCategoryData: props?.parentCategoryData?.output,
                    productCategoryData: props?.productCategoryData?.output
                }} callbacks={{
                    handleAddProductToCategory: () => { }
                }} />
        </>
    )
}

export const getServerSideProps = async (context: any) => {
    const { query } = context;
    const INSTANCEKEY = appstore?.INSTANCE?.INSTANCE_KEY;
    const CONNECTORURL = appstore?.AUTH?.AUTH_CONNECTOR_URL;

    if (!platformHelper.checkUserCookieStorage(context)) {
        return {
            redirect: {
                destination: `${CONNECTORURL}/signin/${INSTANCEKEY}`,
                permanent: false,
            },
        };
    }
    let categoryID = parseInt(query?.categoryid)
    let categoryViewData = await categoriesFunction?.readCategoryForViewSSR(categoryID)
    let parentCategoryData = await categoriesFunction?.readCategoriesforProductEditSSR()
    let productData = await productFunction?.readAllProductsSSR()
    let productCategoryData = await categoriesFunction?.readProductCategoriesSSR(categoryID)

    return {
        props: {
            categoryViewData: categoryViewData,
            productData: productData,
            parentCategoryData: parentCategoryData,
            productCategoryData: productCategoryData
        }
    }
}