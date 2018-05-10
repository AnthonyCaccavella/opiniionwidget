import React, { Component } from "react";
import axios from "axios";
import "./Integrations.css";

export default class Integrations extends Component {
  constructor() {
    super();
    this.state = {
      ipID: "",
      api: "",
      aid: "",
      pid: "",
      mbData: [],
      volData: [],
      resData: [],
      sourcename: "",
      password: "",
      siteid: "",
      userpassword: "",
      username: "",
      locationid: "",
      curl: "",
      cemail: "",
      companyPassword: "",
      CoID: "",
      showVol: false,
      showMB: false,
      showRes: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.onMBSubmit = this.onMBSubmit.bind(this);
    this.onVolSubmit = this.onVolSubmit.bind(this);
    this.onResmanSubmit = this.onResmanSubmit.bind(this);
    this.changeVol = this.changeVol.bind(this);
    this.changeMB = this.changeMB.bind(this);
    this.changeRes = this.changeRes.bind(this);
  }

  componentDidMount() {
    axios.get("/getmbdata", {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(res => {
      this.setState({
        mbData: res.data
      });
    });
    axios.get("/getvoldata", {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(res => {
      this.setState({
        volData: res.data
      });
    });
    axios.get("/getresdata", {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(res => {
      this.setState({
        resData: res.data
      });
    });
  }

  activate() {
    // axios.get('/getresdata').then(res => {
    //    const newResData = res.data;
    //    console.log(newResData);
    //    // eslint-disable-next-line
    //   newResData.map((e,i) => {
    //     // eslint-disable-next-line
    //     let bid1 = e.bid;
    //     // eslint-disable-next-line
    //     let apikey1 = e.apikey;
          axios.post(`https://api.myresman.com/Leasing/GetCurrentResidents?IntegrationPartnerID=opiniion&ApiKey=AAAAB3NzaC1yc2E&AccountID=800&PropertyID=89aa1c41-0212-495b-8e58-1bc60f8de733`, {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        // })
        .then(response => {
          const data = response.data;
          console.log(data);
        })
      // })
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  onMBSubmit() {
    this.setState(
      {
        inttype: "MindBody"
      },
      function stateUpdateComplete() {
        axios.post("/postmbdata", this.state).then(res => {
          console.log(res);
          this.setState({
            businessName: "",
            opiniionUID: "",
            opiniionAPI: "",
            sourceName: "",
            sourcePassword: "",
            siteID: "",
            userName: "",
            userPassword: "",
            locationID: ""
          });
        });
      }
    );
    alert("Integration Data Submitted!");
  }

  onResmanSubmit() {
    this.setState(
      {
        inttype: "Resman"
      },
      function stateUpdateComplete() {
        axios.post("/postresdata", this.state).then(res => {
          console.log(res);
          this.setState({
            businessName: "",
            opiniionUID: "",
            opiniionAPI: "",
            pid: "",
            aid: "",
            api: "",
            ipID: ""
          });
        });
      }
    );
    alert("Integration Data Submitted!");
  }

  onVolSubmit() {
    this.setState(
      {
        inttype: "Volusion"
      },
      function stateUpdateComplete() {
        axios.post("/postvoldata", this.state).then(res => {
          console.log(res);
          this.setState({
            businessName: "",
            opiniionUID: "",
            opiniionAPI: "",
            curl: "",
            cemail: "",
            companyPassword: "",
            CoID: "",
            moredata1: "",
            moredata2: "",
            moredata3: ""
          });
        });
      }
    );
    alert("Integration Data Submitted!");
  }

  changeVol() {
    this.setState({
      showVol: !this.state.showVol
    });
  }
  changeMB() {
    this.setState({
      showMB: !this.state.showMB
    });
  }
  changeRes() {
    this.setState({
      showRes: !this.state.showRes
    });
  }

  render() {
    const mindBodyData = this.state.mbData.map((e, i) => {
      return (
        // <div className="displayinfo" key={i}>
        <tbody>
          <td className="name">{e.name}</td>
          <td className="bid">{e.bid}</td>
          <td className="api">{e.apikey}</td>
          <td className="sourcename">{e.sourcename}</td>
          <td className="sourcepass">{e.sourcepass}</td>
          <td className="siteid">{e.siteid}</td>
          <td className="siteid">{e.username}</td>
          <td className="userpassword">{e.userpassword}</td>
          <td className="locationid">{e.locationid}</td>
        </tbody>
        // </div>
      );
    });
    const volusionData = this.state.volData.map((e, i) => {
      return (
        // <div className="displayinfo" key={i}>
        <tbody>
          <td className="name">{e.name}</td>
          <td className="bid">{e.bid}</td>
          <td className="api">{e.apikey}</td>
          <td className="URL">{e.datapoint1}</td>
          <td className="Email">{e.datapoint2}</td>
          <td className="SourcePassword">{e.sourcepass}</td>
          <td className="Password">{e.datapoint3}</td>
          <td className="fields">{e.datapoint4}</td>
          <td className="fields">{e.datapoint5}</td>
          <td className="fields">{e.datapoint6}</td>          
        </tbody>
        // </div>
      );
    });
    const resmanData = this.state.resData.map((e, i) => {
      return (
        // <div className="displayinfo" key={i}>
        <tbody>
          <td className="name">{e.name}</td>
          <td className="bid">{e.bid}</td>
          <td className="apikey">{e.apikey}</td>
          <td className="ipid">{e.ipid}</td>
          <td className="api">{e.api}</td>
          <td className="pid">{e.pid}</td>
          <td className="datapoint1">{e.datapoint1}</td>
        </tbody>
        // </div>
      );
    });

    return (
      <div>
        <header>
          <h1>Integrations Middleware</h1>
          <button onClick={this.activate}>Activate Call</button>
        </header>
        <div>
          <h2>New MindBody Integration</h2>
          <div>
            <div>
              <div className="input-field">
                <label>Company</label>
                <input
                  type="text"
                  placeholder="Company"
                  name="businessName"
                  className="add-data-input"
                  disabled={this.state.addingCompany}
                  onChange={this.handleChange}
                  value={this.state.businessName}
                  required
                />
              </div>
              <div className="input-field">
                <label>Opiniion UID</label>
                <input
                  type="text"
                  placeholder="UID"
                  name="opiniionUID"
                  className="add-data-input"
                  disabled={this.state.addingCompany}
                  onChange={this.handleChange}
                  value={this.state.opiniionUID}
                  required
                />
              </div>
              <div className="input-field">
                <label>Opiniion Api Key</label>
                <input
                  type="text"
                  placeholder="Opiniion Api Key"
                  name="opiniionAPI"
                  className="add-data-input"
                  disabled={this.state.addingCompany}
                  onChange={this.handleChange}
                  value={this.state.opiniionAPI}
                  required
                />
              </div>
              <div className="input-field">
                <label>Source Name</label>
                <input
                  type="text"
                  placeholder="Source Name"
                  name="sourceName"
                  className="add-data-input"
                  disabled={this.state.addingCompany}
                  onChange={this.handleChange}
                  value={this.state.sourceName}
                  required
                />
              </div>
            </div>
            <div>
              <div className="input-field">
                <label>Source Password</label>
                <input
                  type="text"
                  placeholder="Source Password"
                  name="sourcePassword"
                  className="add-data-input"
                  disabled={this.state.addingCompany}
                  onChange={this.handleChange}
                  value={this.state.sourcePassword}
                  required
                />
              </div>
              <div className="input-field">
                <label>Site ID</label>
                <input
                  type="text"
                  placeholder="Site ID"
                  name="siteID"
                  className="add-data-input"
                  disabled={this.state.addingCompany}
                  onChange={this.handleChange}
                  value={this.state.siteID}
                  required
                />
              </div>
              <div className="input-field">
                <label>User Name</label>
                <input
                  type="text"
                  placeholder="User Name"
                  name="userName"
                  className="add-data-input"
                  disabled={this.state.addingCompany}
                  onChange={this.handleChange}
                  value={this.state.userName}
                  required
                />
              </div>
              <div className="input-field">
                <label>User Password</label>
                <input
                  type="text"
                  placeholder="User Password"
                  name="userPassword"
                  className="add-data-input"
                  disabled={this.state.addingCompany}
                  onChange={this.handleChange}
                  value={this.state.userPassword}
                  required
                />
              </div>
              <div className="input-field">
                <label>Location ID</label>
                <input
                  type="text"
                  placeholder="Location ID"
                  name="locationID"
                  className="add-data-input"
                  disabled={this.state.addingCompany}
                  onChange={this.handleChange}
                  value={this.state.locationID}
                  required
                />
              </div>
            </div>
            <div className="button-container">
              <button className="submit-button" onClick={this.onMBSubmit}>
                Submit
              </button>
              <div className="table-container">
                {this.state.showMB ? (
                  <button className="show-hide-button" onClick={this.changeMB}>
                    Hide
                  </button>
                ) : (
                  <button className="show-hide-button" onClick={this.changeMB}>
                    Show Integrations
                  </button>
                )}
                {!this.state.showMB ? null : (
                  <table>
                    <tbody>
                      <th>Name</th>
                      <th>BSID</th>
                      <th>Opiniion API Key</th>
                      <th>Source Name</th>
                      <th>Source Password</th>
                      <th>SiteID</th>
                      <th>Username</th>
                      <th>User Password</th>
                      <th>Location ID</th>
                    </tbody>
                    {mindBodyData}
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2>New Resman Integration:</h2>
          <div>
            <div>
              <div className="input-field">
                <label>Company</label>
                <input
                  type="text"
                  placeholder="Company"
                  name="businessName"
                  className="add-data-input"
                  disabled={this.state.addingCompany}
                  onChange={this.handleChange}
                  value={this.state.businessName}
                  required
                />
              </div>
              <div className="input-field">
                <label>Opiniion UID</label>
                <input
                  type="text"
                  placeholder="UID"
                  name="opiniionUID"
                  className="add-data-input"
                  disabled={this.state.addingCompany}
                  onChange={this.handleChange}
                  value={this.state.opiniionUID}
                  required
                />
              </div>
              <div className="input-field">
                <label>Opiniion Api Key</label>
                <input
                  type="text"
                  placeholder="Opiniion Api Key"
                  name="opiniionAPI"
                  className="add-data-input"
                  disabled={this.state.addingCompany}
                  onChange={this.handleChange}
                  value={this.state.opiniionAPI}
                  required
                />
              </div>
              <div className="input-field">
                <label>Integration Partner ID</label>
                <input
                  type="text"
                  placeholder="Company"
                  name="ipID"
                  className="add-data-input"
                  disabled={this.state.addingCompany}
                  onChange={this.handleChange}
                  value={this.state.ipID}
                  required
                />
              </div>
              <div className="input-field">
                <label>Resman API Key</label>
                <input
                  type="text"
                  placeholder="Res API Key"
                  name="api"
                  className="add-data-input"
                  disabled={this.state.addingCompany}
                  onChange={this.handleChange}
                  value={this.state.api}
                  required
                />
              </div>
            </div>
            <div>
              <div className="input-field">
                <label>Resman Account ID</label>
                <input
                  type="text"
                  placeholder="AID"
                  name="aid"
                  className="add-data-input"
                  disabled={this.state.addingCompany}
                  onChange={this.handleChange}
                  value={this.state.aid}
                  required
                />
              </div>
              <div className="input-field">
                <label>Resman Property ID</label>
                <input
                  type="text"
                  placeholder="PID"
                  name="pid"
                  className="add-data-input"
                  disabled={this.state.addingCompany}
                  onChange={this.handleChange}
                  value={this.state.pid}
                  required
                />
              </div>
            </div>
            <div className="button-container">
              <button className="submit-button" onClick={this.onResmanSubmit}>
                Submit
              </button>
              <div className="table-container">
                {this.state.showRes ? (
                  <button className="show-hide-button" onClick={this.changeRes}>
                    Hide
                  </button>
                ) : (
                  <button className="show-hide-button" onClick={this.changeRes}>
                    Show Integrations
                  </button>
                )}
                {!this.state.showRes ? null : (
                  <table>
                    <tbody>
                      <th>Name</th>
                      <th>BSID</th>
                      <th>Opiniion API Key</th>
                      <th>Int Partner ID</th>
                      <th>Int API Key</th>
                      <th>Int PID</th>
                      <th>Account ID</th>                      
                    </tbody>
                    {resmanData}
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2>New Volution Integration:</h2>
          <div>
            <div>
              <div className="input-field">
                <label>Company</label>
                <input
                  type="text"
                  placeholder="Company"
                  name="businessName"
                  className="add-data-input"
                  disabled={this.state.addingCompany}
                  onChange={this.handleChange}
                  value={this.state.businessName}
                  required
                />
              </div>
              <div className="input-field">
                <label>Opiniion UID</label>
                <input
                  type="text"
                  placeholder="UID"
                  name="opiniionUID"
                  className="add-data-input"
                  disabled={this.state.addingCompany}
                  onChange={this.handleChange}
                  value={this.state.opiniionUID}
                  required
                />
              </div>
              <div className="input-field">
                <label>Opiniion Api Key</label>
                <input
                  type="text"
                  placeholder="Opiniion Api Key"
                  name="opiniionAPI"
                  className="add-data-input"
                  disabled={this.state.addingCompany}
                  onChange={this.handleChange}
                  value={this.state.opiniionAPI}
                  required
                />
              </div>
              <div className="input-field">
                <label>Company URL</label>
                <input
                  type="text"
                  placeholder="Company URL"
                  name="curl"
                  className="add-data-input"
                  disabled={this.state.addingCompany}
                  onChange={this.handleChange}
                  value={this.state.curl}
                  required
                />
              </div>
              <div className="input-field">
                <label>Company Email</label>
                <input
                  type="text"
                  placeholder="Company Email"
                  name="cemail"
                  className="add-data-input"
                  disabled={this.state.addingCompany}
                  onChange={this.handleChange}
                  value={this.state.cemail}
                  required
                />
              </div>
            </div>
            <div>
              <div className="input-field">
                <label>Company Password</label>
                <input
                  type="text"
                  placeholder="Company Password"
                  name="companyPassword"
                  className="add-data-input"
                  disabled={this.state.addingCompany}
                  onChange={this.handleChange}
                  value={this.state.companyPassword}
                  required
                />
              </div>
              <div className="input-field">
                <label>Company API</label>
                <input
                  type="text"
                  placeholder="Company API"
                  name="CoID"
                  className="add-data-input"
                  disabled={this.state.addingCompany}
                  onChange={this.handleChange}
                  value={this.state.CoID}
                  required
                />
              </div>
              <div className="input-field">
                <label>Additional Data 1</label>
                <input
                  type="text"
                  placeholder="More Data"
                  name="moredata1"
                  className="add-data-input"
                  disabled={this.state.addingCompany}
                  onChange={this.handleChange}
                  value={this.state.moredata1}
                  required
                />
              </div>
              <div className="input-field">
                <label>Additional Data 2</label>
                <input
                  type="text"
                  placeholder="More Data"
                  name="moredata2"
                  className="add-data-input"
                  disabled={this.state.addingCompany}
                  onChange={this.handleChange}
                  value={this.state.moredata2}
                  required
                />
              </div>
              <div className="input-field">
                <label>Additional Data 3</label>
                <input
                  type="text"
                  placeholder="More Data"
                  name="moredata3"
                  className="add-data-input"
                  disabled={this.state.addingCompany}
                  onChange={this.handleChange}
                  value={this.state.moredata3}
                  required
                />
              </div>
            </div>
            <div className="button-container">
              <button className="submit-button" onClick={this.onVolSubmit}>
                Submit
              </button>
              <div className="table-container">
                {this.state.showVol ? (
                  <button className="show-hide-button" onClick={this.changeVol}>
                    Hide
                  </button>
                ) : (
                  <button className="show-hide-button" onClick={this.changeVol}>
                    Show Integrations
                  </button>
                )}
                {!this.state.showVol ? null : (
                  <table>
                    <tbody>
                      <th>Name</th>
                      <th>BSID</th>
                      <th>Opiniion API Key</th>
                      <th>Url</th>
                      <th>Email</th>
                      <th>Password</th>
                      <th>Api</th>
                      <th>More Data</th>
                      <th>More Data</th>
                      <th>More Data</th>
                    </tbody>
                    {volusionData}
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
