const mongo = require('../services/mongoWrapper');
const {ObjectId} = require('mongodb');

module.exports = {
    getJob: async function(jobId) {
        const db = await mongo.getClient();
        return await db.collection('results').find({'_id': new ObjectId(jobId)}).toArray(); // eslint-disable-line
    },

    deleteJob: async function(jobId) {
        const db = await mongo.getClient();
        return await db.collection('results').deleteOne({'_id': new ObjectId(jobId)}); // eslint-disable-line
    },

    addJobs: async function(jobData) {
        const db = await mongo.getClient();
        return await db.collection('results').insertMany(jobData);
    },
};
