const axios = require('axios');


SAFARICOM_CONSUMER_KEY="9jDRxiewdu3hqAPScQM3o0L8jcWKZT2OL1H8b9ux0xhBva1M"
SAFARICOM_CONSUMER_SECRET="s34dWACE2kUvgUfNXQXYSSqdq6SxgkL89gFejUQVcJkZkPuOK7YfrA7YAGdUXvr4"


const accessToken = async (req, res, next) => {
    try {
        const url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
        const auth = Buffer.from(`${SAFARICOM_CONSUMER_KEY}:${SAFARICOM_CONSUMER_SECRET}`).toString('base64');

        const response = await axios.get(url, {
            headers: {
                "Authorization": "Basic " + auth
            }
        });

        if (response.status !== 200 || !response.data) {
            return res.status(401).send({
                "message": 'Failed to fetch access token',
                "error": response.data || 'No response body'
            });
        }

        req.safaricom_access_token = response.data.access_token;
        next();

    } catch (error) {
        if (error.response) {    
            return res.status(error.response.status).send({
                "message": 'Failed to fetch access token',
                "error": error.response.data
            });
        } else if (error.request) {
            return res.status(500).send({
                "message": 'No response received from Safaricom',
                "error": error.message
            });
        } else {
            return res.status(500).send({
                "message": 'Something went wrong when trying to process your payment',
                "error": error.message
            });
        }
    }
};

module.exports = { accessToken };
