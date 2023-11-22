/**
 * CreatedBy    : Muthumariappan
 * Createddate  : Nov 07 2023
* ModifiedBy   : Pradeepa S
* ModifiedDate : Nov 18 2023
 * Decription   : This Page file for Product Category 
 */

//NEXT JS imports
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

//SDK imports
import { Spinner, Button, platformHelper, sdkMui, Breadcrumb, Snackbar } from "@baas/platform-web-sdk";

//import required files
import AppStore from "../../../../../../appstorefile";
import { ListCategory } from "@/components/products/categories/ListCategories";
import { CategoriesFunction } from "@/functions/products/categories/CategoriesFunction";
import { ColumnSettingsCategoriesConfig } from "@/configs/pages/products/categories/ColumnSettingsCategories.config";
import { InvoiceColumnSettings } from "@/components/sales/invoice/InvoicesColumnSettings";
import { AddCategory } from '@/components/products/categories/AddCategory';

//MUI icon 
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Messages } from "@/utils/Messages";

//Declare Objects here
const categoriesFunction = new CategoriesFunction()
const appStore = new AppStore()
const timeout = 3000
const messages = new Messages()
const columnSettingsCategoriesConfig = new ColumnSettingsCategoriesConfig()


export default function Categories(props: any) {

  const router = useRouter()
  const [categoriesLists, setCategoriesList] = useState(props?.categoriesList?.output)
  const [searchTerm, setSearchTerm] = useState('');
  const [badgeCount, setBadgeCount] = useState(props?.categoriesBadgeCount?.output?._count)
  const [isBadgeLoading, setIsBadgeLoading] = useState<boolean>(false)
  const [isAddCategoryDrawerOpen, setIsAddCategoryDrawerOpen] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuButtonOpen = Boolean(anchorEl);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isCategoryPopUpClose, setIsCategoryPopUpClose] = useState(false)
  const [isListLoading, setIsListLoading] = useState(false)
  const [iscreateSuccessMessage, setISCreateSuccessMessageOpen] = useState(false)
  const [IsServerErrorMessageOpen, setIsServerErrorMessageOpen] = useState(false)
  const [IsEntityErrorMessageOpen, setIsEntityErrorMessageOpen] = useState(false)
  const [categoriesColumnHeaders] = useState(columnSettingsCategoriesConfig?.handleCloumnSettingsCategories())


  const handleOnClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };


  const handleSearchClick = async () => {
    setIsBadgeLoading(true)
    setIsListLoading(true)
    let categories = await categoriesFunction?.readCategories({ "CreatedDate": "desc" }, searchTerm, 0);
    if (categories?.status === 200) {
      setCategoriesList(categories?.output);
      setIsListLoading(false)
    }
    else if (categories?.status === 404) {
      setIsListLoading(false)
      setCategoriesList(null)
    }
    else {
      setIsListLoading(false)
      setCategoriesList(null)
    }

    let BadgeCount = await categoriesFunction?.readCategoriesCount(searchTerm);
    if (BadgeCount?.status === 200) {
      setBadgeCount(BadgeCount?.output?._count);
      setIsBadgeLoading(false)
    }
    else if (badgeCount?.status === 404) {
      setIsBadgeLoading(false)
    } else {
      setIsBadgeLoading(false)
    }
  }

  const handleColumnSettings = () => {
    setAnchorEl(null);
    setDrawerOpen(true);
  };

  const menu = [
    {
      id: "column-settings",
      value: "Column Settings",
      Click: () => handleColumnSettings()
    },
    {
      id: "Advance_Filetr",
      value: "Advance Filter",
      Click: () => { setAnchorEl(null) }
    }
  ]

  useEffect(() => {
    if (searchTerm === '' && categoriesLists?.length !== props?.categoriesList?.output) {
      readCategories()
    }
  }, [searchTerm])



  const readCategories = async () => {
    setIsListLoading(true)
    setIsBadgeLoading(true)
    let categories = await categoriesFunction?.readCategories({ "CreatedDate": "desc" }, searchTerm, 0);
    if (categories?.status === 200) {
      setCategoriesList(categories?.output);

      setIsListLoading(false)
    }
    else if (categories?.status === 404) {
      setIsListLoading(false)
      setCategoriesList(null)
    }

    let BadgeCount = await categoriesFunction?.readCategoriesCount("");
    if (BadgeCount?.status === 200) {
      setBadgeCount(BadgeCount?.output?._count);
      setIsBadgeLoading(false)
    }
    else if (BadgeCount?.status === 404) {
      setBadgeCount(0);
      setIsBadgeLoading(false)
    }
  }

  const handleAddCategory = (response: any) => {
    if (response?.status === 200) {
      readCategories()
      setIsAddCategoryDrawerOpen(false)
      setISCreateSuccessMessageOpen(true)
      setTimeout(() => {
        setISCreateSuccessMessageOpen(false)
      }, timeout)
    } else if (response?.status === 422) {
      setIsAddCategoryDrawerOpen(false)
      setIsEntityErrorMessageOpen(true)
      setTimeout(() => {
        setIsEntityErrorMessageOpen(false)
      }, timeout)
    }
    else {
      setIsAddCategoryDrawerOpen(false)
      setIsServerErrorMessageOpen(true)
      setTimeout(() => {
        setIsServerErrorMessageOpen(false)
      }, timeout)
    }
  }

  return (
    <>
      <sdkMui.Grid container spacing={2} direction={'column'}>
        <sdkMui.Grid item xs={12} sx={{ ml: 3, mt: 1 }} >
          <Breadcrumb configs={{
            breadcrumbItems: [
              { breadcrumbItemName: "Products", href: `/merchants/${router.query.merchantkey}/Products`, name: "Products" },
              { breadcrumbItemName: "Categories", href: `/merchants/${router.query.merchantkey}/Products/Categories`, name: "categories" },
            ],
            router: router
          }}
            data={{ defaltBreadcrumbItemName: "accounts" }}
          />
        </sdkMui.Grid>
        <sdkMui.Grid item xs={1} sx={{ p: 0, m: 0 }} >
          <sdkMui.Card sx={{ p: 2 }}>
            <sdkMui.Grid container spacing={0.5} direction={'row'} sx={{ display: 'flex', alignItems: 'center' }}>
              <sdkMui.Grid item xs={1.5} sx={{ textAlign: 'left' }}>
                <sdkMui.Typography variant={'h4'} fontWeight={'bold'} sx={{ ml: 1 }}>
                  Categories
                </sdkMui.Typography>
              </sdkMui.Grid>
              <sdkMui.Grid item xs={2} >
                {isBadgeLoading ?
                  <sdkMui.CircularProgress color="inherit" size={18} />
                  :
                  <sdkMui.Chip label={`Count : ${badgeCount}`} color='primary'></sdkMui.Chip>
                }
              </sdkMui.Grid>
              <sdkMui.Grid item xs={5} >
                <sdkMui.TextField
                  placeholder="Search"
                  type='search'
                  size="small"
                  fullWidth
                  InputProps={{
                    sx: { borderRadius: 1 },
                    endAdornment: <sdkMui.Button
                      variant='contained'
                      sx={{ borderRadius: 5 }}
                      onClick={handleSearchClick}
                    >
                      <SearchIcon />
                    </sdkMui.Button>,
                  }}
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </sdkMui.Grid>
              <sdkMui.Grid xs={1.5} sx={{ textAlign: 'center' }}>
                <sdkMui.IconButton
                  onClick={handleOnClickMenu}
                  sx={{ ml: 2 }}
                >
                  <MoreVertIcon />
                </sdkMui.IconButton>
                <sdkMui.Menu
                  open={isMenuButtonOpen}
                  anchorEl={anchorEl}
                  onClose={() => setAnchorEl(null)}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                  sx={{ display: 'flex', textAlign: 'center', height: '85%' }}
                >
                  <sdkMui.Stack spacing={2} direction={'column'} sx={{ p: 1 }}>
                    {
                      menu?.map((data: any) => (
                        <>
                          <sdkMui.Stack spacing={1} direction={'row'}>
                            {data.value === 'Column Settings' &&
                              <span
                                className="material-symbols-outlined"
                                style={{ fontSize: '20px', cursor: 'pointer' }}
                              >
                                data_table
                              </span>
                            }
                            {
                              data.value === 'Advance Filter' &&
                              <span
                                className="material-symbols-outlined"
                                style={{ fontSize: '20px', cursor: 'pointer' }}
                              >
                                filter_alt
                              </span>
                            }
                            <sdkMui.MenuItem
                              onClick={data?.Click}
                              id={data?.id}
                              sx={{ p: 0 }}
                            >
                              {data?.value}
                            </sdkMui.MenuItem>
                          </sdkMui.Stack>
                        </>
                      ))
                    }
                  </sdkMui.Stack>
                </sdkMui.Menu>
                {
                  drawerOpen &&
                  <sdkMui.Drawer
                    anchor={"right"}
                    open={drawerOpen}
                  >
                    <sdkMui.Box
                      sx={{
                        width: { lg: 350, xl: 350, md: 350, sm: 'fit-content', xs: 'fit-content' }
                      }}
                      role="presentation"
                    >
                      <sdkMui.Grid item xs={12}>
                        <InvoiceColumnSettings
                          configs={{
                            title: ""
                          }}
                          data={{
                            columnsDetails: categoriesColumnHeaders
                          }}
                          callbacks={{
                            handleClose: () => { setDrawerOpen(false) }
                          }}
                        />
                      </sdkMui.Grid>
                    </sdkMui.Box>
                  </sdkMui.Drawer>
                }
              </sdkMui.Grid>
              <sdkMui.Grid item xs={2} textAlign={'right'}>
                <Button
                  configs={{
                    label: 'Add Category',
                    dataTestID: 'Category-Add-Icon',
                    varient: 'contained',
                    size: 'small',
                    type: 'button',
                    startIcon: (
                      <span style={{ marginRight: '-7px' }} className="material-symbols-outlined">
                        add
                      </span>
                    )
                  }}
                  callbacks={{
                    handleButtonClick: () => { setIsAddCategoryDrawerOpen(true) },
                    handleOnChange: () => { }
                  }}
                />
              </sdkMui.Grid>

            </sdkMui.Grid>
          </sdkMui.Card>
        </sdkMui.Grid>
        <sdkMui.Grid item xs={10} >
          {
            categoriesLists?.length > 0 ?
              <>
                {
                  isListLoading ?
                    <Spinner /> :
                    <>
                      <sdkMui.Card>
                        <ListCategory
                          configs={{
                            'data-testid': 'List-Category',
                            functionObject: categoriesFunction,
                            router: router,
                            filter: searchTerm
                          }}
                          data={{
                            categoryList: categoriesLists,
                            categoryCount: badgeCount,
                            categoryListColumnDetail: categoriesColumnHeaders
                          }}
                        />
                      </sdkMui.Card>
                    </>
                }
              </>
              :
              <>
                <sdkMui.Grid sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>
                  No Data Found
                </sdkMui.Grid >
              </>
          }
        </sdkMui.Grid>
        {
          <sdkMui.Drawer
            anchor={"right"}
            open={isAddCategoryDrawerOpen}
          >
            <sdkMui.Box
              sx={{ width: { lg: 350, xl: 350, md: 350, sm: 'fit-content', xs: 'fit-content' } }}
              role="presentation"
            >
              <AddCategory
                configs={{
                  datatestID: 'Add_Category',
                  router: router,
                  functionObject: categoriesFunction
                }}
                data={{
                  ParentCategoryData: categoriesLists,
                  EditableCategoryData: null
                }}
                callbacks={{
                  handleAddCategory: (data: any) => { handleAddCategory(data) },
                  handleFormClose: (isClose: boolean) => { setIsAddCategoryDrawerOpen(isClose); setIsCategoryPopUpClose(isClose) },
                }} />
            </sdkMui.Box>
          </sdkMui.Drawer>
        }
        {
          isCategoryPopUpClose &&
          <sdkMui.Dialog
            open={isCategoryPopUpClose}
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
                  handleButtonClick: () => { setIsAddCategoryDrawerOpen(true); setIsCategoryPopUpClose(false) }
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
                  handleButtonClick: () => { setIsAddCategoryDrawerOpen(false); setIsCategoryPopUpClose(false) }
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
        {
          iscreateSuccessMessage &&
          <Snackbar
            configs={{
              severity: 'success',
              alertDescription: messages?.CATEGORY_ADD_SUCCESS_MESSAGE,
              isSetOpen: iscreateSuccessMessage,
              snackbarAutoHideDuration: timeout
            }}
          />
        }
        {IsServerErrorMessageOpen && (
          <Snackbar
            configs={{
              severity: "error",
              alertDescription: messages?.STATUS_ERROR_MESSAGE_FOR_500,
              isSetOpen: IsServerErrorMessageOpen,
              snackbarAutoHideDuration: timeout,
            }}
          />
        )}
        {IsEntityErrorMessageOpen && (
          <Snackbar
            configs={{
              severity: "error",
              alertDescription: messages?.STATUS_ERROR_MESSAGE_FOR_422,
              isSetOpen: IsEntityErrorMessageOpen,
              snackbarAutoHideDuration: timeout,
            }}
          />
        )}
      </sdkMui.Grid >
    </>
  );
}




export const getServerSideProps = async (context: any) => {
  const { query } = context;

  const merchantkey = query.merchantkey;
  const INSTANCEKEY = appStore?.INSTANCE?.INSTANCE_KEY;
  const CONNECTORURL = appStore?.AUTH?.AUTH_CONNECTOR_URL;

  if (!platformHelper.checkUserCookieStorage(context)) {
    return {
      redirect: {
        destination: `${CONNECTORURL}/signin/${INSTANCEKEY}`,
        permanent: false,
      },
    };
  }

  let categoriesList = await categoriesFunction?.readCategoriesSSR()
  let categoriesBadgeCount = await categoriesFunction?.readCategoriesCountSSR()

  return {
    props: {
      merchantkey: merchantkey,
      categoriesList: categoriesList,
      categoriesBadgeCount: categoriesBadgeCount,
    }
  }

}
