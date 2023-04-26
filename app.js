const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3002;
const mongo = require('./src/services/mongoWrapper.js');

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({extended: false}));

mongo.getClient();

app.get('/health-check', (req, res) => res.send('ok'));

app.use('/', require('./src/routes/jobs'));

app.listen(port, () => console.log(`Express app running on port ${port}!`));
