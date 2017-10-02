import React, { Component } from 'react';
var moment = require('moment');

import './_Footer.scss';

export default class Footer extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    return(
      <div className="Footer">
        <p>Copyright © { moment().format('YYYY') } | mypagecomments.com | All Rights Reserved </p>
        <a href="/about">Contact</a>
        <a href="/about#privacy">Privacy Policy</a>
      </div>
    );
  }


}
