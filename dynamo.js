const AWS = require('aws-sdk');

AWS.config.region = process.env.REGION;

let ddb;

if (process.env.DEV === 'True') {
  ddb = new AWS.DynamoDB({ endpoint: new AWS.Endpoint('http://localhost:8000') });
} else {
  ddb = new AWS.DynamoDB();
}

module.exports.ddb = ddb;
