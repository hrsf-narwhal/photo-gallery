const express = require('express');

const path = require('path');

const app = express();

const publicPath = path.resolve(__dirname, '../public');
app.use(express.static( publicPath ));

const port = 3001;
app.listen(port, console.log(`Listening on port ${port}...`));
