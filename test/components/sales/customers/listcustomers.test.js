import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ListCustomers } from '../../../../src/components/sales/customers/ListCustomers'
import customerList from '../../../../src/mock/customerlist.data.mock.json'
import { CustomerColumnSettings } from '../../../../src/configs/pages/sales/customers/CustomerColumnSettings.Config'

const CustomerListConfig = new CustomerColumnSettings();

describe('ListCustomers', () => {
    const mockData = {
        
        customerList: customerList,
        customerListCount: 200,
        customerID : "PEN",
        customerListColumnDetail: CustomerListConfig?.handleCustomerheaderColumn()
    };
    const mockConfigs = 
    {
            'data-testid': 'Vendor_List',
            functionObject: jest.fn(),
            filter: "FLEXFLEET",
            router: jest.fn()    

    }

    // To check the components renders in the dom
    test('CHECK IF THE LIST COMPONENT RENDERS IN THE DOM', () => {
        render(
            <ListCustomers
                data={mockData}
                configs={mockConfigs}
            />
        );

        const listComponent = screen.getByTestId('Vendor_List');
        expect(listComponent).toBeInTheDocument();

    });

    // To Check the Sales customer list table has valid contents
    test('CHECK IF THE TABLE HAS SUITABLE CONTENTS ', () => {
        render(
            <ListCustomers
                data={mockData}
                configs={mockConfigs}
            />
        );

        const CardElement = screen.getByTestId('Cutomer-Table-Contents');
        expect(CardElement).toBeInTheDocument();

    });

    // To Check the customer list table has valid headers in the web client code
    test('CHECK IF THE CUSTOMER LIST TABLE HAS SUITABLE HEADERS ', () => {
        render(
            <ListCustomers
                data={mockData}
                configs={mockConfigs}
            />
        );
        expect(screen.getByText('Customer Name')).toBeInTheDocument();
        expect(screen.getByText('Customer Code')).toBeInTheDocument();
        expect(screen.getByText('City')).toBeInTheDocument();
        expect(screen.getByText('State')).toBeInTheDocument();
        expect(screen.getByText('Country')).toBeInTheDocument();
        expect(screen.getByText('Action')).toBeInTheDocument();

    });

    // To Check the customer list table column has menu action icon for edit and delete
    test('CHECK IF THE ACTION TYPE HAS MENU ICON FOR EDIT AND DELETE OPTION', () => {
        render(
            <ListCustomers
                data={mockData}
                configs={mockConfigs}
            />
        );
        const actionIcon = screen.getByTestId('RYDER-Action-Icon');
        expect(actionIcon).toBeInTheDocument();

    });

    test.skip('CHECK IF THE EDIT ICON IS ENABLED', () => {
        render(
            <ListCustomers
                data = {mockData}
                configs ={mockConfigs}
            />
        );
        const Actionicon = screen.getByTestId('RYDER-Action-Icon');
        fireEvent.click(Actionicon);
        const editIcon = screen.getByTestId('RYDER-Edit-Icon');
        expect(editIcon).toHaveStyle({ fontSize: '16px', cursor: 'pointer', marginTop: '4px' });

    });

    test.skip('CHECK IF THE DELETE ICON IS ENABLED', () => {
        render(
            <ListCustomers
                data = {mockData}
                configs ={mockConfigs}
            />
        );
        const Actionicon = screen.getByTestId('RYDER-Action-Icon');
        fireEvent.click(Actionicon);
        const deleteIcon = screen.getByTestId('RYDER-Delete-Icon');
        expect(deleteIcon).toHaveStyle({ fontSize: '16px', cursor: 'pointer', marginTop: '4px' });

    });

    test.skip('CHECK IF THE DELETE ICON IS ENABLED', () => {
        render(
            <ListCustomers
                data = {mockData}
                configs ={mockConfigs}
            />
        );
       
        const deleteIcon = screen.getByTestId('RYDER-Delete-Icon-Text');
        expect(deleteIcon).toHaveTextContent("Delete");

    });
 
})