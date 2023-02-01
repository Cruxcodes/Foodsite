import React from 'react';
import Pages from './pages/Pages';
import "../src/styles/style.css";
import Category from './components/Category';
import {BrowserRouter as Router} from 'react-router-dom'
import { Link } from 'react-router-dom';
import Search from './components/Search';

function App() {
  return (
    <div className="App">
      <Router>
        <Link to={'/'}>
          <h1>Foodsite</h1>
        </Link>
        <Search />
        <Category />
        <Pages />
      </Router>
    </div>
  );
}



export default App;
