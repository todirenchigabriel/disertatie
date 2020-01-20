import React, { Component } from 'react';
import { Container, Nav } from '../helpers/styled-components';

// components
import Filter from '../components/Filter';
import Map from '../components/Map';
import BarChart from '../components/BarChart';
import Doghnut from '../components/Doghnut';
import Card from '../components/Card';

export default class Summary extends Component {
  render() {
    const {
      dropdownOptions,
      selectedValue,
      okaziiRevenue,
      OLXRevenue,
      publi24Revenue,
      laJumateRevenue,
      totalRevenue,
      productViews,
      purchaseRate,
      checkoutRate,
      abandonedRate,
      ordersTrendStore,
      ordersTrendRegion,
      updateDashboard,
      changeRegion
    } = this.props;
    return (
      <Container>
        <Filter
          dropdownOptions={dropdownOptions}
          updateDashboard={updateDashboard}
          selectedValue={selectedValue}
          hasLogic
          title='Sumar comenzi'
        />
        <Container className='container-fluid pr-5 pl-5 pt-5 pb-5'>
          <Container className='row'>
            <Card
              label='Venit Okazii'
              value={okaziiRevenue}
              hasLogo={true}
              isOkazii
            />
            <Card label='Venit OLX' value={OLXRevenue} hasLogo={true} isOlx />
            <Card
              label='Venit Publi24'
              value={publi24Revenue}
              hasLogo={true}
              isPubli
            />
            <Card
              label='Venit LaJumate'
              value={laJumateRevenue}
              hasLogo={true}
              isLajum
            />
            <Card label='Venit Total' value={totalRevenue} hasLogo={false} />
            <Card
              label='Vizualizări prodse'
              value={productViews}
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
                    value={purchaseRate}
                    paletteColors={'3B70C4, #000000'}
                  />
                  <Doghnut
                    caption={'Rata produse în coș'}
                    value={checkoutRate}
                    paletteColors={'#41B6C4, #000000'}
                    className='border-left border-right'
                  />
                  <Doghnut
                    caption={'Abandon Coș'}
                    value={abandonedRate}
                    paletteColors={'#EDF8B1, #000000'}
                  />
                </Container>
              </Container>
            </Container>
          </Container>

          <Container className='row' style={{ height: '400px' }}>
            <BarChart ordersTrendStore={ordersTrendStore} />
          </Container>
          <Container className='row' style={{ height: '800px' }}>
            <Map
              ordersTrendRegion={ordersTrendRegion}
              changeRegion={changeRegion}
            />
          </Container>
        </Container>
      </Container>
    );
  }
}
