/**
 * Created By : Pradeepa S
 * Created Date : oct 20 2023
 * Description : This page contain create invoice functionality
 */

import React, { useState } from 'react';

import {CreateInvoice} from '@/components/sales/invoice/AddInvoice'
import { InvoicesFunction } from '@/functions/sales/invoices/InvoicesFuntion';
import { useRouter } from 'next/router';
import { CustomerFunction } from '@/functions/sales/customers/CustomerFunction';
import AppStore from '../../../../../../../appstorefile';
import { platformHelper } from '@baas/platform-web-sdk';


const appstore = new AppStore()
const customerFunction = new CustomerFunction()
const invoicesFunction = new InvoicesFunction()


export default function InvoiceAdd(props: any) {
    const router = useRouter()

    const [customerInfo] = useState(props?.customerInfo?.output)
    const [netTerms] = useState(props?.netTerms?.output)
    const [currencycode] = useState(props?.currencycode?.output)

    return (
        <>
            <CreateInvoice
                configs={{
                    datatestID: 'Create_Invoice',
                    router: router,
                    functionObject: invoicesFunction
                }}
                data={{
                    CustomerInfo: customerInfo,
                    TermInfo : netTerms,
                    CurrencyInfo : currencycode
                }} />

        </>
    )
}

export const getServerSideProps = async (context:any) => {

    const INSTANCEKEY = appstore?.INSTANCE?.INSTANCE_KEY;
    const CONNECTORURL = appstore?.AUTH?.AUTH_CONNECTOR_URL;

    if (!platformHelper.checkUserCookieStorage(context)) {
        return {
            redirect: {
                destination: `${CONNECTORURL}/signin/${INSTANCEKEY}`,
                permanent: false,
            },
        };
    }

    let customerInfo = await customerFunction?.readCustomerWithAccountsSSR()
    let netTerms = await invoicesFunction?.readNetTermsSSR()
    let currencycode = await invoicesFunction?.readCurrencysSSR()

    return {
        props: {
            customerInfo: customerInfo,
            netTerms: netTerms,
            currencycode:currencycode
        }
    }
}