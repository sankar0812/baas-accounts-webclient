import React from 'react'
import { NotFound as GNotFound } from '@baas/platform-web-sdk'
import { useRouter } from 'next/router'
import { AppConfig } from '../../src/configs/pages/AppConfig'
import { Constants } from '../../src/utils/Constants'

const appConfig = new AppConfig()
const constant = new Constants()

function NotFound() {
    const router = useRouter()
    return (
        <div>
            <GNotFound
                configs={{
                    title: constant.NOTFOUND_TITLE,
                    description: constant.NOTFOUND_DESCRIPTION,
                    '404ButtonLabel': constant['404BUTTONLABEL'],
                    navigationURL: appConfig.NOTFOUND_REDIRECTION_URL,
                    router: router,
                    NotFoundImageConfig: {
                        NotfoundImage: '',
                        NotfoundImageWidth: '200px'
                    },
                    color: 'primary'
                }}
            />
        </div>
    )
}
export default NotFound