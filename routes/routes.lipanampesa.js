const express = require("express");
const router = express.Router();
const {
    initiateSTKPush,
    confirmPayment
} = require("../controllers/controllers.lipanampesa.js");

const { accessToken } = require("../middlewares/middlewares.generateAccessToken.js");


router.route('/stkPush').post(accessToken, initiateSTKPush);
router.route('/confirmPayment/:CheckoutRequestID').post(accessToken, confirmPayment);

module.exports = router;
