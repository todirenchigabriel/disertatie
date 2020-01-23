import React, { Component } from 'react';
import LineGraph from '../components/LineGraph';
import BarChart3D from '../components/BarChart3D';
import Pie from '../components/Pie';
import Filter from '../components/Filter';
import { Container } from '../helpers/styled-components';
import regions from '../helpers/region-shortcuts';


export default class Region extends Component {
  render() {
    const {
      publi24Orders,
      olxOrders,
      laJumateOrders,
      okaziiOrders,
      last12monthsData,
      selectedRegion,
      totalNumberOfOrders
    } = this.props;

    // data holding variables
    let last12MonthsFinal = [];
    let ordersByWebsite = [];
    let regionOrdersPercentage = [];

    // regionOrdersPercentage calculation
    const totalOrdersPerRegion =
      publi24Orders + olxOrders + laJumateOrders + okaziiOrders;
    let regionSalesPercentage = (
      (totalOrdersPerRegion / totalNumberOfOrders) *
      100
    ).toFixed(2);
    let otherSalesPercentage = 100 - parseFloat(regionSalesPercentage);
    regionOrdersPercentage.push({
      label: regions[selectedRegion],
      value: regionSalesPercentage
    });
    regionOrdersPercentage.push({
      label: 'Altele',
      value: otherSalesPercentage
    });


    // last12MonthsFinal & ordersByWebsite calculation
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
          dropdownOptions=''
          updateDashboard=''
          selectedValue=''
          title={`Situație vânzări pentru județul ${regions[selectedRegion]}`}
        />
        <Container className='container-fluid pr-5 pl-5 pt-5 pb-5'>
          <div style={{ color: 'white' }}>
            <div style={{ display: 'flex' }}>
              <Pie data={regionOrdersPercentage} />
              <BarChart3D data={ordersByWebsite} />
            </div>
            <LineGraph data={last12MonthsFinal} />
          </div>
        </Container>
      </Container>
    );
  }
}
