import React, { Component } from 'react';
import { Container } from '../helpers/styled-components';
import LineGraph from '../components/LineGraph';
import BarChart3D from '../components/BarChart3D';
import RatingMeter from '../components/RatingMeter';
import regions from '../helpers/region-shortcuts';

import Filter from '../components/Filter';

export default class Region extends Component {
  render() {
    const {
      publi24Orders,
      olxOrders,
      laJumateOrders,
      okaziiOrders,
      last12monthsData,
      selectedRegion
    } = this.props;

    let last12MonthsFinal = [];
    let ordersByWebsite = [];

    if (last12monthsData && ordersByWebsite) {
      Object.entries(last12monthsData).forEach((month) => {
        let b = new Date(parseInt(month[0]));
        let monthLabel = `${b.getMonth() + 1}/${b.getFullYear()}`;
        last12MonthsFinal.push({
          label: monthLabel,
          value: month[1]
        });
      });

      ordersByWebsite.push({
        label: 'OLX',
        value: olxOrders
      });
      ordersByWebsite.push({
        label: 'Okazii',
        value: okaziiOrders
      });
      ordersByWebsite.push({
        label: 'LaJumate',
        value: laJumateOrders
      });
      ordersByWebsite.push({
        label: 'Publi24',
        value: publi24Orders
      });
    }

    return (
      <Container>
        <Filter
          dropdownOptions={''}
          updateDashboard={''}
          selectedValue={''}
          title={`Situație vânzări pentru județul ${regions[selectedRegion]}`}
        />
        <Container className='container-fluid pr-5 pl-5 pt-5 pb-5'>
          <div style={{ color: 'white' }}>
            <div style={{ display: 'flex' }}>
              <RatingMeter />
              <BarChart3D data={ordersByWebsite} />
            </div>
            <LineGraph data={last12MonthsFinal} />
          </div>
        </Container>
      </Container>
    );
  }
}
