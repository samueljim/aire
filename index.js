const port = process.env.PORT || 3000;
const dbRetryTime = process.env.db_retry_time || 3000;

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = require('./src/router');
const path = require("path");

const mongoose = require('mongoose');
const MONGO_PORT = 27017;

const mongoUri = `mongodb://${process.env.db_service_name}:${MONGO_PORT}/${process.env.db_name}`;

// This online connection is used in order to have a populated database for the demo. 
// The docker-compose file is used to start the mongo inside of a container which contains the database.
const mongoOnlineUri = `mongodb+srv://admin:AIJwtFUkcevsmKab@cluster0.5kyfh.mongodb.net/?retryWrites=true&w=majority`;

let db = mongoose.connection;
let connectWithRetry = function () {
  return mongoose.connect(mongoOnlineUri || mongoUri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
};

connectWithRetry();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

db.on('error', () => {
	setTimeout(() => {
		console.log('DB connection failed. Will try again.');

		connectWithRetry();
  }, dbRetryTime);
});

app.get(`/`, (req, res) => {
  res.sendFile(`./public/index.html`);
}); 

db.on('connected', function () {
  app.use(router);
  app.listen(port, () => console.log(`All set up. Listening on ${port}!`))
});
