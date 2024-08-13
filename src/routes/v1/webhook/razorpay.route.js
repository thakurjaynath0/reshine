const express = require('express');
const { verifyAndSavePayment } = require('../../../webhooks/razorpay.webhook');

const router = express.Router();

router.post('/verify-and-save-payment', verifyAndSavePayment);

module.exports = router;
