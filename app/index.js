import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import App from './components/App';
import About from './components/About';
import Connect from './components/Connect';
import Move from './components/Move';
import Color from './components/Color';
import Presets from './components/Presets';

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Connect} />
      <Route path="/about" component={About} />
      <Route path="/move" component={Move} />
      <Route path="/color" component={Color} />
      <Route path="/presets" component={Presets} />
    </Route>
  </Router>
), document.getElementById('app'));
