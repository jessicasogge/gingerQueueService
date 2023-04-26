const {Worker} = require('bullmq');
const {jobQueue, connection} = require('../config/queues');

const worker = new Worker(jobQueue.name, async (job) => { // eslint-disable-line
    console.log(job.data);
}, connection);
