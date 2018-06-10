import React, { Component } from 'react';
import AddCategory from './components/Category/AddCategory';

// import for the routing in react

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// import for graphql client
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import { HttpLink } from 'apollo-link-http';
import { ApolloLink, concat } from 'apollo-link';
import UserSignUp from './components/UserSignUp/UserSignUp';
import HomeHeader from './components/HomeHeader';
import UserLogin from './components/UserLogin/UserLogin';
const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
});
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <React.Fragment>
            <HomeHeader />
            <br />
            <div className="container">
              <Route exact strict path="/Signup" component={UserSignUp} />
              <Route exact strict path="/Login" component={UserLogin} />
            </div>
          </React.Fragment>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
