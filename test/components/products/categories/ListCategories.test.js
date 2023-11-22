/*
 * CreatedBy   : Muthumariappan
 * CreatedDate : Nov 10 2023
 * Description : This file contain test case for products categories List
 */


import { ListCategory } from '../../../../src/components/products/categories/ListCategories'
import { render, screen } from '@testing-library/react';
import { ColumnSettingsCategoriesConfig } from '../../../../src/configs/pages/products/categories/ColumnSettingsCategories.config'

const listCategoriesData = require("../../../../src/mock/listCategory.data.mock.json")

const columnSettingsCategoriesConfig = new ColumnSettingsCategoriesConfig()




describe("ListCategory", () => {

    const mockData = {
        categoryList: listCategoriesData,
        categoryCount: 100,
        categoryListColumnDetail: columnSettingsCategoriesConfig?.handleCloumnSettingsCategories
    };

    const mockConfigs = {
        'data-testid': 'List-Category',
        functionObject: jest.fn(),
        filter: null
    };

    test("TESTING IF COMPONENT RENDORS IN DOM", async () => {
        render(
            <ListCategory
                data={mockData}
                configs={mockConfigs}
            />
        );
        const categoryList = screen.getByTestId("List-Category")

        expect(categoryList).toBeInTheDocument()
    });


    test('CHECK IF THE CATEGORIES LIST TABLE HAS VALID HEADERS', () => {
        render(
            <ListCategory
                data={mockData}
                configs={mockConfigs}
            />
        )
        expect(screen.getByText('Category Name')).toBeInTheDocument();
        expect(screen.getByText('Category Code')).toBeInTheDocument();
        expect(screen.getByText('Description')).toBeInTheDocument();
        expect(screen.getByText('Product Count')).toBeInTheDocument();
    });


    test('CHECK IF THE EDIT ICON IS ENABLED', () => {
        render(
            <ListCategory
                data={mockData}
                configs={mockConfigs}
            />
        );

        const DeleteIcon = screen.getByTestId('Computers-Delete-Icon')
        expect(DeleteIcon).toBeInTheDocument();

    });



})