import React, { Component } from 'react';
import axios from 'axios';

import spinner from '../../../assets/img/spinner.gif';

import './_TextUploader.scss';

export default class TextUploader extends Component {

  constructor(props) {
    super(props);

    this.state = {
      text: 'Put some text here.',
      number_words: 0,
      showTextUploaderSpinner: false
    };

    if(process.env.NODE_ENV === 'production'){
      this.state.api_url = 'https://api.mypagecomments.com';
    }else{
      this.state.api_url = 'http://localhost:3000';
    }

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount = () => {
    //
  }

  componentWillUnmount = () => {
    // this.serverRequest.abort();
  }

  handleTextChange = (event) => {
    this.setState({text: event.target.value});
  }

  handleSubmit = (e) => {
      e.preventDefault();

      this.setState({ showTextUploaderSpinner: true });

      var _this = this;

      axios.post(this.state.api_url+'/v1/countwords', {
          data: _this.state.text,
        })
        .then(function (response) {
          _this.setState({ number_words : response.data.number_words, showTextUploaderSpinner: false })
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  render() {

    return (
      <div className='TextUploader'>
        <p>
            Upload a corpus of text and get the number of nouns in it.
        </p>
        <form onSubmit={this.handleSubmit}>
          <label>
            <textarea value={this.state.text} onChange={this.handleTextChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        { this.state.showTextUploaderSpinner ? <img src={spinner} /> : null }
        <div>
          <p>Number nouns: {this.state.number_words} </p>
        </div>
      </div>
    );
  }
}
