/**
 * Create an object composed of the picked object properties
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Object}
 */
const pick = (object, keys) => {
  return keys.reduce((obj, key) => {
    const isKeyPresent = object[key] && typeof object[key] === 'object' && !Array.isArray(object[key]);
    if (object && (Object.prototype.hasOwnProperty.call(object, key) || isKeyPresent)) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = object[key];
    }
    return obj;
  }, {});
};

module.exports = pick;
