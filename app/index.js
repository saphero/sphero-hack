import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import App from './components/App';
import About from './components/About';
import Connect from './components/Connect';

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Connect} />
      <Route path="/about" component={About} />
    </Route>
  </Router>
), document.getElementById('app'));
