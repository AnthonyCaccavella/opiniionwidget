import React, { Component } from "react";
import axios from "axios";

export default class Integrations extends Component {
  constructor() {
    super();
    this.state = {
      ipID: "",
      api: "",
      aid: "",
      pid: "",
      data: [],
      sourcename,
      password,
      siteid,
      userpassword,
      username,
      locationid
    };
  }

  //External Integrations

  // Resman

  resmanData() {
    axios
      .post(
        "https://api.myresman.com/Leasing/GetCurrentResidents?IntegrationPartnerID=" + { ipID } + "&ApiKey=" + { api } + "&AccountID=" + { aid } + "&PropertyID=" + { pid }
      )
      .then(response => {
        const data = response.data;
      });
  }

  // Mindbody

  mindBodyData() {
    let mindxmls = `<soapenv:envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns='http://clients.mindbodyonline.com/api/0_5_1'>
        <soapenv:header />
        <soapenv:body>
            <GetClients>
                <request>
                    <sourcecredentials>
                    <sourcename>${this.state.sourcename}</sourcename>
                    <password>${this.state.password}</password>
                    <siteids> 
                        <int>${this.state.siteid}</int>
                    </siteids>
                    </sourcecredentials>
                    <UserCredentials>
                    <Username>${this.state.username}</Username>
                    <Password>${this.state.userpassword}</Password>
                    <SiteIDs>
                        <int>${this.state.siteid}</int>
                    </SiteIDs>
                    <LocationID>${this.state.locationid}</LocationID>
                    </UserCredentials>
                    <XMLDetail>Small</XMLDetail>
                    <PageSize>1500</PageSize>
                    <CurrentPageIndex>0</CurrentPageIndex>
                    <SearchText></SearchText>
                </request>
            </GetClients>
        </soapenv:Body />
        </soapenv:Envelope />`;

    axios
      .post(
        'http://clients.mindbodyonline.com/api/0_5_1',
        mindxmls,
        {
          headers: { "Content-Type": "text/xml" }
        }
      )
      .then(res => {
        console.log(res);
        // (axios.post(' https://app.opiniion.com/_services/opiniion/customer?uid='+ {UID} +'&api='+{APIKEY}+'&firstname='+{firsname}+'&lastname='+{lastname}+'&email='+{email}+'&countrycode=+1&phone='+{phone}+'&notes='+{ip}+{time}+{isMinor})) 
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {}

  render() {
    return <div>Hello World!</div>;
  }
}
