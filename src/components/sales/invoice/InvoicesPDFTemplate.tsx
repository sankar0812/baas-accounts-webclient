import React, { useState, useEffect } from 'react';
import { sdkMui } from "@baas/platform-web-sdk";
import { InvoicesPDFTemplateInterface } from '../../../interfaces/components/sales/invoices/InvoicesPDFTemplateInterface';
export function InvoicesPDFTemplate({ data }: InvoicesPDFTemplateInterface) {
    const [singlePDFData] = useState<any>(data?.invoicePDFDetail);
    const [totalAmount, setTotalAmount] = useState<number | any>(0);
    useEffect(() => {
        if (singlePDFData?.InvoiceItemInfo?.length > 0) {
            let calculatedTotalAmount = 0;
            for (const item of singlePDFData?.InvoiceItemInfo) {
                calculatedTotalAmount += parseFloat(item?.TotalAmount);
            }
            setTotalAmount(calculatedTotalAmount);
        }
    }, [singlePDFData]);

    return (
        <div id="jsxTemplate">
            <>
                <sdkMui.Box sx={{ flexGrow: 1, m: 2, }}  >
                    <sdkMui.Grid container xs={12}>
                        <sdkMui.Grid container style={{ marginBottom: "30px", marginTop: "19px", color: "#000" }}>
                            <sdkMui.Grid item xs={6} style={{ fontSize: "14px" }}>
                                <b>{singlePDFData?.MerchantTenantInfo?.TenantName}</b><br />
                                <p style={{ whiteSpace: "pre-line", margin: "0" }}>
                                    {singlePDFData?.MerchantTenantInfo?.Address}
                                    <p style={{ margin: "0" }}>
                                        {singlePDFData?.MerchantTenantInfo?.City}
                                        {singlePDFData?.MerchantTenantInfo?.State}
                                        {singlePDFData?.MerchantTenantInfo?.Country}
                                    </p>
                                    <p style={{ margin: "0" }}>
                                        {singlePDFData?.MerchantTenantInfo?.ZipCode}
                                    </p>
                                </p>
                            </sdkMui.Grid>
                            <sdkMui.Grid item xs={6} >
                                <sdkMui.Grid item xs={12} style={{ display: "flex", justifyContent: "flex-end", fontSize: "20px" }}>
                                    <b>INVOICE</b>
                                </sdkMui.Grid>
                                <sdkMui.Grid item xs={12} style={{ display: "flex", justifyContent: "flex-end", fontSize: "16px" }}>
                                    <b> # {singlePDFData?.InvoiceInfo?.InvoiceNumber} </b>
                                </sdkMui.Grid>
                                <sdkMui.Grid item xs={12} style={{ display: "flex", justifyContent: "flex-end", height: "12px" }}>
                                </sdkMui.Grid>
                                <sdkMui.Grid item xs={12} style={{ display: "flex", justifyContent: "flex-end", fontSize: "14px" }}>
                                    <b>Balance Due</b>
                                </sdkMui.Grid>
                                <sdkMui.Grid item xs={12} style={{ display: "flex", justifyContent: "flex-end", fontSize: "16px" }}>
                                    <b>USD$ {parseFloat(singlePDFData?.InvoiceInfo?.BalanceDue).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</b>
                                </sdkMui.Grid>
                            </sdkMui.Grid>
                        </sdkMui.Grid>
                        <sdkMui.Grid container xs={12} style={{ marginBottom: "20px", color: "#000" }}>
                            <sdkMui.Grid item xs={6} style={{ alignSelf: "flex-end", fontSize: "14px" }}>
                                Bill To<br />
                                <b>{singlePDFData?.CustomerInfo?.CustomerName}</b><br />
                                <p style={{ whiteSpace: "pre-line" }}>
                                    {singlePDFData?.CustomerInfo?.Address1}
                                </p>
                            </sdkMui.Grid>
                            <sdkMui.Grid item xs={6} style={{ alignSelf: "flex-end" }}>
                                <sdkMui.Grid container xs={12} style={{ marginBottom: "10px", fontSize: "14px" }}>
                                    <sdkMui.Grid item xs={8} style={{ display: "flex", justifyContent: "flex-end" }}>
                                        Invoice Date :
                                    </sdkMui.Grid>
                                    <sdkMui.Grid item xs={4} style={{ display: "flex", justifyContent: "flex-end" }}>
                                        {new Date(singlePDFData?.InvoiceInfo?.InvoiceDate).toISOString().split('T')[0]}
                                    </sdkMui.Grid>
                                </sdkMui.Grid>
                                <sdkMui.Grid container xs={12} style={{ marginBottom: "10px", fontSize: "14px" }}>
                                    <sdkMui.Grid item xs={8} style={{ display: "flex", justifyContent: "flex-end" }}>
                                        Terms :
                                    </sdkMui.Grid>
                                    <sdkMui.Grid item xs={4} style={{ display: "flex", justifyContent: "flex-end" }}>
                                        Due on Receipt
                                    </sdkMui.Grid>
                                </sdkMui.Grid>
                                <sdkMui.Grid container xs={12} style={{ marginBottom: "10px", fontSize: "14px" }}>
                                    <sdkMui.Grid item xs={8} style={{ display: "flex", justifyContent: "flex-end" }}>
                                        Due Date :
                                    </sdkMui.Grid>
                                    <sdkMui.Grid item xs={4} style={{ display: "flex", justifyContent: "flex-end" }}>
                                        {new Date(new Date(singlePDFData?.InvoiceInfo?.InvoiceDate).setDate(new Date(singlePDFData?.InvoiceInfo?.InvoiceDate).getDate() + parseInt(singlePDFData?.AppSettingNetTerm?.AppSettingNetTerm.split('-')[1]))).toISOString().split('T')[0]}
                                    </sdkMui.Grid>
                                </sdkMui.Grid>
                            </sdkMui.Grid>
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={12} >
                            <table style={{ width: "100%", fontSize: "12px", color: "black", borderSpacing: "0px" }}>
                                <thead style={{ backgroundColor: "#3C3D3A", color: "white" }} >
                                    <tr style={{ height: "40px", padding: "5px 5px" }}>
                                        <td style={{ width: "5%", textAlign: "center" }}>
                                            <sdkMui.Typography > # </sdkMui.Typography>
                                        </td>
                                        <td style={{ width: "50%", textAlign: "left" }}>
                                            <sdkMui.Typography > Item & Description </sdkMui.Typography>
                                        </td>
                                        <td style={{ width: "15%", textAlign: "right" }}>
                                            <sdkMui.Typography > Qty </sdkMui.Typography>
                                        </td>
                                        <td style={{ width: "15%", textAlign: "right" }}>
                                            <sdkMui.Typography > Rate </sdkMui.Typography>
                                        </td>
                                        <td style={{ width: "15%", textAlign: "right", paddingRight: "20px" }}>
                                            <sdkMui.Typography > Amount </sdkMui.Typography>
                                        </td>
                                    </tr>
                                </thead>
                                <tbody style={{ fontWeight: "500", color: "#000" }}>
                                    {
                                        singlePDFData?.InvoiceItemInfo?.map((item: any, index: any) => (
                                            <>
                                                <tr key={index} style={{ height: "40px", padding: "5px 0" }}>
                                                    <td style={{ width: "5%", textAlign: "center" }}>
                                                        <sdkMui.Typography sx={{ color: "#000" }}> {index + 1} </sdkMui.Typography>
                                                    </td>
                                                    <td style={{ width: "50%" }}>
                                                        <sdkMui.Typography sx={{ color: "#000" }}>{item?.Product?.ProductName}</sdkMui.Typography>
                                                    </td>
                                                    <td style={{ width: "15%", textAlign: "right" }}>
                                                        <div className='row'>
                                                            <div className='col-12'>
                                                                <sdkMui.Typography sx={{ color: "#000" }}>
                                                                    {parseFloat(item?.Qty).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                                </sdkMui.Typography>
                                                            </div>
                                                            <div className='col-12' style={{ color: "grey", fontSize: "10px" }}>
                                                                <sdkMui.Typography sx={{ color: "#000" }}> {item?.Product?.UoM} </sdkMui.Typography>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td style={{ width: "15%", textAlign: "right" }}>
                                                        <sdkMui.Typography sx={{ color: "#000" }}>
                                                            {parseFloat(item?.Rate).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                        </sdkMui.Typography>
                                                    </td>
                                                    <td style={{ width: "15%", textAlign: "right", paddingRight: "20px" }}>
                                                        <sdkMui.Typography sx={{ color: "#000" }}>
                                                            {parseFloat(item?.TotalAmount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                        </sdkMui.Typography>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={5}>
                                                        <hr />
                                                    </td>
                                                </tr>
                                            </>

                                        ))}
                                </tbody>
                            </table>
                            <table style={{ width: "100%", fontSize: "12px", color: "#000" }}>
                                < tr style={{ height: "40px", padding: "5px 0", borderBottom: "1px solid grey", fontWeight: "500" }}>
                                    <td style={{ width: "80%", textAlign: "right" }}>
                                        <sdkMui.Typography sx={{ color: "#000" }}> Sub Total </sdkMui.Typography>
                                    </td>
                                    <td style={{ width: "20%", textAlign: "right", paddingRight: "20px" }}>
                                        <sdkMui.Typography sx={{ color: "#000" }}>
                                            USD$  {parseFloat(totalAmount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </sdkMui.Typography>
                                    </td>
                                </tr>
                            </table>
                            <table style={{ width: "100%", fontSize: "12px", color: "#000" }}>
                                <tr style={{ height: "50px", paddingTop: "25px", fontWeight: "bold" }}>
                                    <td style={{ width: "80%", textAlign: "right" }}>
                                        <sdkMui.Typography sx={{ color: "#000", fontWeight: "bold" }}> Total </sdkMui.Typography>
                                    </td>
                                    <td style={{ width: "20%", textAlign: "right", paddingRight: "20px" }}>
                                        <sdkMui.Typography sx={{ color: "#000" }}>
                                            {singlePDFData?.InvoiceInfo?.InvoiceAmount}
                                        </sdkMui.Typography>
                                    </td>
                                </tr>
                                <tr style={{ height: "50px", paddingTop: "25px", fontWeight: "bold" }}>
                                    <td style={{ width: "80%", textAlign: "right" }}>
                                        <sdkMui.Typography sx={{ color: "#000", fontWeight: "bold" }}> Balance Due </sdkMui.Typography>
                                    </td>
                                    <td style={{ width: "20%", textAlign: "right", paddingRight: "20px" }}>
                                        <sdkMui.Typography sx={{ color: "#000" }}>
                                            USD$ {parseFloat(singlePDFData?.InvoiceInfo?.BalanceDue).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </sdkMui.Typography>
                                    </td>
                                </tr>
                            </table>
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={12} style={{ marginTop: "30px" }}>
                            <sdkMui.Grid item xs={6} style={{ fontSize: "14px" }}>
                                <sdkMui.Typography sx={{ color: "#000" }}> Notes </sdkMui.Typography>
                            </sdkMui.Grid>
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={12} >
                            <sdkMui.Grid item xs={6} style={{ fontSize: "12px" }}>
                                <sdkMui.Typography sx={{ color: "#000" }}> Thanks for your business. </sdkMui.Typography>
                            </sdkMui.Grid>
                        </sdkMui.Grid>
                    </sdkMui.Grid>
                </sdkMui.Box>
            </>
        </div >
    );
}