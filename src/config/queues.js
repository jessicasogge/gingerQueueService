const {Queue} = require('bullmq');

const connection = {
    'connection': {
        'host': process.env.REDIS_HOST,
        'port': process.env.REDIS_PORT,
    },
};

const jobQueue = new Queue('foo', connection);

module.exports = {
    jobQueue,
    connection,
};
