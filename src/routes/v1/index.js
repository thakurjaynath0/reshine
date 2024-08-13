const express = require('express');
const userRoute = require('./user');
const adminRoute = require('./admin');
const deliveryRoute = require('./delivery');
const docsRoute = require('./docs.route');
const webhookRoute = require('./webhook');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/admin',
    route: adminRoute,
  },
  {
    path: '/user',
    route: userRoute,
  },
  {
    path: '/delivery',
    route: deliveryRoute,
  },
  {
    path: '/webhook',
    route: webhookRoute,
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
