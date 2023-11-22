/**
@CreatedBy       : Vinoth Kumar S
@CreatedTime     : Oct 24 2023
@Description     : This file contains test cases for customer detail view
**/

import React from 'react';
import { render, screen } from '@testing-library/react';
import { ViewCustomers } from '../../../../../src/components/sales/customers/viewcustomers/ViewCustomers';
import customerlist from '../../../../../src/mock/customerlist.data.mock.json';
// import { ViewCustomerPayment } from '../../../../../src/components/sales/customers/viewcustomers/ViewCustomerPayment';
// import { ViewCustomerInvoice } from '../../../../../src/components/sales/customers/viewcustomers/ViewCustomerInvoice'

describe('CUSTOMER VIEW', () => {
    const mockConfigs = {
        dataTestID: "Customers-Info-View-Form",
    };

    const mockData = {
        viewCustomersData: customerlist

    };

//     const invoicemockConfigs = {
//         dataTestID: "Customer-Invoice-Info",
//     };

//     const invoicemockData = {
//         viewCustomerInvoiceData: customerlist
//     };

//     const paymentmockConfigs = {
//         dataTestID: "Customer-Payment-Info",
//     };

//     const paymentmockData = {
//         viewCustomerPaymentData: customerlist
//    };


    test('CHECK IF THE CUSTOMER VIEW FORM RENDERS IN THE DOM ', () => {
        render(
            <ViewCustomers
                data={mockData}
                configs={mockConfigs}
            />
        );

        const ViewformElement = screen.getByTestId("Customers-Info-View-Form")
        expect(ViewformElement).toBeInTheDocument();

    });

    test('CHECK IF THE CUSTOMER INFO VIEW FORM REDER WITH THE TITLE', () => {
        render(
            <ViewCustomers
                data={mockData}
                configs={mockConfigs}
            />
        );

        const ViewFormTitle = screen.getByTestId("Customer-Info");
        expect(ViewFormTitle).toHaveAttribute('data-testid');

    });

    test('CHECK IF THE CUSTOMER INFO CONTAINS BUTTON ICON', () => {
        render(
            <ViewCustomers
                data={mockData}
                configs={mockConfigs}
            />
        );

        const buttonRole = screen.getByTestId("Customer-Info-Button");
        expect(buttonRole).toHaveStyle({ cursor: 'pointer' });

    });

    test('CHECK IF THE FORM CONTAINS CREATED AND MODIFIED INFO RENDER IN THE COMPONENT', () => {
        render(
            <ViewCustomers
                data={mockData}
                configs={mockConfigs}
            />
        );

        const CustomercardInfo = screen.getByTestId("Created and modified Info");
        expect(CustomercardInfo).toHaveAttribute('data-testid');

    });

    // test('CHECK IF THE INVOICE VIEW FORM RENDERS IN THE DOM ', () => {
    //     render(
    //         <ViewCustomerInvoice
    //             data={invoicemockData}
    //             configs={invoicemockConfigs}
    //         />
    //     );

    //     const CustomerViewform = screen.getByTestId("Customers-Invoice-View-Form")
    //     expect(CustomerViewform).toBeInTheDocument();

    // });

    // test('CHECK IF THE INVOICE INFO VIEW FORM REDER WITH THE TITLE', () => {
    //     render(
    //         <ViewCustomerInvoice
    //             data={invoicemockData}
    //             configs={invoicemockConfigs}
    //         />
    //     );

    //     const InvoiceformTitle = screen.getByTestId("Customer-Invoice-Info");
    //     expect(InvoiceformTitle).toHaveAttribute('data-testid');

    // });

    // test('CHECK IF THE VIEW CUSTOMER INVOICE INFO CONTAINS BUTTON ICON', () => {
    //     render(
    //         <ViewCustomerInvoice
    //             data={invoicemockData}
    //             configs={invoicemockConfigs}
    //         />
    //     );

    //     const InvoicebuttonRole = screen.getByTestId("Customer-Invoice-Info-Icon");
    //     expect(InvoicebuttonRole).toHaveStyle({fontSize: "20px", cursor: 'pointer' });

    // });

    // test('CHECK IF THE PAYMENT VIEW FORM RENDERS IN THE DOM ', () => {
    //     render(
    //         <ViewCustomerPayment
    //             data={paymentmockData}
    //             configs={paymentmockConfigs}
    //         />
    //     );

    //     const CustomerViewformElement = screen.getByTestId("Customers-Payment-View-Form")
    //     expect(CustomerViewformElement).toBeInTheDocument();

    // });

    // test('CHECK IF THE PAYMENT VIEW FORM RENDERS WITH THE TITLE ', () => {
    //     render(
    //         <ViewCustomerPayment
    //             data={paymentmockData}
    //             configs={paymentmockConfigs}
    //         />
    //     );

    //     const PaymentformInfo = screen.getByTestId("Customer-Payment-Info")
    //     expect(PaymentformInfo).toHaveAttribute('data-testid');

    // });

    // test('CHECK IF THE PAYMENT VIEW FORM RENDERS WITH BUTTON ICON ', () => {
    //     render(
    //         <ViewCustomerPayment
    //             data={paymentmockData}
    //             configs={paymentmockConfigs}
    //         />
    //     );

    //     const Viewformicon = screen.getByTestId("Customer-Payment-Info-Icon")
    //     expect(Viewformicon).toHaveStyle({fontSize: "20px", cursor: 'pointer'});

    // });

})