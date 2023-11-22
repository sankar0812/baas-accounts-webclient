import type { AppProps } from 'next/app'
import { PlatformLayout, Spinner } from '@baas/platform-web-sdk'
import React, { useEffect, useState } from 'react'
import { createGlobalStyle } from 'styled-components'
import { FooterConfig } from '@/configs/platformlayout/FooterConfig'
import { AppConfig } from '@/configs/pages/AppConfig'
import LocaleSettings from '../../locale.settings.json'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from "next/router";
import { Helper } from '@/utils/Helper'
import { ThemeProvider } from '@mui/material/styles';
import { Theme } from '../utils/Theme'
import { createTheme } from '@mui/material/styles';
import { AppFunction } from '@/functions/app/appFunction';

const appFunction = new AppFunction();

/**
 * NOTE : Comment added by Dinesh on August 19 2023
 * Dynamic import is another way of importing a package in the code instead of static imports which is used above
 * This only employes code splitting and loads only the specific parts of the packages
 * This dynamic import improves the code performance
 * LINKS : https://blog.logrocket.com/dynamic-imports-code-splitting-next-js/ 
 */
const BaasAuthProvider = dynamic(() =>
  import('@baas/auth-web-sdk').then((mod) => mod.ReduxProvider), { ssr: false }

)

const BaasPlatformmProvider = dynamic(() =>
  import('@baas/platform-web-sdk').then((mod) => mod.ReduxProvider), { ssr: false }

)

const footerConfig = new FooterConfig()
const appConfig = new AppConfig()
const helper = new Helper()
const themeConfig: any = new Theme()

const GlobalStyle = createGlobalStyle`
html {
  font-size: 14px !important;
}
body {
  font-size: 14px !important;
}
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
::-webkit-scrollbar-thumb {
  background: #888;
}
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.MuiTableSortLabel-root,
.MuiTableSortLabel-active,
.MuiTableSortLabel-root:hover,
.MuiTableSortLabel-icon {
color: inherit !important;
}
.css-1odwj8l-MuiPaper-root-MuiCard-root
{
padding:0px !important;
}
.css-1rl1og4-MuiGrid-root>.MuiGrid-item {
padding-top: 0px !important;
}
.css-q5k7tr > .MuiGrid-item 
  {
    padding-top: 0px !important;
    }
.css-2pzt88-MuiPaper-root-MuiCard-root,
.css-1mqwj5g,
{
  padding : 0px !important
margin:0px 15px !important;
}
.css-dc2oi8-MuiPaper-root-MuiCard-root {
  padding : 0px !important
}
input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration { cursor: pointer; !important  }
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}
`

export default function App({ Component, pageProps }: AppProps) {
  const [isPageLoading] = useState<boolean>(false)
  const [themeSettings, setThemeSettings] = useState(createTheme(themeConfig?.readThemeConfig()))
  const [sidebarConfig, setSidebarConfig] = useState([])
  const router = useRouter()

  /**
   * This useeffect is called on the first render
   * It calls Baas Auth permission API to get the list of all the modules for module type of "SIDE-BAR"
   */
  useEffect(() => {
    const readModules = async () => {
      const sideBarModules = await appFunction?.readModules();
      const Modules = sideBarModules?.output?.ModuleInfo;

      /**
       * Modules for "SIDE-BAR" is read and sorted based on module order and restructured to the object needed for
       * sideBar component to render and has been set as a state variable
       */
      if (Modules) {
        Modules.sort((a: any, b: any) => a.ModuleOrder - b.ModuleOrder);
        const sideBarConfig = Modules.map((SibarModules: any) => ({
          title: SibarModules.ModuleName,
          icon: SibarModules.ModuleIcon,
          href: SibarModules.RedirectionURL,
          isEnabled: true
        }));
        setSidebarConfig(sideBarConfig);
      }
    };
    if (appConfig.PUBLIC_ROUTES_WITHOUT_PRIVATE_APP_LAYOUT.includes(router.pathname) === false) {
      readModules();
    }
  }, [appConfig.PUBLIC_ROUTES_WITHOUT_PRIVATE_APP_LAYOUT.includes(router.pathname) === false]);

  /**
   * This useeffect is called on the first render
   * It calls Baas Auth permission API to get the list of all the modules for module type of "SIDE-BAR"
   */
  useEffect(() => {
    let appThemeColor = JSON.parse(helper.getCookie("AppThemeColor"))
    let appThemeMode = JSON.parse(helper.getCookie("AppThemeMode"))
    setThemeSettings(
      createTheme(themeConfig?.readThemeConfig(appThemeMode, appThemeColor))
    )
  }, [])

  return (
    <>
      <ThemeProvider theme={themeSettings}>
        <Head>
          <title>{appConfig?.APPLICATION_NAME}</title>
          <link rel="shortcut icon" href={appConfig?.APPLICATION_FAVICON} />
        </Head>
        <GlobalStyle />
        {appConfig.PUBLIC_ROUTES_WITHOUT_PRIVATE_APP_LAYOUT.includes(router.pathname) ?
          <>
            <BaasAuthProvider
              constApiData={{
                localeSettings: LocaleSettings
              }}
            >
              {isPageLoading ?
                <Spinner /> :
                <Component {...pageProps} />
              }
            </BaasAuthProvider>
          </> :
          <BaasPlatformmProvider
            constApiData={{
              localeSettings: LocaleSettings
            }}
          >
            <PlatformLayout
              router={router}
              footerText={footerConfig.FOOTER_TEXT}
              sidebarConfig={{
                sidebarMenuConfig: sidebarConfig,
                sidebarDarkThemeLogo: appConfig?.APPLICATION_DARK_MODE_LOGO,
                sidebarLightThemeLogo: appConfig?.APPLICATION_LOGO,
                sidebarLogoWidth: appConfig?.APPLICATION_LOGO_WIDTH
              }}
              appThemeConfig={{
                appThemeColor: 'INDIGO_THEME',
                appThemeMode: 'light'
              }}
            >
              <>
                {isPageLoading ?
                  <Spinner /> :
                  <Component {...pageProps} />
                }
              </>
            </PlatformLayout>
          </BaasPlatformmProvider>
        }
      </ThemeProvider>
    </>
  )
}