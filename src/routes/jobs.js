const router = require('express').Router();

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
            console.log('hi from post route');
            return res.status(200).send({});
        } catch (err) {
            return res.status(500).send('Internal Service Error');
        }
    })

module.exports = router;
