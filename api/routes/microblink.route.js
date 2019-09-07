const express = require('express');
const microblinkRoutes = express.Router();
const request = require('request');

microblinkRoutes.route('/').post(function (proxyReq, proxyRes) {
    const authorizationHeader = 'Bearer ' + process.env.MICROBLINK_AUTH_HEADER;
    const microblinkEndpoint = process.env.MICROBLINK_API_ENDPOINT + '/recognize/execute';

    request.post(microblinkEndpoint, {
        json: proxyReq.body,
        headers: { Authorization: authorizationHeader }
    }, (MBApiError, MBApiResponse, MBApiResult) => {
        if (MBApiError) {
            let statusCode = (MBApiError instanceof Error) ? 500 : MBApiError.statusCode;

            return proxyRes.status(statusCode).json(MBApiError);
        }

        return proxyRes.status(MBApiResponse.statusCode).json(MBApiResult);
    });
});

module.exports = microblinkRoutes;