import React from 'react'
import './App.css'
import {BrowserRouter , Route} from 'react-router-dom';
import HomePage from './components/HomePage'
import DatasetContextProvider from './contexts/DatasetContext'

const App = () => (
  <div className="App">
    <BrowserRouter>
      <DatasetContextProvider>
        <Route exact path= '/' component= {HomePage}/>
      </DatasetContextProvider>
    </BrowserRouter>
  </div>
);


export default App
