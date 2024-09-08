import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';

const dynamodb = new DynamoDB.DocumentClient();

export const getWords: APIGatewayProxyHandler = async (event) => {
  const params = {
    TableName: process.env.TABLE_NAME || 'AcademicWords',
  };

  try {
    const data = await dynamodb.scan(params).promise();
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(data.Items),
    };
  } catch (error) {
    console.error('Error fetching words:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error fetching words' }),
    };
  }
};