import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {logUserIn, logUserOut, setAvailableUserPages} from '../../actions/index';

import './_FacebookProfileController.scss';

class FacebookProfileController extends Component {

  constructor(props) {
    super(props);

  }

  componentDidMount() {

    var _this = this;
    window.fbEnsureInit(() =>{
      _this.checkLoginState();
    })
  }

  checkLoginState = () => {
    console.log('checkLoginState');

    // this is where the token comes from!!
    FB.getLoginStatus((response) => {

      if (response.status === 'connected') {
        this.loggedIn(response.authResponse);
      } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
      } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
      }
    });
  };

  getUserData = () => {
    return new Promise((resolve, reject) => {
      FB.api('/me', { fields: 'id,name,picture' },  (user_response) => {
        console.log('/me');
        resolve(user_response);
      });
    });
  };

  getAvailablePages = () => {
    return new Promise((resolve, reject) => {
      FB.api('/me/accounts', (pages_response) => {
        console.log('/me/accounts');
        resolve(pages_response);
      });
    });
  };

  getPageData = (pages) => {

    let page_p = [];

    if(pages.length > 0){
      pages.map((page) =>{
        page_p.push(
          new Promise((resolve, reject) => {
            FB.api('/'+page.id, {fields: 'picture,description,likes,fan_count'}, (page_data) => {
                resolve(Object.assign({}, page, page_data))
            })
          })
        )
      })

      return Promise.all(page_p);

    }else{

      // TODO is this right?
      return Promise.resolve("You don't administer any pages!");
    }

  };

  loggedIn = (authResponse) => {

    var _this = this;

    _this.getUserData().then((user_data) => {
      _this.getAvailablePages().then((pages) => {
        _this.getPageData(pages.data).then((page_data) => {
          _this.props.logUserIn(Object.assign({}, authResponse, user_data, {pages: page_data}));
        })
      })
    });

  };

  handleLogin = () => {
    var _this = this;
    FB.login((response) => {
      _this.checkLoginState();
    }
    ,{scope: 'manage_pages'}
    );
  };

  handleLogout = () => {
    var _this = this;
    FB.logout((response) => {
      _this.props.logUserOut();
    })
  };

  render() {

    if (!this.props.user) {
      return (
        <div className='FacebookProfileController'>
          <a href="#" onClick={this.handleLogin}>Login</a>
        </div>
      );
    }
    else{
      return(
        <div className='FacebookProfileController'>
          <a href="#" onClick={this.handleLogout}>Logout</a>
          <p className="FacebookProfileController-name">{this.props.user.name}</p>
          <img className="FacebookProfileController-picture" src={this.props.user.picture.data.url} />
        </div>
      );
    }
  }

}

// Get apps state and pass it as props to UserList
//      > whenever state changes, the UserList will automatically re-render
function mapStateToProps(state) {
    return {
        user: state.user
    };
}

// Get actions and pass them as props to to UserList
//      > now UserList has this.props.selectUser
function matchDispatchToProps(dispatch){
    return bindActionCreators({
      logUserIn: logUserIn,
      logUserOut: logUserOut,
      setAvailableUserPages: setAvailableUserPages,
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(FacebookProfileController);
