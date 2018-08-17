const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

const apiRoutes = require('./routes')(app, express);
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', apiRoutes);
app.listen(port, () => console.log(`Listening on port ${port}`));