import React from 'react'
import { platformHelper } from '@baas/platform-web-sdk'

export default function Dashboard() {
    return (
        <>
            Dashboard
        </>
    )
}

export const getServerSideProps = async (context: any) => {
    if(!platformHelper.checkUserCookieStorage(context)){
        return{
            redirect :{
                destination:'/signin',
                permanent : false
            },
        };
    }
    return{
        props:{}
    }
}