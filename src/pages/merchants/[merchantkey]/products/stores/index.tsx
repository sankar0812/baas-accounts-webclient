/**
 * CreatedBy   : Kannan
 * CreatedDate : Nov 7, 2023
 * ModifiedBy  : Vinod
 * ModifiedDate: NOV 14, 2023
 * Description : This file contains the Store module index page
 */

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AppStore from '../../../../../../appstorefile';

// Import required files
import { StoreFunction } from "@/functions/products/stores/StoreFunction";
import { ListStores } from "@/components/products/stores/Liststore";
import { AddStore } from "@/components/products/stores/AddStore";


// SDK layer imports
import { Breadcrumb, Button, Snackbar, platformHelper, sdkMui } from "@baas/platform-web-sdk";


// MUI imports
import SearchIcon from '@mui/icons-material/Search';


// Initialize the required objects
const storeFunction = new StoreFunction();
const appstore = new AppStore()

export default function ListStore(props: any) {
  const [listStore, setListStore] = useState(props?.listStoreDatas?.output);
  const [IsStoreCountLoading, setIsStoreCountLoading] = useState(false)
  const [StoreCount, setStoreCount] = useState<any>(props?.StoreCount?.output?._count);
  const [isListLoading, setIsListLoading] = useState(false);
  const [succesCreateMessageOpen, setSuccesCreateMessageOpen] = useState(false)
  const [isStoreAddDrawerOpen, setIsStoreAddDrawerOpen] = useState(false)
  const [isCreateClosePopup, setIsCreateClosePopup] = useState(false)
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearchClick = async () => {
    setIsStoreCountLoading(true)
    setIsListLoading(true);
    let response = await storeFunction?.readListStore({ "CreatedDate": 'desc' }, searchTerm, 0);
    if (response?.status === 200) {
      setListStore(response?.output);
      setIsListLoading(false);
    } else if (response?.status === 404) {
      setIsListLoading(false);
      setListStore(null);
    }
    let badgeCount = await storeFunction?.readStoresCount(searchTerm);
    if (badgeCount?.status === 200) {
      setStoreCount(badgeCount?.output?._count);
      setIsStoreCountLoading(false)
    }
    else if (badgeCount?.status === 404) {
      setStoreCount(0);
      setIsStoreCountLoading(false)
    }
  };

  useEffect(() => {
    console.info("Products", props?.listStoreDatas);
  }, [props?.listStoreDatas]);

  const readStore = async () => {
    setIsListLoading(true)
    setIsStoreCountLoading(true)
    let response = await storeFunction?.readListStore({ "CreatedDate": 'desc' }, "", 0);
    if (response?.status === 200) {
      setListStore(response?.output);
      setIsListLoading(false);
    } else if (response?.status === 404) {
      setIsListLoading(false);
      setListStore(null);
    }
    let badgeCount = await storeFunction?.readStoresCount("");
    if (badgeCount?.status === 200) {
      setStoreCount(badgeCount?.output?._count);
      setIsStoreCountLoading(false)
    }
    else if (badgeCount?.status === 404) {
      setStoreCount(0);
      setIsStoreCountLoading(false)
    }
  };

  const handleAddStore = (response: any) => {
    if (response?.status === 200) {
      setIsStoreAddDrawerOpen(false)
      setIsListLoading(true)
      readStore()
      setSuccesCreateMessageOpen(true)
      setTimeout(() => {
        setSuccesCreateMessageOpen(false)
      }, 3000)
    }
  }

  useEffect(() => {
    if (searchTerm === '' && listStore?.length !== props?.listStoreDatas?.output) {
      readStore()
    }
  }, [searchTerm])


  return (
    <>
      <sdkMui.Grid container spacing={0} sx={{ p: 0, m: 0 }}>
        <sdkMui.Grid item xs={12} sx={{ ml: 3, mt: 1 }} >
          <Breadcrumb
            configs={{
              breadcrumbItems: [
                { breadcrumbItemName: "Products", href: ``, name: "Products" },
                { breadcrumbItemName: "Stores", href: "", name: "Stores" },
              ],
              router: router
            }}
            data={{ defaltBreadcrumbItemName: "Products" }}
          />
        </sdkMui.Grid>
        <sdkMui.Grid item xs={12} sx={{ mt: 0, pt: 0 }}>
          <sdkMui.Card sx={{ p: 1, borderRadius: '12px' }}>
            <sdkMui.Grid container spacing={1} alignItems={'center'} sx={{ display: 'flex' }}>
              <sdkMui.Grid item xs={1} textAlign={'left'}>
                <sdkMui.Typography variant={'h4'} fontWeight={'bold'} >Stores</sdkMui.Typography>
              </sdkMui.Grid>
              <sdkMui.Grid item xs={1} sx={{ textAlign: 'left' }}>
                {IsStoreCountLoading ?
                  <sdkMui.Chip label={`Count : 0`} color='primary'></sdkMui.Chip>
                  :
                  <sdkMui.Chip label={`Count : ${StoreCount}`} color='primary'></sdkMui.Chip>

                }
              </sdkMui.Grid>
              <sdkMui.Grid item xs={7} sx={{ p: 0 }}>
                <sdkMui.Stack spacing={2} direction={'row'}>
                  <sdkMui.TextField
                    placeholder="Search"
                    type='search'
                    size='small'
                    fullWidth
                    InputProps={{
                      sx: { borderRadius: 1 },
                      endAdornment: <sdkMui.Button variant='contained' sx={{ borderRadius: 3 }} size='small' onClick={handleSearchClick}><SearchIcon /></sdkMui.Button>,
                    }}
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                  />
                  <span className="material-symbols-outlined" style={{ marginTop: '8px', cursor: "pointer", fontSize: '18px' }}>
                    filter_list
                  </span>
                </sdkMui.Stack>
              </sdkMui.Grid>
              <sdkMui.Grid item xs={3} sx={{ p: 0 }} textAlign={'right'}>
                <sdkMui.Button variant='contained' size='small' onClick={() => { setIsStoreAddDrawerOpen(true) }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>add</span>
                  <sdkMui.Typography variant='subtitle2'>Add Store</sdkMui.Typography>
                </sdkMui.Button>
              </sdkMui.Grid>

            </sdkMui.Grid>
          </sdkMui.Card>
        </sdkMui.Grid>
        <sdkMui.Grid container spacing={0} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <sdkMui.Grid item >

            {listStore?.length > 0
              ?
              <>

                {
                  isListLoading ?
                    <sdkMui.Stack spacing={2} direction={"row"} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <sdkMui.CircularProgress sx={{ alignItems: 'center !important' }} />
                    </sdkMui.Stack>

                    :
                    <ListStores
                      configs={{
                        dataTestID: "List-Stores",
                        functionObject: storeFunction,
                        filter: searchTerm,
                        router: router
                      }}
                      data={{
                        storeListData: listStore,
                        StoreCount: StoreCount,
                      }}
                    />
                }
              </>
              :
              <sdkMui.Grid sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>No Data Found</sdkMui.Grid >
            }
            {
              isCreateClosePopup &&
              <sdkMui.Dialog
                open={isCreateClosePopup}
                keepMounted
              >
                <sdkMui.DialogContent>
                  <sdkMui.DialogContentText>
                    <b>Your changes will be lost, Are you sure want to close..?</b>
                  </sdkMui.DialogContentText>
                </sdkMui.DialogContent>
                <sdkMui.DialogActions>
                  <Button
                    callbacks={{
                      handleButtonClick: () => { setIsStoreAddDrawerOpen(true); setIsCreateClosePopup(false) }
                    }}
                    configs={{
                      label: 'No',
                      color: 'secondary',
                      size: 'small',
                      type: 'button',
                      varient: 'contained',
                    }}
                  />
                  <Button
                    callbacks={{
                      handleButtonClick: () => { setIsStoreAddDrawerOpen(false); setIsCreateClosePopup(false) }
                    }}
                    configs={{
                      label: 'Yes',
                      color: 'error',
                      size: 'small',
                      type: 'button',
                      varient: 'contained',
                    }}
                  />
                </sdkMui.DialogActions>
              </sdkMui.Dialog>
            }
            {isStoreAddDrawerOpen &&
              <sdkMui.Drawer
                anchor={"right"}
                open={isStoreAddDrawerOpen}
              >
                <sdkMui.Box
                  sx={{ width: { lg: 350, xl: 350, md: 350, sm: 'fit-content', xs: 'fit-content' } }}
                  role="presentation"
                >
                  <AddStore
                    configs={{
                      datatestID: 'Product_Add_Store',
                      functionObject: storeFunction,
                      router: ''
                    }}
                    data={{
                      StoreInfo: [],
                      StoreTypeData: props?.StoreTypeData?.output
                    }}
                    callbacks={{
                      handleAddStore: (data: any) => { handleAddStore(data) },
                      handleFormClose: (isclose: boolean) => { setIsStoreAddDrawerOpen(isclose); setIsCreateClosePopup(isclose) }
                    }} />
                </sdkMui.Box>
              </sdkMui.Drawer>
            } {
              succesCreateMessageOpen &&
              <Snackbar
                configs={{
                  alertDescription: 'Successsully Created Store',
                  isSetOpen: succesCreateMessageOpen,
                  severity: 'success',
                  snackbarAutoHideDuration: 3000
                }} />
            }

          </sdkMui.Grid>
        </sdkMui.Grid>
      </sdkMui.Grid>
    </>
  );
}

export const getServerSideProps = async (context: any) => {

  const INSTANCEKEY = appstore?.INSTANCE?.INSTANCE_KEY;
  const CONNECTORURL = appstore?.AUTH?.AUTH_CONNECTOR_URL;

  if (!platformHelper.checkUserCookieStorage(context)) {
    return {
      redirect: {
        destination: `${CONNECTORURL}/signin/${INSTANCEKEY}`,
        permanent: false
      }
    };
  }

  //ServerSide function calling
  let listStoreData = await storeFunction?.readListStoreSSR();
  let StoreCount = await storeFunction?.readStoresSSRCount();
  let StoreTypeData = await storeFunction?.readStoreTypesSSR();

  return {
    props: {
      listStoreDatas: listStoreData,
      StoreCount: StoreCount,
      StoreTypeData: StoreTypeData
    }
  };
}