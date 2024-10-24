const request = require("request");
require("dotenv/config");
const { getTimestamp } = require("../Utils/utils.timestamp.js");


const initiateSTKPush = async (req, res) => {
    try {
        const { amount, phone } = req.body;
        const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
        const auth = "Bearer " + req.safaricom_access_token;
        const timestamp = getTimestamp();
        const password = Buffer.from(process.env.BUSINESS_SHORT_CODE + process.env.PASS_KEY + timestamp).toString('base64');

        request(
            {
                url: url,
                method: "POST",
                headers: {
                    "Authorization": auth
                },
                json: {
                    "BusinessShortCode": process.env.BUSINESS_SHORT_CODE,
                    "Password": password,
                    "Timestamp": timestamp,
                    "TransactionType": "CustomerPayBillOnline",
                    "Amount": amount,
                    "PartyA": phone,
                    "PartyB": process.env.BUSINESS_SHORT_CODE,
                    "PhoneNumber": phone,
                    "CallBackURL":"https://mydomain.com/path",
                    "AccountReference": "Wamaitha Online Shop",
                    "TransactionDesc": "Paid online"
                }
            },
            function (e, response, body) {
                if (e) {
                    console.error(e);
                    res.status(503).send({
                        message: "Error with the STK push",
                        error: e
                    });
                } else {
                    res.status(200).json(body);
                }
            }
        );
    } catch (e) {
        res.status(503).send({
            message: "Something went wrong while trying to create LipaNaMpesa details. Contact admin",
            error: e
        });
    }
};



 const confirmPayment = async(req, res) => {
    try{
        const url = "https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query"
        const auth = "Bearer " + req.safaricom_access_token

        const timestamp = getTimestamp()
        const password = new Buffer.from(process.env.BUSINESS_SHORT_CODE + process.env.PASS_KEY + timestamp).toString('base64')

        request(
            {
                url: url,
                method: "POST",
                headers: {
                    "Authorization": auth
                },
                json: {
                    "BusinessShortCode":process.env.BUSINESS_SHORT_CODE,
                    "Password": password,
                    "Timestamp": timestamp,
                    "CheckoutRequestID": req.params.CheckoutRequestID,

                }
            },
            function (error, response, body) {
                if (error) {
                    console.log(error)
                    res.status(503).send({
                        message:"Something went wrong while trying to create LipaNaMpesa details. Contact admin",
                        error : error
                    })
                } else {
                    console.log(body);
                    res.status(200).json(body)
                }
            }
        )
    }catch (e) {
        res.status(503).send({
            message:"Something went wrong while trying to create LipaNaMpesa details. Contact admin",
            error : e
        })
    }
}


module.exports = { 
    initiateSTKPush,
    confirmPayment
 };
