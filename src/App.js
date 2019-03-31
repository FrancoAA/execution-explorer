import React, { Component } from 'react';

import './App.scss';

import ExecutionBrowser from './components/ExecutionBrowser/ExecutionBrowser';

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
