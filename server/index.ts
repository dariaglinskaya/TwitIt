import express = require('express');
var cors = require('cors');
const app = express();
const users = require('./routes/users');
const feed = require('./routes/feed');
import * as path from 'path';
app.use(cors())
app.set('port', (process.env.PORT || 5000));
if(process.env.NODE_ENV === 'production') {
    app.use(express.static("../client/build"))
}
app.use(express.static(__dirname + '../client/build'));
app.get('/', function (req, res) {
    console.log(__dirname)
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });

app.use('/users', users);
app.use('/', feed);
app.listen(app.get('port'), () => console.log('Node app is running on port', app.get('port')));