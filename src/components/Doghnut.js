import React, { Component } from 'react';
import { Container } from '../helpers/styled-components';
import ReactFC from 'react-fusioncharts';
const classNames = require('classnames');

export default class Doghnut extends Component {
  render() {
    const { caption, value, paletteColors, className } = this.props;
    return (
      <Container className='col-sm-4 full-height'>
        <Container
          className={classNames('chart-container full-height', className)}>
          <ReactFC
            {...{
              type: 'doughnut2d',
              width: '100%',
              height: '100%',
              dataFormat: 'json',
              containerBackgroundOpacity: '0',
              dataSource: {
                chart: {
                  caption,
                  theme: 'ecommerce',
                  defaultCenterLabel: `${value}%`,
                  paletteColors
                },
                data: [
                  {
                    label: 'active',
                    value: `${value}`
                  },
                  {
                    label: 'inactive',
                    alpha: 5,
                    value: `${100 - value}`
                  }
                ]
              }
            }}
          />
        </Container>
      </Container>
    );
  }
}
