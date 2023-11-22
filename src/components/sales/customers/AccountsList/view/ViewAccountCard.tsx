/**
@CreatedBy    : Muthumariappan G
@CreatedDate  : Oct 27 2023
@ModifiedBy   : Muthumariappan
@ModifiedDate : Oct 27 2023
@Description  : This file contain viewAccountCard component of account table
*/

import React, { useState } from "react";
import { ViewAccountCardInterface } from "@/interfaces/components/sales/customers/Accounts/view/ViewAccountCardInterface";
import { sdkMui, Button, } from "@baas/platform-web-sdk";
import CreditCardIcon from '@mui/icons-material/CreditCard';


export function ViewAccountCard( {configs, data} : ViewAccountCardInterface) {

    const[viewAccountCardData] = useState(data?.viewAccountCardData)

    return(
        <>
            <sdkMui.Grid container data-testid={configs?.dataTestID} sx={{mb:5, mt:5}}>
                <sdkMui.Grid item xs={12} >
                    <sdkMui.Grid xs={6} sm={6} md={6} lg={6} xl={6} 
                            sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start"}}
                    >
                        <sdkMui.Grid xs={9} sm={9} md={9} lg={9} xl={9} >
                            <sdkMui.Typography variant="h4" sx={{ml:5, fontSize:"16px"}}>
                                <b> Manage Cards </b>
                            </sdkMui.Typography>
                        </sdkMui.Grid>
                        <sdkMui.Grid xs={3} sm={3} md={3} lg={3} xl={3}>
                            <Button 
                                callbacks={{
                                    handleButtonClick: () => {  }
                                }}
                                configs={{
                                    label: `Add New Card`,
                                    color: 'primary',
                                    size: 'small',
                                    type: 'button',
                                    startIcon: <span className="material-symbols-outlined">
                                        add
                                    </span>,
                                    varient: 'contained',
                                    isButtonDisabled: false,
                                    dataTestID: 'Manage-Card-Button'
                                }}
                            />
                        </sdkMui.Grid>
                    </sdkMui.Grid> 
                </sdkMui.Grid>          
                <sdkMui.Grid item xs={12} data-testid={'Account-Cards'}>
                    {
                        viewAccountCardData?.map(( contact: any, index: number) =>
                            <sdkMui.Grid key={index} item xs={6} sm={6} md={6} lg={6} xl={6} > 
                                <sdkMui.Card variant="elevation" 
                                    sx={{ borderRadius: "3px", boxShadow:"2px 2px 2px 2px rgb(0,0,0,0.2)" }}
                                >
                                    <sdkMui.Box data-testid="View-Account-Card-Info">
                                        <sdkMui.Stack direction={"row"} spacing={9}>
                                            <CreditCardIcon style={{ fontSize:"30px" }} />
                                            <sdkMui.Typography >
                                                <> Card Name </> <br/>
                                                <b>
                                                    <span style={{alignItems:"center", justifyContent:"center", display:"flex"}}> 
                                                        {contact?.CardName}
                                                    </span>
                                                </b>                                                                  
                                            </sdkMui.Typography>
                                            <sdkMui.Typography >
                                                <> Card Type </> <br/>
                                                <b>
                                                    <span style={{alignItems:"center", justifyContent:"center", display:"flex"}}> 
                                                        {contact?.CardType}
                                                    </span>
                                                </b>                                                                 
                                            </sdkMui.Typography>
                                            <sdkMui.Typography >
                                                <> Card Number </> <br/>
                                                <b> 
                                                    <span style={{alignItems:"center", justifyContent:"center", display:"flex"}}>
                                                        {"**** **** ****"} {contact?.Last4Digit} 
                                                    </span> 
                                                </b>
                                            </sdkMui.Typography>
                                            <sdkMui.Typography>
                                                <span 
                                                    data-testid={`Edit-Icon`} 
                                                    className="material-symbols-outlined" 
                                                    style={{ fontSize: '20px', cursor: 'pointer', opacity: '1'}} 
                                                >
                                                    edit
                                                </span>
                                            </sdkMui.Typography>
                                        </sdkMui.Stack>
                                    </sdkMui.Box>
                                </sdkMui.Card>
                            </sdkMui.Grid>
                        )
                    }
                </sdkMui.Grid>
            </sdkMui.Grid>    
        </>
    )
}