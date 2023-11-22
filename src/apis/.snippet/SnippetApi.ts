import { AxiosClient } from "../../utils/Axios";
import { AxiosServer } from "../../utils/AxiosServer";

const axios = new AxiosClient()
const axiosServer = new AxiosServer()
export class SnippetApi {

    async readSnippetSSR(addBearerTokenInHeader: boolean = false, context?: any) {
        let response = await axiosServer.post(
            "", // PROVIDE ENDPOINT HERE
            {}, // PROVIDE FILTER OBJECT HERE
            {}, // PROVIDE HEADER OBJECT HERE
            {
                username: '',
                password: ''
            }, // PROVIDE AUTH OBJECT HERE
            addBearerTokenInHeader, // BOOLEAN TO ADD AUTH OBJECT IN THE HEADER
            context // CONTEXT OBJECT FROM SSR
        )
        return response
    }

    async readSnippet(addBearerTokenInHeader: boolean = false) {
        let response = await axios.post(
            "", // PROVIDE ENDPOINT HERE
            {}, // PROVIDE FILTER OBJECT HERE
            {}, // PROVIDE HEADER OBJECT HERE
            {
                username: '',
                password: ''
            }, // PROVIDE AUTH OBJECT HERE
            addBearerTokenInHeader, // BOOLEAN TO ADD AUTH OBJECT IN THE HEADER,
        )
        return response
    }
}