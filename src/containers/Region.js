import React, { Component } from 'react';
import LineGraph from '../components/LineGraph';

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

    let data = [];
    Object.entries(last12monthsData).forEach((month) => {
      let b = new Date(parseInt(month[0]));
      let monthLabel = `${b.getMonth() + 1}/${b.getFullYear()}`;
      data.push({
        label: monthLabel,
        value: month[1]
      });
    });

    return (
      <div style={{ color: 'white', height: '100vh' }}>
				<h1>{selectedRegion}</h1>
        <LineGraph data={data} />
      </div>
    );
  }
}
