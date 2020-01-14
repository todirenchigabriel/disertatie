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

// const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${config.apiKey}`;
const url = `https://sheets.googleapis.com/v4/spreadsheets/1VzWaoRbjMH20v0SUjFkmPZGvcvBDrPhu76A3O78aB8A/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${config.apiKey}`;

const getMapObject = (id, value) => {
  return {
    id,
    value
  };
};

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
    // google sheets data
    const arr = this.state.items;
    const arrLen = arr.length;

    // kpi's
    // amazon revenue
    let okaziiRevenue = 0;
    // new rev
    let laJumateRevenue = 0;
    //ebay revenue
    let OLXRevenue = 0;
    // etsy revenue
    let publi24Revenue = 0;
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
    let selectedValue = null;
    let orders_AB = 0;
    let orders_AR = 0;
    let orders_AG = 0;
    let orders_BC = 0;
    let orders_BH = 0;
    let orders_BN = 0;
    let orders_BT = 0;
    let orders_BR = 0;
    let orders_BV = 0;
    let orders_BI = 0;
    let orders_BZ = 0;
    let orders_CS = 0;
    let orders_CJ = 0;
    let orders_CT = 0;
    let orders_CV = 0;
    let orders_DB = 0;
    let orders_DJ = 0;
    let orders_GL = 0;
    let orders_GJ = 0;
    let orders_HR = 0;
    let orders_HD = 0;
    let orders_IL = 0;
    let orders_IS = 0;
    let orders_MM = 0;
    let orders_MH = 0;
    let orders_MS = 0;
    let orders_NT = 0;
    let orders_OT = 0;
    let orders_PH = 0;
    let orders_SJ = 0;
    let orders_SM = 0;
    let orders_SB = 0;
    let orders_SV = 0;
    let orders_TR = 0;
    let orders_TM = 0;
    let orders_TL = 0;
    let orders_VS = 0;
    let orders_VL = 0;
    let orders_VN = 0;
    let orders_CL = 0;
    let orders_GR = 0;
    let orders_IF = 0;
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

        orders_AB += parseInt(arr[i].orders_AB);
        orders_AR += parseInt(arr[i].orders_AR);
        orders_AG += parseInt(arr[i].orders_AG);
        orders_BC += parseInt(arr[i].orders_BC);
        orders_BH += parseInt(arr[i].orders_BH);
        orders_BN += parseInt(arr[i].orders_BN);
        orders_BT += parseInt(arr[i].orders_BT);
        orders_BR += parseInt(arr[i].orders_BR);
        orders_BV += parseInt(arr[i].orders_BV);
        orders_BI += parseInt(arr[i].orders_BI);
        orders_BZ += parseInt(arr[i].orders_BZ);
        orders_CS += parseInt(arr[i].orders_CS);
        orders_CJ += parseInt(arr[i].orders_CJ);
        orders_CT += parseInt(arr[i].orders_CT);
        orders_CV += parseInt(arr[i].orders_CV);
        orders_DB += parseInt(arr[i].orders_DB);
        orders_DJ += parseInt(arr[i].orders_DJ);
        orders_GL += parseInt(arr[i].orders_GL);
        orders_GJ += parseInt(arr[i].orders_GJ);
        orders_HR += parseInt(arr[i].orders_HR);
        orders_HD += parseInt(arr[i].orders_HD);
        orders_IL += parseInt(arr[i].orders_IL);
        orders_IS += parseInt(arr[i].orders_IS);
        orders_MM += parseInt(arr[i].orders_MM);
        orders_MH += parseInt(arr[i].orders_MH);
        orders_MS += parseInt(arr[i].orders_MS);
        orders_NT += parseInt(arr[i].orders_NT);
        orders_OT += parseInt(arr[i].orders_OT);
        orders_PH += parseInt(arr[i].orders_PH);
        orders_SJ += parseInt(arr[i].orders_SJ);
        orders_SM += parseInt(arr[i].orders_SM);
        orders_SB += parseInt(arr[i].orders_SB);
        orders_SV += parseInt(arr[i].orders_SV);
        orders_TR += parseInt(arr[i].orders_TR);
        orders_TM += parseInt(arr[i].orders_TM);
        orders_TL += parseInt(arr[i].orders_TL);
        orders_VS += parseInt(arr[i].orders_VS);
        orders_VL += parseInt(arr[i].orders_VL);
        orders_VN += parseInt(arr[i].orders_VN);
        orders_CL += parseInt(arr[i].orders_CL);
        orders_GR += parseInt(arr[i].orders_GR);
        orders_IF += parseInt(arr[i].orders_IF);
      }
    }

    totalRevenue =
      okaziiRevenue + OLXRevenue + publi24Revenue + laJumateRevenue;

    ordersTrendRegion.push({
      id: '01',
      value: orders_AB
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

        // dropdown options
        let dropdownOptions = [];
        // debugger
        for (let i = 0; i < rows.length; i++) {
          dropdownOptions.push(rows[i].month);
        }

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
