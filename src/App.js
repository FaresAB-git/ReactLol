import react, { Component } from 'react';
import './App.css';
import Acceuil from './components/acceuil/acceuil';
import { Route, Routes } from 'react-router-dom';
import Page2 from './components/Page2/Page2';
import About from './components/About/About';
//import {Routes, Route} from 'react-router-dom';


function App() {

    

    return (
      <div className="App">
        <Routes>
          <Route path='/' element={<Acceuil/>}/>
          <Route path='/Page2' element={<Page2/>}/>
          <Route path='/About' element={<About/>}/>
        </Routes>
        
      </div>
    );
}

export default App;
