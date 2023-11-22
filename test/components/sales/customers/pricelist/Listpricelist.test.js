/**
 * @CreatedBy : Venugopal
 * @createdDate : Oct 24 2023
 * @Describtion : This file contains the All the Test Suite and Test Case for this Price List form
 */
import React from 'react';
import {render, screen} from '@testing-library/react';
import { PriceList } from '../../../../../src/components/sales/customers/pricelist/Pricelist'
import pricelistdata from '../../../../../src/mock/listpricelist.data.mock.json'


describe('CreateInvoice', () => {
    const mockConfigs= {
        'data-testid': "Price-list",
        router : jest.fn()
    }
    const mockData= {
        PriceList: pricelistdata
    }
    test('CHECK IF THE COMPONENT REDER IN DOM', () => {
        render(
            <PriceList
            data={mockData}
            configs={mockConfigs}
            />
        );
        const formElement = screen.getByTestId("Price-list")
        expect (formElement).toBeInTheDocument()
    })
    test('CHECK IF THE COMPONENT CARD IS RENDER IN DOM', () => {
        render(
            <PriceList
            data={mockData}
            configs={mockConfigs}
            />
        );
        const cardElement = screen.getByTestId("PENSKE-PRODUCTS-2023-sdkMui.Card")
        expect(cardElement).toBeInTheDocument()
    });
    test('CHECK IF THE COMPONENT RENDER IN DOM WITH EXPECTED TITTLE', () =>{
        render(
            <PriceList
            data={mockData}
            configs={mockConfigs}
            />
        );
        const tittleElement = screen.getByTestId("PENSKE-PRODUCTS-2023-Price_list_Tittle")
        expect(tittleElement).toBeInTheDocument()
        expect(tittleElement).toHaveTextContent("PENSKE-PRODUCTS-2023")
    })
    test('CHECK IF THE COMPONENT RENDER IN DOM WITH EXPECTED CHIP CONTENT', () =>{
        render(
            <PriceList
            data={mockData}
            configs={mockConfigs}
            />
        );
        const chipElement = screen.getByTestId("PENSKE-PRODUCTS-2023-Price-List-Chip-content")
        expect(chipElement).toBeInTheDocument()
        expect(chipElement).toHaveTextContent("Active")
    })
    test('CHECK IF THE COMPONENT RENDER IN DOM WITH START DATE CONTENT', () =>{
        render(
            <PriceList
            data={mockData}
            configs={mockConfigs}
            />
        );
        const  startDate = screen.getByTestId("PENSKE-PRODUCTS-2023-start-date")
        expect(startDate).toBeInTheDocument()
        // expect(startDate).toHaveTextContent("calendar_month12/31/2022")
       // expect(startDate).toHaveTextContent("calendar_month01/01/2023")
    })
    test('CHECK IF THE COMPONENT RENDER IN DOM WITH END DATE CONTENT', () =>{
        render(
            <PriceList
            data={mockData}
            configs={mockConfigs}
            />
        );
        const EndDate = screen.getByTestId("PENSKE-PRODUCTS-2023-end-date")
        expect(EndDate).toBeInTheDocument()
        expect(EndDate).toHaveTextContent("-")
    })

})