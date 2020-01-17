import React, { Component } from 'react';
import { Container, Nav } from '../helpers/styled-components';
import UserImg from '../assets/images/user-img-placeholder.jpeg';

export default class Navbar extends Component {
  render() {
    const {username} = this.props;
    return (
      <Nav className='navbar navbar-expand-lg fixed-top is-white is-dark-text'>
        <Container className='navbar-brand h1 mb-0 text-large font-medium'>
          Dashboard Vânzări Online
        </Container>
        <Container className='navbar-nav ml-auto'>
          <Container className='user-detail-section'>
            <span className='pr-2'>Salut, {username}!</span>
            <span className='img-container'>
              <img src={UserImg} className='rounded-circle' alt='user' />
            </span>
          </Container>
        </Container>
      </Nav>
    );
  }
}
