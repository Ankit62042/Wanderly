import React from 'react';
import './Landing.css';
import TravelQuestionnaire from './TravelQuestion';

function Landing() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Wanderly</h1>
        <p className="App-intro">
          Craft Your Perfect Journey with Ease
        </p>
       
        <button onClick={()=>{
            window.location="./TravelQuestion"
        }} className="App-button">Get Started</button>
        
      </header>
    </div>
  );
}

export default Landing;
