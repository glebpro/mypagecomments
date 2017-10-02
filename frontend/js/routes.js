import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group'

// the pages imported for the router
import Home from 'views/Home';
import About from 'views/About';
import API from 'views/API';
import NotFound from 'views/NotFound';

const publicPath = '/';

export const routeCodes : Routes = [
  {
      title: "Home",
      path: `${ publicPath }`,
      exact: true,
      component: Home
  },
  {
      title: "About",
      path: `${ publicPath }about`,
      component: About
  },
  // {
  //     title: "API",
  //     path: `${ publicPath }API`,
  //     component: API
  // },
];

export class Routes extends Component {

  render() {

    function buildRoutes() {
      const routes = [];

      // set routes
      routeCodes.map((route, i) => (
        routes.push(<Route exact={ route.exact || false } path={ route.path } component={ route.component } key={ i } />)
      ));

      // 404 page
      routes.push(<Route component={ NotFound } key={ routes.length+1 }/>)

      return routes;
    }

    return (

      <Route render={({ location }) => (
          <Switch key={location.pathname} location={location}>
            { buildRoutes() }
          </Switch>
      )}/>

    );
  }
}
// <CSSTransitionGroup
//   transitionName="fade"
//   transitionEnterTimeout={350}
//   transitionLeaveTimeout={500}
// >
// </CSSTransitionGroup>



// <CSSTransitionGroup
//   transitionName="fade"
//   transitionEnterTimeout={300}
//   transitionLeaveTimeout={300}
// >
// <div key="transition-group-content" >
//   <Switch>
//         { buildRoutes()}
//     </Switch>
//   </div>
// </CSSTransitionGroup>
//
// <CSSTransitionGroup
//   transitionName='fade'
//   transitionEnterTimeout={500}
//   transitionLeaveTimeout={500}
// >
//   <Switch key={location.pathname}>
//     <Route path="/red" render={Red} />
//     <Route path="/green" render={Green} />
//     <Route path="/blue" render={Blue} />
//   </Switch>
// </CSSTransitionGroup>
