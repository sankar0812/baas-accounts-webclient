/** 
@CreatedBy       : Vinoth Kumar S
@CreatedTime     : Oct 28 2023
@Description     : This file contains test cases for Customer Payment Add
**/

import React from 'react';
import { render, screen } from '@testing-library/react';
import { AddPriceList } from '../../../../../src/components/sales/customers/pricelist/addPriceList';


describe.skip('Customer PriceList Add', () => {

    const mockConfigs = {

        functionObject: jest.fn(),
        merchantkey: "20",
        'data-testid': "Add-PriceList-Component",

    }

    const mockData = {

        productListData: null,
        currencyListData: null

    }

    //To check the create form render in the Dom
    test('CHECK IF THE CREATE FORM IS RENDER IN DOM', () => {
        render(
            <AddPriceList
                data={mockData}
                configs={mockConfigs}
            />
        );

        const formElement = screen.getByTestId("Add-PriceList-Component");
        expect(formElement).toHaveAttribute('data-testid');

    });

    //To check the create form have save button
    test('CHECK IF THE CREATE FORM RENDER WITH SAVE BUTTON', () => {
        render(
            <AddPriceList
                data={mockData}
                configs={mockConfigs}
            />
        );

        const buttonelement = screen.getByTestId('Add-PriceList-Save-Button');
        expect(buttonelement).toHaveTextContent("Save")

    });

    //To check if the create form have table title
    test('CHECK IF THE CREATE FORM HAVE THE TABLE TITLE', () => {
        render(
            <AddPriceList
                data={mockData}
                configs={mockConfigs}
            />
        );

        const title = screen.getByTestId('Add-PriceList-Component-Title');
        expect(title).toHaveAttribute("data-testid")

    });

    //To check the form have select label is enabled
    test('CHECK IF THE CREATE FORM HAVE SELECT LABEL', () => {
        render(
            <AddPriceList
                data={mockData}
                configs={mockConfigs}
            />
        );

        const selectLabel = screen.getByTestId('Add-PriceList-Select-Label');
        expect(selectLabel).toHaveAttribute("data-testid")

    });

    //To check the start date and end date both are working 
    test('CHECK IF THE CUSTOMER PRICE LIST TABLE COMPONENT HAS START DATE OPTION', () => {
        render(
            <AddPriceList
                data={mockData}
                configs={mockConfigs}
            />
        );

        const startDate = screen.getByTestId("Add-PriceList-Start-Date");
        expect(startDate).toHaveAttribute("data-testid")
        const endDate = screen.getByTestId("Add-PriceList-End-Date");
        expect(endDate).toHaveAttribute("data-testid")

    });

    //To check the create form have rows and columns
    test('CHECK IF THE CREATE FORM HAVE TABLE WITH ROWS AND COLUMNS', () => {
        render(
            <AddPriceList
                data={mockData}
                configs={mockConfigs}
            />
        );

        const selectLabel = screen.getByTestId('Add-PriceList-Table-Rows');
        expect(selectLabel).toHaveAttribute("data-testid")

    });








})
