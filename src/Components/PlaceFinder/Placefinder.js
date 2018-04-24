import React, { Component } from 'react';
import logo from './opiniionlogo.png';
import Autocomplete from 'react-google-autocomplete';
import './Placefinder.css';

export default class ReviewDisplay extends Component {
    constructor() {
        super();
        this.state = ({
            address: '',
            businessDetails: [],
            placeid: '',
            cid: '',
            rotator: ''
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
                <h5>Business Search</h5>
                <Autocomplete style={{width: '400px'}} onPlaceSelected={(place) => {
                    this.setState({
                        businessDetails:place,
                        businessName: place.name,
                        placeid: place.place_id,
                        rating: place.rating,
                        reviews: place.reviews,
                        url: place.url,
                        address: place.formatted_address,
                        // cid: place.url.substring(place.url.indexOf('=')+1),
                        phone: place.formatted_phone_number,
                        rotator: ('http://search.google.com/local/writereview?placeid='+this.state.placeid),
                        website: place.website,
                    
                        })
                    console.log(this.state.businessDetails, this.state.cid);}} types={['establishment']}/>

            {!this.state.address ? null:
        <div className="results-box">
            {!this.state.businessName ? null :
            <p>Business Name: {this.state.businessName}</p> }
            {!this.state.address ? null :
            <p>Address: {this.state.address}</p> }
            {!this.state.phone ? null :
            <p>Phone #: {this.state.phone.replace(/[^0-9]/g, "")}</p> }
            {!this.state.placeid ? null :
            <p>Place ID: {this.state.placeid}</p> }
            {!this.state.rating ? null :
            <p>Current Google Rating: {this.state.rating} stars </p> }
            {!this.state.cid ? null :
            <p>CID: {this.state.cid}</p>}
            {!this.state.rotator ? null :
            <div>Rotator:<br/> <a href={this.state.rotator + this.state.placeid}>{this.state.rotator}{this.state.placeid}</a></div>}

        </div>
            }    

            </div>
        </div>
    )
  }
}