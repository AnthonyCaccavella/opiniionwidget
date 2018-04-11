import React, { Component } from 'react';
import './App.css';
import logo from './opiniionlogo.png';
// import getReviews from './reviews.js';
import stars from './3D-Gold-Star-Transparent-Background.png';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = ({
      title: document.title,
      rating: '',
      reviews: [],
      REACT_APP_PLACE_ID: '',
      REACT_APP_SECRET_KEY: ''
    })
  }

// On component loading this will retrieve the async api call and return the promise to be able to display below. Also ensures that there aren't any low reviews that would reflect poorly on the business. Title is the first thing being pulled off the api call, while rating is the last. Therefor, shifting and popping was the easiest way to ensure that those two values were populated. If they weren't, then it's more likely that there will be no ratings altogether, no stats of any kind.

getReviews() {
            
  return axios.get('https://maps.googleapis.com/maps/api/place/details/json?placeid=' + this.state.REACT_APP_PLACE_ID + '&language=english&key=' + this.state.REACT_APP_SECRET_KEY)
  .then((response) => {
      
      const businsessName = response.data.result.name;
      const reviewRating = response.data.result.rating;
      const reviewArr = [];
      // const overAllRating = response.result.rating;
      for(let i = 0; i< response.data.result.reviews.length; i++) {
          let reviewObj = {};
          let re = response.data.result.reviews[i];
          reviewObj.author = re.author_name;
          reviewObj.photo = re.profile_photo_url;
          reviewObj.rating = re.rating;
          reviewObj.time = re.relative_time_description;
          reviewObj.message = re.text;
          reviewArr.push(reviewObj);
      }
      reviewArr.unshift(businsessName);                      
      reviewArr.push(reviewRating);
      return reviewArr; 
  })
}

  componentDidMount() {
    this.getReviews().then(response => {
      this.setState({
        title: response.shift(),
        rating: response.pop(),
        reviews: response.filter(el => {
          return el.rating >= 4;
        })
      })
      console.log("Successfully retreived data:", this.state.reviews, this.state.rating)
    })
  }

  render() {

    return (
      <div className="App">
        <div className="widget-box">
            <div className="widget-api-call-display">
            <h1>{this.state.title}</h1>
            {!this.state.rating ? <h3>&nbsp;</h3>  :
            <h3 className="rating">{this.state.rating} <span><img src={stars} alt="stars" className="stars" /></span></h3>}
            <div className="reviews-box">
            {/* Turnary statement determining if there were any reviews to display that are at least 4 stars, and if not displays a link to leave a review. Otherwise it displays the reviews listed in format similar to the Google page. */}
              {!this.state.reviews.length ? 
              <div>
                Be the first to leave a featured review! <a href={"http://www.google.com/search?q="+this.state.title}>Click Here</a>
              </div> 
                : this.state.reviews.map((e, i) => (
                <div key={i}>
                  <div className="reviews-box-elements">
                    <span>{e.author}<br /></span>
                    <span className="review-rating">{e.rating} <span><img src={stars} alt="stars" className="stars" /></span> </span>
                    {/* <span><img src={e.photo} alt="Reviewer" /></span>  */}
                    <span className="time"> - {e.time}<br /></span>
                    <div className="message-bottom">
                    <p>{e.message}<br /></p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            </div>
            <div className="widget-footer">
              <div className="opiniion-logo">
                  <p>Powered By <a href="http://www.opiniion.com/" target="blank"><img src={logo} alt="Opiniion"></img></a></p>
              </div>
            </div>
          </div> 
      </div>
    );
  }
}

export default App;


// The embed script is going to look something like this:
// <script src="app.opiniionwidget.com/test" REACT_APP_PLACE_ID="placeidgoeshere" REACT_APP_SECRET_KEY="apikeygoeshere"></script>