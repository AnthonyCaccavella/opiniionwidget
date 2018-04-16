import React, { Component } from 'react';
import Router from './router';

import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        {Router}
        {/* <a href="/#/placefinder"><button>Place Finder</button></a><br />
        <a href="/#/:id/:key"><button>Reminder of schema</button></a> */}
      </div>
    );
  }
}

export default App;


// The embed script is going to look something like this:
// <script src="app.opiniionwidget.com/test" REACT_APP_PLACE_ID="placeidgoeshere" REACT_APP_SECRET_KEY="apikeygoeshere"></script>

/* <iframe allowtransparency="true" frameborder="0" height="100" hspace="0" id="google_ads_frame1" marginheight="0" marginwidth="0" name="google_ads_frame" scrolling="no" src="http://googleads.g.doubleclick.net/pagead/ads?client="{PARAMS}" style="left:0;position:absolute;top:0" vspace="0" width="900"></iframe> */
