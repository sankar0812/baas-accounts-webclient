import React from 'react'
import AppStore from '../../../appstorefile'
// the below lines should be commented while push to develop

const appstore = new AppStore()
// the below lines should be commented while push to develop



export default function SignIn() {
    return (
        <div>
            {/* the below components should be commented while push to develop */}
            {/* <GSignIn
                configs={{
                    applicationName: appConfig.APPLICATION_NAME,
                    applicationLogo: appConfig.APPLICATION_LOGO,
                    loginLogoWidth: appConfig.APPLICATION_LOGO_WIDTH,
                    router: router,
                    redirectionURL: '/merchants/[merchantkey]/sales',
                    loginImage: loginImage.src
                }}
                data={{
                    InstanceKey: '56feaf35-58fb-41d4-8b3c-c3d1b8ff639f'
                }}
                callbacks={{}}
            /> */}
        </div>
    )
}

export const getServerSideProps = async () => {

    const INSTANCEKEY = appstore?.INSTANCE?.INSTANCE_KEY;
    const CONNECTORURL = appstore?.AUTH?.AUTH_CONNECTOR_URL;
    return {
        redirect: {
            destination: `${CONNECTORURL}/signin/${INSTANCEKEY}`,
            // destination: '/',
            permanent: false
        },
    };
}