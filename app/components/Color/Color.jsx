import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { presetColors, defaultColor } from './presets';

export default class Color extends Component {

  _isLight(hexColor) {
    const [red, green, blue] =
      (/^#([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i).exec(hexColor)
        .slice(1, 4)
        .map((hex) => parseInt(hex, 16));
    const luminance = 0.299 * red + 0.587 * green + 0.114 * blue;
    return luminance > 129;
  }

  _renderColorSquares() {
    const { _isLight } = this;
    return (
      <Row id="color_squares">
        {presetColors.map(({ colorName, colorCode }) => (
          <Col
            key={colorName}
            xs={3}
            sm={2}
            md={3}
            className={'palette' + (_isLight(colorCode) ? ' dark-text' : '')}
            style={{
              backgroundColor: colorCode
            }}>{colorName}
          </Col>
        ))}
      </Row>
    );
  }

  render() {
    return (
      <div className="content">
        <h1 className="page-header">Color Picker</h1>
        <Row>
          <Col md={6} lg={8}>
            <h4>Preset colors</h4>
            {this._renderColorSquares()}
          </Col>
          <Col md={6} lg={4}>
            <h4>Custom color</h4>
            <div id="hsv_map">
              <canvas id="surface" width="300" height="300" />
              <div className="cover" />
              <div className="hsv-cursor" />
              <div className="bag-bg" />
              <div className="bar-white" />
              <canvas id="luminanceBar" width="25" height="300" />
              <div id="hsv_cursors" className="hsv-barcursors">
                <div className="hsv-barcursor-l" />
                <div className="hsv-barcursor-r" />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
