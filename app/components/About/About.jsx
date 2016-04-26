import React from 'react';
import contribs from './contribs';
import { Row, Col } from 'react-bootstrap';

const renderContribs = () => {
  return contribs.map(({ name, image }) => {
    return (
      <Col xs={12} sm={12} md={6} lg={4}>
        <div className="box">
          <h2>{name}</h2>
        <img src={image} className="team-img" />
        </div>
      </Col>
    );
  });
};

const About = () => (
  <div className="content">
    <Row>
      <Col xs={12} className="center-sm">
        <div className="box">
          <h2>About</h2>
        </div>
      </Col>
    </Row>
    <Row className="center-sm">
      {renderContribs()}
    </Row>
  </div>
);

export default About;
