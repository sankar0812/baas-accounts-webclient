/**
    @CreatedBy   : Karthick D K 
    @CreatedTime : February 15 2022
    @Description : This file will handle all the Rest API calls from client side
**/

import { platformHelper, platformJWT } from '@baas/platform-web-sdk'
import axios, { AxiosBasicCredentials, AxiosRequestConfig } from 'axios'
import Router from 'next/router'

const createAxiosInstance = (auth: AxiosBasicCredentials, _addBearerTokenInHeader: boolean = false, _accessToken: any = null) => {
    const axiosInstance = axios.create({
        baseURL: "",
    })

    axiosInstance.interceptors.request.use(
        (config) => {
            // Add Authorization header with token if token exists
            config.headers.MerchantKey = "BASE-MERCHANT-KEY"
            config.headers.TenantKey = "BASE-TENANT-KEY"
            config.headers.UserKey = "BASE-USER-KEY"
            config.auth = auth
            return config
        },
        (error) => {
            // Do something with the request error
            console.error('Request error:', error)
            return Promise.reject(error)
        }
    )

    axiosInstance.interceptors.response.use(
        (response): any => {
            // Handle successful responses
            const { status, statusText, data } = response

            // Return response in desired format for status code 200
            return {
                status: status,
                message: data?.serviceResponse?.message || statusText,
                output: data?.outputResponse || data,
            }
        },
        (error) => {
            // Handle error responses
            if (error?.response?.status === 400) {
                // Return response in desired format for status code 400
                return {
                    status: error?.response?.status,
                    message: error?.response?.data?.serviceResponse?.message,
                    output: error?.response?.data,
                }
            } else if (error?.response?.status === 401) {
                // Return response in desired format for status code 401
                return {
                    status: error?.response?.status,
                    message: error?.response?.data?.serviceResponse?.message,
                    output: 'Unauthorized',
                }
            } else if (error?.response?.status === 404) {
                // Return response in desired format for status code 404
                return {
                    status: error?.response?.status,
                    message: error?.response?.data?.serviceResponse?.message,
                    output: null,
                }
            } else {
                // Return response in desired format for all other error status codes
                return {
                    status: error?.response?.status,
                    message: error?.response?.data?.serviceResponse?.message,
                    output: null,
                }
            }
        }
    )
    return axiosInstance
}

export class AxiosClient {

    router = Router;

    /**
    @CreatedBy    : Karthick D K 
    @CreatedTime  : Febuary 15 2022
    @ModifiedBy   : Karthick D K 
    @ModifiedTime : Febuary 15 2022
    @Description  : This function will handle all the api's after the refresh token 
   **/
    private async refreshTokenInitializer(method: 'post' | 'get' | 'put' | 'patch' | 'delete', url: any, reqData: any, header: Record<string, string>, auth: AxiosBasicCredentials) {
        try {
            let refreshTokenResponse = await platformJWT?.refreshJWTTokenV1(JSON.parse(platformHelper.getCookie("Token"))?.refresh_token, new AxiosClient())
            if (refreshTokenResponse.status === 200) {
                return await this.recallApi(method, url, reqData, header, auth, refreshTokenResponse?.output?.Token?.access_token)
            } else {
                return refreshTokenResponse
            }
        } catch (error: any) {
            console.error("ERROR IN REFERSH TOKEN INITIALIZERL: ", error)
        }
    }

    /**
    @CreatedBy    : Karthick D K 
    @CreatedTime  : Febuary 15 2022
    @ModifiedBy   : Karthick D K 
    @ModifiedTime : Febuary 15 2022
    @Description  : This function will handle all the api's after the refresh token 
   **/
    private async recallApi(method: 'post' | 'get' | 'put' | 'patch' | 'delete', url: any, reqData: any, header: Record<string, string>, auth: AxiosBasicCredentials, accessToken: any) {
        try {
            const axiosInstance = createAxiosInstance(auth, true, accessToken)
            let config: AxiosRequestConfig = {
                headers: header
            };
            let response: any
            if (method === 'get') {
                response = await axiosInstance[method](url, config)
            } else {
                response = await axiosInstance[method](url, reqData, config)
            }
            return response
        } catch (error: any) {
            console.error("ERROR IN POST API CALL: ", error)
        }
    }

