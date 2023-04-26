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

            const db = await mongo.getClient();
            const result = await db.collection('results').find({'_id': new ObjectId(jobId)}).toArray(); // eslint-disable-line

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

router.route('/jobs')
    .post(async (req, res) => {
        try {
            const targetUrls = req.body.targetUrls;
            if (!targetUrls) {
                throw new Error('Missing required request parameters');
            }

            const jobData = targetUrls.map((element) => {
                return {
                    name: 'My Job',
                    data: {
                        targetUrl: element,
                        status: 'queued',
                        results: {},
                    },
                };
            });

            const db = await mongo.getClient();
            const result = await db.collection('results').insertMany(jobData);

            await jobQueue.addBulk(jobData);

            return res.status(200).send({id: result});
        } catch (err) {
            console.log(`Error adding job to queue: ${err.message}`);
            return res.status(500).send('Internal Service Error');
        }
    });

module.exports = router;
