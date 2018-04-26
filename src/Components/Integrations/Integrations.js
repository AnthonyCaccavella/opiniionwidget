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
      sourcename:'',
      password:'',
      siteid:'',
      userpassword:'',
      username:'',
      locationid:''
    };
  }

  //External Integrations

  // Resman

  resmanData() {
    axios
      .post(
        `"https://api.myresman.com/Leasing/GetCurrentResidents?IntegrationPartnerID=" + ${this.state.ipID} + "&ApiKey=" + ${this.state.api } + "&AccountID=" + ${this.state.aid } + "&PropertyID=" + ${this.state.pid }`
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

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
    console.log(evt.target.name,evt.target.value)
  }

  onSubmit() {}

  render() {
    return <div>
      <header>Integrations Middleware</header>
      <div>
        <h2>
          MindBody SOAP Integration:
        </h2>
          <form action="this.onSubmit()">
          <label>Company</label>
          <input type="text" placeholder="Company" name="businessName" className="add-data-input" disabled={this.state.addingCompany} onChange={this.handleChange} value={this.state.businessName} required />
          <label>Opiniion UID</label>          
          <input type="text" placeholder="UID" name="opiniionUID" className="add-data-input" disabled={this.state.addingCompany} onChange={this.handleChange} value={this.state.opiniionUID} required />
          <label>Opiniion Api Key</label>
          <input type="text" placeholder="Opiniion Api Key" name="opiniionAPI" className="add-data-input" disabled={this.state.addingCompany} onChange={this.handleChange} value={this.state.opiniionAPI} required />
          <label>Source Name</label>
          <input type="text" placeholder="Source Name" name="sourceName" className="add-data-input" disabled={this.state.addingCompany} onChange={this.handleChange} value={this.state.sourceName} required />
          <label>Source Password</label>
          <input type="text" placeholder="Source Password" name="sourcePassword" className="add-data-input" disabled={this.state.addingCompany} onChange={this.handleChange} value={this.state.sourcePassword} required />
          <label>Site ID</label>
          <input type="text" placeholder="Site ID" name="siteID" className="add-data-input" disabled={this.state.addingCompany} onChange={this.handleChange} value={this.state.siteID} required />
          <label>User Name</label>
          <input type="text" placeholder="User Name" name="userName" className="add-data-input" disabled={this.state.addingCompany} onChange={this.handleChange} value={this.state.userName} required />
          <label>User Password</label>
          <input type="text" placeholder="User Password" name="userPassword" className="add-data-input" disabled={this.state.addingCompany} onChange={this.handleChange} value={this.state.userPassword} required />
          <label>Location ID</label>
          <input type="text" placeholder="Location ID" name="locationID" className="add-data-input" disabled={this.state.addingCompany} onChange={this.handleChange} value={this.state.locationID} required />

          <button onSubmit="this.onSubmit()">Submit</button>
          </form>
        <h2>
          JSON Integrations:
        </h2>
          <form action="">
          <input type="text" placeholder="Company"/>
          <input type="text" placeholder="UID"/>
          <input type="text" placeholder="API Key"/>
          <input type="text" placeholder="Additional Data"/>
          <button>Submit</button>
          </form>
        <h2>
          Other Integrations:
        </h2>
          <form action="">
          <input type="text" placeholder="Company"/>
          <input type="text" placeholder="UID"/>
          <input type="text" placeholder="API Key"/>
          <input type="text" placeholder="Additional Data"/>
          <button>Submit</button>
          </form>
      </div>
      </div>;
  }
}
