import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import 'babel-polyfill';

import SideMenu from 'components/SideMenu';
import TopMenu from 'components/TopMenu';
import Footer from 'components/Footer';

// import Routing config + codes
import { Routes, routeCodes } from './Routes';

import './_App.scss';

/*
  Root component of project
  Sets up Routing
*/
export default class App extends Component {

  render() {
    return (
      <BrowserRouter>

        <div className='App'>

          <SideMenu homeRouteCode={ routeCodes[0] }/>

          <div className='Page'>
            <TopMenu routeCodes={ routeCodes } />
            <Routes />
            <Footer />
          </div>

        </div>
      </BrowserRouter>
    );
  }
}

// <Route exact path="/" render={() => (
//     <Redirect to="/home"/>
// )}/>
