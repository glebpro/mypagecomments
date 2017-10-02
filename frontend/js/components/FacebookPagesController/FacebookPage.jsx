import React, { Component } from 'react';

import DeafultPageImage from '../../../assets/img/logo.png';

export default class FacebookPage extends Component {

  constructor(props) {
    super(props);
  }

  getPagePostIDs = () => {
    return new Promise((resolve, reject) => {
      FB.api('/'+this.props.page.id+'/posts', { access_token: this.props.page.token },  (page_posts) => {
        console.log('/'+this.props.page.id+'/posts');
        resolve(page_posts);
      });
    });
  };

  getPagePosts = () => {
    return this.getPagePostIDs().then((post_ids) => {

      var post_p = post_ids.data.map((post) => {
        return(new Promise((resolve, reject) => {
          FB.api('/'+post.id, { fields:'message,picture,created_time'}, (post_info) => {
            FB.api('/'+post.id+'/likes', { fields:'total_count' }, (post_likes) => {
              resolve(Object.assign({},post_info, { likes: post_likes.data.length }));
            })
          });
        }));
      });

      return Promise.all(post_p).then((post_data) => {
        return post_data;
      });

    });

  };

  handleClick = () => {
    this.getPagePosts().then((page_posts) =>{
      this.props.onPageClick(this.props.page.id, page_posts);
    });
  };

  cutOff = (desc) => {
    if(desc){
      return desc.substring(0,100)+'...';
    }
  }

  render() {
    return (
      <li className="FacebookPage" onClick={this.handleClick} >
        <img src={ this.props.page.picture.data.url } />
        <div>
          <h3 className="FacebookPage-name"> {this.props.page.name} </h3>
          <p className="FacebookPage-description"> { this.cutOff(this.props.page.description) } </p>
          <p className="FacebookPage-likes"> { this.props.page.fan_count } likes</p>
        </div>

      </li>

    );
  }
}
