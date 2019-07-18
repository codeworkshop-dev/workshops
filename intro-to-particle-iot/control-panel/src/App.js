import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import './App.css';
import DashboardPage from './DashboardPage';
import TokenPage from './TokenPage';
import useAppState from './hooks/useAppState';

function App() {
  const [{ token }] = useAppState();

  return (
    <div className="App">
      <header className="App-header" />
      <Router>
        <Switch>
          <Route path="/" exact strict component={TokenPage} />
          {token ? null : <Redirect push to="/" />}
          <Route path="/token" exact strict component={TokenPage} />
          <Route path="/dashboard" component={DashboardPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
