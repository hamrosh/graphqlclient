import React, { Component } from 'react';
import AddCategory from './components/Category/AddCategory';

// import for graphql client
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// connect to the graphql Client
const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <h1>CtrlExam</h1>
          <AddCategory />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
