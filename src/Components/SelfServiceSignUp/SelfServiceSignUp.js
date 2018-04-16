import React, { Component } from 'react';
import logo from '../PlaceFinder/logotransparent.png';
import Autocomplete from 'react-google-autocomplete';
import './SelfService.css';

export default class SelfService extends Component {
    constructor() {
        super();
        this.state = ({
            address: '',
            businessDetails: [],
            placeid: '',
            cid: '',
            rotator: '',
            found: false,
            multi: false
        })
    }


    dec2hex(number)
    {
        var hexvalues = ['0','1','2','3','4','5','6','7',
                   '8','9','A','B','C','D','E','F'];
        var hexval = '';
         while(number !== '0')
         {
            hexval = hexvalues[(number%16)].hexval;
            number = (number/16,0);
        }
        console.log(hexval)
        return hexval;
    }

  render() {
  
    return (
        <div className="search-page">
            <header>
                <a href="https://www.opiniion.com"><img src={logo} alt="Opiniion"/></a>
            </header>
            <div className="search-bar">
                <h3>Step 1 - Find Your Business</h3>
                <Autocomplete style={{width: '400px'}} onPlaceSelected={(place) => {
                    this.setState({
                        businessDetails:place,
                        businessName: place.name,
                        placeid: place.place_id,
                        rating: place.rating,
                        reviews: place.reviews,
                        url: place.url,
                        address: place.formatted_address,                        
                        phone: place.formatted_phone_number,
                        rotator: ('http://search.google.com/local/writereview?placeid='+this.state.placeid),
                        website: place.website,
                        found: true
                        })
                    console.log(this.state.businessDetails, this.state.cid);}} types={['establishment']}/>

            {!this.state.address ? null:
        <div className="results-box">
            {!this.state.businessName ? null :
            <p>Business Name: {this.state.businessName}</p> }
            {!this.state.address ? null :
            <p>Address: {this.state.address}</p> }
            {!this.state.phone ? null :
            <p>Phone #: {this.state.phone}</p> }
            {!this.state.rating ? null :
            <p>Current Google Rating: {this.state.rating} stars </p> }

            <input type="checkbox" onClick={() => this.setState({multi: !this.state.multi})}></input><span>I have multiple locations that I am signing up</span>

        </div>
            }
            {!this.state.found ? null: 
            <div>
                Contact Email <input type="text" required></input>
                Contact Phone Number <input type="text" required></input>
            </div>
            }    
            {this.state.businessName? null : 
            <h5>Can't find your business? No worries, <a href="/#/manual-sign-up">Enter Manually!</a></h5>
            }
            </div>
        </div>
    )
  }
}