const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const params = {
        TableName: process.env.API_NATALIEWORDS_WORDTABLE_NAME
    };

    try {
        const data = await dynamodb.scan(params).promise();
        return data.Items;
    } catch (err) {
        console.log("Error", err);
        throw err;
    }
};
