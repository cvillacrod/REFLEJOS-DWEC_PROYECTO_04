import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from '@/pages/Home';
import About from '@/pages/About';
import Login from '@/pages/Login';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/about' component={About} />

      </Switch>
    </Router>
  );
}
