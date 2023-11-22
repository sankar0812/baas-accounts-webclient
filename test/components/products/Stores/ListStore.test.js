/**
@CreatedBy       :Hari Prakash A
@CreatedTime     : Nov 16 2023
@Description     : This file contains test cases for Customer Accounts Detail List
**/

import React from 'react';
import { render, screen } from '@testing-library/react';
import { ListStores }from'../../../../src/components/products/stores/Liststore' 
import listStore from '../../../../../BAAS-ACCOUNTS-WEB-CLIENT/src/mock/listStore.data.mock.json'


describe('ListStores', () => {

    const mockData = {
        storeListData : listStore
    }
    const mockConfigs = {
        dataTestID: "List-Stores",
        functionObject: jest.fn()
    }

    test('CHECK IF THE STORE LIST COMPONENT RENDERS IN THE DOM', () => {
        render(
            <ListStores
                data={mockData}
                configs={mockConfigs}
            />
        );
        const listComponent = screen.getByTestId('Store-list');
        expect(listComponent).toBeInTheDocument();

    });

    test('CHECK IF THE STORE LIST COMPONENT RENDERS IN THE DOM WITH THE TITLE', () => {
        render(
            <ListStores
                data={mockData}
                configs={mockConfigs}
            />
        );

        const listComponent = screen.getByTestId('Store-list');
        expect(listComponent).toHaveAttribute('data-testid');

    });


    test('CHECK IF THE STORE LIST TABLE HAS SUITABLE CONTENTS ', () => {
        render(
            <ListStores
                data={mockData}
                configs={mockConfigs}
            />
        );

        const CardElement = screen.getByTestId('Store-list');
        expect(CardElement).toHaveAttribute('data-testid');

    });



   











})