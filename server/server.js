const express = require('express');
// import ApolloServer
const { ApolloServer } = require('apollo-server-express');

// import our typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');

//import authMiddleware from auth.js
const { authMiddleware } = require('./utils/auth');

//import mongoose.connection object
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;

// create a new Apollo server and pass in our schema data
const server = new ApolloServer({
  typeDefs,
  resolvers,
  //bring authMiddleware to resolvers.js as context param
  context: authMiddleware
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  // integrate our Apollo server with the Express application as middleware
  //This will create a special /graphql endpoint for the Express.js server that will serve as the main endpoint for accessing the entire API. That's not all—the /graphql endpoint also has a built-in testing tool we can use. 
  server.applyMiddleware({ app });
  
  //upon successful connection to mongoDB, we start the server
  db.once('open', () => {
      app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        // log where we can go to test our GQL API
        console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
      })
    })
  };
  
  // Call the async function to start the server
  startApolloServer(typeDefs, resolvers);