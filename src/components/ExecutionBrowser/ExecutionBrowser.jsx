import React, { Component } from 'react';

import './execution_browser.scss';
import 'font-awesome/css/font-awesome.min.css';

import SideDrawer from '../SideDrawer/SideDrawer';
import Timeline from '../Timeline/Timeline';

function randomChoice(choices) {
  const index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

function randomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

class RunItem extends Component {
  state = {
    runId: 1,
    assets: []
  };

  componentDidMount() {
    /**
     * tendria que hacer un pooling al server e ir agregando los assets a medida que van llegando los resultados, no usaria los children
     * sino que iria actualizando en el estado un array con los assets
     **/
    const OSs = ['Windows', 'MacOS', 'Linux'];
    const Statuses = ['Active', 'Inactive'];

    const intervalId = setInterval(() => {
      const { assets, runId } = this.state;

      if (assets.length === 6) clearInterval(intervalId);

      const newAsset = {
        id: assets.length + 1,
        runId,
        name: `Asset ${assets.length + 1}`,
        os: randomChoice(OSs),
        status: randomChoice(Statuses)
      };

      this.setState({
        assets: [...assets, newAsset]
      });
    }, 1000);
  }

  render() {
    const { name, runId, children, showResultDetails, ...attrs } = this.props;

    return (
      <div {...attrs}>
        <span className="label rounded">
          <span className="fa fa-server" />
        </span>
        <div className="branch rounded">
          {this.state.assets.length &&
            this.state.assets.map((asset, key) => (
              <AssetItem key={key} showResultDetails={showResultDetails} {...asset} />
            ))}
        </div>
      </div>
    );
  }
}

class AssetItem extends Component {
  /**
   * deberia permitir que al hacerle click traiga todos los resultados para este asset en particular para esa ejecucion
   */

  state = {
    show: false,
    results: []
  };

  getResults() {
    const results = [];

    for (let i = 0; i < 10; i++) {
      results.push({
        id: i,
        runId: 1,
        name: `Scenario ${i}`,
        outcome: randomChoice(['Passed', 'Failed', 'Errored'])
      });
    }

    return results;
  }

  clickHandler = () => {
    if (this.state.show) {
      this.setState({
        show: false,
        results: []
      });
    } else {
      setTimeout(() => {
        this.setState({
          show: true,
          results: this.getResults()
        });
      }, 1000);
    }
  };

  render() {
    const { id, name, runId, os, status, children, showResultDetails, ...attrs } = this.props;

    return (
      <div className="entry" {...attrs}>
        <span onClick={this.clickHandler} className="asset label rounded">
          <span className="fa fa-laptop" />
          <span
            className={`status-icon ${(status === 'Active' && 'active') ||
              (status === 'Inactive' && 'inactive')}`}
          />
        </span>
        {this.state.results.length > 0 && (
          <div className="branch rounded">
            {this.state.results.map((result, key) => (
              <ResultItem key={key} showResultDetails={showResultDetails} {...result} />
            ))}
          </div>
        )}
      </div>
    );
  }
}

class ResultItem extends Component {
  state = {
    show: false
  };

  clickHandler = () => {
    this.props.showResultDetails();
  };

  /**
   * resultado de la ejecucion de un scenario en un determinado asset, deberia si fue una ejecucion exitosa o no y al hacer click
   * desplegar un side panel en el cual se muestren las fases con sus resultados y logs
   */
  render() {
    const { id, name, runId, outcome, ...attrs } = this.props;

    return (
      <div className="entry" {...attrs}>
        <span onClick={this.clickHandler} style={{ cursor: 'pointer' }} className="label">
          {name}
          <div
            className={`scenario-outcome ${(outcome === 'Passed' && 'fa fa-check-circle-o') ||
              (outcome === 'Failed' && 'fa fa-times-circle-o') ||
              (outcome === 'Errored' && 'fa fa-exclamation-triangle')}`}
          />
        </span>
      </div>
    );
  }
}

export default class ExecutionBrowser extends Component {
  state = {
    open: false
  };

  handleOpenDrawer = resultInfo => {
    this.setState({
      open: true
    });
  };

  handleOnClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    return (
      <div className="execution-browser">
        <SideDrawer title={'Scenario Result'} open={this.state.open} onClose={this.handleOnClose}>
          <Timeline />
        </SideDrawer>
        <div className="graph-container">
          <RunItem showResultDetails={this.handleOpenDrawer} />
        </div>
      </div>
    );
  }
}
