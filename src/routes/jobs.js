const router = require('express').Router(); // eslint-disable-line new-cap
const {jobQueue} = require('../config/queues');

router.route('/job')
    .get(async (req, res) => {
        try {
            console.log('hi from get route');
            return res.status(200).send({});
        } catch (err) {
            return res.status(500).send('Internal Service Error');
        }
    })
    .post(async (req, res) => {
        try {
            const targetUrl = req.body.targetUrl;
            if (!targetUrl) {
                throw new Error('Missing required request parameters');
            }
            const jobName = req.body.jobName || 'testJob';

            await jobQueue.add(jobName, {targetUrl: targetUrl});

            return res.status(200).send(`Job ${jobName} queued`);
        } catch (err) {
            console.log(`Error adding job to queue: ${err.message}`);
            return res.status(500).send('Internal Service Error');
        }
    });

module.exports = router;
