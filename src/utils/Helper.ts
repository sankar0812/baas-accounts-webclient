import userInfo from '../mock/userinfo.data.mock.json'
import moment from "moment";
import { uuid } from 'uuidv4';
import cookie from 'cookie';
export class Helper {
    compareDynamicURLs = (url1: string, url2: string) => {
        const separator = '/';
        const segments1 = url1.split(separator).filter(segment => segment.length > 0);
        const segments2 = url2.split(separator).filter(segment => segment.length > 0);

        if (segments1.length !== segments2.length) {
            return false;
        }

        for (let i = 0; i < segments1.length; i++) {
            const segment1 = segments1[i];
            const segment2 = segments2[i];

            if (segment1 !== segment2 && !this.isDynamicSegment(segment1) && !this.isDynamicSegment(segment2)) {
                return false;
            }
        }
        return true;
    }

    isDynamicSegment = (segment: any) => {
        return segment.startsWith('[') && segment.endsWith(']');
    }

    readCookieData = () => {
        return userInfo
    }

    convertToTitleCase(text: string) {
        // Use regular expressions to split the text by uppercase letters followed by lowercase letters or numbers
        const words = text.split(/(?=[A-Z][a-z0-9])/);

        // Capitalize the first letter of each word and join them with a space
        const convertedText = words?.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

        return convertedText;
    }
    converttoDateFormat = (actualDate: string, dateFormat: string) => {
        return moment(actualDate).format(dateFormat)
    }

    generateUUID4 = () => {
        return uuid()
    }

    constructDynamicURL(url: string, dynamicValues: any) {
        let dynamicURL = url;

        // Loop through all the placeholders in the URL
        const regex = /\[(.*?)\]/g;
        let match;
        while ((match = regex.exec(url)) !== null) {
            const placeholder = match[0];
            const key = match[1];
            const dynamicValue = dynamicValues[key];

            // Replace the placeholder with the dynamic value if available
            if (dynamicValue !== undefined) {
                dynamicURL = dynamicURL.replace(placeholder, dynamicValue);
            }
        }
        return dynamicURL;
    }

    flattenObject(obj: Record<string, any>, prefix = ''): Record<string, any> {
        let flattenedObject: Record<string, any> = {};

        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                let prefixedKey = prefix ? `${prefix}.${key}` : key;

                if (typeof obj[key] === 'object' && obj[key] !== null) {
                    let nestedObject = this.flattenObject(obj[key], prefixedKey);
                    flattenedObject = { ...flattenedObject, ...nestedObject };
                } else {
                    flattenedObject[prefixedKey] = obj[key];
                }
            }
        }
        return flattenedObject;
    }

    getCookie(name: string): string {
        if (typeof document !== 'undefined') {
            let nameEQ = name + "=";
            let ca = document.cookie.split(';');
            for (const element of ca) {
                let c = element;
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return JSON.stringify("");
        }
        return JSON.stringify("");
    }


    setCookie(name: string, value: string | object, days: any) {
        if (typeof document !== 'undefined') {
            let expires = "";
            if (days) {
                let date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + (value || "") + expires + "; path=/";
        }
    }


    getBrowserCookieInServer(context: any) {
        const { req } = context;
        const cookies = cookie.parse(req?.headers?.cookie || '')
        if (cookies) {
            return cookies
        } else {
            return null
        }
    }

}