const MongoClient = require('mongodb').MongoClient;
let connection = null;

module.exports = {
    getClient: async function() {
        try {
            if (!connection) {
                console.log('Creating a new Mongo Client');
                // In real life this would be in env vars
                const client = new MongoClient('mongodb+srv://jobManager:9uIoEk6uwBSiBsWb@cluster0.zbngmvm.mongodb.net/ginger?retryWrites=true&w=majority');
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
