const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const massive = require('massive');
const axios = require('axios')
const CronJob = require('cron').CronJob;
const qs = require('qs');

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors('*'));
// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', "*");
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// })
// delete axios.defaults.headers.common['Access-Control-Request-Headers']
// delete axios.defaults.headers.common['Access-Control-Request-Method']
// delete axios.defaults.headers.common['Cache-Control']
// delete axios.defaults.headers.common['Pragma']

massive('postgres://tveurdjtqhlrqd:f04a05a4a1017d906318e43e386f5eed6da3a683d20365213f51f3e35d53dd81@ec2-54-225-96-191.compute-1.amazonaws.com:5432/demro0c23hossk?ssl=true').then(db => {
  app.set('db', db)
})


//DB Methods:

//Mindbody Get
app.get('/getmbdata', (req, res) => {
  app.get('db').get_mindbody_data().then(response => {
    return res.send(response);
  }).catch( (error)=> {
    console.log(error)
  })
})

app.get('/getvoldata', (req, res) => {
  app.get('db').get_volusion_data().then(response => {
    return res.send(response);
  }).catch( (error)=> {
    console.log(error)
  })
})

app.get('/getresdata', (req, res) => {
  app.get('db').get_resman_data().then(response => {
    return res.send(response);
  }).catch( (error)=> {
    console.log(error)
  })
})

app.post('/postmbdata', (req, res) => {
  app.get('db').post_mindbody_data([req.body.businessName, req.body.opiniionUID, req.body.opiniionAPI, req.body.sourceName, req.body.sourcePassword, req.body.siteID, req.body.userName, req.body.userPassword, req.body.locationID, req.body.inttype ])
  .then((response) => {
    return res.send(response);
  }).catch( (error)=> {
    console.log(error)
  })
})

app.post('/postvoldata', (req, res) => {
  app.get('db').post_volusion_data([req.body.businessName, req.body.opiniionUID, req.body.opiniionAPI, req.body.curl, req.body.cemail, req.body.companyPassword, req.body.CoID, req.body.moredata1, req.body.moredata2, req.body.moredata3, req.body.inttype])
  .then((response) => {
    return res.send(response);
  })
})

app.post('/postresdata', (req, res) => {
  app.get('db').post_resman_data([req.body.businessName, req.body.opiniionUID, req.body.opiniionAPI, req.body.ipID, req.body.api, req.body.aid, req.body.pid, req.body.inttype])
  .then((response) => {
    return res.send(response);
  }).catch( (error)=> {
    console.log(error)
  })
})


