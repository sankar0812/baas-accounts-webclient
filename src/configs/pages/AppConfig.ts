/**
@CreatedBy        : Uma Kohila
@CreatedTime      : Sep 25 2022
@ModifiedBy       : Uma Kohila
@ModifiedTime     : Sep 25 2022
@Description      : This file contains config for app file
**/
import PlatformLogoWithName from '../../assets/images/pfcombination.png'
import PlatformLogo from '../../assets/images/pfcombination.png'
import PlatformDarkModeLogo from '../../assets/images/pfcombination.png'

class AppConfig {
    PUBLIC_ROUTES_WITHOUT_PRIVATE_APP_LAYOUT: (string)[] = ['/signin', '/signup', '/404']
    APPLICATION_NAME = 'BaaS Accounts'
    APPLICATION_LOGO = PlatformLogoWithName?.src
    APPLICATION_DARK_MODE_LOGO = PlatformDarkModeLogo?.src
    APPLICATION_FAVICON = PlatformLogo?.src
    NOTFOUND_REDIRECTION_URL = "/"
    APPLICATION_LOGO_WIDTH = '65px'
}

export { AppConfig }
