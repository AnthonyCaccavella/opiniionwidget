
import axios from 'axios';
require('dotenv').config()

// Calling to the Google Api using place id and a unique api key. Stores all the data we need in an object to export back to the App.js file.

 function getReviews() {
            
            return axios.get('https://maps.googleapis.com/maps/api/place/details/json?placeid=' + process.env.REACT_APP_PLACE_ID + '&language=english&key=' + process.env.REACT_APP_SECRET_KEY)
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
    export default getReviews

