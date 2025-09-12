// development

const API_BASE_URL = "https://toolbox.com.ng/api/v1/";
const API_BASE = "https://toolbox.com.ng/api/v1/";


// const API_BASE_URL = "http://1ocalhost:3001/api/v1";
// const API_BASE = "http://1ocalhost:3001/api/v1";


const REQUEST_TIMEOUT = 120000;

export default ({ config }) => {
    return Object.assign(config,
        {
            extra: {
                eas: {
                    projectId: "b7ba37fe-a4db-445f-a9c6-8bfd5281caf8",
                    API_BASE_URL: process.env.API_BASE_URL ?? API_BASE_URL,
                    API_URL: process.env.API_URL ?? API_BASE,
                    REQUEST_TIMEOUT: process.env.REQUEST_TIMEOUT ?? REQUEST_TIMEOUT,
                }
            }
        });
};
