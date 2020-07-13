import React from 'react';
import logo from './just-logo.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to Frontegg sample project.<br /><br />
        </p>
        <p style={{ fontSize: '12px' }}>
          In order to replace your credentials:<br />
          export FRONTEGG_CLIENT_ID=[YOUR-CLIENT-ID]<br />
          export FRONTEGG_API_KEY=[YOUR-API-KEY]<br />
        </p>
      </header>
    </div>
  );
}

export default App;
