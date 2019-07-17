import React, { useState, useRef } from 'react';
import './App.css';
import Dashboard from './Dashboard';
import particle from './particle';
import useAppState from './hooks/useAppState';
import { actions } from './reducer';

function App() {
  const [devices, setDevices] = useState([]);
  const inputRef = useRef();
  const [_, dispatch] = useAppState();

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ display: 'flex' }}>
          <input
            ref={inputRef}
            type="text"
            name="token"
            placeholder="token"
            style={{
              height: 40,
              width: 200,
              marginRight: 10,
              borderRadius: 4,
              border: 'none',
            }}
          />
          <input
            type="button"
            value="Get Devices"
            style={{ borderRadius: 4, border: 'none' }}
            onClick={async () => {
              const token = inputRef.current.value;
              dispatch(actions.setToken(token));

              try {
                const response = await particle.listDevices({ auth: token });
                setDevices(response.body);
              } catch (ex) {
                setDevices([]);
              }
            }}
          />
        </div>
      </header>
      <Dashboard devices={devices} />
    </div>
  );
}

export default App;
