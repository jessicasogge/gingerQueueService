const {Worker}  = require('bullmq');
const {jobQueue, connection} = require('../config/queues');

const worker = new Worker(jobQueue.name, async job => {
    console.log(job.data);
}, connection);