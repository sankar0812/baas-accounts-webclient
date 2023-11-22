/**
 * CreatedBy : Uma Kohila 
 * CreatedDate : OCT 14 2023
 * Description : This is the page file for Customer details screen
 */

import { platformHelper } from "@baas/platform-web-sdk";
import AppStore from "../../../../../../../appstorefile";


//Define Import here
// import {  platformHelper } from '@baas/platform-web-sdk';

//required files

//Mui ICOns


//Define Class objects here
const appstore = new AppStore();

export default function Vendor() {

    return (
        <>
            Customer Details Screen
        </>
    )
}

export const getServerSideProps = async (context: any) => {

    const INSTANCEKEY = appstore?.INSTANCE?.INSTANCE_KEY;
    const CONNECTORURL = appstore?.AUTH?.AUTH_CONNECTOR_URL;

    if (!platformHelper.checkUserCookieStorage(context)) {
        return {
            redirect: {
                destination: `${CONNECTORURL}/signin/${INSTANCEKEY}`,
                permanent: false,
            },
        };
    }

    //ServerSide function calling


    return {
        props: {

        }
    }
}