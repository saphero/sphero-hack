import React, { Component, PropTypes } from 'react';
import SapheroNav from './Nav';

export default class App extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ])
  }

  render() {
    return (
      <div>
        <SapheroNav />
        {this.props.children}
      </div>
    );
  }
}
