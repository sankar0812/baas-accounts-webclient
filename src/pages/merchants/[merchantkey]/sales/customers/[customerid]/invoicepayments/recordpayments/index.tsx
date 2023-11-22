/**
 * CreatedBy     : Uma Kohila
 * CreatedDate   : Oct 13 2023
 * Decsription   : This file contains the component of add payments
 */

// import all the neccessary files in header 
import React, { useState } from "react";
import { Breadcrumb, platformHelper, sdkMui } from "@baas/platform-web-sdk";
import AppStore from "../../../../../../../../../appstorefile";
import { InvoicesFunction } from "@/functions/sales/invoices/InvoicesFuntion";
import { PaymentsFunction } from "@/functions/sales/customers/payments/paymentsFunction";
import { CustomerFunction } from "@/functions/sales/customers/CustomerFunction";
import { Constants } from "@/utils/Constants";
import { BankFunction } from "@/functions/Bank/BankFunction";
import { RecordPayment } from "@/components/sales/customers/payments/recordPayments";
import { CurrencyFunction } from "@/functions/Currency/CurrencyFunction";
import { useRouter } from "next/router";
import { CustomerAccountListFunction } from "@/functions/sales/customers/CustomerAccountFunction";


// Initialize the required files as a objects
const appstore = new AppStore();
const constants = new Constants();
const customerFunction = new CustomerFunction();
const invoiceFunction = new InvoicesFunction()
const paymentsFunction = new PaymentsFunction();
const bankFunction = new BankFunction();
const currencyFunction = new CurrencyFunction();
const customerAccountListFunction = new CustomerAccountListFunction()

export default function RecordPayments(props: any) {
    const router = useRouter();
    const [customerInfo] = useState(props?.CustomerInfo)
    const [paymentMethods] = useState(props?.paymentMethods?.output)
    const [BanckAccounts] = useState(props?.bankAccounts?.output)
    const [invoiceList] = useState(props?.invoiceList?.output)
    const [CurrencyList] = useState(props?.currencyList?.output)
    const [customerid] = useState(props?.customerid)
    const [merchantkey] = useState(props?.merchantkey)

    return (
        <>
            <sdkMui.Grid container sx={{ p: 2, mt: 1 }} >
                <sdkMui.Grid item xs={8} >
                    <Breadcrumb configs={{
                        breadcrumbItems: [
                            { breadcrumbItemName: "Customers", href: `/merchants/${router?.query?.merchantkey}/sales/customers`, name: "Customers" },
                            { breadcrumbItemName: customerInfo?.CustomerName, href: ``, name: customerInfo?.CustomerName },
                            { breadcrumbItemName: "Invoice Payments", href: `/merchants/${router?.query?.merchantkey}/sales/customers/${router?.query?.customerid}/invoicepayments`, name: "Payments" },
                            { breadcrumbItemName: "Record Payments", href: `/merchants/${router?.query?.merchantkey}/sales/customers/${router?.query?.customerid}/recordpayments`, name: "Record Payments" },
                        ],
                        router: router
                    }}
                        data={{ defaltBreadcrumbItemName: "Payments Received" }}
                    />
                </sdkMui.Grid>
            </sdkMui.Grid>
            <RecordPayment
                configs={{
                    "data-testid": 'Record-Payment',
                    functionObject: paymentsFunction,
                    customerid: customerid,
                    merchantkey: merchantkey,
                    router: router
                }}
                data={{
                    CustomerAccounts: props?.customerAccounts,
                    BankAccountsList: BanckAccounts,
                    CurrencyList: CurrencyList,
                    InvoiceList: invoiceList,
                    PaymentMethodList: paymentMethods,

                }} />
        </>
    )

}

export const getServerSideProps = async (context: any) => {

    const { query } = context;
    let customerid = query.customerid;
    const merchantkey = query.merchantkey;
    const INSTANCEKEY = appstore?.INSTANCE?.INSTANCE_KEY;
    const CONNECTORURL = appstore?.AUTH?.AUTH_CONNECTOR_URL;
    let invoicestatusID = []
    let message = []

    if (!platformHelper.checkUserCookieStorage(context)) {
        return {
            redirect: {
                destination: `${CONNECTORURL}/signin/${INSTANCEKEY}`,
                permanent: false
            },
        };
    }

    let invoiceStatus = await invoiceFunction?.readInvoiceStstusSSR(constants?.INVOICE_STATUS)
    if (invoiceStatus?.status === 200) {
        invoicestatusID = invoiceStatus?.output[0]?.InvoiceStatusID
    }
    else {
        message.push(invoiceStatus?.message)
    }
    let invoiceList = await invoiceFunction?.readInvoiceswithcustomeridSSR(customerid, invoicestatusID);
    let bankAccount = await bankFunction?.readBankAccountsSSR();
    let paymentMethods = await paymentsFunction?.readPaymentsFunctionSSR();
    let CustomerInfo = await customerFunction?.readCustomersByIDSSR(parseInt(customerid))
    let currencyList = await currencyFunction?.readCurrencySSR()
    let customerAccounts = await customerAccountListFunction?.readCustomersAccountListSSR(parseInt(customerid))


    return {
        props: {
            customerid: customerid,
            merchantkey: merchantkey,
            invoiceList: invoiceList,
            paymentMethods: paymentMethods,
            CustomerInfo: CustomerInfo?.output[0],
            bankAccounts: bankAccount,
            currencyList: currencyList,
            customerAccounts: customerAccounts.output
        }
    }
}