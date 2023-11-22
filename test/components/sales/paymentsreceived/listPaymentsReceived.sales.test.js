import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ListPaymentsReceived } from '../../../../src/components/sales/paymentsreceived/ListPaymentsReceived';
import paymentsreceived from '../../../../src/mock/paymentsreceived.mock.json';
import { PaymentsReceivedColumnSettingsConfig } from "../../../../src/configs/pages/sales/paymentsReceived/PaymentsReceivedColumnSettings.config";

const paymentsReceivedColumnSettingsConfig = new PaymentsReceivedColumnSettingsConfig()
describe('ListPaymentsReceived', () => {
    const mockData = {
        paymentsreceivedLists: paymentsreceived,
        paymentsReceivedCount: 200,
        paymentsReceivedListcolumnDetail: paymentsReceivedColumnSettingsConfig?.handlePaymentsReceivedColumnSettings()
    };
    const mockConfigs = {
        paymentsreceivedSchema: {
            datatestid: 'List-PaymentRecived',
            funcobj: null,
            filter: "Ryder"

        },
    }

    //To check if the list component renders in the dom
    test('CHECK IF THE LIST COMPONENT RENDERS IN THE DOM', () => {
        render(
            <ListPaymentsReceived
                data={mockData}
                configs={mockConfigs}
            />
        );
        const listComponent = screen.getByTestId('List-PaymentRecived');
        expect(listComponent).toBeInTheDocument();
    });

    //To check if the list table renders in the dom
    test('CHECK IF THE TABLE HEADERS ARE RENDER IN THE DOM', () => {
        render(
            <ListPaymentsReceived
                data={mockData}
                configs={mockConfigs}
            />
        );
        const CardElement = screen.getByTestId('Table-Headers');
        expect(CardElement).toBeInTheDocument();
    });


    //To check if the list table has valid headers
    test('CHECK IF THE LIST TABLE HAS VALID HEADERS', () => {
        render(
            <ListPaymentsReceived
                data={mockData}
                configs={mockConfigs}
            />
        );
        expect(screen.getByText('Customer Name')).toBeInTheDocument();
        expect(screen.getByText('Invoice Count')).toBeInTheDocument();
        expect(screen.getByText('Paid Amount')).toBeInTheDocument();
        expect(screen.getByText('Reference Number')).toBeInTheDocument();
        expect(screen.getByText('Paid Date')).toBeInTheDocument();
        expect(screen.getByText('Action')).toBeInTheDocument();
    });

     //To check if the action type menu icon for edit and delete option
    test('CHECK IF THE ACTION TYPE HAS MENU ICON FOR EDIT AND DELETE OPTION', () => {
        render(
            <ListPaymentsReceived
                data={mockData}
                configs={mockConfigs}
            />
        );
        const actionIcon = screen.getByTestId('Error-Action-Icon');
        expect(actionIcon).toBeInTheDocument();
    });

    test('CHECK IF THE EDIT ICON IS ENABLED', () => {
        render(
            <ListPaymentsReceived
                data = {mockData}
                configs ={mockConfigs}
            />
        );
        const Actionicon = screen.getByTestId('Error-Action-Icon');
        fireEvent.click(Actionicon);
        const editIcon = screen.getByTestId('Error-Edit-Icon');
        expect(editIcon).toHaveStyle({ fontSize: '16px', cursor: 'pointer', marginTop: '4px' });

    });

   
    test('CHECK IF THE DELETE ICON IS ENABLED', () => {
        render(
            <ListPaymentsReceived
                data = {mockData}
                configs ={mockConfigs}
            />
        );
        const Actionicon = screen.getByTestId('Error-Action-Icon');
        fireEvent.click(Actionicon);
        const deleteIcon = screen.getByTestId('Error-Delete-Icon');
        expect(deleteIcon).toHaveStyle({ fontSize: '16px', cursor: 'pointer', marginTop: '4px' });
    });
})