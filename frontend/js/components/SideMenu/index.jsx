import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../../../assets/img/logo.png';

import './_SideMenu.scss';

export default class SideMenu extends Component {

  constructor(props) {
    super(props);

    this.homeRouteCode = props.homeRouteCode;
  }

  render() {

    return (
      <div className='SideMenu'>
        <div className='SideMenu-links'>

          <NavLink to={ this.homeRouteCode.path } className="SideMenu-homelink">
            <div className='SideMenu-logo'>
              <img src={ logo } alt='logo' />
            </div>
          </NavLink>

        </div>
      </div>
    );
  }
}
