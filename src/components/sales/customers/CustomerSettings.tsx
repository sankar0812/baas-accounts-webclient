/**
@CreatedBy        : Uma Kohila
@CreatedTime      : Oct 14 2023
@ModifiedBy       : Uma Kohila
@ModifiedTime     : Oct 14 2023
@Description      : This file contains component for Customer Settings List
**/

import { sdkMui } from "@baas/platform-web-sdk";
import React, { useState } from 'react'
import FeatherIcon from 'feather-icons-react';
import ListItemText from '@mui/material/ListItemText';
import { CustomerSettingsListInterface } from '@/interfaces/components/sales/customers/CustomerSettings'
import { Helper } from '@/utils/Helper';

const helper = new Helper()

export function CustomerSettingsList({ data, configs }: CustomerSettingsListInterface) {
    const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false)
    const displayGlobalSettingsList = () => {
        return (
            <>
                <sdkMui.Card data-testid="Customer-Settings-List" sx={{
                    p: 0, m: 0, ml: { xl: 0, md: 0, sm: 0, xs: 0 },
                    boxShadow: '6px 0px 15px -3px rgba(0,0,0,0.1)',
                    justifyContent: "flex-end",
                    borderRadius: { xl: "20px !important", lg: "20px !important", md: 0, sm: 0, xs: 0 },
                    marginBottom: { xl: "0px !important", lg: "0px !important", md: 0, sm: 0, xs: 0 },
                    height: { md: "100%", sm: "100%", xs: "100%", lg: "inherit", xl: "inherit" },
                }}>
                    <sdkMui.Box
                        sx={{
                            fontWeight: 'bold',
                            pt: 2, pb: 2,
                            borderRadius: '15px',
                            borderBottomRightRadius: '0px',
                            borderBottomLeftRadius: '0px',
                            background: (theme) => theme.palette.primary.main,
                            color: (theme) => theme.palette.primary.contrastText,
                            textAlign: 'center',
                            boxShadow: '6px 0px 15px -3px rgba(0,0,0,0.1)'
                        }}
                    >
                        Customer Detail
                    </sdkMui.Box>
                    <sdkMui.List
                        disablePadding
                        sx={{
                            ml: 0,
                            height: "40vh",
                            overflowY: "scroll"
                        }}
                    >
                        {
                            data?.customerSettingsList?.sort((a, b) => a.SchemaOrder - b.SchemaOrder)?.map((schema) =>
                                <>
                                    {
                                        <sdkMui.ListItem disablePadding>
                                            <sdkMui.ListItemButton
                                                selected={configs?.selectedSchemaCode === schema?.SchemaCode}
                                                onClick={() => { configs?.router?.push(helper?.constructDynamicURL(schema?.RedirectionURL, { "merchantkey": configs?.router?.query?.merchantkey, "customerid": configs?.router?.query?.customerid })) }}

                                            >
                                                <sdkMui.ListItemIcon sx={{ minWidth: '36px' }}>
                                                    <span className="material-symbols-outlined">
                                                        {schema?.SchemaIcon}
                                                    </span>
                                                </sdkMui.ListItemIcon>
                                                <ListItemText primary={schema?.SchemaName} />
                                            </sdkMui.ListItemButton>
                                        </sdkMui.ListItem>
                                    }
                                </>
                            )
                        }
                    </sdkMui.List>
                </sdkMui.Card>
            </>
        )
    }

    return (
        <>
            <sdkMui.IconButton
                size="large"
                color="inherit"
                aria-label="menu"
                onClick={() => setMobileSidebarOpen(true)}
                sx={{
                    display: {
                        xl: 'none',
                        lg: 'none',
                        md: 'block',
                        sm: 'block',
                        xs: 'block',
                    },
                }}
            >
                <FeatherIcon icon="menu" width="20" height="20" />
            </sdkMui.IconButton>
            <sdkMui.Box
                sx={{
                    display: {
                        xl: 'block',
                        lg: 'block',
                        md: 'none',
                        sm: 'none',
                        xs: 'none',
                    },
                }}
            >
                {displayGlobalSettingsList()}
            </sdkMui.Box>
            <sdkMui.Drawer
                anchor="left"
                open={isMobileSidebarOpen}
                onClose={() => setMobileSidebarOpen(false)}
                PaperProps={{
                    sx: {
                        width: '52%',
                        border: '0 !important',
                    },
                }}
                variant="temporary"
            >
                {displayGlobalSettingsList()}
            </sdkMui.Drawer>
        </>
    );
}