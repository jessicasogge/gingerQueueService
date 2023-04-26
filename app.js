const express = require('express');
const app = express();
const port = 3002;

app.get('/health-check', (req, res) => res.send('ok'));

app.listen(port, () => console.log(`Express app running on port ${port}!`));