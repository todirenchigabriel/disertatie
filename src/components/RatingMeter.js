import React, { Component } from 'react';
import { Container } from '../helpers/styled-components';
import FusionCharts from 'fusioncharts';
import charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';

// Resolves charts dependancy
charts(FusionCharts);
ReactFC.fcRoot(FusionCharts, charts);

export default class RatingMeter extends Component {
  render() {
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
                    caption: 'Market Share of Web Servers',
                    plottooltext:
                      '<b>$percentValue</b> din totalul comenzilor provin din județul $label',
                    showlegend: '1',
                    showpercentvalues: '1',
                    legendposition: 'bottom',
                    usedataplotcolorforlabels: '1',
                    theme: 'ecommerce'
                  },
                  data: [
                    {
                      label: 'BT',
                      value: '2'
                    },
                    {
                      label: 'Others',
                      value: '98'
                    },
                   
                  ]
                }
              }}
            />
          </Container>
        </Container>
      </Container>
    );
  }
}
