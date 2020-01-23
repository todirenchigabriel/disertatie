import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

// fusioncharts
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import Maps from 'fusioncharts/fusioncharts.maps';
import RomaniaMap from 'fusionmaps/maps/es/fusioncharts.romania.js';
import ReactFC from 'react-fusioncharts';
import './helpers/charts-theme';

// helpers
import config from './config';
import formatNum from './helpers/format-number';

import Navbar from './components/Navbar';
import Summary from './containers/Summary';
import Region from './containers/Region';
import Website from './containers/Website';

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
      // ordersTrendRegion should not receive an object with id: 24
      let id =
        idx >= 23 ? `${idx + 2}` : idx < 9 ? `0${idx + 1}` : `${idx + 1}`;

      ordersTrendRegion.push({
        id,
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

  changeRegion = (region) => {
    const selectedRegion = `orders_${region}`;
    const arr = this.state.items;

    let publi24Orders = 0;
    let olxOrders = 0;
    let laJumateOrders = 0;
    let okaziiOrders = 0;
    let totalNumberOfOrders = 0;
    let last12monthsData = {};

    // transform all the strings in dropdownOption into dates
    // sort them from the most recent to the oldest
    // take the first 12 that are most recent
    let last12months = this.state.dropdownOptions
      .map((date) => new Date(date).getTime())
      .sort((a, b) => b - a)
      .slice(0, 12);

    // put the month's keys into the object that will hold data
    last12months.forEach((month) => {
      last12monthsData[month] = 0;
    });

    // iterate the state array that holds all the data
    arr.forEach((arr) => {
      totalNumberOfOrders += parseInt(arr.orders);
      // get data for region sales by store
      if (arr.source === 'Publi24')
        publi24Orders += parseInt(arr[selectedRegion]);
      if (arr.source === 'OLX') olxOrders += parseInt(arr[selectedRegion]);
      if (arr.source === 'Okazii')
        okaziiOrders += parseInt(arr[selectedRegion]);
      if (arr.source === 'LaJumate')
        laJumateOrders += parseInt(arr[selectedRegion]);

      // looks for the current month in the current iteration
      // check if the that month is in the last 12 months
      // add the corresponding data for the region to the final data object
      let currentMonthInIteration = new Date(arr.month);
      last12months.forEach((month) => {
        if (month === currentMonthInIteration.getTime()) {
          last12monthsData[currentMonthInIteration.getTime()] += parseInt(
            arr[selectedRegion]
          );
        }
      });
    });

    this.setState({
      ...this.state,
      publi24Orders,
      olxOrders,
      laJumateOrders,
      okaziiOrders,
      last12monthsData,
      totalNumberOfOrders,
      selectedRegion: region
    });
    this.props.history.push(`/judet/${region}`);
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

        let dropdownOptions = [];

        rows.forEach((row) => dropdownOptions.push(row.month));
        // make dropdown options unique
        dropdownOptions = Array.from(new Set(dropdownOptions)).reverse();

        this.setState(
          {
            ...this.state,
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
      <>
        <Navbar username='Administrator' />
        <Switch>
          <Route
            exact={true}
            path={'/'}
            render={() => (
              <Summary
                dropdownOptions={this.state.dropdownOptions}
                selectedValue={this.state.selectedValue}
                okaziiRevenue={this.state.okaziiRevenue}
                OLXRevenue={this.state.OLXRevenue}
                publi24Revenue={this.state.publi24Revenue}
                laJumateRevenue={this.state.laJumateRevenue}
                totalRevenue={this.state.totalRevenue}
                productViews={this.state.productViews}
                purchaseRate={this.state.purchaseRate}
                checkoutRate={this.state.checkoutRate}
                abandonedRate={this.state.abandonedRate}
                ordersTrendStore={this.state.ordersTrendStore}
                ordersTrendRegion={this.state.ordersTrendRegion}
                updateDashboard={this.updateDashboard}
                changeRegion={this.changeRegion}
              />
            )}
          />
          <Route exact={true} path={'/website'} render={() => <Website />} />
          <Route
            exact={true}
            path={'/judet/:id'}
            render={() => (
              <Region
                publi24Orders={this.state.publi24Orders}
                olxOrders={this.state.olxOrders}
                laJumateOrders={this.state.laJumateOrders}
                okaziiOrders={this.state.okaziiOrders}
                last12monthsData={this.state.last12monthsData}
                selectedRegion={this.state.selectedRegion}
                totalNumberOfOrders={this.state.totalNumberOfOrders}
              />
            )}
          />
        </Switch>
      </>
    );
  }
}

export default withRouter(App);
