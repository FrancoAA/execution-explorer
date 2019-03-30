import React, { Component } from 'react';

import './execution_browser.scss';
import 'font-awesome/css/font-awesome.min.css';

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
    const { name, runId, children, ...attrs } = this.props;

    return (
      <div {...attrs}>
        <span className="label rounded">
          <span className="fa fa-server" />
        </span>
        <div className="branch rounded">
          {this.state.assets.length &&
            this.state.assets.map((asset, key) => <AssetItem key={key} {...asset} />)}
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
    const { id, name, runId, os, status, children, ...attrs } = this.props;

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
              <ResultItem key={key} {...result} />
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
    this.setState(prev => ({
      show: !prev.show
    }));
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
        {this.state.show && (
          <div className="branch">
            <PhasesContainer name={name} outcome={outcome} />
          </div>
        )}
      </div>
    );
  }
}

class PhasesContainer extends Component {
  state = {
    hasMore: true,
    phases: []
  };

  getPhases(count) {
    const phases = [];
    for (let i = 0; i < count; i++) {
      phases.push({
        name: `Phase ${i}`,
        desc: 'Lorem ipsum dolor amet',
        outcome: randomChoice(['Passed', 'Failed', 'Errored'])
      });
    }
    return phases;
  }

  seeMoreHandler = () => {
    this.setState(prev => ({
      hasMore: false,
      phases: [...prev.phases, this.getPhases(randomInt(5))]
    }));
  };

  componentDidMount() {
    this.setState({
      phases: this.getPhases(10)
    });
  }

  render() {
    const { id, name, runId, outcome, ...attrs } = this.props;

    return (
      <div className="entry sole phases-container" {...attrs}>
        {/* <span className="label">{name}</span> */}
        {this.state.phases.length > 0 && (
          <div className="">
            <ul className="phase-list">
              {this.state.phases.map((phaseInfo, key) => (
                <PhaseItem key={key} {...phaseInfo} />
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

class PhaseItem extends Component {
  state = {
    phases: []
  };

  render() {
    const { name, outcome, children, ...attrs } = this.props;

    return (
      <li className="phase-item" {...attrs}>
        <span className="">{name}</span>
      </li>
    );
  }
}

const Item = props => {
  const { children, sole, label, isRoot, isRounded, nodeType, onlyChildren, ...attrs } = props;

  const childWithProp = React.Children.map(children, child =>
    React.cloneElement(child, { sole: React.Children.count(children) === 1 })
  );

  const ItemRoot = (
    <div {...attrs}>
      <span className={`label ${isRounded ? 'rounded' : ''}`}>
        <span className="fa fa-server" style={{ fontSize: '24px', marginLeft: '0' }} />
      </span>
      {children && <div className={`branch ${isRounded ? 'rounded' : ''}`}>{childWithProp}</div>}
    </div>
  );

  const ItemWithChildrens = (
    <div className={`entry ${sole ? 'sole' : ''}`} {...attrs}>
      <span className={`label ${isRounded ? 'rounded' : ''}`}>{label}</span>
      {children && <div className={`branch ${isRounded ? 'rounded' : ''}`}>{childWithProp}</div>}
    </div>
  );

  return isRoot ? ItemRoot : ItemWithChildrens;
};

export default class ExecutionBrowser extends Component {
  addChildren = () => {};

  render() {
    return (
      <div className="execution-browser">
        <div className="graph-container">
          <RunItem />
          {/* <Item isRoot={true} isRounded={true} label="Root Item">
            <Item label="Entry-1" isRounded={true}>
              <Item label="Entry-1-1" isRounded={true}>
                <Item label="Entry-1-1-1" isRounded={true} />
              </Item>
              <Item label="Entry-1-2" isRounded={true}>
                <Item label="Entry-1-2-1" isRounded={true} />
              </Item>
              <Item label="Entry-1-3" isRounded={true} />
            </Item>
            <Item label="Entry-2" isRounded={true} />
          </Item> */}
        </div>
      </div>
    );
  }
}
