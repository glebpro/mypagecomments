import React, { Component } from 'react';
import axios from 'axios';

import TextUploader from 'components/TextUploader';
import FacebookPagesController from 'components/FacebookPagesController';

import "./_Home.scss";

export default class Home extends Component {

  render() {
    return (
      <div className='View Home'>

        <h1>
          MyPageComments
        </h1>


        <FacebookPagesController />

      </div>
    );
  }
}
