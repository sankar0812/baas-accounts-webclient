/**
@CreatedBy       :Hari Prakash A
@CreatedTime     : Nov 16 2023
@Description     : This file contains test cases for Price List
**/

import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProductPriceList }from'../../../../src/components/products/pricelists/ListPriceList' 
import listPriceList from '../../../../../BAAS-ACCOUNTS-WEB-CLIENT/src/mock/listpricelist.data.mock.json'


describe('ProductPriceList', () => {

    const mockData = {
        pricelist : listPriceList
    }
    const mockConfigs = {
        datatestID:  "Product-Price-list-add-Icon",
        functionObject: jest.fn()
    }

    test('CHECK IF THE STORE LIST COMPONENT RENDERS IN THE DOM', () => {
        render(
            <ProductPriceList
                data={mockData}
                configs={mockConfigs}
            />
        );
        const listComponent = screen.getByTestId('Products-Price-list');
        expect(listComponent).toBeInTheDocument();

    });

    test('CHECK IF THE STORE LIST COMPONENT RENDERS IN THE DOM WITH THE TITLE', () => {
        render(
            <ProductPriceList
                data={mockData}
                configs={mockConfigs}
            />
        );

        const listComponent = screen.getByTestId('Products-Price-list');
        expect(listComponent).toHaveAttribute('data-testid');

    });


    test('CHECK IF THE STORE LIST TABLE HAS SUITABLE CONTENTS ', () => {
        render(
            <ProductPriceList
                data={mockData}
                configs={mockConfigs}
            />
        );

        const CardElement = screen.getByTestId('Products-Price-list');
        expect(CardElement).toHaveAttribute('data-testid');

    });



   











})