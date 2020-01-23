import React, { Component } from 'react';
import { Container } from '../helpers/styled-components';
import FusionCharts from 'fusioncharts';
import charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';

// Resolves charts dependancy
charts(FusionCharts);
ReactFC.fcRoot(FusionCharts, charts);

export default class BarChart3D extends Component {
  render() {
    const { data } = this.props;
    data.reverse();
    return (
      <Container
        className='col-md-8 col-lg-6 is-light-text mb-4'
        style={{ height: '500px' }}>
        <Container className='card is-card-dark chart-card'>
          <Container className='chart-container large full-height'>
            <ReactFC
              {...{
                type: 'column3d',
                width: '100%',
                height: '100%',
                dataFormat: 'JSON',
                containerBackgroundOpacity: '0',
                dataSource: {
                  chart: {
                    caption: 'Comenzi totale',
                    // subcaption: 'For the year 2017',
                    // yaxisname: 'Deforested Area{br}(in Hectares)',
                    decimals: '1',
                    theme: 'ecommerce'
                  },
                  data
                }
              }}
            />
          </Container>
        </Container>
      </Container>
    );
  }
}
