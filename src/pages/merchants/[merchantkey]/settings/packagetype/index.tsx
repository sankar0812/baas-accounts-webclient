/**
 * Created By : Venugopal
 * Created Date :Nov 10 2023
 * Description : This page contain List PacakageType functionality
 */

import { Breadcrumb, sdkMui, platformHelper } from '@baas/platform-web-sdk';
import router from 'next/router';
import React, { useEffect,useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { ListPackageType } from "@/components/settings/packagetype/Listpackagetype";
import  {PackageFunction}  from "@/functions/products/product/PackageFunction";
import AppStore from "../../../../../../appstorefile";


const appstore = new AppStore()
const packageFunction = new PackageFunction()

export default function Listpackagepype(props: any) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isListLoading, setIsListLoading] = useState(false);
    const [packagetypedata, setpackagetypedata] = useState(props?.packagetypedata?.output);
    const [packagetypeCount, setpackagetypeCount] = useState<any>(props?.packagetypeCount?.output?._count);
    const [isBadgeLoading, setIsBadgeLoading] = useState(false);





    const handleSearchClick = async () => {
        setIsListLoading(true);
        setIsBadgeLoading(true);
        let response = await packageFunction?.readPackageType(searchTerm, { "CreatedDate": 'asc' }, 0);
        let packagetypeCount = await packageFunction?.readPackageTypeCount(searchTerm)

        if (response?.status === 200) {
            setIsListLoading(false)
            setpackagetypedata(response?.output);
            setpackagetypeCount(packagetypeCount?.output);
        } else {
            setpackagetypedata(response?.output);
            setIsListLoading(false);
            setpackagetypeCount(0);
        }
        if (packagetypeCount?.status === 200) {
            setpackagetypeCount(packagetypeCount?.output?._count);
            setIsBadgeLoading(false)
        }
        else if (packagetypeCount?.status === 404) {
            setpackagetypeCount(0);
            setIsBadgeLoading(false)
        }
    }
    const readPackageType = async () => {
        setIsListLoading(true);
        setIsBadgeLoading(true);
        let response = await packageFunction?.readPackageType("",{ "CreatedDate": 'asc' }, 0);
        let packagetypeCount = await packageFunction?.readPackageTypeCount(searchTerm)

        if (response?.status === 200) {
            setIsListLoading(false)
            setpackagetypedata(response?.output);
            setpackagetypeCount(packagetypeCount?.output);
        } else {
            setpackagetypedata(response?.output);
            setIsListLoading(false);
            setpackagetypeCount(0);
        }
        if (packagetypeCount?.status === 200) {
            setpackagetypeCount(packagetypeCount?.output?._count);
            setIsBadgeLoading(false)
        }
        else if (packagetypeCount?.status === 404) {
            setpackagetypeCount(0);
            setIsBadgeLoading(false)
        }
    }
    useEffect(() => {
        if (searchTerm === '' && packagetypedata?.length !== props?.packagetypedata?.output) {
            readPackageType()
        }
    }, [searchTerm])
    

    return (
        <>
            <sdkMui.Grid container spacing={2} direction={'column'}>
                <sdkMui.Grid container spacing={2} direction={'column'}>
                    <sdkMui.Grid item xs={12} sx={{ ml: 3, mt: 3 }} >
                        <Breadcrumb configs={{
                            breadcrumbItems: [
                                { breadcrumbItemName: "Settings", href: ``, name: "Settings" },
                                { breadcrumbItemName: "Packagetype", href: "", name: "Packagetype" },
                            ],
                            router: router
                        }}
                            data={{ defaltBreadcrumbItemName: "Settings " }}
                        />
                    </sdkMui.Grid>
                </sdkMui.Grid>
                <sdkMui.Grid item xs={12} mt={2}>
                    <sdkMui.Grid container spacing={0} alignItems={'center'} sx={{ display: 'flex' }}>
                        <sdkMui.Grid item xs={1.5} sx={{ textAlign: 'left', p: 1 }} >
                            <sdkMui.Typography variant={'h4'} fontWeight={'bold'} sx={{ ml: 2 }}>Package Type</sdkMui.Typography>
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={2} sx={{ textAlign: 'center' }}>
                                {isBadgeLoading ?
                                    <sdkMui.CircularProgress color="inherit" size={18} />
                                    :
                                    <sdkMui.Chip label={`Count : ${packagetypeCount}`} color='primary'></sdkMui.Chip>
                                }
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={5} sx={{ p: 1 }}>
                            <sdkMui.TextField
                                placeholder="Search"
                                type='search'
                                size='small'
                                sx={{ width: '100%' }}
                                InputProps={{
                                    sx: { borderRadius: 5 },
                                    endAdornment: <sdkMui.Button variant='contained' sx={{ borderRadius: 5 }} size='small' onClick={handleSearchClick}><SearchIcon /></sdkMui.Button>,
                                }}
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                            />
                        </sdkMui.Grid>
                        <sdkMui.Grid item xs={3} sx={{ p: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }} textAlign={'right'}>
                        <sdkMui.Button variant='contained' size='large' onClick={() => { }}>
                            <span className='material-symbols-outlined' style={{ fontSize: '15px', fontWeight: 'bold' }}>add</span>
                            <sdkMui.Typography variant='subtitle2'>Packagetype</sdkMui.Typography></sdkMui.Button>
                    </sdkMui.Grid>
                    </sdkMui.Grid>
                </sdkMui.Grid>
                <sdkMui.Grid container spacing={0} sx={{ display: 'flex' }}>
                    <sdkMui.Grid item xs={12}>
                        {packagetypedata?.length > 0
                            ?
                            <>
                                {
                                    isListLoading ?
                                        <sdkMui.CircularProgress sx={{ alignItems: 'normal !important' }} /> :
                                        <ListPackageType
                                            configs={{
                                                'data-testid':"list-packagetype",
                                                filter:searchTerm
                                            }}
                                            data={{
                                                packagetypedata:packagetypedata,
                                                packagetypecount:packagetypeCount
                                            }}
                                            callbacks={{
                                            }}
                                        />
                                }
                            </>
                            :
                            <sdkMui.Grid sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>No Data Found</sdkMui.Grid >
                        }
                    </sdkMui.Grid>
                </sdkMui.Grid>
            </sdkMui.Grid>
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
                permanent: false
            },
        };
    }

    let packagetypedata = await packageFunction?.readPackageTypesSSR()
    let packagetypeCount = await packageFunction?.readPackageTypeCountSSR()



    return {
        props: {
            packagetypedata: packagetypedata,
            packagetypeCount:packagetypeCount
        }
    }
}