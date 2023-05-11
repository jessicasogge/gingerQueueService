const mongo = require('../services/mongoWrapper');
const {ObjectId} = require('mongodb');

module.exports = {
    getJob: async function(jobId) {
        const db = await mongo.getClient();
        return await db.collection('results').find({'_id': new ObjectId(jobId)}).toArray(); // eslint-disable-line
    },
};