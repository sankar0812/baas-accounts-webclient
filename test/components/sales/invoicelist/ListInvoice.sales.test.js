import React from 'react';
import { render, screen, fireEvent} from '@testing-library/react';
import { ListInvoices } from '../../../../src/components/sales/invoice/ListInvoices'
import { InvoicesColumnSettingsConfig } from '../../../../src/configs/pages/sales/invoices/InvoicesColumnSettings.Config';

const invoicesColumnSettingsConfig = new InvoicesColumnSettingsConfig();

describe('ListInvoice', () => {
    const mockData = {
        invoicesList: [
            {
                "InvoiceID": 1,
                "CustomerName": "Sample1",
                "InvoiceNumber": "1",
                "InvoiceDate": "04/02/2023",
                "InvoiceAmount": 5238,
                "BalanceDue": 6563,
                "InvoiceStatus": "Pending",
                "CreatedDate": "5238",
                "Currency": {
                    "CurrencyCode": "USD"
                }
            },
            {
                "InvoiceID": 2,
                "CustomerName": "Sample2",
                "InvoiceNumber": "2",
                "InvoiceDate": "04/02/2023",
                "InvoiceAmount": 5238,
                "BalanceDue": 6563,
                "InvoiceStatus": "Pending",
                "CreatedDate": "5238",
                "Currency": {
                    "CurrencyCode": "USD"
                }
            },
            {
                "InvoiceID": 3,
                "CustomerName": "Sample3",
                "InvoiceNumber": "3",
                "InvoiceDate": "04/02/2023",
                "InvoiceAmount": 5238,
                "BalanceDue": 6563,
                "InvoiceStatus": "Pending",
                "CreatedDate": "5238",
                "Currency": {
                    "CurrencyCode": "USD"
                }
            },
            {
                "InvoiceID": 4,
                "CustomerName": "Sample4",
                "InvoiceNumber": "4",
                "InvoiceDate": "04/02/2023",
                "InvoiceAmount": 5238,
                "BalanceDue": 6563,
                "InvoiceStatus": "Pending",
                "CreatedDate": "5238",
                "Currency": {
                    "CurrencyCode": "USD"
                }
            }
        ],
        invoicesCount: 200,
        InvoicesListColumnDetail: invoicesColumnSettingsConfig?.handleInvoicesColumnSettings()
    };
   
    const mockConfigs = {
        'data-testid': "Invoices_List",
        functionObject: jest.fn(),
        filter: null,
        View:false

    };

    test('CHECK IF THE CARD RENDERS IN THE DOM', () => {
        render(
            < ListInvoices
                data={mockData}
                configs={mockConfigs}
            />
        );
        const CardElement = screen.getByTestId('Invoices_List');
        expect(CardElement).toBeInTheDocument();
    });

    test('CHECK IF THE TABLE RENDERS IN THE DOM', () => {
        render(
            < ListInvoices
                data={mockData}
                configs={mockConfigs}
            />
        );
        const TableElement = screen.getByTestId('Invoices_List');
        expect(TableElement).toBeInTheDocument();
    });

    test('CHECK IF THE TABLE HEADERS RENDERS IN THE DOM', () => {
        render(
            < ListInvoices
                data={mockData}
                configs={mockConfigs}
            />
        );
        expect(screen.getByText('Customer Name')).toBeInTheDocument();
        expect(screen.getByText('Invoice #')).toBeInTheDocument();
        expect(screen.getByText('Invoice Date')).toBeInTheDocument();
        expect(screen.getByText('Invoice Amount')).toBeInTheDocument();
        expect(screen.getByText('Balance Due')).toBeInTheDocument();
        expect(screen.getByText('Action')).toBeInTheDocument();
    });

    // the belo cases are skipped because the list invoice compoennt has Ui logic for Action menus
    test.skip('CHECK IF THE ACTION MENU ICON IS ENABLE IN THE LIST', () => {
        render(
            <ListInvoices
                data={mockData}
                configs={mockConfigs}
            />
        );
        const Actionicon = screen.getByTestId('1-Action');
        expect(Actionicon).toBeInTheDocument();
    });

    test.skip('CHECK IF THE ACTION EDIT ICON IS ENABLED', () => {
        render(
            <ListInvoices
                data={mockData}
                configs={mockConfigs}
            />
        );
        const Actionicon = screen.getByTestId('1-Action');
        fireEvent.click(Actionicon);
        const editIcon = screen.getByTestId('1-Edit-Text');
        expect(editIcon).toHaveStyle({ fontSize: '16px', cursor: 'pointer'});
    });

    test.skip('CHECK IF THE ACTION DELETE ICON IS ENABLED', () => {
        render(
            <ListInvoices
                data={mockData}
                configs={mockConfigs}
            />
        );
        const Actionicon = screen.getByTestId('1-Action');
        fireEvent.click(Actionicon);
        const deleteIcon = screen.getByTestId('1-Delete-Text');
        expect(deleteIcon).toHaveStyle({ fontSize: '16px', cursor: 'pointer' });
    });
        
})