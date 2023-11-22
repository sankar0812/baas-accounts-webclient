/** 
@CreatedBy       : Vinoth Kumar S
@CreatedTime     : Oct 28 2023
@Description     : This file contains test cases for Customer Payment Add
**/

import React from 'react';
import { render, screen } from '@testing-library/react';
import { RecordPayment } from '../../../../../src/components/sales/customers/payments/recordPayments';
// import { CreateConnectorTypeFormConfig } from '../../../../../src/configs/pages/sales/customers/payments/ColumnSettingsPayments.config'

// const ColumnSettingsPaymentsConfig = new CreateConnectorTypeFormConfig()
// const ColumnTypeFormData = ColumnSettingsPaymentsConfig?.handleCloumnSettingsPayments()

describe('Customer Payment Add', () => {

    const mockConfigs = {
        'data-testid': "Record-Payment",
        functionObject: jest.fn(),
        customerid: "10",
        merchantkey: "20",
        router: jest.fn()
    }

    const mockData = {
        CurrencyList: null,
        InvoiceList: null,
        BankAccountsList: null,
        PaymentMethodList: null
    }

    test('CHECK IF THE CREATE FORM IS RENDER IN DOM', () => {
        render(
            <RecordPayment
                data={mockData}
                configs={mockConfigs}
            />
        );

        const formElement = screen.getByTestId("Record-Payment");
        expect(formElement).toHaveAttribute('data-testid');

    });

    test('CHECK IF THE CREATE FORM RENDER WITH TITLE', () => {
        render(
            <RecordPayment
                data={mockData}
                configs={mockConfigs}
            />
        );

        const title = screen.getByTestId('Record-Payment-Title');
        expect(title).toHaveAttribute('data-testid');

    });

    test('CHECK IF THE CREATE FORM IS RENDER WITH MAKE BUTTON ENABLED', () => {
        render(
            <RecordPayment
                data={mockData}
                configs={mockConfigs}
            />
        );

        const ButtonElement = screen.getByTestId('Make-Payment-Button');
        expect(ButtonElement).toBeInTheDocument();

    });

    test('CHECK IF THE CREATE FORM IS RENDER WITH INVOICE COUNT LABEL ENABLED', () => {
        render(
            <RecordPayment
                data={mockData}
                configs={mockConfigs}
            />
        );

        const InvoiceCountlabel = screen.getByTestId('Read-Payment-InvoiceCount-Label');
        expect(InvoiceCountlabel).toHaveAttribute('data-testid');

    });

    test('CHECK IF THE CREATE FORM IS RENDER WITH INVOICE AMOUNT LABEL ENABLED', () => {
        render(
            <RecordPayment
                data={mockData}
                configs={mockConfigs}
            />
        );

        const InvoiceAmountlabel = screen.getByTestId('Read-Payment-InvoiceAmount-Label');
        expect(InvoiceAmountlabel).toHaveAttribute('data-testid');

    });

    test('CHECK IF THE CREATE FORM HAVE ITEMS INFO TITLE', () => {
        render(
            <RecordPayment
                data={mockData}
                configs={mockConfigs}
            />
        );

        const paymentsTitle = screen.getByTestId('Read-Payment-Info-Sub-Title');
        expect(paymentsTitle).toHaveAttribute('data-testid');

    });

    test('CHECK IF THE CREATE FORM HAVE ITEMS INFO TABLE ', () => {
        render(
            <RecordPayment
                data={mockData}
                configs={mockConfigs}
            />
        );

        const paymentInfo = screen.getByTestId('Read-Payment-Item-Info');
        expect(paymentInfo).toHaveAttribute('data-testid');

    });

    test.skip('CHECK IF THE CUSTOMER LIST TABLE HAS SUITABLE HEADERS ', () => {
        render(
            <RecordPayment
                data={mockData}
                configs={mockConfigs}
            />
        );
        
        expect(screen.getAllByText('Invoice Number')).toHaveLength(1);
        expect(screen.getAllByText('Invoice Amount')).toHaveLength(2);
        expect(screen.getAllByText('Invoice Date')).toHaveLength(2);
        expect(screen.getAllByText('Balance Due')).toHaveLength(2);

    });

    test.skip('CHECK IF THE CREATE FORM HAVE ITEMS INFO TABLE VALUES ', () => {
        render(
            <RecordPayment
                data={mockData}
                configs={mockConfigs}
            />
        );

        // const paymentInfo = screen.getByTestId('Record-Payment-DropDown');
        // expect(paymentInfo).toHaveAttribute('data-testid');
        // const dropdown = getByTestId("Record-Payment-DropDown");
        // fireEvent.click(dropdown);
        // expect(dropdown).getByRole('option')

    });



})