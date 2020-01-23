import React, { Component } from 'react';
import '../timeSelector.css';

export default class TimeSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isYearSelected: true
    };
  }

  toggleActive = () => {
    this.setState({
      isYearSelected: !this.state.isYearSelected
    });
  };

  render() {
    return (
      <ul class='buttonwrapper'>
        <li className={this.state.isYearSelected ? '' : 'active'}>
          <label onClick={this.toggleActive}>Month</label>
        </li>
        <li className={this.state.isYearSelected ? 'active' : ''}>
          <label onClick={this.toggleActive}>Year</label>
        </li>
      </ul>
    );
  }
}
