import React, { Component } from 'react';
import { Container } from '../helpers/styled-components';
import Filter from '../components/Filter';

import LineGraph from '../components/LineGraph';
import Card from '../components/Card';
// import Pie from '../components/Pie';
import Doghnut from '../components/Doghnut';

export default class Website extends Component {
  render() {
    const title = 'OLX';
    const {
      websiteRevenue,
      websiteViews,
      websiteAbandonedRate,
      websiteBasketRate,
      websitePurchaseRate,
      websiteLast12Months,
      totalRevenue
    } = this.props;

    let last12MonthsFinal = [];

    if (websiteLast12Months) {
      Object.entries(websiteLast12Months).forEach((month) => {
        let b = new Date(parseInt(month[0]));
        let monthLabel = `${b.getMonth() + 1}/${b.getFullYear()}`;
        last12MonthsFinal.push({
          label: monthLabel,
          value: month[1]
        });
      });
    }

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
            <Container className='row'>
              <Card
                label='Venit OLX'
                value={websiteRevenue}
                hasLogo={true}
                isOlx
              />
              <Card
                label='Procent din totalul venitului'
                value={parseInt((websiteRevenue / totalRevenue) * 100)}
                hasLogo={true}
                isPercentage
              />
              <Card
                label='Vizualizări Produse'
                value={websiteViews}
                hasLogo={false}
                isViews={true}
              />
            </Container>
            <Container className='row'>
              <Container
                className='col-md-8 col-lg-12 is-light-text mb-4'
                style={{ height: 200 }}>
                <Container className='card is-card-dark chart-card'>
                  <Container className='row full-height'>
                    <Doghnut
                      caption={'Rata de achiziție'}
                      value={websitePurchaseRate}
                      paletteColors={'3B70C4, #000000'}
                    />
                    <Doghnut
                      caption={'Rata produse în coș'}
                      value={websiteBasketRate}
                      paletteColors={'#41B6C4, #000000'}
                      className='border-left border-right'
                    />
                    <Doghnut
                      caption={'Abandon Coș'}
                      value={websiteAbandonedRate}
                      paletteColors={'#EDF8B1, #000000'}
                    />
                  </Container>
                </Container>
              </Container>
            </Container>
            <Container className='row'>
              <LineGraph data={last12MonthsFinal} />
              {/* <Pie
                data={[
                  { label: 'test', value: '2' },
                  { label: 'bla', value: 1 }
                ]}
              /> */}
            </Container>
          </div>
        </Container>
      </Container>
    );
  }
}
