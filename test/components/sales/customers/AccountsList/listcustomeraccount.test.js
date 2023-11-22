/**
@CreatedBy       : Vinoth Kumar S
@CreatedTime     : Oct 28 2023
@Description     : This file contains test cases for Customer Accounts Detail List
**/

import React from 'react';
import { render, screen } from '@testing-library/react';
import { ListCustomersAccount } from '../../../../../src/components/sales/customers/AccountsList/ListAccounts'
import customeraccount from '../../../../../src/mock/customeraccount.data.mock.json'


describe('CustomersAccountsList', () => {

    const mockData = {
        AccountList : customeraccount
    }
    const mockConfigs = {
        'data-testid': "CustomerAccountList",
        functionObject: jest.fn()
    }

    test('CHECK IF THE CUSTOMER ACCOUNT LIST COMPONENT RENDERS IN THE DOM', () => {
        render(
            <ListCustomersAccount
                data={mockData}
                configs={mockConfigs}
            />
        );

        const listComponent = screen.getByTestId("CustomerAccountList");
        expect(listComponent).toBeInTheDocument();

    });

    test('CHECK IF THE CUSTOMER ACCOUNT LIST COMPONENT RENDERS IN THE DOM WITH THE TITLE', () => {
        render(
            <ListCustomersAccount
                data={mockData}
                configs={mockConfigs}
            />
        );

        const listComponent = screen.getByTestId("CustomerAccountList");
        expect(listComponent).toHaveAttribute('data-testid');

    });


    test('CHECK IF THE CUSTOMER ACCOUNT LIST TABLE HAS SUITABLE CONTENTS ', () => {
        render(
            <ListCustomersAccount
                data={mockData}
                configs={mockConfigs}
            />
        );

        const CardElement = screen.getByTestId('CustomerAccountListContent');
        expect(CardElement).toHaveAttribute('data-testid');

    });

    test('CHECK IF THE CUSTOMER ACCOUNT LIST TABLE HAS SUITABLE HEADERS ', () => {
        render(
            <ListCustomersAccount
                data={mockData}
                configs={mockConfigs}
            />
        );
        expect(screen.getByText('Account#')).toBeInTheDocument();
        expect(screen.getByText('Code')).toBeInTheDocument();
        expect(screen.getByText('OpenedDate')).toBeInTheDocument();
        expect(screen.getByText('Username')).toBeInTheDocument();
        expect(screen.getByText('Balance')).toBeInTheDocument();
        expect(screen.getByText('CreatedBy')).toBeInTheDocument();
        expect(screen.getByText('CreatedDate')).toBeInTheDocument();

    });

    // test('CHECK IF THE CUSTOMER ACCOUNT LIST ROW HAS THEME ', () => {
    //     render(
    //         <ListCustomersAccount
    //             data={mockData}
    //             configs={mockConfigs}
    //         />
    //     );

    //     const CardElement = screen.getByTestId('CustomerAccountListTheme');
    //     expect(CardElement).toHaveAttribute('data-testid');

    // });











})