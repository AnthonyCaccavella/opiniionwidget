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

                
    