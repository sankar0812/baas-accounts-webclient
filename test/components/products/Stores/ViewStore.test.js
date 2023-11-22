/**
@CreatedBy        : Kannan
@CreatedTime      : OCT 28 2023
@Description      : This file contains test cases for Customer Accounts  View Form 
**/
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ViewStoreComponent } from '../../../../src/components/products/stores/ViewStore'
import viewStoreData from '../../../../src/mock/storeView.data.mock.json'

describe.skip('ViewStoreComponent', () => {
    const mockConfigs = {
        dataTestID: "View-Store",
        functionObject: jest.fn()
    };

    const mockData = {
        priceListData: [{}],
        viewStore: viewStoreData
    };


    test('CHECK IF THE VIEW FORM RENDERS IN THE DOM ', () => {
        render(
            <ViewStoreComponent
                data={mockData} Amazon
                configs={mockConfigs}
            />
        );

        const ViewformElement = screen.getByTestId("View-Store")
        expect(ViewformElement).toBeInTheDocument();
    });
    test('CHECK IF THE STROE INFO RENDERS IN THE DOM ', () => {
        render(
            <ViewStoreComponent
                data={mockData}
                configs={mockConfigs}
            />
        );

        const ViewformInfo = screen.getByTestId("Store-Info")
        expect(ViewformInfo).toBeInTheDocument();
    });

    test('CHECK IF THE VIEW FORM RENDER WITH EXPEXTED TITLE IN DOM', () => {
        render(
            <ViewStoreComponent
                data={mockData}
                configs={mockConfigs}
            />
        );

        const tittleElement = screen.getByTestId("Store-Tittle")
        expect(tittleElement).toBeInTheDocument();
    });

    test('CHECK IF THE VIEW FORM CONTAINS THE EXPECTED FIELDS', () => {
        render(
            <ViewStoreComponent
                data={mockData}
                configs={mockConfigs}
            />
        );

        const StoreName = screen.getByTestId('Amazon')
        const StoreCode = screen.getByTestId('AMZ')
        const Description = screen.getByTestId('Amazon')
        expect(StoreName).toBeInTheDocument();
        expect(StoreCode).toBeInTheDocument();
        expect(Description).toBeInTheDocument();
    })


})