const {Worker} = require('bullmq');
const {jobQueue, connection} = require('../config/queues');
require('dotenv').config();
const mongo = require('../services/mongoWrapper');
const axios = require('axios');
const {ObjectId} = require('mongodb');

const worker = new Worker(jobQueue.name, async (job) => { // eslint-disable-line
    try {
        console.log('Processing job: ', job.data);

        const db = await mongo.getClient();

        const recentlyQueried = await db.collection('results').find({
            'time': {
                $gte: new Date(new Date().setDate(new Date().getDate()-1)), // eslint-disable-line
            },
            'data.targetUrl': job.data.targetUrl,
        }).toArray();

        if (recentlyQueried[0]) {
            console.log('returning without processing');
            return;
        }

        const setProcessing = {'$set': {'status': 'processing'}};
        await db.collection('results').updateOne({'_id': new ObjectId(job.data._id)}, setProcessing);  // eslint-disable-line

        const req = await axios.get(job.data.targetUrl);

        const setComplete = {'$set': {'status': 'complete', 'results': req.data}}; // eslint-disable-line
        return await db.collection('results').updateOne({'_id': new ObjectId(job.data._id)}, setComplete);  // eslint-disable-line
    } catch (err) {
        // add error handling and retry as needed
        console.log(err);
    }
}, connection);
