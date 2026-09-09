import axios from "axios";

export const checkMonitor = async (url) => {
    const maxAttempts = 3;

    let lastError = null;
    let totalResponseTime = 0;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
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

            totalResponseTime += responseTime;
            lastError = error;

            console.log(
                `[SENTINEL] Check attempt ${attempt}/${maxAttempts} failed`
            );
        }
    }

    return {
        status: "DOWN",
        statusCode: lastError?.response?.status || null,
        responseTime: totalResponseTime
    };
};