import React from 'react'
import './App.css'
import {BrowserRouter , Route} from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import DatasetContextProvider from './contexts/DatasetContext'

const App = () => (
  <div className="App">
    <BrowserRouter>
      <DatasetContextProvider>
        <Route exact path= '/' component= {HomePage}/>
        <Route path = '/login'component= {LoginPage}/>
      </DatasetContextProvider>
    </BrowserRouter>
  </div>
);


export default App
