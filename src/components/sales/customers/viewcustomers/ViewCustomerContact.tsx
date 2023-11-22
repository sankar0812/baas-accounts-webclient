
/**
@CreatedBy    : Muthumariappan G
@CreatedDate  : Oct 25 2023
@ModifiedBy   : Muthumariappan
@ModifiedDate : Oct 26 2023
@Description  : This file contain view customer contact component of customers table
*/

import { ViewCustomerContactInterface } from "@/interfaces/components/sales/customers/viewcustomer/ViewCustomerContactInterface";
import React, { useState } from "react";
import { sdkMui, Avatar as GlobalAvatar, } from "@baas/platform-web-sdk";
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export function ViewCustomerContact({ configs, data }: ViewCustomerContactInterface) {

    const [viewCustomersContactData] = useState(data?.viewCustomersContactData)

    return (
        <>
            <sdkMui.Grid container data-testid={configs?.dataTestID}>
                <sdkMui.Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ mt: 1 }} >
                    <sdkMui.Card
                        variant="elevation"
                        sx={{
                            padding: "10px",
                            borderRadius: "16px",
                        }}
                    >
                        <sdkMui.CardContent>
                            <sdkMui.Box data-testid="Customer-Info">
                                <sdkMui.Grid container spacing={2}>
                                    <sdkMui.Grid item xs={12} >
                                        <sdkMui.Typography variant="h4">
                                            <b> Customer Contact Info </b>
                                        </sdkMui.Typography>
                                    </sdkMui.Grid>
                                    <sdkMui.Grid item xs={12} sx={{ pb: 1, pt: 2 }}>
                                        <sdkMui.Divider color={"#000000"}></sdkMui.Divider>
                                    </sdkMui.Grid>
                                    {viewCustomersContactData !== null ?
                                        <sdkMui.Grid item xs={12} sx={{ pb: 1, pt: 2 }}>
                                            <sdkMui.Grid container spacing={2} data-testid={'Customer-Contact-Info'}>
                                                {viewCustomersContactData?.map((contact: any, index: number) =>
                                                    <sdkMui.Grid key={index} item xs={4} >
                                                        <sdkMui.Card
                                                            variant="elevation"
                                                            sx={{
                                                                padding: "10px",
                                                                borderRadius: "16px",
                                                                boxShadow: "8px 8px 8px 8px rgba(0,0,0,0.1)",
                                                                alignItems: "center",
                                                                display: "flex",
                                                                justifyContent: "center"
                                                            }}
                                                        >
                                                            <sdkMui.CardContent>
                                                                <sdkMui.Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                    <sdkMui.Stack direction={"column"} spacing={2}
                                                                        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                                                    >
                                                                        <GlobalAvatar
                                                                            configs={{
                                                                                name: contact?.FullName,
                                                                                type: "Letter", variant: "circular", bgColor: "green",
                                                                            }}
                                                                        />
                                                                        <sdkMui.Typography >
                                                                            <b>{contact?.FullName} </b>
                                                                        </sdkMui.Typography>
                                                                        <sdkMui.Typography >
                                                                            {contact?.Mobile}
                                                                        </sdkMui.Typography>
                                                                        <sdkMui.Typography >
                                                                            {contact?.Email}
                                                                        </sdkMui.Typography>
                                                                        <sdkMui.Typography >
                                                                            {contact?.Phone}
                                                                        </sdkMui.Typography>
                                                                    </sdkMui.Stack>
                                                                </sdkMui.Box>
                                                            </sdkMui.CardContent>
                                                        </sdkMui.Card>
                                                    </sdkMui.Grid>
                                                )}
                                            </sdkMui.Grid>
                                        </sdkMui.Grid>
                                        :
                                        <sdkMui.Grid item xs={12} textAlign={'center'}> <b>There is No Customer Contact Data for this Customer</b></sdkMui.Grid>}
                                </sdkMui.Grid>
                            </sdkMui.Box>
                        </sdkMui.CardContent>
                    </sdkMui.Card>
                </sdkMui.Grid>
            </sdkMui.Grid>
        </>
    )
}