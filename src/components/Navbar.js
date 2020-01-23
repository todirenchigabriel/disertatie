import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav } from '../helpers/styled-components';

export default class Navbar extends Component {
  render() {
    const { username } = this.props;
    return (
      <Nav className='navbar navbar-expand-lg fixed-top is-white is-dark-text'>
        <Container className='navbar-brand h1 mb-0 text-large font-medium'>
          <Link to='/'>Sumar vânzări</Link>
        </Container>
        <Container className='navbar-brand h1 mb-0 text-large font-medium'>
          <div className="navbar-ecomm-links">
            <Link to='/website'>OLX</Link>
            <Link to='/website'>LaJumate</Link>
            <Link to='/website'>Publi24</Link>
            <Link to='/website'>Okazii</Link>
          </div>
        </Container>
        <Container className='navbar-nav ml-auto'>
          <Container className='user-detail-section'>
            <span className='pr-2'>Salut, {username}!</span>
            <span className='img-container'>
              <img
                src={'https://cdn.onlinewebfonts.com/svg/img_81837.png'}
                className='rounded-circle'
                alt='user'
              />
            </span>
          </Container>
        </Container>
      </Nav>
    );
  }
}
