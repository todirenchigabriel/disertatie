import React, { Component } from 'react';
import { Container, Nav } from '../helpers/styled-components';
import Dropdown from 'react-dropdown';
import TimeSelector from './TimeSelector';

export default class Filter extends Component {
  render() {
    const {
      dropdownOptions,
      updateDashboard,
      selectedValue,
      hasLogic,
      title
    } = this.props;

    return (
      <Nav className='navbar fixed-top nav-secondary is-dark is-light-text'>
        <Container className='text-medium'>
          {title}
          {/* {hasLogic && <TimeSelector />} */}
        </Container>
        <Container className='navbar-nav ml-auto'>
          {hasLogic && (
            <Dropdown
              className='pr-2 custom-dropdown'
              options={dropdownOptions}
              onChange={updateDashboard}
              value={selectedValue}
              placeholder='Select an option'
            />
          )}
        </Container>
      </Nav>
    );
  }
}
