const router = require('express').Router(); // eslint-disable-line new-cap
const {jobQueue} = require('../config/queues');
const mongo = require('../services/mongoWrapper');
const {ObjectId} = require('mongodb');

// To Do - with more time move the logic out of the routes file
// Consolidate error handling

router.route('/job/:id')
    .get(async (req, res) => {
        try {
            const jobId = req.params.id;
            const query = {
                '_id': new ObjectId(jobId),
            };

            const db = await mongo.getClient();
            const result = await db.collection('results').find(query).toArray();

            return res.status(200).send(result);
        } catch (err) {
            console.log(`Error getting job: ${err.message}`);
            return res.status(500).send('Internal Service Error');
        }
    })
    .delete(async (req, res) => {
        try {
            const jobId = req.params.id;

            const db = await mongo.getClient();
            const result = await db.collection('results').deleteOne({'_id': new ObjectId(jobId)});  // eslint-disable-line

            return res.status(200).send('ok');
        } catch {
            console.log(`Error deleting job: ${err.message}`);
            return res.status(500).send('Internal Service Error');
        }
    });

router.route('/job')
    .post(async (req, res) => {
        try {
            const targetUrl = req.body.targetUrl;
            if (!targetUrl) {
                throw new Error('Missing required request parameters');
            }
            const jobName = req.body.jobName || 'testJob';

            const data = {
                targetUrl: targetUrl,
                jobName: jobName,
                status: 'queued',
                results: {},
            };

            const db = await mongo.getClient();
            const result = await db.collection('results').insertOne(data);

            await jobQueue.add(jobName, data);

            return res.status(200).send({id: result.insertedId});
        } catch (err) {
            console.log(`Error adding job to queue: ${err.message}`);
            return res.status(500).send('Internal Service Error');
        }
    });

module.exports = router;