    /**
    @CreatedBy    : Karthick D K 
    @CreatedTime  : Febuary 15 2022
    @ModifiedBy   : Karthick D K 
    @ModifiedTime : Febuary 15 2022
    @Description  : This function will handle all the post API's
   **/
    async post(url: any, reqData: any, header: Record<string, string>, auth: AxiosBasicCredentials, addBearerTokenInHeader: boolean = false) {
        try {
            const axiosInstance = createAxiosInstance(auth, addBearerTokenInHeader)
            let config: AxiosRequestConfig = {
                headers: header
            };
            let response = await axiosInstance.post(url, reqData, config)
            if (response?.status === 401) {
                return await this.refreshTokenInitializer('post', url, reqData, header, auth)
            } else {
                return response
            }
        } catch (error: any) {
            console.error("ERROR IN POST API CALL: ", error)
        }
    }

    /**
    @CreatedBy    : Karthick D K 
    @CreatedTime  : Febuary 15 2022
    @ModifiedBy   : Karthick D K 
    @ModifiedTime : Febuary 15 2022
    @Description  : This function will handle all the post API's
    **/
    async get(url: any, header: Record<string, string>, auth: AxiosBasicCredentials, addBearerTokenInHeader: boolean = false) {
        try {
            const axiosInstance = createAxiosInstance(auth, addBearerTokenInHeader)
            let config: AxiosRequestConfig = {
                headers: header
            };
            let response = await axiosInstance.get(url, config)
            if (response?.status === 401) {
                return await this.refreshTokenInitializer('get', url, null, header, auth)
            } else {
                return response
            }
        } catch (error: any) {
            console.error("ERROR IN GET API CALL: ", error)
        }
    }

    /**
    @CreatedBy    : Karthick D K 
    @CreatedTime  : Febuary 15 2022
    @ModifiedBy   : Karthick D K 
    @ModifiedTime : Febuary 15 2022
    @Description  : This function will handle all the put API's
   **/
    async put(url: any, reqData: any, header: Record<string, string>, auth: AxiosBasicCredentials, addBearerTokenInHeader: boolean = false) {
        try {
            const axiosInstance = createAxiosInstance(auth, addBearerTokenInHeader)
            let config: AxiosRequestConfig = {
                headers: header
            };
            let response = await axiosInstance.put(url, reqData, config)
            if (response?.status === 401) {
                return await this.refreshTokenInitializer('put', url, reqData, header, auth)
            } else {
                return response
            }
        } catch (error: any) {
            console.error("ERROR IN PUT API CALL: ", error)
        }
    }

    /**
    @CreatedBy    : Karthick D K 
    @CreatedTime  : Febuary 15 2022
    @ModifiedBy   : Karthick D K 
    @ModifiedTime : Febuary 15 2022
    @Description  : This function will handle all the patch API's
    **/
    async patch(url: any, reqData: any, header: Record<string, string>, auth: AxiosBasicCredentials, addBearerTokenInHeader: boolean = false) {
        try {
            const axiosInstance = createAxiosInstance(auth, addBearerTokenInHeader)
            let config: AxiosRequestConfig = {
                headers: header
            };
            let response = await axiosInstance.patch(url, reqData, config)
            if (response?.status === 401) {
                return await this.refreshTokenInitializer('put', url, reqData, header, auth)
            } else {
                return response
            }
        } catch (error: any) {
            console.error("ERROR IN PATCH API CALL: ", error)
        }
    }

    /**
    @CreatedBy    : Karthick D K 
    @CreatedTime  : Febuary 15 2022
    @ModifiedBy   : Karthick D K 
    @ModifiedTime : Febuary 15 2022
    @Description  : This function will handle the refresh token api
   **/
    async refreshToken(url: any, reqData: any, header: Record<string, string>, auth: AxiosBasicCredentials, addBearerTokenInHeader: boolean = false, _context: any) {
        try {
            const axiosInstance = createAxiosInstance(auth, addBearerTokenInHeader)
            let config: AxiosRequestConfig = {
                headers: header
            };
            let response = await axiosInstance.post(url, reqData, config)
            if (response?.status === 401) {
                this.router.push('/signin')
            } else {
                return response
            }
            return response
        } catch (error: any) {
            console.error("ERROR IN REFRESH TOKEN API CALL: ", error)
            if (error.response?.status === 401) {
                this.router.push('/signin')
            }
        }
    }
}

