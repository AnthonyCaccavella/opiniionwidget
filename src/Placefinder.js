import React, { Component } from 'react';
import logo from './opiniionlogo.png';
import Autocomplete from 'react-google-autocomplete';

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
    // "https://maps.google.com/?cid=13810315389010982232"
    //    0x874d81a482f000eb:0xbfa818ad161c3558
    //    https://www.google.com/search?q=Sport%20Clips%20Haircuts%20of%20American%20Fork&ludocid=13810315389010982232&lrd=0x0:0xbfa818ad161c3558,2,5

    // https://www.google.com/maps/place/Sport+Clips+Haircuts+of+American+Fork/@40.3779953,-111.815408,17z/data=!3m1!4b1!4m5!3m4!1s0x874d81a482f000eb:0xbfa818ad161c3558!8m2!3d40.3779953!4d-111.8132193

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
        <div>
            <div>
                <img src={logo} alt="Opiniion"/>
            </div>
            <Autocomplete style={{width: '90%'}} onPlaceSelected={(place) => {
                this.setState({
                    businessDetails:place,
                    placeid: place.place_id,
                    rating: place.rating,
                    reviews: place.reviews,
                    url: place.url,
                    address: place.formatted_address,
                    cid: place.url.substring(place.url.indexOf('=')+1),
                    
                })
                console.log(this.state.businessDetails, this.state.cid);

                }} types={['establishment']}/>
            {this.state.placeid}
        </div>
    )
  }
}