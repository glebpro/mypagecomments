import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import Collapsible from 'react-collapsible';

import FacebookPage from './FacebookPage';
import FacebookPost from './FacebookPost';


import './_FacebookPagesController.scss';

class FacebookPagesController extends Component {

  constructor(props) {
    super(props);
    this.state = {
      curr_page_id: -1,
      posts: [],
    };

  }

  renderPages = () => {
    if(this.props.user.pages.length > 0){
      return this.props.user.pages.map((page) => {
          return (
            <FacebookPage key={page.id} page={page} onPageClick={this.onPageClick} />
          );
      });
    }else{
      return(<p>You don't administer any Facebook pages!</p>);
    }
  }

  onPageClick = (curr_page_id, page_posts) => {
    console.log('Got page posts');
    this.setState({
      curr_page_id: curr_page_id,
      posts: page_posts
    });
  };

  renderPosts = () => {
    if(this.state.posts.length > 0){
      return this.state.posts.map((post) => {
          return (
            <FacebookPost key={post.id} post={post} />
          )
      });
    }else{
      return(<p>There are no posts on this page!</p>);
    }

  }

  resetToPages = () => {
    this.setState({
      posts: [],
      curr_page_id: -1
    });
  };

  render() {

    if(!this.props.user){

      return(<div>Login on the top right...</div>);

    }else{

      if(this.state.curr_page_id != -1){
        return(
          <div className='FacebookPagesController'>
            <button onClick={this.resetToPages}>
              Back
            </button>
            <p className='FacebookPagesController-message'>Select a post to analyze: </p>
            <ul className='FacebookPagesController-posts'>
              { this.renderPosts() }
            </ul>
          </div>
        );
      }

      else{
        return(
          <div className='FacebookPagesController'>

            <p className='FacebookPagesController-message'>Select a page: </p>
            <ul className='FacebookPagesController-available-pages'>
              { this.renderPages() }
            </ul>
          </div>
        );
      }

    }

  }

}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(FacebookPagesController);
