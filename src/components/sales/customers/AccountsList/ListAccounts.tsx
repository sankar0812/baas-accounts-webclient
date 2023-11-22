/**
 * CreatedBy : HariPrakash
 * Createddate : Oct 12 2023
 * Decription : This is the function file for Account Lists
 */
import React, { useState } from "react";
import { sdkMui } from "@baas/platform-web-sdk";
import { Helper } from "@/utils/Helper";
import { ListCustomerAccountInterface } from "@/interfaces/components/sales/customers/ListCustomerAccountInterface";
// import { useRouter } from "next/router";
const helper = new Helper();
function ListCustomersAccount({ data, configs }: ListCustomerAccountInterface) {
    const [listcustomeraccount,] = useState(data?.AccountList);
    const [] = useState(false);
    const lightBackgroundColor = '#E6E6FA';
    const darkBackgroundColor = '#333';
    const lightTextColor = '#000';
    const darkTextColor = '#FFFF';
    // const router = useRouter();
    return (
        <>

            <sdkMui.Box
                sx={{
                    overflowY: 'auto',

                }}
                data-testid="CustomerAccountList"
            >
                <sdkMui.Card sx={{
                    background: (theme) => theme.palette.primary.main,
                    color: (theme) => theme.palette.primary.contrastText,
                    p: 1,
                    margin: '4px',
                    borderRadius: '10px',
                    border: '1px solid #6CB4EE',
                    backgroundColor: '',
                    textAlign: 'center'
                }}>
                    <sdkMui.CardContent data-testid={'CustomerAccountListContent'}>
                        <sdkMui.Grid container spacing={1} sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>
                            <sdkMui.Grid item xs={2} sm={2} md={1}>
                                <sdkMui.Stack spacing={0} direction={'row'} >
                                    <span className="material-symbols-outlined" style={{ marginTop: '-11px', backgroundColor: '#CBC3E3', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        account_balance
                                    </span>
                                </sdkMui.Stack>
                            </sdkMui.Grid>
                            <sdkMui.Grid item xs={4} sm={2} md={2} sx={{ display: 'flex', textAlign: 'start' }}>
                                <sdkMui.Typography>
                                    <b>Account Name</b>
                                </sdkMui.Typography>
                            </sdkMui.Grid>
                            <sdkMui.Grid item xs={3} sm={2} md={1}>
                                <sdkMui.Typography>
                                    <b>Account#</b>
                                </sdkMui.Typography>
                            </sdkMui.Grid>
                            <sdkMui.Grid item xs={3} sm={2} md={1}>
                                <sdkMui.Typography>
                                    <b>Code</b>
                                </sdkMui.Typography>
                            </sdkMui.Grid>
                            <sdkMui.Grid item xs={4} sm={2} md={1}>
                                <sdkMui.Typography>
                                    <b>OpenedDate</b>
                                </sdkMui.Typography>
                            </sdkMui.Grid>
                            <sdkMui.Grid item xs={6} sm={2.5} md={2}>
                                <sdkMui.Typography>
                                    <b>Username</b>
                                </sdkMui.Typography>
                            </sdkMui.Grid>
                            <sdkMui.Grid item xs={3} sm={1}>
                                <sdkMui.Typography>
                                    <b>Balance</b>
                                </sdkMui.Typography>
                            </sdkMui.Grid>
                            <sdkMui.Grid item xs={3} sm={1}>
                                <sdkMui.Typography>
                                    <b>CreatedBy</b>
                                </sdkMui.Typography>
                            </sdkMui.Grid>
                            <sdkMui.Grid item xs={4} sm={2}>
                                <sdkMui.Typography>
                                    <b>CreatedDate</b>
                                </sdkMui.Typography>
                            </sdkMui.Grid>
                        </sdkMui.Grid>
                    </sdkMui.CardContent>
                </sdkMui.Card>
            </sdkMui.Box>
            <sdkMui.Box
                sx={{
                    overflowY: 'auto',
                    pb: 1
                }}
            >
                {listcustomeraccount?.map((data, index) => (
                    <sdkMui.Card key={index} sx={{
                        p: 1,
                        margin: '4px',
                        borderRadius: '10px',
                        border: '1px solid #6CB4EE',
                        backgroundColor: '',
                        color: lightTextColor,
                        textAlign: 'center',
                        transition: 'background-color 0.3s',
                        '&:hover': {
                            backgroundColor: lightBackgroundColor,
                        },
                        '@media (prefers-color-scheme: dark)': {
                            backgroundColor: darkBackgroundColor,
                            color: darkTextColor,
                            '&:hover': {
                                backgroundColor: darkBackgroundColor,
                            },
                        },
                    }}
                        onClick={() => configs?.router.push(`/merchants/${configs?.router?.query?.merchantkey}/sales/customers/${data.CustomerID}/accounts/${data?.CustomerAccountID}`)}>
                        <sdkMui.CardContent sx={{ cursor: "pointer" }}>
                            <sdkMui.Grid container spacing={0}>
                                <sdkMui.Grid item xs={2} sm={2} md={1}>
                                    <sdkMui.Stack spacing={0} direction={'row'} >
                                        <span className="material-symbols-outlined" style={{ marginTop: '-11px', backgroundColor: '#CBC3E3', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            account_balance
                                        </span>
                                    </sdkMui.Stack>
                                </sdkMui.Grid>
                                <sdkMui.Grid item xs={4} sm={2} md={2} sx={{ display: 'flex', textAlign: 'start' }}>
                                    <sdkMui.Typography>
                                        {data?.DisplayName}
                                    </sdkMui.Typography>
                                </sdkMui.Grid>
                                <sdkMui.Grid item xs={3} sm={2} md={1}>
                                    <sdkMui.Typography sx={{
                                        cursor: "pointer",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis"
                                    }}
                                        title={data?.AccountNumber}
                                    >
                                        {data.AccountNumber || "N/A"}
                                    </sdkMui.Typography>
                                </sdkMui.Grid>
                                <sdkMui.Grid item xs={3} sm={1}>
                                    <sdkMui.Typography>
                                        {data?.Currency?.CurrencyCode || "N/A"}
                                    </sdkMui.Typography>
                                </sdkMui.Grid>
                                <sdkMui.Grid item xs={4} sm={1.5} md={1}>
                                    <sdkMui.Typography>
                                        {data.OpenedDate === null ? "N/A" : helper.converttoDateFormat(data.OpenedDate, 'MM/DD/YYYY')}
                                    </sdkMui.Typography>
                                </sdkMui.Grid>
                                <sdkMui.Grid item xs={6} sm={2.5} md={2}>
                                    <sdkMui.Typography>
                                        {data.Username || "N/A"}
                                    </sdkMui.Typography>
                                </sdkMui.Grid>
                                <sdkMui.Grid item xs={3} sm={1}>
                                    <sdkMui.Typography>
                                        {`${data?.Currency?.CurrencySymbol}${data?.AccountBalance === null ? "0.00" : data?.AccountBalance.toFixed(2)}`}
                                    </sdkMui.Typography>
                                </sdkMui.Grid>
                                <sdkMui.Grid item xs={3} sm={1}>
                                    <sdkMui.Typography>
                                        {data?.CreatedBy}
                                    </sdkMui.Typography>
                                </sdkMui.Grid>
                                <sdkMui.Grid item xs={4} sm={2}>
                                    <sdkMui.Typography>
                                        {helper.converttoDateFormat(data.CreatedDate, 'MM/DD/YYYY')}
                                    </sdkMui.Typography>
                                </sdkMui.Grid>
                            </sdkMui.Grid>
                        </sdkMui.CardContent>
                    </sdkMui.Card>
                ))}
            </sdkMui.Box >
        </>
    )
}

export { ListCustomersAccount }
