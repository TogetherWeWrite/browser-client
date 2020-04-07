import React from 'react';
import logo from './logo.svg';
import './App.css';
import Description from './Description';
import Header from './Header';
import Register from "./Register/Login";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
        {/*<Header name="Stijn"/>*/}
        {/*<Description countBy={3} />*/}
        <Register />
      </header>
    </div>
  );
}

export default App;
