/**
 * CreatedBy : Venugopal
 * CreatedDate : Oct 12 2023
 * Description : This file contain test case for vendor List
 */


import { render, fireEvent, screen } from '@testing-library/react';
import { BankColumnSettingsConfig } from '../../../src/configs/pages/bank/BankColumnSettings.Config';
import { BankList } from "../../../src/components/Bank/ListBank";


const listBanksData = require("../../../src/mock/bankList.data.mock.json");
const bankColumnSettingsConfig = new BankColumnSettingsConfig()


describe("ListBank", () => {
    const mockData = {
        bankList: listBanksData,
        bankCount: 100,
        BankListColumnDetail: bankColumnSettingsConfig?.handleBankCloumnSettings()
    };
    const mockConfigs = {
        "data-testid": 'Bank-List',
        functionObject: jest.fn(),
        filter: null
    };
    test("TESTING IF COMPONUENT RENDORS IN DOM", async () => {
        render(
            <BankList
                data={mockData}
                configs={mockConfigs}
            />
        );
        const BankListcomponent = screen.getByTestId("Bank-List")

        expect(BankListcomponent).toBeInTheDocument()
    });
    test('CHECK IF THE VENDOR LIST TABLE HAS VALID HEADERS', () => {
        render(
            <BankList
                data={mockData}
                configs={mockConfigs}
            />
        )
        expect(screen.getByText('Bank Name')).toBeInTheDocument();
        expect(screen.getByText('Code')).toBeInTheDocument();
        expect(screen.getByText('Currency Code')).toBeInTheDocument();
        expect(screen.getByText('Bank Account')).toBeInTheDocument();
        expect(screen.getByText('Created Date')).toBeInTheDocument();
        expect(screen.getByText('Action')).toBeInTheDocument();

    });

    test('CHECK IF THE ACTION MENU ICON IS ENABLE', () => {
        render(
            <BankList
                data={mockData}
                configs={mockConfigs}
            />
        );
        const Actionicon = screen.getByTestId('RBL BANK-Action-Icon');
        expect(Actionicon).toBeInTheDocument();

    });
    test('CHECK IF THE ACTION ICON IS CLICKABLE', () => {
        render(
            <BankList
                data={mockData}
                configs={mockConfigs}
            />
        );
        const Actionicon = screen.getByTestId('AXIS BANK-Action-Icon');
        fireEvent.click(Actionicon);
        const editIcon = screen.getByTestId('AXIS BANK-Ation-Menu');
        expect(editIcon).toHaveStyle({ display: 'flex', textAlign: 'center', height: '85%' });

    });
    test('CHECK IF THE EDIT ICON IS ENABLED', () => {
        render(
            <BankList
                data={mockData}
                configs={mockConfigs}
            />
        );
        const Actionicon = screen.getByTestId('AXIS BANK-Action-Icon');
        fireEvent.click(Actionicon);
        const editIcon = screen.getByTestId('AXIS BANK-Edit-Icon');
        expect(editIcon).toHaveStyle({ fontSize: '16px', cursor: 'pointer', marginTop: '4px' });

    });


    test('CHECK IF THE DELETE ICON IS ENABLED', () => {
        render(
            <BankList
                data={mockData}
                configs={mockConfigs}
            />
        );
        const Actionicon = screen.getByTestId('AXIS BANK-Action-Icon');
        fireEvent.click(Actionicon);
        const deleteIcon = screen.getByTestId('AXIS BANK-Delete-Icon');
        expect(deleteIcon).toHaveStyle({ fontSize: '16px', cursor: 'pointer', marginTop: '4px' });
    });


});