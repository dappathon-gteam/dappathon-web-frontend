import React, { Component } from 'react';
import {
  Router, Switch, Route, Redirect,
} from 'react-router-dom';
import history from '../services/history';
import Authentication from './common/Layouts/Authentication';
import ListLayout from './common/Layouts/ListLayout';

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" render={() => (<Redirect to="/auth/sign-in" />)} />
          <Route path="/auth" component={Authentication} />
          <Route path="/dashboard" component={ListLayout} />
        </Switch>
      </Router>
    );
  }
}

export default App;
