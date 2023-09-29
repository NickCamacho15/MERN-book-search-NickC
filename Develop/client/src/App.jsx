import './App.css';
import { Outlet } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Navbar from './components/Navbar';

// Create an http link pointing to the API endpoint
const httpLink = createHttpLink({
  uri: 'https://sheltered-sierra-81302-752155270106.herokuapp.com/graphql',
});

// Create a middleware for the http link that will attach the JWT token to every request as an authorization header
const authLink = setContext((_, { headers }) => {
  // get the token from local storage
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Create a new instance of ApolloClient with the link created and a new instance of InMemoryCache
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <>
        <Navbar />
        <Outlet />
      </>
    </ApolloProvider>
  );
}

export default App;
