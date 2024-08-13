const data = require('./stateCities.json');

const states = Object.keys(data);

module.exports = {
  states,
  cities: (state) => data[state],
};
