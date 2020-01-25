import React, { Component } from 'react';
import { Container } from '../helpers/styled-components';
import FusionCharts from 'fusioncharts';
import charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';

// Resolves charts dependancy
charts(FusionCharts);
ReactFC.fcRoot(FusionCharts, charts);

export default class LineGraph extends Component {
  render() {
    const { data } = this.props;
    data.reverse();
    return (
      <Container
        className='col-md-8 col-lg-12 is-light-text mb-4'
        style={{ height: '500px' }}>
        <Container className='card is-card-dark chart-card'>
          <Container className='chart-container large full-height'>
            <ReactFC
              {...{
                type: 'spline',
                width: '100%',
                height: '100%',
                dataFormat: 'JSON',
                containerBackgroundOpacity: '0',
                dataSource: {
                  chart: {
                    caption: 'Numarul comenzilor din ultimele 12 luni',
                    anchorradius: '5',
                    plottooltext:
                      'Totalul comenzilor din $label este de <b>$dataValue</b>',
                    showhovereffect: '1',
                    showvalues: '0',
                    numbersuffix: '',
                    theme: 'ecommerce',
                    anchorbgcolor: '#72D7B2',
                    palettecolors: '#72D7B2',
                    containerBackgroundOpacity: '0',
                    // baseFontSize: "10"
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
