import './App.css';
import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './Components/Home/Home.jsx';
import Details from './Components/Details/Details';
import Landing from './Components/Landing/Landing.jsx';
import Create from './Components/Create/Create.jsx'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path="/home" element={<Home/>}/>
          <Route path="/dogs/:id" element={<Details/>}/>
          <Route path="/create" element={<Create/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
