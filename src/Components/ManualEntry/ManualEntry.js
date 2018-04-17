import React, { Component } from "react";
import logo from "../PlaceFinder/logotransparent.png";
import "./ManualEntry.css";

export default class ManualEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addingCompany: false,
      companyName: "",
      companyAddress: "",
      locationType: "Main",
      businessEmail: "",
      companyCity: "",
      companyState: "",
      countryCode: "+1",
      companyPhone: "",
      contactPhone: "",
      contactEmail: "",
      step: 1
    };
    this.handleChange = this.handleChange.bind(this);
  }
  nextStep() {
      if(this.state.businessEmail & this.state.companyCity & this.state.companyPhone & this.state.companyName & this.state.companyAddressn !== '') {
          this.setState({
              step: 2
          })
      } else {
          alert(" Please fill out all fields")
      }
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  render() {
    return (
      <div className="create-account">
        <header>
          <a href="https://www.opiniion.com">
            <img src={logo} alt="Opiniion" />
          </a>
        </header>
        <div className="content">
          <div className="inputs-area">
            {this.state.step === 1 ? (
              <div>
                <h3>Tell us about your business</h3>
                <form className="input-container">
                  <input
                    name="companyName"
                    className="add-company-input"
                    placeholder="Business Name"
                    disabled={this.state.addingCompany}
                    onChange={this.handleChange}
                    value={this.state.companyName}
                    autoFocus
                    required
                  />
                  <input
                    name="businessEmail"
                    className="add-company-input"
                    placeholder="Business Email"
                    type="email"
                    disabled={this.state.addingCompany}
                    onChange={this.handleChange}
                    value={this.state.businessEmail}
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
                    required
                  />
                  <input
                    name="companyAddress"
                    className="add-company-input"
                    placeholder="Business Address"
                    disabled={this.state.addingCompany}
                    onChange={this.handleChange}
                    value={this.state.companyAddress}
                    required
                  />
                  <input
                    name="companyCity"
                    className="add-company-input"
                    placeholder="Business City"
                    disabled={this.state.addingCompany}
                    onChange={this.handleChange}
                    value={this.state.companyCity}
                    required
                  />
                  <input
                    name="companyState"
                    className="add-company-input"
                    placeholder="Business State"
                    disabled={this.state.addingCompany}
                    onChange={this.handleChange}
                    value={this.state.companyState}
                    required
                  />
                  <input
                    name="companyPhone"
                    className="add-company-input"
                    placeholder="Business Phone"
                    type="tel"
                    disabled={this.state.addingCompany}
                    onChange={this.handleChange}
                    value={this.state.companyPhone}
                    pattern="\d{3}[\-]\d{3}[\-]\d{4}"
                    required
                  />

                  <button
                    className="advance-button"
                    onClick={this.nextStep}
                  >
                    Continue
                  </button>
                </form>
              </div>
            ) : (
              <div>
                <h3>Tell Us About Yourself</h3>
                <form className="input-container">
                  <input
                    name="firstName"
                    className="add-company-input"
                    placeholder="First Name"
                    disabled={this.state.addingCompany}
                    onChange={this.handleChange}
                    value={this.state.firstName}
                    required
                  />
                  <input
                    name="lastName"
                    className="add-company-input"
                    placeholder="Last Name"
                    disabled={this.state.addingCompany}
                    onChange={this.handleChange}
                    value={this.state.lastName}
                    required
                  />
                  <input
                    name="contactEmail"
                    className="add-company-input"
                    type="email"
                    placeholder="Email"
                    disabled={this.state.addingCompany}
                    onChange={this.handleChange}
                    value={this.state.contactEmail}
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
                    required
                  />
                  <input
                    name="contactPhone"
                    className="add-company-input"
                    placeholder="Phone Number"
                    type="tel"
                    disabled={this.state.addingCompany}
                    onChange={this.handleChange}
                    value={this.state.contactPhone}
                    pattern="\d{3}[\-]\d{3}[\-]\d{4}"
                    required
                  />
                  <input
                    name="password"
                    className="add-company-input"
                    type="password"
                    placeholder="Password"
                    disabled={this.state.addingCompany}
                    onChange={this.handleChange}
                    value={this.state.password}
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    required
                  />
                  <input
                    name="confirmPass"
                    className="add-company-input"
                    type="password"
                    placeholder="Confirm Password"
                    disabled={this.state.addingCompany}
                    onChange={this.handleChange}
                    value={this.state.confirmPass}
                    pattern="this.state.password"
                    required
                  />
                  <div>
                    <button className="advance-button" onClick={() => this.setState({step: 1})}>Previous</button>
                    <button className="advance-button">Finish</button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
