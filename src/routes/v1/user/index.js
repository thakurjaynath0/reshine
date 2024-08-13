const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('../docs.route');
const config = require('../../../config/config');
const serviceTypeRoute = require('./serviceType.route');
const laundaryServiceRoute = require('./laundaryService.route');
const clothRoute = require('./cloth.route');
const clothServicePricingRoute = require('./clothServicePricing.route');
const addressRouter = require('./address.route');
const announcementRoute = require('./announcement.route');
const couponRoute = require('./coupon.route');
const issueTypeRoute = require('./issueType.route');
const issueRoute = require('./issue.route');
const orderRoute = require('./order.route');
const paymentRoute = require('./payment.route');
const uploadRoute = require('./upload.route');
// const orderItemRoute = require('./orderItem.route');
// const userCouponRoute = require('./userCoupon.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/',
    route: userRoute,
  },
  {
    path: '/service-types',
    route: serviceTypeRoute,
  },
  {
    path: '/services',
    route: laundaryServiceRoute,
  },
  {
    path: '/clothes',
    route: clothRoute,
  },
  {
    path: '/pricings',
    route: clothServicePricingRoute,
  },
  {
    path: '/addresses',
    route: addressRouter,
  },
  {
    path: '/announcements',
    route: announcementRoute,
  },
  {
    path: '/coupons',
    route: couponRoute,
  },
  {
    path: '/issue-types',
    route: issueTypeRoute,
  },
  {
    path: '/issues',
    route: issueRoute,
  },
  {
    path: '/orders',
    route: orderRoute,
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
