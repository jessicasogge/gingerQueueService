const {Queue} = require('bullmq');

// In real life I would put the connection info in env vars
const connection = {
    'connection': {
        'host': '127.0.0.1',
        'port': 6379,
    },
};

const jobQueue = new Queue('foo', connection);

module.exports = {
    jobQueue,
    connection,
};
