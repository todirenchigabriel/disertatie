import React, { Component } from 'react';
import { Container, Nav } from '../helpers/styled-components';

// fusioncharts
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import Maps from 'fusioncharts/fusioncharts.maps';
import RomaniaMap from 'fusionmaps/maps/es/fusioncharts.romania.js';
import ReactFC from 'react-fusioncharts';
import '../helpers/charts-theme';

// helpers
import config from '../config';
import formatNum from '../helpers/format-number';

// components
import Navbar from './Navbar';
import Control from './Control';
import Map from './Map';
import BarChart from './BarChart';
import Doghnut from './Doghnut';
import Card from './Card';

ReactFC.fcRoot(FusionCharts, Charts, Maps, RomaniaMap);

const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${config.apiKey}`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      dropdownOptions: [],
      selectedValue: null,
      okaziiRevenue: null,
      OLXRevenue: null,
      laJumateRevenue: null,
      publi24Revenue: null,
      totalRevenue: null,
      productViews: null,
      purchaseRate: ' ',
      checkoutRate: ' ',
      abandonedRate: ' ',
      ordersTrendStore: []
    };
  }

  getData = (arg) => {
    const arr = this.state.items;
    const arrLen = arr.length;
    let okaziiRevenue = 0;
    let laJumateRevenue = 0;
    let OLXRevenue = 0;
    let publi24Revenue = 0;
    let totalRevenue = 0;
    let productViews = 0;
    let purchaseRate = 0;
    let checkoutRate = 0;
    let abandonedRate = 0;
    let ordersTrendStore = [];
    let ordersTrendRegion = [];
    let selectedValue = null;

    const dataForMap = {
      orders_AB: 0,
      orders_AR: 0,
      orders_AG: 0,
      orders_BC: 0,
      orders_BH: 0,
      orders_BN: 0,
      orders_BT: 0,
      orders_BR: 0,
      orders_BV: 0,
      orders_BI: 0,
      orders_BZ: 0,
      orders_CS: 0,
      orders_CJ: 0,
      orders_CT: 0,
      orders_CV: 0,
      orders_DB: 0,
      orders_DJ: 0,
      orders_GL: 0,
      orders_GJ: 0,
      orders_HR: 0,
      orders_HD: 0,
      orders_IL: 0,
      orders_IS: 0,
      orders_MM: 0,
      orders_MH: 0,
      orders_MS: 0,
      orders_NT: 0,
      orders_OT: 0,
      orders_PH: 0,
      orders_SJ: 0,
      orders_SM: 0,
      orders_SB: 0,
      orders_SV: 0,
      orders_TR: 0,
      orders_TM: 0,
      orders_TL: 0,
      orders_VS: 0,
      orders_VL: 0,
      orders_VN: 0,
      orders_CL: 0,
      orders_GR: 0,
      orders_IF: 0
    };

    for (let i = 0; i < arrLen; i++) {
      if (arg === arr[i]['month']) {
        if (arr[i]['source'] === 'Okazii') {
          okaziiRevenue += parseInt(arr[i].revenue);
          ordersTrendStore.push({
            label: 'Okazii',
            value: arr[i].orders,
            displayValue: `${arr[i].orders} orders`
          });
        } else if (arr[i]['source'] === 'OLX') {
          OLXRevenue += parseInt(arr[i].revenue);
          ordersTrendStore.push({
            label: 'OLX',
            value: arr[i].orders,
            displayValue: `${arr[i].orders} orders`
          });
        } else if (arr[i]['source'] === 'Publi24') {
          publi24Revenue += parseInt(arr[i].revenue);
          ordersTrendStore.push({
            label: 'Publi24',
            value: arr[i].orders,
            displayValue: `${arr[i].orders} orders`
          });
        } else if (arr[i]['source'] === 'LaJumate') {
          laJumateRevenue += parseInt(arr[i].revenue);
          ordersTrendStore.push({
            label: 'LaJumate',
            value: arr[i].orders,
            displayValue: `${arr[i].orders} orders`
          });
        }
        productViews += parseInt(arr[i].product_views);
        purchaseRate += parseInt(arr[i].purchase_rate / 4);
        checkoutRate += parseInt(arr[i].checkout_rate / 4);
        abandonedRate += parseInt(arr[i].abandoned_rate / 4);

        // assign data for the map graph
        for (const property in dataForMap) {
          dataForMap[property] =
            dataForMap[property] + parseInt(arr[i][property]);
        }
      }
    }

    totalRevenue =
      okaziiRevenue + OLXRevenue + publi24Revenue + laJumateRevenue;

    // actually set the data for map
    Object.entries(dataForMap).forEach((region, idx) => {
      ordersTrendRegion.push({
        id: idx >= 9 ? `${idx + 1}` : `0${idx + 1}`,
        value: region[1]
      });
    });

    selectedValue = arg;

    // setting state
    this.setState({
      okaziiRevenue: formatNum(okaziiRevenue),
      OLXRevenue: formatNum(OLXRevenue),
      publi24Revenue: formatNum(publi24Revenue),
      laJumateRevenue: formatNum(laJumateRevenue),
      totalRevenue: formatNum(totalRevenue),
      productViews: formatNum(productViews),
      purchaseRate,
      checkoutRate,
      abandonedRate,
      ordersTrendStore,
      ordersTrendRegion,
      selectedValue
    });
  };

  updateDashboard = (event) => {
    this.getData(event.value);
    this.setState({ selectedValue: event.value });
  };

  // this is fine
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

        let dropdownOptions = [];

        rows.forEach((row) => dropdownOptions.push(row.month));
        // make dropdown options unique
        dropdownOptions = Array.from(new Set(dropdownOptions)).reverse();

        this.setState(
          {
            items: rows,
            dropdownOptions: dropdownOptions,
            selectedValue: dropdownOptions[0]
          },
          () => this.getData(dropdownOptions[0])
        );
      });
  }

  render() {
    return (
      <Container>
        {/* static navbar - top */}
        <Navbar username='Gabriel' />

        {/* static navbar - bottom */}
        <Control
          dropdownOptions={this.state.dropdownOptions}
          updateDashboard={this.updateDashboard}
          selectedValue={this.state.selectedValue}
        />

        <Container className='container-fluid pr-5 pl-5 pt-5 pb-5'>
          {/* row 1 - revenue */}
          <Container className='row'>
            <Card
              label='Venit Okazii'
              value={this.state.okaziiRevenue}
              className='fa-amazon'
              hasLogo={true}
            />
            <Card
              label='Venit OLX'
              value={this.state.OLXRevenue}
              className='fa-ebay'
              hasLogo={true}
            />
            <Card
              label='Venit Publi24'
              value={this.state.publi24Revenue}
              className='fa-etsy'
              hasLogo={true}
            />
            <Card
              label='Venit LaJumate'
              value={this.state.laJumateRevenue}
              className='fa-etsy'
              hasLogo={true}
            />
            <Card
              label='Venit Total'
              value={this.state.totalRevenue}
              hasLogo={false}
            />
          </Container>

          {/* row 2 - conversion */}
          <Container className='row'>
            <Card
              label='Vizualizări prodse'
              value={this.state.productViews}
              hasLogo={false}
              isViews={true}
            />
            <Container className='col-md-8 col-lg-9 is-light-text mb-4'>
              <Container className='card is-card-dark chart-card'>
                <Container className='row full-height'>
                  <Doghnut
                    caption={'Rata de achiziție'}
                    value={this.state.purchaseRate}
                    paletteColors={'3B70C4, #000000'}
                  />
                  <Doghnut
                    caption={'Rata produse în coș'}
                    value={this.state.checkoutRate}
                    paletteColors={'#41B6C4, #000000'}
                    className='border-left border-right'
                  />
                  <Doghnut
                    caption={'Abandon Coș'}
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
