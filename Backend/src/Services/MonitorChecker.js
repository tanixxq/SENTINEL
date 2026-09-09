import axios from "axios";

export const checkMonitor = async (url) => {
    const startTime = Date.now();

    try {
        const response = await axios.get(url, {
            timeout: 10000
        });

        const responseTime = Date.now() - startTime;

        return {
            status: "UP",
            statusCode: response.status,
            responseTime
        };

    } catch (error) {
        const responseTime = Date.now() - startTime;

        return {
            status: "DOWN",
            statusCode: error.response?.status || null,
            responseTime
        };
    }
};