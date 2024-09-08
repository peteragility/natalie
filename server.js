const express = require('express');
const AWS = require('aws-sdk');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

AWS.config.update({
  region: 'your-aws-region',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

app.use(bodyParser.json());
app.use(express.static('build'));

app.get('/api/words', async (req, res) => {
  const params = {
    TableName: 'AcademicWords',
  };

  try {
    const data = await dynamodb.scan(params).promise();
    res.json(data.Items);
  } catch (error) {
    console.error('Error fetching words:', error);
    res.status(500).json({ error: 'Error fetching words' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});