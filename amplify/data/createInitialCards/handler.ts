import { Context } from 'aws-lambda';
import { DynamoDBDocumentClient, BatchWriteCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { v4 as uuid } from 'uuid';
import config from '../../../amplify_outputs.json';

interface Event {
  arguments: {
    names: string[];
    gameId: string;
    owner: string;
  };
}

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event: Event, context: Context) => {
  const { names, gameId, owner } = event.arguments;
  const startTime = Date.now();
  const cardTableName = config.custom.CARD_TABLE_NAME;
  const date = new Date();
  const isoDate = date.toISOString();

  for await (const name of names) {
    const id = `${gameId}-${name}-${uuid()}`;
    const item = {
      id,
      name,
      gameId,
      __typename: 'Card',
      createdAt: isoDate,
      updatedAt: isoDate,
      owner,
    };
    const command = new PutCommand({
      Item: item,
      TableName: cardTableName,
    });
    await docClient.send(command);
  }

  return (Date.now() - startTime) / 1000;
};
