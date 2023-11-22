/**
 * @CreatedBy : Venugopal
 * @CreatedDate : Oct 25 2023
 * @Describtion : This file contains all the test suites and cases for List Payments
 */
import React from "react";
import { render, fireEvent, screen } from '@testing-library/react';
import { ListPayments } from "../../../../../src/components/sales/customers/payments/ListPayments"
import { ColumnSettingsPaymentsConfig } from "../../../../../src/configs/pages/sales/customers/payments/ColumnSettingsPayments.config";
import paymentListData from "../../../../../src/mock/listPayment.data.mock.json"

const columnSettingsPaymentsConfig = new ColumnSettingsPaymentsConfig();
const paymentListCloumns = columnSettingsPaymentsConfig?.handleCloumnSettingsPayments()



describe("ListPayments", () => {
    const mockData = {
        paymentList: paymentListData,
        paymentListColumnDetail: paymentListCloumns
    }
    const mockConfigs = {
        "data-testid": "List-Invoice-Payments",
        functionObject: jest.fn(),
        filter: ""
    }
    test("CHECK IF THE COMPONENT RENDER IN DOM", () => {
        render(
            <ListPayments
                data={mockData}
                configs={mockConfigs}
            />
        );
        const formElement = screen.getByTestId('List-Invoice-Payments')
        expect(formElement).toBeInTheDocument();
    });
    test('CHECK IF THE PAYMENT LIST TABLE HAS VALID HEADERS', () => {
        render(
            <ListPayments
                data={mockData}
                configs={mockConfigs}
            />
        );

        expect(screen.getByText('Paid Amount')).toBeInTheDocument();
        expect(screen.getByText('Payment Method')).toBeInTheDocument();
        expect(screen.getByText('Payment Confirmation')).toBeInTheDocument();
        expect(screen.getByText('Invoice Count')).toBeInTheDocument();
        expect(screen.getByText('Created Date')).toBeInTheDocument();

    });
    test('CHECK IF THE ACTION MENU ICON IS ENABLE', () => {
        render(
            <ListPayments
                data={mockData}
                configs={mockConfigs}
            />
        );
        const Actionicon = screen.getByTestId('UPI-Action-Icon');
        expect(Actionicon).toBeInTheDocument();
    });
    test('CHECK IF THE ACTION ICON IS CLICKABLE', () => {
        render(
            <ListPayments
                data={mockData}
                configs={mockConfigs}
            />
        );
        const Actionicon = screen.getByTestId('UPI-Action-Icon');
        fireEvent.click(Actionicon);
        const menu = screen.getByTestId('UPI-Action-Menu');
        expect(menu).toBeInTheDocument()
        expect(menu).toHaveStyle({ display: 'flex', textAlign: 'center', height: '85%' });

    });
    test('CHECK IF THE EDIT ICON IS ENABLED', () => {
        render(
            <ListPayments
                data={mockData}
                configs={mockConfigs}
            />
        );
        const Actionicon = screen.getByTestId('Card-3-Action-Icon');
        fireEvent.click(Actionicon);
        const editIcon = screen.getByTestId('Card-3-Edit-Icon');
        expect(editIcon).toBeInTheDocument()
        expect(editIcon).toHaveStyle({ fontSize: '16px', cursor: 'pointer', marginTop: '4px' });

    });


    test('CHECK IF THE DELETE ICON IS ENABLED', () => {
        render(
            <ListPayments
                data={mockData}
                configs={mockConfigs}
            />
        );
        const Actionicon = screen.getByTestId('UPI-Action-Icon');
        fireEvent.click(Actionicon);
        const deleteIcon = screen.getByTestId('UPI-Delete-Icon');
        expect(deleteIcon).toBeInTheDocument()
        expect(deleteIcon).toHaveStyle({ fontSize: '16px', cursor: 'pointer', marginTop: '4px' });
    });
})