Where we go from here:

Potentially need to split the widget and the middleware down the road, but we can take care of that another time. The Database is hooked up and working, but the proxy interferes with localhost's ability to access it.

We have the ability to run crons using the CronJob tool, which will go on the specified time, or every frequency set. This can be used for multiple tools.

Not sure what else we're going to need to add on to this feature list.


  // const data = { 'IntegrationPartnerID': 'opiniion',
  // 'ApiKey': 'AAAAB3NzaC1yc2E',
  // 'AccountID': 800,
  // 'PropertyID': '89aa1c41-0212-495b-8e58-1bc60f8de733' };
  //   const options = {
  //     method: 'POST',
  //     headers: { 'content-type': 'application/x-www-form-urlencoded' },
  //     data: qs.stringify(data),
  //     url: 'https://api.myresman.com/Leasing/GetCurrentResidents',
  //   };
  //   axios(options).then(function (error, response) {
  //     console.log(response);
  //     console.log(error);
  //     this.setState({
  //       mindBodyDataResult: response.data
  //     })
  //   }).catch(error => {
  //     console.log(error);
  //   })
      
  //     let mindxmls = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns="http://clients.mindbodyonline.com/api/0_5_1">
  //     <soapenv:Header/>
  //     <soapenv:Body>
  //        <GetClients>
  //           <Request>
  //          <SourceCredentials>
  //                 <SourceName>Opiniion</SourceName>
  //                 <Password>iG1q9SZPUIGpwwWq0753gD/DUrU=</Password>
  //                 <SiteIDs>
  //                    <int>-99</int>
  //                 </SiteIDs>
  //              </SourceCredentials>
  //              <UserCredentials>
  //                 <Username>Siteowner</Username>
  //                 <Password>apitest1234</Password>
  //                 <SiteIDs>
  //                    <int>-99</int>
  //                 </SiteIDs>
  //                 <LocationID>0</LocationID>
  //              </UserCredentials>
  //              <XMLDetail>Full</XMLDetail>
  //              <PageSize>1500</PageSize>
  //              <CurrentPageIndex>0</CurrentPageIndex>
  //              <SearchText></SearchText>
  //           </Request>
  //        </GetClients>
  //     </soapenv:Body>
  //  </soapenv:Envelope>`;

  //     axios
  //     .post("https://api.mindbodyonline.com/0_5_1/ClientService.asmx?wsdl", mindxmls, {
  //       headers: { "Content-Type": "text/xml" }
  //     }).then(response => {
  //       console.log(response);
  //     })

                
      
  // const mindbodyJob = new CronJob({
  //   cronTime: '* * */24 * * 1-7',
  //   onTick: function() {

//   app.get('/testing', (req, res) => {

//     app.get('db').get_mindbody_data().then(response => {
//       let newMBData = response;
//       // newMBData.map((e,i) => {
//       // })
//       let source = 'OpiniionInc'
//       // e.sourcename;
//       let sourcepassword = 'iG1q9SZPUIGpwwWq0753gD/DUrU='
//       // e.sourcepass;
//       let user = 'Siteowner'
//       // e.username;
//       let userpass = 'apitest1234'
//       // e.userpassword;
//       let site = '-99'
//       // e.siteid;
//       let location = '0'
//       // e.locationid
//       let mindxmls = `<soapenv:Envelope xmlns:soapenv='https://schemas.xmlsoap.org/soap/envelope/' xmlns:web='https://api.mindbodyonline.com/api/0_5_1'>\
//       <soapenv:Header/>\
//       <soapenv:Body>\
//       <GetClients>\
//       <Request>\
//       <SourceCredentials>\
//       <SourceName>${source}</SourceName>\
//       <password>${sourcepassword}</password>\
//       <SiteIDs>\
//       <int>${site}</int>\
//       </SiteIDs>\
//       </SourceCredentials>\
//       <UserCredentials>\
//       <Username>${user}</Username>\
//       <Password>${userpass}</Password>\
//       <SiteIDs>\
//       <int>${site}</int>\
//       </SiteIDs>\
//       <LocationID>${location}</LocationID>\
//       </UserCredentials>\
//       <XMLDetail>Small</XMLDetail>\
//       <PageSize>1500</PageSize>\
//       <CurrentPageIndex>0</CurrentPageIndex>\
//       <SearchText></SearchText>\
//       </Request>\
//       </GetClients>\
//       </soapenv:Body />\
//       </soapenv:Envelope />`;
//       axios.post("https://api.mindbodyonline.com/0_5_1/ClientService.asmx", mindxmls, {
//         headers: 
//           {'Content-Type': 'text/xml'}
//       })
//       .then(response => {
//         console.log(response)
//         // let re = response.getElementsByTagName('client')[i].childNodes;
//         // if(re.MobilePhone) {
//         //   axios.post(`https://app.opiniion.com/_services/opiniion/customer?uid=${e.bid}&api=${e.apikey}&firstname=${re['FirstName'].nodeValue}&lastname=${re[LastName].nodeValue}&email=${re[Email].nodeValue}&countrycode=+1&phone=${re[MobilePhone].nodeValue}`)
//         // } else {
//         //   axios.post(`https://app.opiniion.com/_services/opiniion/customer?uid=${e.bid}&api=${e.apikey}&firstname=${re['FirstName'].nodeValue}&lastname=${re[LastName].nodeValue}&email=${re[Email].nodeValue}&countrycode=+1&phone=${re[HomePhone].nodeValue}`)
//         // }
//       })
//       .catch(err => {
//         console.log(err);
//       });
//     })
  
// })
// });