import React, { Component } from 'react';
import { Container } from '../helpers/styled-components';
import publi24Logo from '../assets/images/publi24-logo.PNG'
import olxLogo from '../assets/images/olx-logo.png'
const classNames = require('classnames');


export default class Card extends Component {
  render() {
    const { label, value, hasLogo, isViews} = this.props;
    return (
      <Container className='col-lg-4 col-sm-6 is-light-text mb-4'>
        <Container className='card grid-card is-card-dark'>
          <Container className='card-heading'>
            <Container className='is-dark-text-light letter-spacing text-small'>
              {label}
            </Container>
            {hasLogo && (
              <Container className='card-heading-brand'>
                {this.props.isOkazii && <img src={'https://static.okr.ro/images/www/okazii-logo.png'} />}
                {this.props.isPubli && <img src={publi24Logo} />}
                {this.props.isOlx && <img src={olxLogo} />}
                {this.props.isLajum && <img src={'https://media1.lajumate.ro/images/logo-ljm.png'} />}
              </Container>
            )}
          </Container>

          <Container className='card-value pt-4 text-x-large'>
            {isViews ? (
              <>
                {value}
                <span className='text-medium pl-2 is-dark-text-light'>
                  vizualizări
                </span>
              </>
            ) : (
              <>
                <span className='text-large pr-1'>RON </span>
                {value}
              </>
            )}
          </Container>
        </Container>
      </Container>
    );
  }
}
