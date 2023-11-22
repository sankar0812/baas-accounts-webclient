/*
 * CreatedBy   : Vinoth Kumar S
 * CreatedDate : Nov 15 2023
 * Description : This file contain test case for products Stores Add
 */

import React from "react"
import { render, fireEvent, screen } from "@testing-library/react"
import { AddStore } from "../../../../src/components/products/stores/AddStore"

//Test suite for Product Add store component
describe("AddStore", () => {

    const mockData = {
        StoreInfo: null,
        StoreTypeData: null

    }

    const mockConfigs = {

        'datatestID': "Product_Add_Store",
        router: jest.fn(),
        functionObject: jest.fn()

    }

    const mockcallbacks = {

        handleAddStore: jest.fn(),
        handleFormClose: jest.fn()

    }

    //Test case for If the compenent rendors in the dom
    test("TESTING IF COMPONENT RENDORS IN DOM", async () => {
        render(
            <AddStore
                data={mockData}
                configs={mockConfigs}
                callbacks={mockcallbacks}
            />
        );
        const storeComponent = screen.getByTestId("Product_Add_Store")
        expect(storeComponent).toBeInTheDocument()

    });

    //Test case for the title of the store add screen is visible or not  
    test('CHECK IF THE ADD STORE FORM RENDER WITH TITLE', () => {
        render(
            <AddStore
                data={mockData}
                configs={mockConfigs}
                callbacks={mockcallbacks}
            />
        );

        const title = screen.getByTestId('Add_Store_Title');
        expect(title).toHaveAttribute('data-testid');

    });

    //Test case for the add button is enabled in the screen
    test('CHECK IF THE CREATE FORM IS RENDER WITH ADD STORE BUTTON ENABLED', () => {
        render(
            <AddStore
                data={mockData}
                configs={mockConfigs}
                callbacks={mockcallbacks}
            />
        );

        const AddButtonElement = screen.getByTestId('Add-Store-Button');
        expect(AddButtonElement).toBeInTheDocument();

    });

    //Test case for the Close button is enabled in the screen
    test('CHECK IF THE CREATE FORM IS RENDER WITH ADD STORE CLOSE BUTTON ENABLED', () => {
        render(
            <AddStore
                data={mockData}
                configs={mockConfigs}
                callbacks={mockcallbacks}
            />
        );

        const closeIcon = screen.getByTestId('Add-Store-Form-Close');
        expect(closeIcon).toHaveAttribute('data-testid');

    });

    //Test case for the Textfield is enabled in the screen
    test('CHECK IF THE CREATE FORM IS RENDER WITH ADD STORE TEXTFIELDS ENABLED', () => {
        render(
            <AddStore
                data={mockData}
                configs={mockConfigs}
                callbacks={mockcallbacks}
            />
        );

        const closeIcon = screen.getByTestId('Store_Name_TextField');
        expect(closeIcon).toHaveAttribute('data-testid');

    });

    //Test case for the Close button is enabled in the screen
    test('CHECK IF THE CREATE FORM IS RENDER WITH START DATE', () => {
        render(
            <AddStore
                data={mockData}
                configs={mockConfigs}
                callbacks={mockcallbacks}
            />
        );

        const closeIcon = screen.getByTestId('Store_Date_TextField');
        expect(closeIcon).toHaveAttribute('data-testid');

    });

}

)