import React, { Component, PropTypes } from 'react';
import { Row, Col, Button } from 'react-bootstrap';

export default class Connect extends Component {

  static PropTypes = {
    isConnected: PropTypes.bool
  }

  render() {
    return (
      <div className="content">
        <h1 className="page-header">Is this the droid you're looking for?</h1>
        <Row className="bottom-xs">
          <Col sm={6} md={4} mdOffset={2} className="connect-panel">
            <img src="static/img/bb8.svg" />
          <Button id="connect-btn-bb8" className="shading">BB-8/Ollie</Button>
          </Col>
          <Col sm={6} md={4} className="connect-panel">
            <img src="static/img/bb8.svg" />
          <Button id="connect-btn-sprk" className="shading">BB-8/Ollie</Button>
          </Col>
        </Row>
        <Row>
          <Col sm={6} md={4} mdOffset={2}>
            <ul className="connect-req">
              <li>Supported models: BB-8 by Sphero or Ollie</li>
              <li>
                System requirement: OS X with Bluetooth Low Energy (BLE 4.0)
              </li>
              <li>Make sure your Bluetooth is on and BB-8 is nearby</li>
            </ul>
          </Col>
          <Col sm={6} md={4}>
            <ul className="connect-req">
            <li>Supported models: Sphero 1.0/2.0 or SPRK</li>
            <li>
              System requirement: OS X with Bluetooth Classic
              (Bluetooth&nbsp;2.0/3.0) support
            </li>
            <li>Make sure Sphero/SPRK is paired via Bluetooth</li>
            </ul>
          </Col>
        </Row>
      </div>
    );
  }
}
