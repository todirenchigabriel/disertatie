import React, { Component } from 'react';
import { Container } from '../helpers/styled-components';
import FusionCharts from 'fusioncharts';
import charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';

// Resolves charts dependancy
charts(FusionCharts);
ReactFC.fcRoot(FusionCharts, charts);

export default class Pie extends Component {
  render() {
    const { data } = this.props;
    
    return (
      <Container
        className='col-md-8 col-lg-6 is-light-text mb-4'
        style={{ height: '500px' }}>
        <Container className='card is-card-dark chart-card'>
          <Container className='chart-container large full-height'>
            <ReactFC
              {...{
                type: 'pie2d',
                width: '100%',
                height: '100%',
                dataFormat: 'JSON',
                containerBackgroundOpacity: '0',
                dataSource: {
                  chart: {
                    caption:
                      'Proporția vânzărilor pe județul Botoșani din totalul vânzărilor',
                    plottooltext:
                      '<b>$percentValue</b> din totalul comenzilor provin din județul $label',
                    showlegend: '1',
                    showpercentvalues: '1',
                    legendposition: 'bottom',
                    usedataplotcolorforlabels: '1',
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
