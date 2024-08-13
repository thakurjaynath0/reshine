const express = require('express');
const razorpayRoute = require('./razorpay.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/razorpay',
    route: razorpayRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
