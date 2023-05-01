const MongoClient = require('mongodb').MongoClient;
let connection = null;

module.exports = {
    getClient: async function() {
        try {
            if (!connection) {
                console.log('Creating a new Mongo Client');
                const client = new MongoClient(process.env.MONGO);
                await client.connect();
                connection = client.db();
            }

            return connection;
        } catch (err) {
            console.log('Unable to get MongoDB Client:', err.message);
            connection = null;
        }
    },
};
