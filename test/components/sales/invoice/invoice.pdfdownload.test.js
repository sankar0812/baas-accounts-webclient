import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ListInvoices } from '../../../../src/components/sales/invoice/ListInvoices'
import { InvoicesColumnSettingsConfig } from '../../../../src/configs/pages/sales/invoices/InvoicesColumnSettings.Config';

const invoicesColumnSettingsConfig = new InvoicesColumnSettingsConfig();

describe('ListInvoice', () => {

    const mockData = {
        invoicesList: [
            {
                "CustomerName": "Sample1",
                "CustomerCode": "SAMPLE",
                "InvoiceID": 1,
                "Currency": {
                    "CurrencyCode": "USD"
                },
                "InvoiceNumber": 1,
                "InvoiceDate": "04/02/2023",
                "InvoiceAmount": 4238,
                "BalanceDue": 6563,
                "InvoiceStatus": "Pending",
                "CreatedDate": "5238"
            },
            {
                "CustomerName": "Sample2",
                "CustomerCode": "SAMPLE",
                "InvoiceID": 2,
                "Currency": {
                    "CurrencyCode": "USD"
                },
                "InvoiceNumber": 1,
                "InvoiceDate": "04/02/2023",
                "InvoiceAmount": 5238,
                "BalanceDue": 6563,
                "InvoiceStatus": "Pending",
                "CreatedDate": "5238"
            },
            {
                "CustomerName": "Sample3",
                "CustomerCode": "SAMPLE",
                "InvoiceID": 3,
                "Currency": {
                    "CurrencyCode": "USD"
                },
                "InvoiceNumber": 1,
                "InvoiceDate": "04/02/2023",
                "InvoiceAmount": 5238,
                "BalanceDue": 6563,
                "InvoiceStatus": "Pending",
                "CreatedDate": "5238"
            },
            {
                "CustomerName": "Sample4",
                "CustomerCode": "SAMPLE",
                "InvoiceID": 4,
                "Currency": {
                    "CurrencyCode": "USD"
                },
                "InvoiceNumber": 1,
                "InvoiceDate": "04/02/2023",
                "InvoiceAmount": 5238,
                "BalanceDue": 6563,
                "InvoiceStatus": "Pending",
                "CreatedDate": "5238"
            }
        ],
        invoicesCount: 200,
        InvoicesListColumnDetail: invoicesColumnSettingsConfig?.handleInvoicesColumnSettings()
    };

    const mockConfigs = {
        'data-testid': "Invoices_List",
        functionObject: null,
        filter: null,
        View:false


    }


    test('CHECK IF THE VENDOR LIST TABLE HAS VALID HEADERS', () => {
        render(
            <ListInvoices
                data = {mockData}
                configs ={mockConfigs}
            />
        )
        expect(screen.getByText('Action')).toBeInTheDocument();
        

    });

    test('CHECK IF THE ACTION MENU ICON IS ENABLE', () => {
        render(
            <ListInvoices
                data={mockData}
                configs={mockConfigs}
            />
        );
        const InvoiceListTableIcon = screen.getByTestId('Invoices_List');
        expect(InvoiceListTableIcon).toBeInTheDocument();
    });

    test.skip('CHECK IF THE ACTION MENU ICON IS ENABLE', () => {
        render(
            <ListInvoices
                data={mockData}
                configs={mockConfigs}
            />
        );
        const Actionicon = screen.getByTestId('1-Action');
        expect(Actionicon).toBeInTheDocument();
    });


    test.skip('CHECK IF THE PDF DOWNLOAD ICON IS ENABLED', () => {
        render(
            <ListInvoices
                data={mockData}
                configs={mockConfigs}
            />
        );
        const Actionicon = screen.getByTestId('1-Action');
        fireEvent.click(Actionicon);
        const PdfIcon = screen.getByTestId('1-PDF-Download');
        expect(PdfIcon).toBeInTheDocument()
        expect(PdfIcon).toHaveStyle({ fontSize: '16px', cursor: 'pointer' });
    });


   

});
