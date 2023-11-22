/**
 * CreatedBy        : Dinesh
 * CreatedTime      : August 30 2022
 * Description      : This file used to run the next js app in HTTPS
 **/

// Importing all the required dependencies
const fs = require("fs");
const next = require("next");
const https = require("https");
const http = require("http");
const { parse } = require("url");
const config = require("./config");

// Initializing the next application
const Config = new config();
const dev = !Config.PLATFORM_WEB_CLIENT_IS_PROD_MODE;
const WebClient = next({ dev });
const handle = WebClient.getRequestHandler();

WebClient.prepare().then(() => {
    if (dev) {
        http.createServer(handle).listen(Config.PLATFORM_WEB_CLIENT_PORT, (err) => {
            if (err) throw err;
        });
    } else {
        if (Config.PLATFORM_WEB_CLIENT_SECURITY_ENABLED === "true") {
            const securityConfig = {
                key: fs.readFileSync(Config.PLATFORM_WEB_CLIENT_SECURITY_KEY_FILE_PATH),
                cert: fs.readFileSync(
                    Config.PLATFORM_WEB_CLIENT_SECURITY_CERT_FILE_PATH
                ),
            };
            https
                .createServer(securityConfig, (request, response) => {
                    try {
                        const parsedURL = parse(request.url, true);
                        handle(request, response, parsedURL);
                    } catch (error) {
                        console.error("Error occurred handling", request.url, error);
                        response.statusCode = 500;
                        response.end("Internal server error");
                    }
                })
                .listen(Config.PLATFORM_WEB_CLIENT_PORT);
        } else {
            http
                .createServer(handle)
                .listen(Config.PLATFORM_WEB_CLIENT_PORT, (err) => {
                    if (err) throw err;
                });
        }
    }
});
