import React, { Component } from 'react';

import './timeline.scss';

export default class Timeline extends Component {
  render() {
    return (
      <ul className="timeline">
        <li className="timeline-event success">
          <div className="timeline-event-header">Lorem ipsum dolor ammet!</div>
          <p>Some content</p>
        </li>
        <li className="timeline-event warning">
          <div className="timeline-event-header">Lorem ipsum dolor ammet!</div>
          <p>Some content</p>
        </li>
        <li className="timeline-event error">
          <div className="timeline-event-header">Lorem ipsum dolor ammet!</div>
          <p>Some content</p>
        </li>
        <li className="timeline-event failed">
          <div className="timeline-event-header">Lorem ipsum dolor ammet!</div>
          <p>Some content</p>
        </li>
        <li className="timeline-event">
          <div className="timeline-event-header">Lorem ipsum dolor ammet!</div>
          <p>Some content</p>
        </li>
      </ul>
    );
  }
}
