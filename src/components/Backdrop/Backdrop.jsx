import React, { Component } from 'react';

import './backdrop.scss';

export default class Backdrop extends Component {
  state = {
    show: false
  };

  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick();
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.show !== this.props.show) {
      this.setState({
        show: this.props.show
      });
    }
  }

  render() {
    return (
      <div className={`backdrop ${this.state.show ? 'show' : ''}`} onClick={this.handleClick} />
    );
  }
}
