const Agenda = require('agenda');
const config = require('../src/config/config');
const logger = require('../src/config/logger');

const agenda = new Agenda({
  db: {
    address: config.mongoose.url,
    options: config.mongoose.options,
  },
});

agenda.define('hello', async (job) => {
  logger.info(`Hello world : ${Date.now()} ${job.attrs.data}`);
});

(async function () {
  await agenda.start();

  await agenda.every('10 seconds', 'hello');
})();
