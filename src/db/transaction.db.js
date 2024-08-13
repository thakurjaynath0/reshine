const mongoose = require('mongoose');

const withTransaction = async (fn) => {
  const session = await mongoose.startSession();

  if (session.inTransaction()) {
    throw new Error('Nested transactions are not allowed.');
  }

  await session.withTransaction(
    async () => {
      await fn(session);
    },
    {
      // Ensure the isolation level and write concern
      readConcern: { level: 'snapshot' },
      writeConcern: { w: 'majority' },
    }
  );
  session.endSession(); // Ensure the session is always closed
};

module.exports = {
  withTransaction,
};
