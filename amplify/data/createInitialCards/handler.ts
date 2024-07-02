import { Context } from 'aws-lambda';
import { DynamoDBDocumentClient, BatchWriteCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { v4 as uuid } from 'uuid';

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

  for await (const name of names) {
    const id = `${gameId}-${name}-${uuid()}`;
    const item = {
      id,
      name,
      gameId,
      __typename: 'Card',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      owner,
    };
    const command = new PutCommand({
      Item: item,
      TableName: 'Card-u5f6wfp34zaslhsrhcl7xopy5i-NONE',
    });
    await docClient.send(command);
  }

  return (Date.now() - startTime) / 1000;
};
