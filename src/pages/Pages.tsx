import React from 'react'
import Home from './Home'
import {Route,Routes} from 'react-router-dom'
import Cuisines from './Cuisines';
import Searched from './Searched';
import Recipe from './Recipe';
function Pages() {
  return (
      <Routes>
        <Route element={<Recipe/>} path="recipes/:id"/>
        <Route element={<Home />} path="/" />
        <Route element={<Cuisines />} path="/cuisines/:type" />
        <Route element={<Searched/>} path="/searched/:search"/>
      </Routes>
  );
}

export default Pages
