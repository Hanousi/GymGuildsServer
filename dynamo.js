const AWS = require('aws-sdk');

AWS.config.region = process.env.REGION;

let ddb;
let dbClient;

if (process.env.DEV === 'True') {
  ddb = new AWS.DynamoDB({ endpoint: new AWS.Endpoint('http://localhost:8000') });
  dbClient = new AWS.DynamoDB.DocumentClient({ endpoint: new AWS.Endpoint('http://localhost:8000') });
} else {
  ddb = new AWS.DynamoDB();
  dbClient = new AWS.DynamoDB.DocumentClient();
}

module.exports.ddb = ddb;
module.exports.dbClient = dbClient;
