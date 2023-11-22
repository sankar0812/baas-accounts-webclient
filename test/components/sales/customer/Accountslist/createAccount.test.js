/**
@CreatedBy        : Kannan
@CreatedTime      : Oct 24 2023
@Description      : This file contains Create Account   test case and suite
**/


import React from 'react';
import { render, screen, fireEvent ,getByPlaceholderText} from '@testing-library/react';
import { CreatePriceListForm } from '../../../../../src/components/sales/customers/AccountsList/CreateAccounts'

describe('CreatePriceListForm', () => {

    const mockData = {
        Currency: [{}],
    }

    const mockConfigs = {
        datatestID: "Create_Accounts",
        router: jest.fn(),
        functionObject: {
            CreateAccount: jest.fn()
        },

    }

    const mockCallbacks = {
        handleAccountCreateFormSubmit: jest.fn(),
        handleAccountCreateFormClose: jest.fn()
    }


    test('CHECK IF THE COMPONENT RENDERS IN DOM ', () => {
        render(
            <CreatePriceListForm
                data={mockData}
                callbacks={mockCallbacks}
                configs={mockConfigs}
            />
        )
        const formElement = screen.getByTestId('Create_Accounts')
        expect(formElement).toBeInTheDocument();
    });



    test('CHECK IF THE FORM FIELDS ARE RENDER WITH CORRECT PLACEHOLDER codes', () => {
        const { getByPlaceholderText } = render(

            <CreatePriceListForm
                data={mockData}
                callbacks={mockCallbacks}
                configs={mockConfigs}
            />
        );

        const GroupNamePlaceholder = getByPlaceholderText('Enter Account Number...')
        const GroupCodePlaceholder =getByPlaceholderText('Enter AccountCode...')
        const CurrencyPlaceholder = getByPlaceholderText('Enter Currency Code...')
        const usernamePlaceholder = getByPlaceholderText('Enter Username...')
        const passwordPlaceholder = getByPlaceholderText('Enter Password...')
        const lowbalancePlaceholder = getByPlaceholderText('Enter LowBalanceThreshold...')

        expect(GroupNamePlaceholder).toBeInTheDocument();
        expect(GroupCodePlaceholder).toBeInTheDocument();
        expect(CurrencyPlaceholder).toBeInTheDocument();
        expect(usernamePlaceholder).toBeInTheDocument();
        expect(passwordPlaceholder).toBeInTheDocument();
        expect(lowbalancePlaceholder).toBeInTheDocument();


    });

    test('CHECK IF THE ERROR MESSAGES ARE DISPLAYED FOR REQUIRED FIELDS WHEN FORM IS SUBMITTED WITH EMPTY CODES', () => {
        render(
            <CreatePriceListForm
                data={mockData}
                callbacks={mockCallbacks}
                configs={mockConfigs}
            />
        );
        const GroupNameInputField = screen.getByTestId('Account-number')
        const GroupCodeInputField = screen.getByTestId('Account-code')

        const GroupNameinputField = GroupNameInputField.querySelector('input')
        const GroupCodeinputField = GroupCodeInputField.querySelector('input')

        const GroupNameisRequired = GroupNameinputField.hasAttribute('required')
        const GroupCodeisRequired = GroupCodeinputField.hasAttribute('required')

        expect(GroupNameisRequired).toBe(true);
        expect(GroupCodeisRequired).toBe(true);
    });

    test('CHECK IF THE handleGroupCreateFormSubmit FUNCTION IS CALLED WHEN THE FORM IS SUBMITTED', () => {
        render(
            <CreatePriceListForm
                data={mockData}
                callbacks={mockCallbacks}
                configs={mockConfigs}
            />
        );

        const formElement = screen.getByTestId("Instance-service-submit-button")
        fireEvent.submit(formElement);

        expect(mockCallbacks?.handleAccountCreateFormSubmit).toHaveBeenCalledTimes(0);
    })



    test('CHECK IF THE handlePackageCreateFormSubmit FUNCTION IS CALLED WHEN THE FORM IS SUBMITTED', () => {
        render(
            <CreatePriceListForm
                data={mockData}
                callbacks={mockCallbacks}
                configs={mockConfigs}
            />
        );

        const formElement = screen.getByTestId("Instance-service-submit-button")
        fireEvent.submit(formElement);

        expect(mockCallbacks?.handleAccountCreateFormClose).toHaveBeenCalledTimes(0);
    })


});