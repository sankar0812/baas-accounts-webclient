/**
@CreatedBy        : Kannan
@CreatedTime      : OCT 28 2023
@Description      : This file contains test cases for Customer Accounts  View Form 
**/
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ViewAccountDetail } from '../../../../../src/components/sales/customers/AccountsList/ViewAccount';

describe('ViewAccountsType', () => {
    const mockConfigs = {
        dataTestID: 'AccountDetails',
        functionObject:jest.fn()
    };

    const mockData = {
        AccountInformation:[{}]

    };

  
    test('CHECK IF THE VIEW FORM RENDERS IN THE DOM ', () => {
        render(
            <ViewAccountDetail
                data={mockData}
                configs={mockConfigs}
                 />
        );
     
        const ViewformElement = screen.getByTestId('AccountDetails')
        expect(ViewformElement).toBeInTheDocument();
    });




    test('CHECK IF THE VIEW FORM RENDER WITH THE ICON ', () => {
        render(
            <ViewAccountDetail
                data={mockData}
                configs={mockConfigs}
                 />
        );
     
        const CarIcon = screen.getByTestId('Car-Icon')
        expect(CarIcon).toBeInTheDocument();
    });

    test('CHECK IF THE TRANSACTION TIME IN THE DOCUMENT   ', () => {
        render(
            <ViewAccountDetail
                data={mockData}
                configs={mockConfigs}
                 />
        );
     
        const Transactiontime = screen.getByTestId('Transaction-Time')
        expect(Transactiontime).toBeInTheDocument();
    })

    test('CHECK IF THE VIEW FORM RENDER WITH THE TITLE  ', () => {
        render(
            <ViewAccountDetail
                data={mockData}
                configs={mockConfigs}
                 />
        );
     
        const ViewTitle = screen.getByTestId('Title')
        expect(ViewTitle).toBeInTheDocument();
    })


    test('CHECK IF THE AMOUNT IN THE DOCUMENT  ', () => {
        render(
            <ViewAccountDetail
                data={mockData}
                configs={mockConfigs}
                 />
        );
     
        const ViewAccount = screen.getByTestId('Account')
        expect(ViewAccount).toBeInTheDocument();
    })


})