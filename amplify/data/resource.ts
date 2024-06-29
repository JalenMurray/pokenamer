import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any unauthenticated user can "create", "read", "update", 
and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  Name: a
    .model({
      name: a.string().required(),
      themeId: a.id().required(),
      theme: a.belongsTo('ThemeTemplate', 'themeId'),
    })
    .authorization((allow) => [allow.publicApiKey()]),
  ThemeTemplate: a
    .model({
      name: a.string().required(),
      names: a.hasMany('Name', 'themeId'),
      identifier: a.string().required(),
      categoryId: a.id().required(),
      category: a.belongsTo('Category', 'categoryId'),
    })
    .authorization((allow) => [allow.publicApiKey()]),
  Category: a
    .model({
      name: a.string().required(),
      language: a.string().required(),
      themes: a.hasMany('ThemeTemplate', 'categoryId'),
    })
    .authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: { expiresInDays: 30 },
  },
});
