import express = require('express');
var cors = require('cors');
const app = express();
const users = require('./routes/users');
const feed = require('./routes/feed');
app.use(cors())
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.use('/users', users);
app.use('/', feed);
app.listen(app.get('port'), () => console.log('Node app is running on port', app.get('port')));