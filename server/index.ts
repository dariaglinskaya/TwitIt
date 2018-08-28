import express = require('express');
var cors = require('cors');
const app = express();
const users = require('./routes/users');
const feed = require('./routes/feed');
app.use(cors())
app.set('port', (process.env.PORT || 5000));
if(process.env.NODE_ENV === 'production') {
    app.use(express.static("client/public"))
}
app.use(express.static(__dirname + '/client/public'));

app.use('/users', users);
app.use('/', feed);
app.listen(app.get('port'), () => console.log('Node app is running on port', app.get('port')));