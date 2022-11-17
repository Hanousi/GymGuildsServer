/* eslint-disable global-require */
// Include the cluster module
const cluster = require('cluster');

// Code to run if we're in the master process
if (cluster.isMaster) {
  // Count the machine's CPUs
  const cpuCount = require('os').cpus().length;

  // Create a worker for each CPU
  for (let i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }

  // Listen for terminating workers
  cluster.on('exit', (worker) => {
    // Replace the terminated workers
    console.log(`Worker ${worker.id} died :(`);
    cluster.fork();
  });

// Code to run if we're in a worker process
} else {
  const AWS = require('aws-sdk');
  const express = require('express');
  const bodyParser = require('body-parser');
  const users = require('./routes/users');
  const challenges = require('./routes/challenges');

  AWS.config.region = process.env.REGION;

  const sns = new AWS.SNS();
  let ddb;

  if (process.env.DEV === 'True') {
    ddb = new AWS.DynamoDB({ endpoint: new AWS.Endpoint('http://localhost:8000') });
  } else {
    ddb = new AWS.DynamoDB();
  }

  const ddbTable = process.env.STARTUP_SIGNUP_TABLE;
  const snsTopic = process.env.NEW_SIGNUP_TOPIC;
  const app = express();

  app.set('view engine', 'ejs');
  app.set('views', `${__dirname}/views`);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use('/users', users);
  app.use('/challenges', challenges);

  app.get('/', (req, res) => {
    res.render('index', {
      static_path: 'static',
      theme: process.env.THEME || 'flatly',
      flask_debug: process.env.FLASK_DEBUG || 'false',
    });
  });

  app.post('/signup', (req, res) => {
    const item = {
      email: { S: req.body.email },
      name: { S: req.body.name },
      preview: { S: req.body.previewAccess },
      theme: { S: req.body.theme },
    };

    ddb.putItem({
      TableName: 'Users',
      Item: item,
      Expected: { email: { Exists: false } },
    }, (err) => {
      if (err) {
        let returnStatus = 500;

        if (err.code === 'ConditionalCheckFailedException') {
          returnStatus = 409;
        }

        res.status(returnStatus).end();
        console.log(`DDB Error: ${err}`);
      }
    });
  });

  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}/`);
  });
}
