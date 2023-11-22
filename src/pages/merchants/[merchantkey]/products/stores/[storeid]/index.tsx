import React, { useState } from "react";
import AppStore from '../../../../../../../appstorefile';
import { ViewStoreComponent } from "@/components/products/stores/ViewStore";
import { platformHelper, sdkMui } from "@baas/platform-web-sdk";
import { StoreFunction } from "@/functions/products/stores/StoreFunction";
import { useRouter } from "next/router";
import { ProductPriceListFunction } from "@/functions/products/pricelists/ListPriceListFunction"
import { EditStoreComponent } from "@/components/products/stores/EditStore";

const appstore = new AppStore()
const storeFunction = new StoreFunction()
const priceListFunction = new ProductPriceListFunction()


export default function ViewStorePage(props: any) {
  const [viewStoredetail] = useState(props?.viewStore?.output)
  const [pricelistData] = useState(props?.pricelistData?.output)
  const [storePriceListData] = useState(props?.storePriceListData?.output)
  const [EditStore, setEditStore] = useState(false);

  const router = useRouter();

  return (
    <>
      <sdkMui.Grid container spacing={2}>
        <sdkMui.Grid item xs={2} sx={{ display: "flex", flexDirection: "row", ml: 2 }}>
          {
            <sdkMui.Stack spacing={1} direction={'row'} onClick={() => { setEditStore(false) }}
              sx={EditStore ? {} : { borderBottom: "1.5px solid black" }}>
              <span className="material-symbols-outlined" style={{ fontSize: '16px', cursor: 'pointer', marginTop: '4px' }} >
                visibility
              </span>

              <span style={{ fontSize: '16px', cursor: 'pointer' }} >
                View
              </span>
            </sdkMui.Stack>}
          {
            <sdkMui.Stack spacing={1} direction={'row'} onClick={() => { setEditStore(true) }}
              sx={EditStore ? { ml: 2, borderBottom: "1.5px solid black" } : { ml: 2 }}
            ><span className="material-symbols-outlined" style={{ fontSize: '16px', cursor: 'pointer', marginTop: '4px' }}  >
                edit
              </span>
              <span style={{ fontSize: '16px', cursor: 'pointer' }} >
                Edit
              </span>
            </sdkMui.Stack>}
        </sdkMui.Grid>
        <sdkMui.Grid item xs={9.5} textAlign={'right'}>
          <span className="material-symbols-outlined" style={{ cursor: 'pointer' }} onClick={() => router?.push(`/merchants/${router?.query?.merchantkey}/products/stores`)}>close</span>
        </sdkMui.Grid>
      </sdkMui.Grid>

      {EditStore ? <EditStoreComponent
        configs={{
          'dataTestID': "View-Store",
          router: router
        }}
        data={{
          EditStoreInfo: props?.viewStore?.output,
          storePriceLIst: props?.storePriceListData?.output,
          pricelistData: pricelistData,
          storeTypeData: props?.storeTypeData
        }} /> :
        <ViewStoreComponent
          configs={{
            'dataTestID': "View-Store",
            functionObject: storeFunction

          }}
          data={{
            viewStore: viewStoredetail,
            priceListData: storePriceListData
          }}
        />}

    </>
  );
}
export const getServerSideProps = async (context: any) => {
  const { query } = context
  let store = query.storeid
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
  let storeInfo = await storeFunction?.readListStoreByIDSSR(parseInt(store))
  let storePriceListIDs = await storeFunction?.readStorePriceListSSR(parseInt(store));
  let PIDs: Array<any> = [];
  storePriceListIDs.output?.forEach((priceList: any) => {
    PIDs.push(priceList?.PriceListID)
  })
  let pricelist = await priceListFunction?.readPriceListForStoreEdit();
  let storePriceList = await priceListFunction?.readsPriceListByIDSSR(PIDs);
  let StoreTypeData = await storeFunction?.readStoreTypesSSR();
  return {
    props: {
      pricelistData: pricelist,
      storePriceListData: storePriceList,
      viewStore: storeInfo,
      storePriceList: storePriceListIDs,
      storeTypeData: StoreTypeData.output
    }
  }
}
