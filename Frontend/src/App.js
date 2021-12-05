
import './App.css';
import React from 'react';
import Main from './components/Main';
import {BrowserRouter as Router} from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import backendServer from "./webConfig";
const client = new ApolloClient({
  uri: `${backendServer}/ubereats`
});

function App() {
  return (
    <ApolloProvider client={client}>
     <Router>
        <div>
          <Main/>
        </div>
      </Router>
      </ApolloProvider>
    
  );
}

export default App;
