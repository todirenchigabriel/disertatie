import React, { Component } from 'react';
import { Container } from '../helpers/styled-components';
import Filter from '../components/Filter';

export default class Website extends Component {
  render() {
    const title = 'OLX';
    return (
      <Container>
        <Filter
          dropdownOptions={''}
          updateDashboard={''}
          selectedValue={''}
          title={`Situație vânzări pentru ${title}`}
        />
        <Container className='container-fluid pr-5 pl-5 pt-5 pb-5'>
          <div style={{ color: 'white' }}>OLX</div>
        </Container>
      </Container>
    );
  }
}
