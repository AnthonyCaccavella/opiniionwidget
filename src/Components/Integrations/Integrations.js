import React, { Component } from 'react';
import axios from 'axios';


export default class Integrations extends Component {
    constructor() {
        super()
        this.state = ({
            firstname: '',
            lastname: '',
            phone: '',
            email: '',
            data: [],
            id: '',
            time: '',

        })
    }

    getData() {
        return axios.get('https://api.smartwaiver.com/v4/waivers?sw-api-key=bbb72acd83905aaa69c028ad80d71459').then((response) => {
            this.setState({
                time: response.data.ts,
                id: response.data.id,
            })
            const returnData = [];
            const smartWaiver = {};
            let re = response.data.waivers
            for (var i = 0; i < re.length; i++) {
                smartWaiver.first = re[i].firstName;
                smartWaiver.last = re[i].lastName;
                smartWaiver.waiverId = re[i].waiverId;
                returnData.push(smartWaiver);
            }
            return returnData;
        })
    }

    componentDidMount() {
        this.getData().then(response => {
            this.setState({
                data: response
            })
        })
        console.log("Retrieved data:", this.state)
    }

    render() {
        return (
         <div>
            Hello World!

         </div>   
        )
    }
}