import React, { useEffect, useState } from 'react';
import logo from './logo.png';
import './App.css';

function App() {
  // STEP 2: Set up credentials.
  const credentials = '';
  const buttonID = '';
  const [buttons, setButtons] = useState([true, true, true, true]);
  const [lights, setLights] = useState([
    { on: true, color: 'red' },
    { on: false, color: 'red' },
    { on: true, color: 'red' },
    { on: true, color: 'red' },
    { on: true, color: 'red' },
    { on: true, color: 'red' },
    { on: false, color: 'red' },
    { on: true, color: 'red' },
    { on: false, color: 'red' },
    { on: true, color: 'red' },
    { on: true, color: 'red' },
    { on: true, color: 'red' }
  ]);

  // STEP 3: Get the state of the lights.
  useEffect(() => {
    // Update the document title using the browser API
    console.log = '';
  });

  // STEP 3: Get the state of the buttons.
  useEffect(() => {
    // Update the document title using the browser API
    console.log = 'Step 3';
  });

  // STEP 4: Subscribe to changes in the lights and buttons.
  useEffect(() => {
    // Update the document title using the browser API
    console.log = 'Step 4';
  });

  // CHALLENGE: Create a function to do something cool.
  useEffect(() => {
    // Update the document title using the browser API
    console.log = 'Challenge';
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="buttons">
          {buttons.map(button => (
            <span
              className="buttonState"
              style={
                button
                  ? { backgroundColor: 'white' }
                  : { backgroundColor: 'gray' }
              }
            />
          ))}
        </div>
        <div className="lights">
          {lights.map(light => (
            <span
              className="light"
              style={
                light.on
                  ? { backgroundColor: light.color }
                  : { backgroundColor: '#000000' }
              }
            />
          ))}
        </div>
        <button
          onClick={() => {
            setLights(
              lights.map(light => ({ on: !light.on, color: light.color }))
            );
          }}
          className="button"
        >
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
