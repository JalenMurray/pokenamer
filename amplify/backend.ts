import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data, createInitialCardsHandler } from './data/resource';
import * as iam from 'aws-cdk-lib/aws-iam';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
  data,
  createInitialCardsHandler,
});

const createInitCardsLambda = backend.createInitialCardsHandler.resources.lambda;

const statement = new iam.PolicyStatement({
  sid: 'AllowBatchWrite',
  actions: ['dynamodb:BatchWriteItem', 'dynamodb:ListTables', 'dynamodb:PutItem'],
  resources: ['*'],
});

createInitCardsLambda.addToRolePolicy(statement);
