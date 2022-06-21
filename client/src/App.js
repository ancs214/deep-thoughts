//ApolloProvider is a special type of React component that we'll use to provide data to all of the other components.
//ApolloClient is a constructor function that will help initialize the connection to the GraphQL API server.
//InMemoryCache enables the Apollo Client instance to cache API response data so that we can perform requests more efficiently.
//createHttpLink allows us to control how the Apollo Client makes a request. Think of it like middleware for the outbound network requests.
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import React from 'react';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';

//est. new link to GraphQL server at /graphql endpoint
//"proxy": "http://localhost:3001" is in package.json 
const httpLink = createHttpLink({
  uri: '/graphql',
});

//constructor to create apollo client instance and create connection to api endpoint
//also instantiate a new cache object
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

//wrap jsx in apolloprovider to pass in client variable as value for client prop. everything in jsx will have access to the server's api data through the client we set up
function App() {
  return (
    <ApolloProvider client={client}>
    <div className='flex-column justify-flex-start min-100-vh'>
      <Header />
      <div className='container'>
        <Home />
      </div>
      <Footer />
    </div>
    </ApolloProvider>
  );
}

export default App;
