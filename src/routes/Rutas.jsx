import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from '@/pages/Home';
import About from '@/pages/About';
import Login from '@/pages/Login';

export default function Rutas() {

  return (
    <Router>
      <Routes>
        <Route exact path='/login' component={Login} />
        <Route exact path='/' component={Home} />
        <Route exact path='/about' component={About} />
      </Routes>
    </Router>
  );
}
