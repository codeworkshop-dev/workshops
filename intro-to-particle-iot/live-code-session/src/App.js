import React, { useEffect, useState } from 'react';
import logo from './logo.png';
import './App.css';

var Particle = require('particle-api-js');
var particle = new Particle();

// Use particle SDK to call our remote button function.
function doTheThing() {
  var fnPr = particle.callFunction({
    deviceId: process.env.REACT_APP_DEVICE_ID,
    name: 'toggleLED',
    argument: '',
    auth: process.env.REACT_APP_TOKEN
  });

  fnPr.then(
    function(data) {
      console.log('Function called succesfully:', data);
    },
    function(err) {
      console.log('An error occurred:', err);
    }
  );
}

function App() {
  const [buttons, setButtons] = useState([
    {
      id: 1,
      pressed: false
    },
    {
      id: 2,
      pressed: false
    },
    {
      id: 3,
      pressed: false
    },
    {
      id: 4,
      pressed: false
    }
  ]);
  const [lights, setLights] = useState([
    { on: false, color: 'red', id: 1 },
    { on: true, color: 'red', id: 2 },
    { on: false, color: 'red', id: 3 },
    { on: false, color: 'red', id: 4 }
  ]);

  // STEP 3: Get the state of the lights.
  useEffect(() => {
    particle
      .getVariable({
        deviceId: process.env.REACT_APP_DEVICE_ID,
        name: 'button',
        auth: process.env.REACT_APP_TOKEN
      })
      .then(
        function(data) {
          console.log('Device variable retrieved successfully:', data);
        },
        function(err) {
          console.log('An error occurred while getting attrs:', err);
        }
      );
  });

  // STEP 4: Subscribe to buttons.
  useEffect(() => {
    // Update the document title using the browser API
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="buttons">
          {buttons.map(button => (
            <span
              key={button.id}
              className="buttonState"
              style={
                button.pressed
                  ? { backgroundColor: 'white' }
                  : { backgroundColor: 'gray' }
              }
            />
          ))}
        </div>
        <div className="lights">
          {lights.map(light => (
            <span
              key={light.id}
              className="light"
              style={
                light.on
                  ? { backgroundColor: light.color }
                  : { backgroundColor: '#000000' }
              }
            />
          ))}
        </div>
        <button onClick={() => doTheThing()} className="button">
          Run Code!
        </button>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://particle.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn IoT With particle.io
        </a>
      </header>
    </div>
  );
}

export default App;
