import React from 'react'
import './App.css'
import {BrowserRouter , Route} from 'react-router-dom';
import HomePage from './components/HomePage'

const App = () => (
  <div className="App">
    <BrowserRouter>
      <Route exact path= '/' component= {HomePage}/>
    </BrowserRouter>
  </div>
);


export default App
