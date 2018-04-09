import React, { Component } from 'react';
import './App.css';
import logo from './opiniionlogo.png';
import getReviews from './reviews.js';
import stars from './3D-Gold-Star-Transparent-Background.png';


require('dotenv').config()

class App extends Component {
  constructor() {
    super();
    this.state = ({
      title: '',
      rating: '',
      reviews: []

    })

  }

  componentDidMount() {
    getReviews().then(response => {
      this.setState({
        title: response.shift(),
        rating: response.pop(),
        reviews: response.filter(el => {
          return el.rating >= 4;
        })
      })
      console.log("Hey!", this.state.reviews, this.state.rating)
    })
  }

  render() {
      
    return (
      <div className="App">
        <div className="widget-box">
            <div className="widget-api-call-display">
            <h1>{this.state.title}</h1>
            <h3 className="rating">{this.state.rating} <span><img src={stars} alt="stars" className="stars" /></span></h3>
            <div className="reviews-box">
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
