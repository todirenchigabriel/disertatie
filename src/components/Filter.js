import React, { Component } from 'react';
import { Container, Nav } from '../helpers/styled-components';
import Dropdown from 'react-dropdown';

export default class Filter extends Component {
  render() {
    const { dropdownOptions, updateDashboard, selectedValue } = this.props;
    return (
      <Nav className='navbar fixed-top nav-secondary is-dark is-light-text'>
        <Container className='text-medium'>Sumar comenzi</Container>
        <Container className='navbar-nav ml-auto'>
          <Dropdown
            className='pr-2 custom-dropdown'
            options={dropdownOptions}
            onChange={updateDashboard}
            value={selectedValue}
            placeholder='Select an option'
          />
        </Container>
      </Nav>
    );
  }
}
