import React, { Component } from 'react';
import { Container, Nav } from './styled-components';

// fusioncharts
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import Maps from 'fusioncharts/fusioncharts.maps';
import USARegion from 'fusionmaps/maps/es/fusioncharts.usaregion';
import RomaniaMap from 'fusionmaps/maps/es/fusioncharts.romania.js';
import ReactFC from 'react-fusioncharts';
import './charts-theme';

import config from './config';
import Dropdown from 'react-dropdown';
import formatNum from './format-number';

import UserImg from '../assets/images/user-img-placeholder.jpeg';

import Map from './Map';
import BarChart from './BarChart';
import Doghnut from './Doghnut';
import Card from './Card';

ReactFC.fcRoot(FusionCharts, Charts, Maps, USARegion);

const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${config.apiKey}`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      dropdownOptions: [],
      selectedValue: null,
      amazonRevenue: null,
      ebayRevenue: null,
      etsyRevenue: null,
      totalRevenue: null,
      productViews: null,
      purchaseRate: ' ',
      checkoutRate: ' ',
      abandonedRate: ' ',
      ordersTrendStore: []
    };
  }

  getData = (arg) => {
    // google sheets data
    const arr = this.state.items;
    const arrLen = arr.length;

    // kpi's
    // amazon revenue
    let amazonRevenue = 0;
    //ebay revenue
    let ebayRevenue = 0;
    // etsy revenue
    let etsyRevenue = 0;
    // total revenue
    let totalRevenue = 0;
    // product views
    let productViews = 0;
    // purchase rate
    let purchaseRate = 0;
    // checkout rate
    let checkoutRate = 0;
    // abandoned rate
    let abandonedRate = 0;
    // order trend by brand
    let ordersTrendStore = [];
    // order trend by region
    let ordersTrendRegion = [];
    let orderesTrendnw = 0;
    let orderesTrendsw = 0;
    let orderesTrendc = 0;
    let orderesTrendne = 0;
    let orderesTrendse = 0;

    let selectedValue = null;

    for (let i = 0; i < arrLen; i++) {
      if (arg === arr[i]['month']) {
        if (arr[i]['source'] === 'AM') {
          amazonRevenue += parseInt(arr[i].revenue);
          ordersTrendStore.push({
            label: 'Amazon',
            value: arr[i].orders,
            displayValue: `${arr[i].orders} orders`
          });
        } else if (arr[i]['source'] === 'EB') {
          ebayRevenue += parseInt(arr[i].revenue);
          ordersTrendStore.push({
            label: 'Ebay',
            value: arr[i].orders,
            displayValue: `${arr[i].orders} orders`
          });
        } else if (arr[i]['source'] === 'ET') {
          etsyRevenue += parseInt(arr[i].revenue);
          ordersTrendStore.push({
            label: 'Etsy',
            value: arr[i].orders,
            displayValue: `${arr[i].orders} orders`
          });
        }
        productViews += parseInt(arr[i].product_views);
        purchaseRate += parseInt(arr[i].purchase_rate / 3);
        checkoutRate += parseInt(arr[i].checkout_rate / 3);
        abandonedRate += parseInt(arr[i].abandoned_rate / 3);
        orderesTrendnw += parseInt(arr[i].orders_nw);
        orderesTrendsw += parseInt(arr[i].orders_sw);
        orderesTrendc += parseInt(arr[i].orders_c);
        orderesTrendne += parseInt(arr[i].orders_ne);
        orderesTrendse += parseInt(arr[i].orders_se);
      }
    }

    totalRevenue = amazonRevenue + ebayRevenue + etsyRevenue;
    ordersTrendRegion.push(
      {
        id: '01',
        value: orderesTrendne
      },
      {
        id: '02',
        value: orderesTrendnw
      },
      {
        id: '03',
        value: orderesTrendse
      },
      {
        id: '04',
        value: orderesTrendsw
      },
      {
        id: '05',
        value: orderesTrendc
      }
    );

    selectedValue = arg;

    // setting state
    this.setState({
      amazonRevenue: formatNum(amazonRevenue),
      ebayRevenue: formatNum(ebayRevenue),
      etsyRevenue: formatNum(etsyRevenue),
      totalRevenue: formatNum(totalRevenue),
      productViews: formatNum(productViews),
      purchaseRate: purchaseRate,
      checkoutRate: checkoutRate,
      abandonedRate: abandonedRate,
      ordersTrendStore: ordersTrendStore,
      ordersTrendRegion: ordersTrendRegion,
      selectedValue: selectedValue
    });
  };

  updateDashboard = (event) => {
    this.getData(event.value);
    this.setState({ selectedValue: event.value });
  };

  componentDidMount() {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let batchRowValues = data.valueRanges[0].values;

        const rows = [];
        for (let i = 1; i < batchRowValues.length; i++) {
          let rowObject = {};
          for (let j = 0; j < batchRowValues[i].length; j++) {
            rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
          }
          rows.push(rowObject);
        }

        // dropdown options
        let dropdownOptions = [];

        for (let i = 0; i < rows.length; i++) {
          dropdownOptions.push(rows[i].month);
        }

        dropdownOptions = Array.from(new Set(dropdownOptions)).reverse();

        this.setState(
          {
            items: rows,
            dropdownOptions: dropdownOptions,
            selectedValue: 'Jan 2019'
          },
          () => this.getData('Jan 2019')
        );
      });
  }

  render() {
    return (
      <Container>
        {/* static navbar - top */}
        <Nav className='navbar navbar-expand-lg fixed-top is-white is-dark-text'>
          <Container className='navbar-brand h1 mb-0 text-large font-medium'>
            Online Retail Dashboard
          </Container>
          <Container className='navbar-nav ml-auto'>
            <Container className='user-detail-section'>
              <span className='pr-2'>Hi, Sean</span>
              <span className='img-container'>
                <img src={UserImg} className='rounded-circle' alt='user' />
              </span>
            </Container>
          </Container>
        </Nav>

        {/* static navbar - bottom */}
        <Nav className='navbar fixed-top nav-secondary is-dark is-light-text'>
          <Container className='text-medium'>Summary</Container>
          <Container className='navbar-nav ml-auto'>
            <Dropdown
              className='pr-2 custom-dropdown'
              options={this.state.dropdownOptions}
              onChange={this.updateDashboard}
              value={this.state.selectedValue}
              placeholder='Select an option'
            />
          </Container>
        </Nav>

        {/* content area start */}
        <Container className='container-fluid pr-5 pl-5 pt-5 pb-5'>
          {/* row 1 - revenue */}
          <Container className='row'>
            <Card
              label='Total Revenue'
              value={this.state.totalRevenue}
              hasLogo={false}
            />
            <Card
              label='Revenue from Amazon'
              value={this.state.amazonRevenue}
              className='fa-amazon'
              hasLogo={true}
            />
            <Card
              label='Revenue from Ebay'
              value={this.state.ebayRevenue}
              className='fa-ebay'
              hasLogo={true}
            />
            <Card
              label='Revenue from Etsy'
              value={this.state.etsyRevenue}
              className='fa-etsy'
              hasLogo={true}
            />
          </Container>

          {/* row 2 - conversion */}
          <Container className='row'>
            <Card
              label='Product Views'
              value={this.state.productViews}
              hasLogo={false}
              isViews={true}
            />

            <Container className='col-md-8 col-lg-9 is-light-text mb-4'>
              <Container className='card is-card-dark chart-card'>
                <Container className='row full-height'>
                  <Doghnut
                    caption={'Purchase Rate'}
                    value={this.state.purchaseRate}
                    paletteColors={'3B70C4, #000000'}
                  />
                  <Doghnut
                    caption={'Checkout Rate'}
                    value={this.state.checkoutRate}
                    paletteColors={'#41B6C4, #000000'}
                    className='border-left border-right'
                  />
                  <Doghnut
                    caption={'Abandoned Cart Rate'}
                    value={this.state.abandonedRate}
                    paletteColors={'#EDF8B1, #000000'}
                  />
                </Container>
              </Container>
            </Container>
          </Container>

          {/* row 3 - orders trend */}
          <Container className='row' style={{ minHeight: '400px' }}>
            <Container className='col-md-6 mb-4'>
              <Container className='card is-card-dark chart-card'>
                <BarChart ordersTrendStore={this.state.ordersTrendStore} />
              </Container>
            </Container>
            <Map ordersTrendRegion={this.state.ordersTrendRegion} />
          </Container>
        </Container>
        {/* content area end */}
      </Container>
    );
  }
}

export default App;
