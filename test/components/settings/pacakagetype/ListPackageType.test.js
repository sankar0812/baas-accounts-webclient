/*
 * CreatedBy   : Venugopal
 * CreatedDate : Nov 14 2023
 * Description : This file contain test case for packagetype  List
 */

import {ListPackageType} from '../../../../src/components/settings/packagetype/Listpackagetype'
import { render, screen} from '@testing-library/react';

const listPackageTypeData = require("../../../../src/mock/listPacakagetype.data.mock.json")
describe("ListPackageType", () => {
    const mockData = {
        packagetypedata: listPackageTypeData,
        packagetypecount: 100,
    };

    const mockConfigs = {
        'data-testid': 'List-PackageType',
        filter : null
    };
    test("TESTING IF COMPONENT RENDORS IN DOM", async () => {
        render(
            <ListPackageType 
                data = {mockData}
                configs = {mockConfigs}
            />
        );
        const PackageTypeList = screen.getByTestId("List-PackageType")

        expect(PackageTypeList).toBeInTheDocument()
    });
    test("TESTING IF CARD RENDORS IN DOM ", async () => {
        render(
            <ListPackageType 
                data = {mockData}
                configs = {mockConfigs}
            />
        );
        const PackageTypeCard = screen.getByTestId("Box-Card");
        expect(PackageTypeCard).toBeInTheDocument()
        expect(PackageTypeCard).toHaveStyle({border: '1px solid #6CB4EE'});
    });
    test('CHECK IF THE COMPONENT RENDER IN DOM WITH ICON IS ENABLE', () => {
        render(
            <ListPackageType 
                data = {mockData}
                configs = {mockConfigs}
            />
        );

        const Icon = screen.getByTestId('Box-Icon')
        expect(Icon).toBeInTheDocument();
    });
    test('CHECK IF THE COMPONENT RENDER IN DOM WITH PACKAGETYPE,CODE AND DESCRIPTION IS ENABLE', () => {
        render(
            <ListPackageType 
                data = {mockData}
                configs = {mockConfigs}
            />
        );

        const packagetype = screen.getByTestId("Box");
        const packagetypeCode = screen.getByTestId("Box-Code");
        const descriptioin = screen.getByTestId("Box-Description");
        expect(packagetype).toBeInTheDocument();
        expect(packagetype).toHaveTextContent("Box")
        expect(packagetype).toHaveTextContent("Box")
        expect(packagetypeCode).toBeInTheDocument("BOX");
        expect(descriptioin).toBeInTheDocument();
        expect(packagetypeCode).toBeInTheDocument("Box Package");

    });
    test('CHECK IF THE EDIT ICON IS ENABLED', () => {
        render(
            <ListPackageType 
                data = {mockData}
                configs = {mockConfigs}
            />
        );
        const EditIcon = screen.getByTestId('Box-Edit-Icon');
        expect(EditIcon).toHaveStyle({fontSize: '16px', cursor: 'pointer', marginTop: '4px'});

    });
    test('CHECK IF THE DELETE ICON IS ENABLED', () => {
        render(
            <ListPackageType 
                data = {mockData}
                configs = {mockConfigs}
            />
        );
        const DeleteIcon = screen.getByTestId('Box-Delete-Icon');
        expect(DeleteIcon).toHaveStyle({fontSize: '16px', cursor: 'pointer'});
    })

})