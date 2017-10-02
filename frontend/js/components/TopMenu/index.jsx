import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import FacebookProfileController from '../FacebookProfileController';

import './_TopMenu.scss';

export default class TopMenu extends Component {

  constructor(props) {
    super(props);

  }

  render() {

    function buildRoutes(routes) {
      const routeMenus = [];
      routes.map((route, i) => (
          routeMenus.push(
            <NavLink
              activeClassName='TopMenu-link--active'
              className='TopMenu-link'
              to={ route.path }
              key={ i }>
              { route.title }
            </NavLink>
          )
      ));
      return routeMenus;
    }

    return (
      <div className='TopMenu'>
        <div className='TopMenu-routes'>
          { buildRoutes(this.props.routeCodes) }
        </div>
        <div className='TopMenu-profile'>
          <FacebookProfileController />
        </div>
      </div>
    );
  }
}
