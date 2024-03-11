import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from '@/pages/Home';
import About from '@/pages/About';
import Login from '@/pages/Login';

export default function Rutas() {

  return (
    <>
      <Route path="/login" element={<Login />} ></Route>

      <Route path="/" element={<ProtectedRoutes />}>
        <Route path="/" element={<Home />} />
      </Route>
    </>
  );
}
