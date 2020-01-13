import React, { Component } from 'react';
import { Container } from './styled-components';
const classNames = require('classnames');

export default class Card extends Component {
  render() {
    const { label, value, className, hasLogo, isViews } = this.props;
    return (
      <Container className='col-lg-3 col-sm-6 is-light-text mb-4'>
        <Container className='card grid-card is-card-dark'>
          <Container className='card-heading'>
            <Container className='is-dark-text-light letter-spacing text-small'>
              {label}
            </Container>
            {hasLogo && (
              <Container className='card-heading-brand'>
                <i
                  className={classNames(
                    'fab text-x-large logo-adjust',
                    className
                  )}
                />
              </Container>
            )}
          </Container>

          <Container className='card-value pt-4 text-x-large'>
            {isViews ? (
              <>
                {value}
                <span className='text-medium pl-2 is-dark-text-light'>
                  views
                </span>
              </>
            ) : (
              <>
                <span className='text-large pr-1'>$</span>
                {value}
              </>
            )}
          </Container>
        </Container>
      </Container>
    );
  }
}

{
  /* <Container className='col-md-4 col-lg-3 is-light-text mb-4'>
  <Container className='card grid-card is-card-dark'>
    <Container className='card-heading mb-3'>
      <Container className='is-dark-text-light letter-spacing text-small'>
        Product Views
      </Container>
    </Container>
    <Container className='card-value pt-4 text-x-large'>
      {this.state.productViews}
      <span className='text-medium pl-2 is-dark-text-light'>views</span>
    </Container>
  </Container>
</Container>; */
}
