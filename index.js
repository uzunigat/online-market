const express = require('express');
const routerApi = require('./routes');
var bodyParser = require('body-parser');
const cors = require('cors');

const {errorHandler, logErrors, boomErrorHandler} = require('./middlewares/error.handler')

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {

  res.send('Hello')

});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, ()=> {

  console.log("Mi port " + port);

})

