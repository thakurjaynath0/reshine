const mongoose = require('mongoose');
/**
 *
 * @param {Object} requestQuery
 * @param {Object} settings
 * @returns {Object}
 */
const queryBuilder = (requestQuery, settings) => {
  const query = {};
  const {
    objectFields = [],
    booleanFields = [],
    stringFields = [],
    numericFields = [],
    dateFields = [],
    searchFields = [],
  } = settings;

  booleanFields.forEach((field) => {
    if (requestQuery[field] !== undefined) {
      query[field] = requestQuery[field] === true || requestQuery[field] === 'true';
    }
  });

  objectFields.forEach((field) => {
    if (requestQuery[field]) {
      query[field] = {
        $in: requestQuery[field].split(',').map((val) => {
          if (mongoose.Types.ObjectId.isValid(val)) {
            return new mongoose.Types.ObjectId(val);
          }
          return new mongoose.Types.ObjectId();
        }),
      };
    }
  });

  stringFields.forEach((field) => {
    if (requestQuery[field]) {
      query[field] = { $in: requestQuery[field].split(',') };
    }
  });

  if (requestQuery.search) {
    query.$or = [];
    searchFields.forEach((field) => {
      query.$or.push({
        [field]: { $regex: requestQuery.search, $options: 'i' },
      });
    });
  }

  if ((numericFields.length > 0 || dateFields.length > 0) && (requestQuery.numericFilters || requestQuery.dateFilters)) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    };
    const operatorRegexp = /\b(>|>=|=|<|<=)\b/g;

    if (requestQuery.numericFilters) {
      const filters = requestQuery.numericFilters
        .replaceAll('&lt;', '<')
        .replace(operatorRegexp, (match) => `|${operatorMap[match]}|`)
        .split(',');

      filters.forEach((filter) => {
        const [field, operator, value] = filter.split('|');
        if (numericFields.includes(field)) {
          query[field] = { ...query[field], [operator]: Number(value) };
        }
      });
    }

    if (requestQuery.dateFilters) {
      const filters = requestQuery.dateFilters
        .replaceAll('&lt;', '<')
        .replace(operatorRegexp, (match) => `|${operatorMap[match]}|`)
        .split(',');

      filters.forEach((filter) => {
        const [field, operator, value] = filter.split('|');
        if (dateFields.includes(field)) {
          query[field] = { ...query[field], [operator]: new Date(value) };
        }
      });
    }
  }

  return query;
};

module.exports = queryBuilder;
