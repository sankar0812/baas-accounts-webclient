/**
 * CreatedBy : Venugopal
 * CreatedDate : Oct 10 2023
 * Description : This file contain test case for vendor List
 */
import {ListVendor} from "../../../../src/components/purchases/vendor/Listvendor";
const listVendorsData = require( "../../../../src/mock/listvendor.data.mock.json");
import { render,fireEvent,screen } from '@testing-library/react';
import { VendorsColumnSettingsConfig } from '../../../../src/configs/pages/purchases/vendors/VendorColumnSettings.config';

const vendorsColumnSettingsConfig = new VendorsColumnSettingsConfig()


describe("ListVendor", () => {
    const mockData ={
        vendorList : listVendorsData,
        vendorCount: 100,
        VendorListColumnDetail : vendorsColumnSettingsConfig?.handleVendorsColumnSettings()
    };
    const mockConfigs={
        'data-testid': 'Vendor_List',
        functionObject : jest.fn(),
        filter : null
    }; 
    test("TESTING IF COMPONUENT RENDORS IN DOM", async () => {
        render(
            <ListVendor
                data = {mockData}
                configs ={mockConfigs}
            />
        );
        const vendorList = screen.getByTestId("Vendor_List")

        expect(vendorList).toBeInTheDocument()
    });
    test('CHECK IF THE VENDOR LIST TABLE HAS VALID HEADERS', () => {
        render(
            <ListVendor
                data = {mockData}
                configs ={mockConfigs}
            />
        )
        expect(screen.getByText("Vendor Name")).toBeInTheDocument();
        expect(screen.getByText('Vendor Code')).toBeInTheDocument();
        expect(screen.getByText('Accounts')).toBeInTheDocument();
        expect(screen.getByText('State')).toBeInTheDocument();
        expect(screen.getByText('Country')).toBeInTheDocument();
        expect(screen.getByText('City')).toBeInTheDocument();
        expect(screen.getByText('Postal Code')).toBeInTheDocument();
        

    });

    test('CHECK IF THE ACTION MENU ICON IS ENABLE', () => {
        render(
            <ListVendor
                data = {mockData}
                configs ={mockConfigs}
            />
        );
        const Actionicon = screen.getByTestId('BILLAPY-Action-Icon');
        expect(Actionicon).toBeInTheDocument();

    });
    test('CHECK IF THE EDIT ICON IS ENABLED', () => {
        render(
            <ListVendor
                data = {mockData}
                configs ={mockConfigs}
            />
        );
        const Actionicon = screen.getByTestId('BATA-Action-Icon');
        fireEvent.click(Actionicon);
        const editIcon = screen.getByTestId('BATA-Edit-Icon');
        expect(editIcon).toHaveStyle({ fontSize: '16px', cursor: 'pointer', marginTop: '4px' });

    });

   
    test('CHECK IF THE DELETE ICON IS ENABLED', () => {
        render(
            <ListVendor
                data = {mockData}
                configs ={mockConfigs}
            />
        );
        const Actionicon = screen.getByTestId('BATA-Action-Icon');
        fireEvent.click(Actionicon);
        const editIcon = screen.getByTestId('BATA-Delete-Icon');
        expect(editIcon).toHaveStyle({ fontSize: '16px', cursor: 'pointer' });
    });
    
    
});