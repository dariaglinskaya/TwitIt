import express = require('express');
var cors = require('cors');
const app = express();
const users = require('./routes/users');
const feed = require('./routes/feed');
import * as path from 'path';
app.use(cors())
app.set('port', (process.env.PORT || 5000));

app.use(express.static(path.join(__dirname, '../client/build')));

app.use('/users', users);
app.use('/', feed);

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
app.listen(app.get('port'), () => console.log('Node app is running on port', app.get('port')));