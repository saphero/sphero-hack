import React, { Component } from 'react';
import { Nav, NavItem, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import navItems from './navItems.json';

export default class SapheroNav extends Component {
  _renderLinks() {
    return navItems.map(({ icon, name, url }) => {
      return (
        <LinkContainer key={ name } to={ url } >
          <NavItem>
            <Row className='middle-xs'>
              <Col xs={ 4 }>
                <img
                  alt={ name }
                  className='nav-icon'
                  src={ icon }
                />
              </Col>
              <Col xs={ 8 }>{ name }</Col>
            </Row>
          </NavItem>
        </LinkContainer>
      );
    });
  }

  render() {
    return (
      <nav id='primary-nav'>
        <Nav bsStyle='tabs'>
          <NavItem className='nav-brand'>
            <img alt='Saphero' src='static/img/brand-logo.svg' />
          </NavItem>
          { this._renderLinks() }
        </Nav>
      </nav>
    );
  }
}
