const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');


const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const { MONGODB } = require('./config.js');

const pubsub = new PubSub();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req, pubsub })
});

mongoose
     .connect( MONGODB, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
     .then(() => console.log( 'Database Connected' ))
     .catch(err => console.log( err ));

server.listen({ port: 1011}).then((res) => { console.log(`server is running at ${res.url}`);
});
