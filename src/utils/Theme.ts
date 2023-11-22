const themesOptions = [
    {
        name: 'BLUE_THEME',
        palette: {
            primary: {
                main: '#1a97f5',
                light: '#e6f4ff',
                dark: '#1682d4',
                contrastText: 'white',
            },
            secondary: {
                main: '#1e4db7',
                light: '#ddebff',
                dark: '#173f98',
            },
        },
    },
    {
        name: 'GREEN_THEME',
        palette: {
            primary: {
                main: '#00cec3',
                light: '#d7f8f6',
                dark: '#02b3a9',
                contrastText: '#000000',
            },
            secondary: {
                main: '#066a73',
            },
        },
    },
    {
        name: 'PURPLE_THEME',
        palette: {
            primary: {
                main: '#7352ff',
                light: '#e5e0fa',
                dark: '#5739d6',
                contrastText: 'white',
            },
            secondary: {
                main: '#402e8d',
            },
        },
    },
    {
        name: 'INDIGO_THEME',
        palette: {
            primary: {
                main: '#1e4db7',
                light: '#e6f4ff',
                dark: '#0c399e',
                contrastText: 'white',
            },
            secondary: {
                main: '#11397b',
            },
        },
    },
    {
        name: 'ORANGE_THEME',
        palette: {
            primary: {
                main: '#03c9d7',
                light: '#e5fafb',
                dark: '#C70039',
                contrastText: '#000000',
            },
            secondary: {
                main: '#C70039',
                light: '#fcf1ed',
                dark: '#e67e5f',
                contrastText: '#000000',
            },
        },
    },
    {
        name: 'RED_THEME',
        palette: {
            primary: {
                main: '#ff5c8e',
                light: '#fce6ed',
                dark: '#d43653',
                contrastText: 'white',
            },
            secondary: {
                main: '#5e244d',
            },
        },
    },
    {
        name: 'BLACK_THEME',
        palette: {
            primary: {
                main: '#1c2025',
            },
        },
    },
];
class Theme {
    readThemeConfig(themeMode: string = '', themeName: string = '') {
        return {
            typography: {
                fontFamily: "'DM Sans', sans-serif",
                body1: {
                    fontWeight: 'normal', // Use 'normal' instead of 400
                },
                h1: {
                    fontWeight: 'bold', // Use 'bold' instead of 500
                    fontSize: '1.875rem',
                    lineHeight: '1.5',
                },
                h2: {
                    fontWeight: 'bold', // Use 'bold' instead of 500
                    fontSize: '1.5rem',
                    lineHeight: '1.5',
                },
                h3: {
                    fontWeight: 'bold', // Use 'bold' instead of 500
                    fontSize: '1.3125rem',
                    lineHeight: '1.5',
                },
                h4: {
                    fontWeight: 'bold', // Use 'bold' instead of 500
                    fontSize: '1.125rem',
                    lineHeight: '1.5',
                },
                h5: {
                    fontWeight: 'bold', // Use 'bold' instead of 500
                    fontSize: '1rem',
                    lineHeight: '1.5',
                },
                h6: {
                    fontWeight: 'bold', // Use 'bold' instead of 500
                    fontSize: '0.875rem',
                    lineHeight: '1.5',
                },
                button: {
                    textTransform: 'none',
                    fontWeight: 'normal', // Use 'normal' instead of '400'
                },
                subtitle1: {
                    fontSize: '1rem',
                    fontWeight: 'normal', // Use 'normal' instead of '400'
                },
                subtitle2: {
                    fontSize: '0.875rem',
                    fontWeight: 'normal', // Use 'normal' instead of '400'
                },
            },
            palette: {
                mode: themeMode?.length === 0 ? 'light' : themeMode,
                background: {
                    default: themeMode?.length === 0 ? '#fafbfb' : (themeMode === 'dark' ? '#20232a' : '#fafbfb'),
                    dark: themeMode?.length === 0 ? '#ffffff' : (themeMode === 'dark' ? '#1c2025' : '#ffffff'),
                    paper: themeMode?.length === 0 ? '#ffffff' : (themeMode === 'dark' ? '#282C34' : '#ffffff'),
                },
                text: {
                    primary: themeMode?.length === 0 ? 'rgba(0, 0, 0, 0.87)' : (themeMode === 'dark' ? '#e6e5e8' : 'rgba(0, 0, 0, 0.87)'),
                    secondary: themeMode?.length === 0 ? '#777e89' : (themeMode === 'dark' ? '#adb0bb' : '#777e89'),
                },
                primary: {
                    main: themeName?.length === 0 ? '#ff5c8e' : themesOptions?.find((data: any) => data?.name === themeName)?.palette?.primary?.main,
                    light: themeName?.length === 0 ? '#fce6ed' : themesOptions?.find((data: any) => data?.name === themeName)?.palette?.primary?.light,
                    dark: themeName?.length === 0 ? '#d43653' : themesOptions?.find((data: any) => data?.name === themeName)?.palette?.primary?.dark,
                    contrastText: themeName?.length === 0 ? '#000000' : themesOptions?.find((data: any) => data?.name === themeName)?.palette?.primary?.contrastText
                },
                secondary: {
                    main: themeName?.length === 0 ? '#5e244d' : themesOptions?.find((data: any) => data?.name === themeName)?.palette?.secondary?.main,
                },
            }
        }
    }
}

export { Theme };