app.post("/api/integrations/smartwaiver", (req, res) => {
  // res.send("test " + req.body)
  let uniqueid = req.body.unique_id;
  let credential = req.body.credential;
  let event = req.body.event;
  if (req.body.UID && req.body.APIKEY){
    let UID = req.body.UID;
    let APIKEY = req.body.APIKEY;
  }
  res.send("Created! " + uniqueid + " " + credential + " " + event).then(
    axios.get("https://api.smartwaiver.com/v4/waivers/" + uniqueid + "?pdf=false&sw-api-key=056eecb3218c7bbdf23c0335b81c47bc")
    .then(response => {
      var re = response.body;
      var time = re.waiver.createdOn;
      var email = re.waiver.email;
      var ip = re.waiver.clientIP;
      for (var i = 0; i < re.waiver.participants.length; i++) {
        if(!re.waiver.participants[i].isMinor) {
          var firstname = re.waiver.participants[i].firstName;
          var lastname = re.waiver.participants[i].lastName;
          var phone = re.waiver.participants[i].phone;
          var isMinor = re.waiver.participants[i].isMinor;
        } else {
          return "Is a minor - not adding"
        }
      }
    }).catch( (error)=> {
      console.log(error)
    })
    .then(axios.post(`https://app.opiniion.com/_services/opiniion/customer?uid=${UID}&api=${APIKEY}&firstname=${firstname}&lastname=${lastname}&email=${email}&countrycode=+1&phone=${phone}`))
    .catch( (error)=> {
      console.log(error)
    })      
  );
});

  
  //Chron Job Setup
  
  var mindbodyJob = new CronJob('* */30 * * * 1-7', function() {
    axios.get('/getmbdata').then(res => { 
      res.data.map((e,i) => {
        let mindxmls = `<soapenv:envelope xmlns:soapenv='https://schemas.xmlsoap.org/soap/envelope/' xmlns='https://clients.mindbodyonline.com/api/0_5_1'>
        <soapenv:header />
        <soapenv:body>
            <GetClients>
                <request>
                    <sourcecredentials>
                    <sourcename>${e.sourcename}</sourcename>
                    <password>${e.sourcepass}</password>
                    <siteids> 
                        <int>${e.siteid}</int>
                    </siteids>
                    </sourcecredentials>
                    <UserCredentials>
                    <Username>${e.username}</Username>
                    <Password>${e.userpassword}</Password>
                    <SiteIDs>
                        <int>${e.siteid}</int>
                    </SiteIDs>
                    <LocationID>${e.locationid}</LocationID>
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
        .post("https://clients.mindbodyonline.com/api/0_5_1", mindxmls, {
          headers: { "Content-Type": "text/xml" }
        })
        .then(response => {
          let re = response.getElementsByTagName('client')[i].childNodes;
          if(re.MobilePhone) {
            axios.post(`https://app.opiniion.com/_services/opiniion/customer?uid=${e.bid}&api=${e.apikey}&firstname=${re['FirstName'].nodeValue}&lastname=${re[LastName].nodeValue}&email=${re[Email].nodeValue}&countrycode=+1&phone=${re[MobilePhone].nodeValue}`)
          } else {
            axios.post(`https://app.opiniion.com/_services/opiniion/customer?uid=${e.bid}&api=${e.apikey}&firstname=${re['FirstName'].nodeValue}&lastname=${re[LastName].nodeValue}&email=${re[Email].nodeValue}&countrycode=+1&phone=${re[HomePhone].nodeValue}`)
          }
          })
          .catch(err => {
          console.log(err);
        });
      })
    })
  }, true);
  



  app.get('/testing', (req, res) => {
    axios.get('/getresdata').then(res => {
      const newResData = res.data;
      newResData.map((e,i) => {
        let bid1 = e[i].bid;
        let apikey1 = e[i].apikey;
      })
    }).then(response => {
      axios.post('https://api.myresman.com/Leasing/GetCurrentResidents', qs.stringify({ 
        'IntegrationPartnerID': 'opiniion',
        'ApiKey': 'AAAAB3NzaC1yc2E',
        'AccountID': 800,
        'PropertyID': '89aa1c41-0212-495b-8e58-1bc60f8de733' }))
      .then(response => {
        const data = response.data;
        console.log(data);
      })
    })
  })


  var resmanJob = new CronJob('* */1 * * *', function() {
    axios.get('/getresdata').then(res => {
      const newResData = res.data;
      newResData.map((e,i) => {
        let bid1 = e[i].bid;
        let apikey1 = e[i].apikey;
        const data = { 
          'IntegrationPartnerID': 'opiniion',
          'ApiKey': 'AAAAB3NzaC1yc2E',
          'AccountID': 800,
          'PropertyID': '89aa1c41-0212-495b-8e58-1bc60f8de733' };
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(data),
            url: 'https://api.myresman.com/Leasing/GetCurrentResidents',
          };
        axios(options)
        .then(response => {
          const data = response.data;
          console.log(data);
          data.map((e,i) => {
            let res = Residents[i];
            let d1 = new Date();
            let d2 = new Date(e.res.MoveInDate)
            let d3 = new Date(e.res.LeaseEndDate)
            function evaluateDate(date1, date2) {
              return Math.ceil((date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24));
            }
            if (e.res.IsMinor && e.res.IsMinor == "True") {
              return "It's a minor - not contacting!"
            } else {
            // if(0 < evaluateDate(d1,d2) <= 7) 
              axios.post(`https://app.opiniion.com/_services/opiniion/customer?uid=${bid1}&api=${apikey1}&firstname=${e.res.FirstName}&lastname=${e.res.LastName}&email=${e.res.Email}&countrycode=+1&phone=${e.res.MobilePhone}&q=1`)
            } 
            // else if(-7 < evaluateDate(d1, d3) <= 0) {
            //   axios.post(`https://app.opiniion.com/_services/opiniion/customer?uid=${bid1}&api=${apikey1}&firstname=${e.res.FirstName}&lastname=${e.res.LastName}&email=${e.res.Email}&countrycode=+1&phone=${e.res.MobilePhone}&q=2`)
            // } 
            // else {
            //   return("done")
            // }
          });
        })
        .catch(error => {
          console.log(error)
        })
    }, true);
  });
})
  
  var resmanMaintJob = new CronJob('* * */24 * * 1-7', function() {
    axios.get('/getresdata').then(res => {
      res.data.map((e,i) => {
        let bid1 = e.bid;
        let apikey1 = e.apikey;
        let date1 = new Date();
        let date2 = new Date();
        date2.setDate(date2.getDate() - 7);
          const data = { 
            'IntegrationPartnerID': 'opiniion',
            'ApiKey': 'AAAAB3NzaC1yc2E',
            'AccountID': 800,
            'PropertyID': '89aa1c41-0212-495b-8e58-1bc60f8de733',
            'StartDate': date2,
            'EndDate': date1
          };
          const options = {
              method: 'POST',
              headers: { 'content-type': 'application/x-www-form-urlencoded' },
              data: qs.stringify(data),
              url: 'https://api.myresman.com/Events/GetCompletedWorkOrders',
            };
          axios(options)
        })
        .then(response => {
          const data = response.data;
          data.map((e,i) => {
            let res = WorkOrders[i];
              axios.post(`https://app.opiniion.com/_services/opiniion/customer?uid=${bid1}&api=${apikey1}&firstname=${e.res.FirstName}&lastname=${e.res.LastName}&email=${e.res.Email}&countrycode=+1&phone=${e.res.MobilePhone}&q=3`)          
          });
        })
        .catch(error => {
          console.log(error)
        })
    }, true);
  });
  
  var volusionJob = new CronJob('* */30 * * * 1-7', function() {
    axios.get('/getvoldata').then(res => {
      res.data.map((e,i) => {
        let volbid = e.bid;
        let volapi = e.apikey;
        axios.post(`http://${e.datapoint1}/net/WebService.aspx?Login=${e.datapoint2}&EncryptedPassword=${e.sourcepass}&API_Name=Generic\\Orders&WHERE_Value=New`).then(response => {
          let voldata = response.data;
          voldata.map((e,i) => {
            axios.post(`https://app.opiniion.com/_services/opiniion/customer?uid=${volbid}&api=${volapi}&firstname=${e.firstname}&lastname=${e.lastname}&email=${e.email}&countrycode=+1&phone=${e.phone}`)
          })
        })
      })
    })
  }, true);
  

// Internal server setup (localhost:XXXX)

app.listen(3004, () => {
  console.log("Listening on port 3004");
});
