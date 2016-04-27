import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import presetList from './presets';

export default class Presets extends Component {

  _renderPresetList() {
    return presetList.map(({ name, description }) => (
      <Col key={name} xs={6} md={4} lg={3}>
        <div className="card">
          <h3 className="card-header">{name}</h3>
          <p>{description}</p>
          <Button
            data-preset={name.toLowerCase()}
            className="shading">Run
          </Button>
        </div>
      </Col>
    ));
  }

  render() {
    return (
      <div className="content">
        <h1 className="page-header">Presets Library</h1>
        <Row className="card-container">
          {this._renderPresetList()}
        </Row>
        <Row className="row">
          <Button id="stop-btn">Clear</Button>
        </Row>
      </div>
    );
  }
}
