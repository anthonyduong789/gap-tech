import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import Timer from './Timer.js';
import InputBox from './inputbox.js';

function App({ startTime}) {
  
  return(
    <div className="App">
    <h1>Gap-tech Application</h1>
    <Timer />
    
    </div>
  );
    
    

}

export default App;
