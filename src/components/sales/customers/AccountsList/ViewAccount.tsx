/**
 * CreatedBy : HariPrakash
 * Createddate : Oct 12 2023
 * Decription : This is the function file for Account Lists
 */
import React, { useState } from "react";
import { sdkMui } from "@baas/platform-web-sdk";
import { ViewAccountDetailInterface } from "@/interfaces/components/sales/customers/ViewAccountInterface";
import { Helper } from "@/utils/Helper";
const helper = new Helper();
function ViewAccountDetail({ data }: ViewAccountDetailInterface) {
    const [listcustomeraccount] = useState(data?.AccountInformation?.slice(0, 5))
    const SchemaName = "Recent Activity Last Transaction"

    return (

        <>
            <sdkMui.Grid>

                <sdkMui.Grid>
                    {SchemaName}
                    {listcustomeraccount?.length > 0 ? (
                        listcustomeraccount?.map((data, index) => (

                            <>

                                <sdkMui.Grid >

                                    <sdkMui.Grid container spacing={0} data-testid="AccountDetails">

                                        <sdkMui.Grid item xs={12} sm={12} lg={12} xl={12}>

                                            <sdkMui.Card key={index} sx={{
                                                margin: '8px',
                                                border: '1px solid #6CB4EE',
                                                borderRadius: '20px 20px',
                                                backgroundColor: '',
                                                color: '#000',
                                                height: '80px',
                                                transition: 'background-color 0.3s',
                                                '&:hover': {
                                                    backgroundColor: '#E6E6FA',
                                                },
                                                '@media (prefers-color-scheme: dark)': {
                                                    backgroundColor: '#333',
                                                    color: '#FFFF',
                                                    '&:hover': {
                                                        backgroundColor: '#333',
                                                    },
                                                },
                                            }} >
                                                <sdkMui.CardContent >
                                                    <sdkMui.Grid container spacing={2} alignContent={'center'} data-testid="Car-Icon">
                                                        <sdkMui.Grid item xs={2}>
                                                            <span className="material-symbols-outlined" style={{ marginTop: '-11px', backgroundColor: '#CBC3E3', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                sync_alt
                                                            </span>
                                                        </sdkMui.Grid>
                                                        <sdkMui.Grid item xs={7} textAlign={'left'}>
                                                            <sdkMui.Stack spacing={0} sx={{ mt: -3 }} data-testid="Transaction-Time">
                                                                <sdkMui.Typography >
                                                                    <span
                                                                        style={{
                                                                            cursor: 'pointer',
                                                                            textAlign: 'end',
                                                                            fontWeight: 'bold',
                                                                            color: '#C0C0C0',
                                                                        }}
                                                                    >
                                                                        {helper.converttoDateFormat(data.TransactionDateTime, 'MM/DD/YYYY')}
                                                                    </span>
                                                                </sdkMui.Typography>
                                                                <sdkMui.Typography data-testid = {"Title"} sx={{ fontWeight: 'bold' }}>
                                                                    {data?.CustomerAccount?.DisplayName}
                                                                </sdkMui.Typography>
                                                                <sdkMui.Typography >
                                                                    <span
                                                                        style={{
                                                                            cursor: 'pointer',
                                                                            textAlign: 'end',
                                                                            fontWeight: 'bold',
                                                                            color: '#A9A9A9'


                                                                        }}
                                                                    >      {data?.TransactionNumber || "N/A"}
                                                                    </span>
                                                                </sdkMui.Typography>
                                                            </sdkMui.Stack>
                                                        </sdkMui.Grid>
                                                        <sdkMui.Grid item xs={3} textAlign={'right'} data-testid="Account">
                                                            <sdkMui.Typography sx={{
                                                                fontWeight: 'bold',
                                                                flexDirection: 'row',

                                                            }}>
                                                                <span
                                                                    style={{
                                                                        cursor: 'pointer',
                                                                        textAlign: 'end',
                                                                        fontWeight: 'bold',
                                                                        color: data?.Amount >= "C" ? 'red' : '#42ba96',
                                                                    }}
                                                                >
                                                                    {data?.Currency?.CurrencySymbol}{data?.Amount || "N/A"}
                                                                </span>
                                                            </sdkMui.Typography>
                                                        </sdkMui.Grid>
                                                    </sdkMui.Grid>
                                                </sdkMui.CardContent>
                                            </sdkMui.Card>

                                        </sdkMui.Grid>
                                        <sdkMui.Grid item xs={12} sm={12} lg={6} xl={6} >

                                        </sdkMui.Grid>
                                    </sdkMui.Grid>
                                </sdkMui.Grid>
                            </>
                        ))) : (
                        <sdkMui.Grid item xs={12} sx={{marginTop:'25%'}}textAlign={'center'}> <b>There is no transaction found...🤷</b></sdkMui.Grid>
                    )}
                </sdkMui.Grid>
            </sdkMui.Grid>
        </>
    )

}
export { ViewAccountDetail }
