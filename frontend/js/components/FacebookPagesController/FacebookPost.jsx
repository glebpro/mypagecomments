import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

import spinner from '../../../assets/img/spinner.gif';

export default class FacebookPost extends Component {

  constructor(props) {
    super(props);


    this.state = {
      showSpinner: false,
      comments: [],
      sentiment: ''
    };

    if(process.env.NODE_ENV === 'production'){
      this.state.api_url = 'https://api.mypagecomments.com';
    }else{
      this.state.api_url = 'http://localhost:3000';
    }

  }

  componentDidMount = () => {

    var _this = this;

    _this.getComments().then((comments) => {
      _this.setState({
        comments: comments
      })
    });
  }


  getComments = () => {
    return new Promise((resolve, reject) => {
      FB.api('/'+this.props.post.id+'/comments', { },  (comments) => {
        // console.log('/'+this.props.post.id+'/comments');
        resolve(comments.data);
      });
    });
  };

  renderComments = () => {
    if(this.state.comments.length > 0){
      return this.state.comments.map((comment) => {
        return(
          <li key={comment.id} >
            <p>{comment.message}</p>
          </li>
        )
      });
    }else{
      return(<li>no comments</li>);
    }
  };

  analyzePost = () => {

    var _this = this;

    console.log("ANALYZE POST");

    if(this.state.comments.length > 0){

      this.setState({ showSpinner: true });

      // seperate comments with newline
      var comments_text = this.state.comments.reduce((t, c) => {
        return t+"\n"+c.message;
      }, "");

      axios.post(this.state.api_url+'/v1/sentiment', {
          data: comments_text
        })
        .then(function (response) {
          _this.setState({ sentiment : response.data.sentiment, showSpinner: false })
        })
        .catch(function (error) {
          console.log(error);
        });

    }else{
      this.setState({
        sentiment: "There are no comments to analyze!"
      });
    }

  };

  render() {
    return (
      <li className="FacebookPost">

        <img src={this.props.post.picture} />

        <div>
          <p className="FacebookPost-post">
            "{this.props.post.story || this.props.post.message || 'null'}"
          </p>

          <div className="FacebookPost-meta">
            <p className="FacebookPost-meta-likes">{this.props.post.likes} likes</p>
            <p className="FacebookPost-meta-created">{moment(this.props.post.created_time).format('MMMM Do YYYY, h:mm a')}</p>
          </div>

          <div className="FacebookPost-comments">
            <p>Comments:</p>
            <ul>
              {this.renderComments()}
            </ul>
          </div>

          <div className="FacebookPost-sentiment">
            <button onClick={this.analyzePost}>Analyze!</button>
            { this.state.showSpinner ? <img src={spinner} /> : null }
            { this.state.sentiment }
          </div>

        </div>

      </li>
    );
  }
}
