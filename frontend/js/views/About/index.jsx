import React, { Component } from 'react';

import "./_About.scss";

export default class About extends Component {
  render() {
    return (
      <div className='View About'>

        <h1>About</h1>

        <h2>What does this site do?</h2>
        <hr/>
        <p>
          <a href="https://mypagecomments.com">mypagecomments.com</a> is designed to give you the average sentiment value (positive or negative) of the comments on a facebook page from a page you manage.
        </p>


        <br/>
        <h2>How does it work?</h2>
        <hr/>
        <p>
          Currently the sentiment analysis if performed with <a href="http://www.nltk.org/_modules/nltk/sentiment/vader.html">nltk.sentiment.vader</a>.
        </p>


        <br/>
        <h2>Contact</h2>
        <hr/>
        <p>gleb.promokhov@gmail.com</p>



        <br/>
        <h2>Privacy Policy</h2>
        <hr/>

        <b>Your Privacy</b>
        <p>
          Your privacy is important to us. To better protect your privacy we provide this notice explaining our online information practices and the choices you can make about the way your information is collected and used. To make this notice easy to find, we make it available on our homepage and at every point where personally identifiable information may be requested.
        </p>

        <b>Collection of Personal Information</b>
        <p>
          When visiting this site, the IP address used to access the site will be logged along with the dates and times of access. This information is purely used to analyze trends, administer the site, track users movement and gather broad demographic information for internal use. Most importantly, any recorded IP addresses are not linked to personally identifiable information.
        </p>
        <p>
          Any submitted text through this website <a href="https://mypagecomments.com">mypagecomments.com</a> or it's relevant API (<a href="https://api.mypagecomments.com">api.mypagecomments.com</a>) will be processed, but not stored anywhere on the site or relevant servers. While we do not perform any personal data collection from submitted material, it is up to the user's discretion to submit any personal information to <a href="https://mypagecomments.com">mypagecomments.com</a> or it's relevant API (<a href="https://api.mypagecomments.com">api.mypagecomments.com</a>).
        </p>

        <b>Changes to this Privacy Statement</b>
        <p>
          The contents of this statement may be altered at any time, at our discretion.
          If you have any questions regarding the privacy policy of this site then you may contact us.
        </p>

      </div>
    );
  }
}
