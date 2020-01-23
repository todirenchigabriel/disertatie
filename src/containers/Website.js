import React, { Component } from 'react';
import { Container } from '../helpers/styled-components';
import Filter from '../components/Filter';

import LineGraph from '../components/LineGraph';
import Card from '../components/Card';
import Pie from '../components/Pie';

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
          <div style={{ color: 'white' }}>
            <Container
              className='row'
              style={{ paddingRight: '15px', paddingLeft: '15px' }}>
              <Card label='Venit Okazii' value={200} hasLogo={true} isOkazii />
              <Card label='Venit Okazii' value={200} hasLogo={true} isOkazii />
              <Card label='Venit Okazii' value={200} hasLogo={true} isOkazii />
            </Container>
            <Container
              className='row'
              style={{ paddingRight: '15px', paddingLeft: '15px' }}>
              <Card label='Venit Okazii' value={200} hasLogo={true} isOkazii />
              <Card label='Venit Okazii' value={200} hasLogo={true} isOkazii />
              <Card label='Venit Okazii' value={200} hasLogo={true} isOkazii />
            </Container>
            <LineGraph
              data={[
                { label: 'test', value: 2 },
                { label: 'test2', value: 21 }
              ]}
            />
            <Pie
              data={[
                { label: 'test', value: '2' },
                { label: 'bla', value: 1 }
              ]}
            />
          </div>
        </Container>
      </Container>
    );
  }
}
