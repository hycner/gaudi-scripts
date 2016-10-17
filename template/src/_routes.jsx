import React, {Component} from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import App from './components/app';
import Home from './components/app/home';
import Jeff from './components/app/jeff';
import Kiwis from './components/app/kiwis';

export default class Routes extends Component {
  render () {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="jeff" component={Jeff} />
          <Route path="kiwis" component={Kiwis} />
        </Route>
      </Router>
    );
  }
}
