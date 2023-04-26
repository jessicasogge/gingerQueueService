const {Worker} = require('bullmq');
const {jobQueue, connection} = require('../config/queues');
const mongo = require('../services/mongoWrapper');
const axios = require('axios');
const {ObjectId} = require('mongodb');

const worker = new Worker(jobQueue.name, async (job) => { // eslint-disable-line
    try {
        console.log('Processing job: ', job.data);

        const setProcessing = {'$set': {'status': 'processing'}};
        const db = await mongo.getClient();
        await db.collection('results').updateOne({'_id': new ObjectId(job.data._id)}, setProcessing);  // eslint-disable-line

        const data = await axios.get(job.data.targetUrl);

        const setComplete = {'$set': {'status': 'complete', 'results': data}};
        await db.collection('results').updateOne({'_id': new ObjectId(job.data._id)}, setComplete);  // eslint-disable-line
    } catch (err) {
        // add error handling and retry as needed
        console.log(err);
    }
}, connection);
