const express = require('express');
const docsRoute = require('../docs.route');
const config = require('../../../config/config');
const addressRoute = require('./address.route');
const orderRoute = require('./order.route');
const userRoute = require('./user.route');
const paymentRoute = require('./payment.route');
const uploadRoute = require('./upload.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/addresses',
    route: addressRoute,
  },
  {
    path: '/orders',
    route: orderRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/payments',
    route: paymentRoute,
  },
  {
    path: '/uploads',
    route: uploadRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
