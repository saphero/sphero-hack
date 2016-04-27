import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';

export default class Move extends Component {

  render() {
    return (
      <div className="content">
        <h1 className="page-header">Motion Control</h1>
        <Row className="center-sm">
          <Col xs={12} sm={12} md={6} lg={5}>
            <div className="box">
              <h4>Accelerometer</h4>
              <div id="accel-graph" />
            </div>
          </Col>
          <Col xs={12} s={12} md={6} lg={7}>
            <div className="box">
              <h4>Speedometer</h4>
              <div id="speed-graph" />
            </div>
          </Col>
        </Row>
        <Row className="ctrl-wrapper">
          <Col xs={12} sm={6}>
            <h4>Direction</h4>
            <Row className="center-xs">
              <Button id="up-btn" className="ctrl-btn">
                <img src="static/img/arrow-down.svg" alt="up" />
              </Button>
            </Row>
            <Row className="center-xs">
              <Button id="left-btn" className="ctrl-btn">
                <img src="static/img/arrow-down.svg" alt="left" />
              </Button>
              <Button id="down-btn" className="ctrl-btn">
                <img src="static/img/arrow-down.svg" alt="down" />
              </Button>
              <Button id="right-btn" className="ctrl-btn">
                <img src="static/img/arrow-down.svg" alt="right" />
              </Button>
            </Row>
          </Col>
          <Col xs={12} sm={6}>
            <h4>Speed</h4>
            <Row className="center-xs">
              <Button id="slow-btn" className="ctrl-btn">O</Button>
              <Button id="fast-btn" className="ctrl-btn">P</Button>
            </Row>
            <Row className="center-xs">
              <div className="speed-indicator">-</div>
              <div className="speed-indicator">+</div>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }

}
