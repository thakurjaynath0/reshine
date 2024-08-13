const { orderStatuses } = require('../config/enums/orderStatus.enum');
const Error = require('../errors');

const checkOrderUpdate = (currStatus, updateStatus) => {
  // const statuses = Object.values(orderStatuses);
  // const updateIndex = statuses.findIndex(updateStatus);
  // const currIndex = statuses.findIndex(currStatus);
  // if (updateIndex !== currIndex + 1) {
  //   throw new Error.BadRequestError('order_status_update_invalid.');
  // }

  if (updateStatus === orderStatuses.PICKED && currStatus !== orderStatuses.CREATED) {
    throw new Error.BadRequestError('order_status_update_invalid.');
  }

  if (updateStatus === orderStatuses.OUTFORDELIVERY && currStatus !== orderStatuses.PICKED) {
    throw new Error.BadRequestError('order_status_update_invalid.');
  }

  if (updateStatus === orderStatuses.DELIVERED && currStatus !== orderStatuses.OUTFORDELIVERY) {
    throw new Error.BadRequestError('order_status_update_invalid.');
  }

  if (orderStatuses === orderStatuses.CANCELED && currStatus !== orderStatuses.CREATED) {
    throw new Error.BadRequestError('order_status_update_invalid.');
  }
};

module.exports = checkOrderUpdate;
