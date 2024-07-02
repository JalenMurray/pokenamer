import { type ClientSchema, a, defineData, defineFunction } from '@aws-amplify/backend';

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any unauthenticated user can "create", "read", "update", 
and "delete" any "Todo" records.
=========================================================================*/

export const createInitialCardsHandler = defineFunction({
  entry: './createInitialCards/handler.ts',
});

const schema = a.schema({
  Card: a
    .model({
      name: a.string().required(),
      pokemon: a.integer(),
      gameId: a.id().required(),
      game: a.belongsTo('Game', 'gameId'),
    })
    .authorization((allow) => [allow.owner()]),
  Game: a
    .model({
      name: a.string().required(),
      themeIdentifier: a.string().required(),
      cards: a.hasMany('Card', 'gameId'),
    })
    .authorization((allow) => [allow.owner()]),
  createInitialCards: a
    .mutation()
    .arguments({
      names: a.string().array(),
      gameId: a.string(),
      owner: a.string(),
    })
    .returns(a.string())
    .authorization((allow) => [allow.authenticated()])
    .handler(a.handler.function(createInitialCardsHandler)),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
