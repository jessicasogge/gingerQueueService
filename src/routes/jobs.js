const router = require('express').Router(); // eslint-disable-line new-cap
const {jobQueue} = require('../config/queues');
const {getJob, deleteJob, addJobs} = require('../services/jobService');
const {ObjectId} = require('mongodb');

// Consolidate error handling

router.route('/job/:id')
    .get(async (req, res) => {
        try {
            const jobId = req.params.id;

            const result = await getJob(jobId);

            return res.status(200).send(result);
        } catch (err) {
            console.log(`Error getting job: ${err.message}`);
            return res.status(500).send('Internal Service Error');
        }
    })
    .delete(async (req, res) => {
        try {
            const jobId = req.params.id;

            await deleteJob(jobId);

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
                const _id = new ObjectId();
                return {
                    _id: _id,
                    name: 'My Job',
                    time: new Date(),
                    data: {
                        targetUrl: element,
                        status: 'queued',
                        results: {},
                        _id: _id,
                    },
                };
            });

            const result = await addJobs(jobData);

            await jobQueue.addBulk(jobData);

            return res.status(200).send({id: result});
        } catch (err) {
            console.log(`Error adding job to queue: ${err.message}`);
            return res.status(500).send('Internal Service Error');
        }
    });

module.exports = router;
