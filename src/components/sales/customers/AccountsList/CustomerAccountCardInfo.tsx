/**
 * Modified By         : HariPrakash
 * Modified Date       : 28 Oct 2023
 * Last Modified By    : HariPrakash
 * Last Modified Date  :  28 Oct 2023
 * Description         : This file contains Customer Accounts Info
 */
import { sdkMui } from "@baas/platform-web-sdk";
import React, { useState } from 'react'
import { Helper } from "@/utils/Helper";
import { CustomerAccountInfoInterface } from "@/interfaces/components/sales/customers/Accounts/view/CustomerAccountCardInfoInterface"
import ApplicationDetaillightCardBg from '../../../../assets/images/ApplicationDetailCardBg1.png';
import ApplicationDetaildarkCardBg from '../../../../assets/images/app_bg1.png';
const helper = new Helper();
export function CustomerAccountInfo(props: CustomerAccountInfoInterface) {
    const [appDetails] = useState<any>(props?.data?.AccountInfo?.[0])
    const [isCopied, setIsCopied] = useState(false);
    const handleCopyClick = async () => {
        await navigator?.clipboard?.writeText(props?.data?.AccountInfo[0]?.ApplicationKey);
        setIsCopied(true)
        setTimeout(() => {
            setIsCopied(false)
        }, 2000);
    };
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <sdkMui.Card sx={{
                boxShadow: '4px 0px 10px -3px rgba(0,0,0,0.6)',
                width: '60%',
                borderRadius: '20px !important',
                backgroundImage: (theme) => `url(${theme.palette?.mode === "light" ? ApplicationDetaillightCardBg.src : ApplicationDetaildarkCardBg.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: (theme) => theme.palette?.mode === "light" ? "#000" : theme.palette.primary.contrastText
            }}>
                <sdkMui.Box sx={{ pt: 0, pb: 5, ml: 2 }}>


                    <b>Customer Info</b>


                    <sdkMui.Grid>

                    </sdkMui.Grid>

                    <sdkMui.Typography sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                        {appDetails?.Customer?.CustomerName}


                    </sdkMui.Typography>

                    <sdkMui.Typography sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                        {appDetails?.Customer?.CustomerCode}
                        <sdkMui.Tooltip title={isCopied ? 'Copied!' : 'Copy to Clipboard'}>
                            <span className="material-symbols-outlined" style={{ fontSize: '15px', cursor: 'pointer', marginTop: 11 }} onClick={() => handleCopyClick()}>
                                content_copy
                            </span>
                        </sdkMui.Tooltip>
                    </sdkMui.Typography>
                    <sdkMui.Typography sx={{ fontWeight: 'bold', textAlign: 'center' }} >
                        {`${appDetails?.Customer?.Address1}${appDetails?.Customer?.Address2}${appDetails?.Customer?.City}`}
                    </sdkMui.Typography>


                    <sdkMui.Typography sx={{ fontWeight: 'bold', textAlign: 'center' }} >
                        {`${appDetails?.Customer?.State}${appDetails?.Customer?.Country}${appDetails?.Customer?.PostalCode}`}
                    </sdkMui.Typography>

                </sdkMui.Box>

            </sdkMui.Card>
            <sdkMui.Card sx={{
                boxShadow: '4px 0px 10px -3px rgba(0,0,0,0.6)',
                width: '50%',
                borderRadius: '20px !important',
                backgroundImage: (theme) => `url(${theme.palette?.mode === "light" ? ApplicationDetaillightCardBg.src : ApplicationDetaildarkCardBg.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: (theme) => theme.palette?.mode === "light" ? "#000" : theme.palette.primary.contrastText
            }}>
                <sdkMui.Box sx={{ pt: 0, pb: 5, ml: 2 }}>

                    <b> AccountInfo</b>
                    <sdkMui.Typography sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                        {appDetails?.AccountNumber}
                    </sdkMui.Typography>

                    <sdkMui.Typography sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                        {appDetails?.AccountCode}
                        <sdkMui.Tooltip title={isCopied ? 'Copied!' : 'Copy to Clipboard'}>
                            <span className="material-symbols-outlined" style={{ fontSize: '15px', cursor: 'pointer', marginTop: 11 }} onClick={() => handleCopyClick()}>
                                content_copy
                            </span>
                        </sdkMui.Tooltip>
                    </sdkMui.Typography>

                    <sdkMui.Typography sx={{ fontWeight: 'bold', textAlign: 'center' }} >
                        {appDetails?.OpenedDate === null ? "N/A" : helper.converttoDateFormat(appDetails?.OpenedDate, 'MM/DD/YYYY')}
                    </sdkMui.Typography>



                </sdkMui.Box>
            </sdkMui.Card>
        </div>
    )
}
