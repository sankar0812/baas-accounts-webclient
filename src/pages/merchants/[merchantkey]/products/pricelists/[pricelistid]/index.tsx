/**
 * CreatedBy    : Sreedhar
 * CreatedTime  : NOV 7 2023
 * ModifiedBy   : Uma Kohila
 * ModifiedDate : Nov 20 2023
 * Description  : This page contains the AddPriceList index page
 */

import { EditPriceList } from "@/components/products/pricelists/editProductPricelist";
import { platformHelper } from "@baas/platform-web-sdk";
import AppStore from "../../../../../../../appstorefile";
import { sdkMui } from "@baas/platform-web-sdk";
import { ProductPriceListFunction } from "@/functions/products/pricelists/ListPriceListFunction";
import { useState } from "react";
import { useRouter } from "next/router";
import { ProductFunction } from "@/functions/products/product/ProductsFuction";
import { BulkDiscountFunction } from "@/functions/products/product/bulkDiscount/bulkDiscountFunction";

const appstore = new AppStore()
const productFunction = new ProductFunction()
const productPriceListFunction = new ProductPriceListFunction()
const bulkDiscountFunction = new BulkDiscountFunction()

export default function PriceList(props: any) {
    const router = useRouter()
    const [priceListStatus] = useState(props?.PriceListStatus?.output)
    const [priceListInfo] = useState(props?.priceListInfo)
    const [productListData] = useState(props?.productsList?.output || [])
    const [merchantkey] = useState(props?.merchantkey)
    const [priceListItems] = useState(props?.priceListItem?.output)

    return (
        <>
            <sdkMui.Grid container spacing={2} direction={'column'}>
                <EditPriceList
                    configs={{
                        merchantkey: merchantkey,
                        functionObj: productPriceListFunction,
                        bulkDiscountFuncObj: bulkDiscountFunction,
                        router: router
                    }}
                    data={{
                        productListData: productListData,
                        priceListStatus: priceListStatus,
                        priceListData: priceListInfo,
                        priceListItems: priceListItems

                    }} />
            </sdkMui.Grid>
        </>
    )
}
export const getServerSideProps = async (context: any) => {
    const { query } = context
    const INSTANCEKEY = appstore?.INSTANCE?.INSTANCE_KEY;
    const CONNECTORURL = appstore?.AUTH?.AUTH_CONNECTOR_URL;
    const MerchantKey = query?.merchantkey
    let pricelistid = query.pricelistid
    if (!platformHelper.checkUserCookieStorage(context)) {
        return {
            redirect: {
                destination: `${CONNECTORURL}/signin/${INSTANCEKEY}`,
                permanent: false,
            },
        };
    }
    //ServerSide function calling
    let PriceListStatus = await productPriceListFunction?.readPriceListStatussSSR()
    let productsList = await productFunction?.readProductSSR();

    let priceListInfo = await productPriceListFunction?.readsPriceListIDSSR(parseInt(pricelistid))
    let response = await productPriceListFunction?.readPriceListIteamsSSR(parseInt(pricelistid))
    let priceListItems = []
    if (response.status === 200) {
        priceListItems = response.output
    }
    return {
        props: {
            PriceListStatus: PriceListStatus,
            productsList: productsList,
            merchantkey: MerchantKey,
            priceListInfo: priceListInfo.output[0],
            priceListItem: priceListItems
        }
    }
}