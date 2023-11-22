import React, { useState } from "react";
import { viewStoreInterface } from "@/interfaces/components/products/stores/viewStore.interface";
import { Helper } from "@/utils/Helper";
import Paper from '@mui/material/Paper';
import { sdkMui, Avatar as GlobalAvatar, Chip } from "@baas/platform-web-sdk";
const helper = new Helper();

export function ViewStoreComponent({ data, configs }: viewStoreInterface) {
  const [ViewStore] = useState(data?.viewStore);
  const [priceList] = useState(data?.priceListData)

  const pricelistHeaders = [
    {
      "ColumnName": 'DisplayName',
      "DisplayName": 'DisplayName',
      "IsVisible": true
    },
    {
      "ColumnName": 'PriceListCode',
      "DisplayName": 'PriceListCode',
      "IsVisible": true

    },
    {
      "ColumnName": 'IsActive',
      "DisplayName": 'IsActive',
      "IsVisible": true
    },
    {
      "ColumnName": 'ActiveDate',
      "DisplayName": 'ActiveDate',
      "IsVisible": true
    },
    {
      "ColumnName": 'StartDate',
      "DisplayName": 'StartDate',
      "IsVisible": true
    },
    {
      "ColumnName": 'EndDate',
      "DisplayName": 'EndDate',
      "IsVisible": true
    },
    {
      "ColumnName": 'Remarks',
      "DisplayName": 'Remarks',
      "IsVisible": true
    },

  ]
  return (
    <>
      <sdkMui.Grid container spacing={2} data-testid={configs?.dataTestID} alignItems={'center'}>
        <sdkMui.Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ mt: 1 }}>
          <sdkMui.Card
            variant="elevation"
            sx={{
              padding: "10px",
              borderRadius: "16px",
            }}
          >

            <sdkMui.CardContent>
              <sdkMui.Box data-testid="Store-Info">
                <sdkMui.Box>
                  {ViewStore?.map((data: any) => (
                    <>
                      <sdkMui.Grid container spacing={2}>
                        <sdkMui.Grid item xs={12} sx={{ display: "flex", alignItems: "center", justifyContent: "left" }} data-testid="Store-Tittle">
                          <sdkMui.Typography variant="h4">
                            <b> Store Info. </b>
                          </sdkMui.Typography>

                        </sdkMui.Grid>

                        <sdkMui.Grid item xs={12} sx={{ pb: 1, pt: 2 }}>
                          <sdkMui.Divider color={"#000000"}></sdkMui.Divider>
                        </sdkMui.Grid>
                      </sdkMui.Grid>

                      <sdkMui.Grid sx={{ display: 'flex', justifyContent: "space-between" }} data-testid={`${data?.StoreName}`}>
                        <sdkMui.Typography sx={{ fontWeight: 'bold', m: 0, mt: 0 }}>
                          Type: {data?.StoreType?.StoreTypeName || "N/A"}
                        </sdkMui.Typography>
                        <sdkMui.Typography sx={{ fontWeight: 'bold', m: 0, mt: 0 }}>
                          Name: {data?.StoreName || "N/A"}
                        </sdkMui.Typography>

                        <sdkMui.Typography sx={{ fontWeight: 'bold', m: 0, mt: 0 }} data-testid={`${data?.StoreCode}`}>
                          Code: {data?.StoreCode || "N/A"}
                        </sdkMui.Typography>

                        <sdkMui.Typography sx={{ fontWeight: 'bold' }} data-testid={`${data?.Description}`}>
                          Description: {data?.Description || "N/A"}
                        </sdkMui.Typography>
                        <sdkMui.Typography sx={{ fontWeight: 'bold', m: 0, mt: 0, display: "flex", alignItems: "flex-end", justifyContent: "right" }}>
                          <Chip
                            configs={{
                              label: ViewStore[0]?.IsEnabled === true ? "Active" : "In-Active",
                              clickable: false,
                              color: ViewStore[0]?.IsEnabled === true ? 'primary' : "error",
                              size: 'small'
                            }}
                            callbacks={{
                              handleClick: () => { },
                              handleDelete: () => { }
                            }} />
                        </sdkMui.Typography>
                      </sdkMui.Grid>
                      &nbsp;
                      <sdkMui.Grid sx={{ display: 'flex', justifyContent: "space-between" }}>
                        <sdkMui.Typography sx={{ m: 0, mt: 0 }}>
                          StartDate : {data?.StartDate ? helper.converttoDateFormat(new Date(data?.StartDate).toISOString().split('T')[0], "MM/DD/YYYY") : "N/A"}
                        </sdkMui.Typography>

                        <sdkMui.Typography sx={{ m: 0, mt: 0 }}>
                          EndDate : {data?.EndDate ? helper?.converttoDateFormat(new Date(data?.EndDate).toISOString().split('T')[0], "MM/DD/YYYY") : "N/A"}
                        </sdkMui.Typography>

                        <sdkMui.Typography sx={{ fontWeight: 'bold', m: 0, mt: 0 }}>
                          <sdkMui.Stack direction={"row"} spacing={2} >

                            <GlobalAvatar
                              configs={{

                                name: data?.CreatedBy,
                                type: "Letter", variant: "circular", bgColor: "green",
                              }}

                            />
                            <sdkMui.Stack direction={'column'} spacing={0} >
                              <sdkMui.Typography>
                              </sdkMui.Typography>
                              <sdkMui.Typography data-testid={`${data?.CreatedBy}`}>
                                CreatedBy:  {data?.CreatedBy}
                              </sdkMui.Typography>
                              <sdkMui.Typography>
                                {helper?.converttoDateFormat(new Date(data?.CreatedDate).toISOString().split('T')[0], "MM/DD/YY")}
                              </sdkMui.Typography>
                            </sdkMui.Stack>
                          </sdkMui.Stack>
                        </sdkMui.Typography>
                        <sdkMui.Typography sx={{ fontWeight: 'bold', m: 0, mt: 0 }}>
                          <sdkMui.Stack direction={"row"} spacing={2} >
                            <GlobalAvatar
                              configs={{
                                name: data?.ModifiedBy || data?.CreatedBy,
                                type: "Letter", variant: "circular", bgColor: "red",
                              }}
                            />
                            <sdkMui.Stack direction={'column'} spacing={0} >
                              <sdkMui.Typography>
                              </sdkMui.Typography>
                              <sdkMui.Typography data-testid={`${data?.ModifiedBy}`}>
                                ModifiedBy:  {data?.ModifiedBy || data?.CreatedBy}
                              </sdkMui.Typography>
                              <sdkMui.Typography>
                                {helper?.converttoDateFormat(new Date(data?.ModifiedDate).toISOString().split('T')[0], "MM/DD/YY")}
                              </sdkMui.Typography>
                            </sdkMui.Stack>
                          </sdkMui.Stack>
                        </sdkMui.Typography>
                      </sdkMui.Grid>
                    </>
                  ))}
                </sdkMui.Box>
              </sdkMui.Box>
            </sdkMui.CardContent>
          </sdkMui.Card>
        </sdkMui.Grid>
        <sdkMui.Grid item xs={12}>
          <sdkMui.Typography variant="h4" fontWeight={'bold'} sx={{ ml: 2 }}>Price List</sdkMui.Typography>
        </sdkMui.Grid>
        <sdkMui.Grid item xs={12} justifyContent={'center'} alignItems={'center'} sx={{ display: 'flex' }}>
          {priceList?.length > 0 ? <>
            <sdkMui.TableContainer component={Paper} sx={{ maxHeight: { xs: "50vh", sm: "50vh", md: "50vh", lg: "50vh", xl: "50vh" }, minHeight: 'fit-content', borderRadius: '15px', width: '97%' }}>
              <sdkMui.Table sx={{ minWidth: 650 }} aria-label="sticky table" stickyHeader>
                <sdkMui.TableHead sx={{ background: (theme) => theme.palette.primary.main, color: (theme) => theme.palette.primary.contrastText }}>
                  <sdkMui.TableRow sx={{ background: (theme) => theme.palette.primary.main, color: (theme) => theme.palette.primary.contrastText }}>
                    {
                      pricelistHeaders?.map((column: any, index: number) => (
                        column?.IsVisible && <sdkMui.TableCell key={index} sx={{ background: (theme) => theme.palette.primary.main, color: (theme) => theme.palette.primary.contrastText }}><b> {helper?.convertToTitleCase(column?.DisplayName)}</b></sdkMui.TableCell>
                      ))
                    }
                  </sdkMui.TableRow>
                </sdkMui.TableHead>
                <sdkMui.TableBody>
                  {priceList?.map((SingleData: any, index: number) => (
                    <sdkMui.TableRow
                      key={index}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer', '&:hover': {
                          transform: 'scale(1.0)', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)'
                        }
                      }}
                    >
                      {pricelistHeaders?.find((data: any) => data?.ColumnName === 'DisplayName') &&
                        <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }}>
                          {SingleData?.DisplayName || "N/A"}
                        </sdkMui.TableCell>
                      }
                      {pricelistHeaders?.find((data: any) => data?.ColumnName === 'PriceListCode') &&
                        <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }}>
                          {SingleData?.PriceListCode || "N/A"}
                        </sdkMui.TableCell>
                      }
                      {pricelistHeaders?.find((data: any) => data?.ColumnName === 'IsActive') &&
                        <sdkMui.Typography sx={{ fontWeight: 'bold', m: 0, mt: 2, ml: 1, display: "flex", alignItems: "flex-end" }}>
                          <Chip
                            configs={{
                              label: SingleData?.IsActive === true ? "Active" : "In-Active",
                              clickable: false,
                              color: SingleData?.IsActive === true ? 'primary' : "error",
                              size: 'small'
                            }}
                            callbacks={{
                              handleClick: () => { },
                              handleDelete: () => { }
                            }} />
                        </sdkMui.Typography>

                      }
                      {pricelistHeaders?.find((data: any) => data?.ColumnName === 'ActiveDate') &&
                        <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }}>
                          {SingleData?.ActiveDate === null ? "N/A" : helper.converttoDateFormat(new Date(SingleData?.ActiveDate).toISOString().split('T')[0], "MM/DD/YYYY")}

                        </sdkMui.TableCell>
                      }
                      {pricelistHeaders?.find((data: any) => data?.ColumnName === 'StartDate') &&
                        <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }}>
                          {SingleData?.StartDate === null ? "N/A" : helper.converttoDateFormat(new Date(SingleData?.StartDate).toISOString().split('T')[0], "MM/DD/YYYY")}
                        </sdkMui.TableCell>
                      }
                      {pricelistHeaders?.find((data: any) => data?.ColumnName === 'EndDate') &&
                        <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }}>
                          {SingleData?.EndDate === null ? "N/A" : helper.converttoDateFormat(new Date(SingleData?.EndDate).toISOString().split('T')[0], "MM/DD/YYYY")}

                        </sdkMui.TableCell>
                      }
                      {pricelistHeaders?.find((data: any) => data?.ColumnName === 'Remarks') &&
                        <sdkMui.TableCell sx={{ bgcolor: (theme) => theme?.palette?.background?.default, color: (theme) => theme?.palette?.text?.primary }}>
                          {SingleData?.Remarks || "N/A"}
                        </sdkMui.TableCell>
                      }
                    </sdkMui.TableRow>
                  ))}
                </sdkMui.TableBody>
              </sdkMui.Table>
            </sdkMui.TableContainer>
          </>
            :
            <>No data Found..Add PriceList</>}
        </sdkMui.Grid>
      </sdkMui.Grid>
    </>
  );
}

