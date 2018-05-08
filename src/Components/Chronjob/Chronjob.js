import React, { Component } from 'react';


export default class  extends Component {
    constructor() {
        super();
        this.state={

        }
        this.resmanData = this.resmanData.bind(this);
        this.mindBodyData = this.mindBodyData.bind(this);
    }

  //External Integrations

  // Resman
 
  resmanData() {
    axios
      .post(
        `"https://api.myresman.com/Leasing/GetCurrentResidents?IntegrationPartnerID=" + ${
          this.state.ipID
        } + "&ApiKey=" + ${this.state.api} + "&AccountID=" + ${
          this.state.aid
        } + "&PropertyID=" + ${this.state.pid}`
      )
      .then(response => {
        const data = response.data;
        data.map((e,i) => {
          if (e.residents[i].IsMinor && e.residents[i].IsMinor == "True") {
            return "It's a minor - not contacting!"
          } else {
            axios.post('http://api/opiniion.com/')
          }
        });
      })
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
      .post("http://clients.mindbodyonline.com/api/0_5_1", mindxmls, {
        headers: { "Content-Type": "text/xml" }
      })
      .then(res => {
        console.log(res);
        // (axios.post(' https://app.opiniion.com/_services/opiniion/customer?uid='+ {UID} +'&api='+{APIKEY}+'&firstname='+{firsname}+'&lastname='+{lastname}+'&email='+{email}+'&countrycode=+1&phone='+{phone}+'&notes='+{ip}+{time}+{isMinor}))
      })
      .catch(err => {
        console.log(err);
      });
  }


//Internal integrations 




// Smartwaiver
smartWaiver() {
  
}


// Volusion Google Gadgets API Integration

// var api_url = "http://{YourUrl}/net/WebService.aspx?Login={YourEmail@YourDomain.com}&ncryptedPassword={YourPassword}&API_Name={Generic}\\Orders&SELECT_Columns={o.OrderID}";

// var api_response = "";

// axios.get(api_url, function (response) {
//   api_response = response;
// },
// 1
// );


// Next Integration
    
    render() {
        return (
            <div>
                Hey
            </div>        
        );
    }
}


