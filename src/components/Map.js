import React, { Component } from 'react';
import { Container } from './styled-components';
import ReactFC from 'react-fusioncharts';

export default class Map extends Component {
  render() {
    const { ordersTrendRegion } = this.props;
    return (
      <Container className='col-md-6 mb-4'>
        <Container className='card is-card-dark chart-card'>
          <Container className='chart-container large full-height'>
            <ReactFC
              {...{
                type: 'usaregion',
                width: '100%',
                height: '100%',
                dataFormat: 'json',
                containerBackgroundOpacity: '0',
                dataEmptyMessage: 'Loading Data...',
                dataSource: {
                  chart: {
                    theme: 'ecommerce',
                    caption: 'Orders Trend',
                    subCaption: 'By Region'
                  },
                  colorrange: {
                    code: '#F64F4B',
                    minvalue: '0',
                    gradient: '1',
                    color: [
                      {
                        minValue: '10',
                        maxvalue: '25',
                        code: '#EDF8B1'
                      },
                      {
                        minvalue: '25',
                        maxvalue: '50',
                        code: '#18D380'
                      }
                    ]
                  },
                  data: ordersTrendRegion
                }
              }}
            />
          </Container>
        </Container>
      </Container>
    );
  }
}

