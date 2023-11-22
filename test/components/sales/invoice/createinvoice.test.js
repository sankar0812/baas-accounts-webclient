/**
 * @CreatedBy : Venugopal
 * @createdDate : Oct 24 2023
 * @Describtion : This file contains the All the Test Suite and Test Case for this Create Invoice form
 */
import React from 'react';
import {render, screen} from '@testing-library/react';
import { CreateInvoice } from '../../../../src/components/sales/invoice/AddInvoice'


describe('CreateInvoice', () => {
    const mockData = {
        CustomerInfo: [
            {"CustomerID":4,"CustomerName":"prod"},
            {"CustomerID":2,"CustomerName":"Pre-prod"}
        ],
        TermInfo :  [
            {"AppSettingNetTermID":5},
            {"AppSettingNetTermID":3}
        ],
        CurrencyInfo:[
            {"CurrencyCode":"USD"},
            {"CurrencyCode":"AUD"},
            {"CurrencyCode":"EUD"}
        ]
    }
    const mockConfigs = {
        datatestID: 'Create_Invoice',
        router: jest.fn(),
        functionObject: jest.fn()
    }
    test('CHECK IF THE COMPONENT RENDERS IN DOM ', () => {
        render(
            <CreateInvoice
                data = {mockData}
                configs ={mockConfigs}
            />
        )
        const formElement = screen.getByTestId('Create_Invoice')
        expect (formElement).toBeInTheDocument();
    });
    test('CHECK IF THE COMPONENT RENDERS IN DOM WITH CLOSE AND SAVE BUTTON', () => {
        render(
            <CreateInvoice
                data = {mockData}
                configs ={mockConfigs}
            />
        )
        const formElement = screen.getByTestId('Create_Invoice')
        expect (formElement).toBeInTheDocument();

        const saveButton = screen.getByTestId("Invoice-save-button")
        expect(saveButton).toBeInTheDocument();

        const closeButton = screen.getByTestId("Invoice-close-button")
        expect(closeButton).toBeInTheDocument();
    });
    test('CHECK IF THE CREATE FORM RENDER WITH EXPECTED TITTLE',() => {
        render(
            <CreateInvoice
                data = {mockData}
                configs ={mockConfigs}
            />
        )
        const formTittle = screen.getByText("Create New Invoice");
        expect(formTittle).toBeInTheDocument()
    });
    test('CHECK IF THE FORM FIELDS ARE RENDER WITH CORRECT PLACEHOLDERS', () => {
        const { getByPlaceholderText } = render(

            <CreateInvoice
                data = {mockData}
                configs ={mockConfigs}
            />
        );

        const Describtion = getByPlaceholderText('Write here.........');
        expect(Describtion).toBeInTheDocument();
    });

    test('CHECK IF THE ERROR MESSAGES ARE DISPLAYED FOR REQUIRED FIELDS WHEN FORM IS SUBMITTED WITH EMPTY CODES', () => {
        render(

            <CreateInvoice
                data = {mockData}
                configs ={mockConfigs}
            />
        );
        const dueDateFeild = screen.getByTestId('Invoice-duedate-feild')
        const invoiceDateField = screen.getByTestId('Invoice-date-feild')
        const backUpChargeField = screen.getByTestId('Invoice-backup-charge-feild')
        const customerField = screen.getByTestId('Invoice-select-customer-feild')
        const currencyCodeFeild = screen.getByTestId('Invoice-Currency-feild')
        const termField = screen.getByTestId('Invoice-term-feild')
        const customerAccountField = screen.getByTestId('Invoice-select-Account-feild')

        const dueDateinputField = dueDateFeild.querySelector('input')
        const invoiceDateinputField = invoiceDateField.querySelector('input')
        const backUpChargeinputField = backUpChargeField.querySelector('input')
        const customerinputField = customerField.querySelector('input')
        const customerAccountinputField = customerAccountField.querySelector('input')
        const terminputField = termField.querySelector('input')
        const currencyCodeinputField = currencyCodeFeild.querySelector('input')
        
        const dueDateisRequired = dueDateinputField.hasAttribute('required')
        const invoiceDateisRequired = invoiceDateinputField.hasAttribute('required')
        const backUpChargeisRequired = backUpChargeinputField.hasAttribute('required')
        const customerisRequired = customerinputField.hasAttribute('required')
        const customerAccountisRequired = customerAccountinputField.hasAttribute('required')
        const termisRequired = terminputField.hasAttribute('required')
        const currencyCodeisRequired = currencyCodeinputField.hasAttribute('required')
        
        expect(dueDateisRequired).toBe(true);
        expect(backUpChargeisRequired).toBe(true);
        expect(invoiceDateisRequired).toBe(true);
        expect(customerisRequired).toBe(true);
        expect(customerAccountisRequired).toBe(true);
        expect(termisRequired).toBe(true);
        expect(currencyCodeisRequired).toBe(true);
    });
    test('CHECK IF THE ADD ITEMS TABLE RENDER IN DOM', () => {
        render(
            <CreateInvoice
                data = {mockData}
                configs ={mockConfigs}
            />
        );

        const tableElement = screen.getByTestId('Invoice-Items-Table-Felid');
        expect(tableElement).toBeInTheDocument();
    });
    test('CHECK IF THE ADD ITEMS TABLE RENDER IN DOM WITH VALID HEADERS', () => {
        render(
            <CreateInvoice
                data = {mockData}
                configs ={mockConfigs}
            />
        );

        const tableHeadElement = screen.getByTestId('Invoice-Items-Table-Headers-Felid');
        expect(tableHeadElement).toBeInTheDocument();
        const itemDetails =screen.getByText("Item Detail")
        const Quantity = screen.getAllByText("Qty")
        const rate = screen.getAllByText("Rate")
        const amount = screen.getAllByText("Amount")
        expect(itemDetails).toBeInTheDocument();
        expect(Quantity).toHaveLength(2);
        expect(rate).toHaveLength(2);
        expect(amount).toHaveLength(2);
    });
    test('CHECK IF THE CONCLUDED AMOUNT FEILD RENDER IN DOM', () => {
        render(
            <CreateInvoice
                data = {mockData}
                configs ={mockConfigs}
            />
        );
        const concludeElement = screen.getByTestId('Invoice-Conclusion-Feild');
        expect(concludeElement).toBeInTheDocument();
    });

})