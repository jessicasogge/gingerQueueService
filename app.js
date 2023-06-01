const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3002;
const mongo = require('./src/services/mongoWrapper.js');
const morgan = require('morgan');

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan(':method :url :status :res[content-length] :response-time ms'));

mongo.getClient();

app.get('/health-check', (req, res) => res.send('ok'));

app.use('/', require('./src/routes/jobs'));

app.listen(port, () => console.log(`Express app running on port ${port}!`));
