import React, { Component } from 'react';
import { Container } from '../helpers/styled-components';
import ReactFC from 'react-fusioncharts';

export default class BarChart extends Component {
  render() {
    const { ordersTrendStore } = this.props;
    return (
      <Container className='chart-container large full-height'>
        <ReactFC
          {...{
            type: 'bar2d',
            width: '100%',
            height: '100%',
            dataFormat: 'json',
            containerBackgroundOpacity: '0',
            dataEmptyMessage: 'Loading Data...',
            dataSource: {
              chart: {
                theme: 'ecommerce',
                caption: 'Orders Trend',
                subCaption: 'By Stores'
              },
              data: ordersTrendStore
            }
          }}
        />
      </Container>
    );
  }
}
