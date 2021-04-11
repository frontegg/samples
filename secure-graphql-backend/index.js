const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const { graphql, buildSchema } = require('graphql');
const { frontegg, withAuthentication, FronteggPermissions } = require('@frontegg/client');
const typeDefs = require('./schema');


const app = express();

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
    type User {
        id: ID
        name: String
        email: String
    }
    type Query {
        users: [User]
    }
`);

const data = [
    {id: 1, name: 'John', email: 'john@doe.com'},
    {id: 2, name: 'Walter', email: 'walter@hhh.com'},
    {id: 1, name: 'Rob', email: 'rob@cra.me'},
]

// The root provides a resolver function for each API endpoint
const root = {
    users: () => {
        return data;
    },
};

app.use('/graphql', graphqlHTTP({
    schema: typeDefs,
    rootValue: root,
    graphiql: true,
}));

const clientId = process.env.FRONTEGG_CLIENT_ID || 'YOUR-CLIENT-ID';
const apiKey = process.env.FRONTEGG_API_KEY || 'YOUR-API-KEY';

app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use('/frontegg', frontegg({
    clientId,
    apiKey,
    authMiddleware: withAuthentication(),
    contextResolver: req => {
        return {
            tenantId: req.user ? req.user.tenantId : '',
            userId: req.user ? req.user.id : '',
            permissions: [FronteggPermissions.All],
        }
    }
}));

app.listen(8080, () => {
    console.log('Started listening on port 8080');
});
