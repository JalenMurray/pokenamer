import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { createInitialCards } from './functions/createInitialCards/resource';
import * as iam from 'aws-cdk-lib/aws-iam';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */

const backend = defineBackend({
  auth,
  data,
  createInitialCards,
});

const createInitCardsLambda = backend.createInitialCards.resources.lambda;

const statement = new iam.PolicyStatement({
  sid: 'AllowBatchWrite',
  actions: ['dynamodb:BatchWriteItem', 'dynamodb:ListTables', 'dynamodb:PutItem'],
  resources: ['*'],
});

createInitCardsLambda.addToRolePolicy(statement);

// // Create parameters for MyParameterStore
// const parameterStoreDynamoDBGeneratedKey = `/amplify/userProfileTableName-${process.env.AWS_BRANCH}`;

// const myParameterStore = new MyParameterStore(
//   backend.createStack('myParameterStore'),
//   'myParameterStore',
//   {
//     parameters: [
//       {
//         name: parameterStoreDynamoDBGeneratedKey,
//         value: backend.data.resources.tables['Card'].tableName,
//       },
//     ],
//   }
// );

// createInitCardsLambda.createInitCardsLambda.addEnvironment(
//   'SSM_CARD_TABLE_NAME_KEY',
//   parameterStoreDynamoDBGeneratedKey
// );
