// development

const API_BASE_URL = "http://localhost:3001/api/v1";
const API_BASE = "http://localhost:3001/api/v1";

const REQUEST_TIMEOUT = 120000;

export default ({ config }) => {
    return Object.assign(config,
        {
            extra: {
                eas: {
                    projectId: "46b20448-5326-45fc-aac0-fecdf70e7475",
                    API_BASE_URL: process.env.API_BASE_URL ?? API_BASE_URL,
                    API_URL: process.env.API_URL ?? API_BASE,
                    REQUEST_TIMEOUT: process.env.REQUEST_TIMEOUT ?? REQUEST_TIMEOUT,
                }
            }
        });
};
