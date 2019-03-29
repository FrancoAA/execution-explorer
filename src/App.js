import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import ExecutionBrowser from './components/ExecutionBrowser';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ExecutionBrowser />
      </div>
    );
  }
}

export default App;
