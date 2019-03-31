import React, { Component } from 'react';

import './side_drawer.scss';
import 'font-awesome/css/font-awesome.min.css';

import Backdrop from '../Backdrop/Backdrop';

export default class SideDrawer extends Component {
  state = {
    open: false
  };

  handleClose = () => {
    this.setState({
      open: false
    });

    this.props.onClose();
  };

  componentDidUpdate(prevProps) {
    if (prevProps.open !== this.props.open) {
      this.setState({
        open: this.props.open
      });
    }
  }

  render() {
    const { open } = this.state;
    const { title } = this.props;

    return (
      <div>
        <Backdrop show={open} onClick={this.handleClose} />
        <aside className={`side-drawer ${open ? 'open' : ''}`}>
          <h1 className="side-drawer-header">
            {title}
            <a className="close-btn" onClick={this.handleClose}>
              x
            </a>
          </h1>
          <div className="side-drawer-content">{this.props.children}</div>
        </aside>
      </div>
    );
  }
}
