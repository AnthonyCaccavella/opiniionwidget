var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var massive = require('massive');
var axios = require('axios')
var CronJob = require('cron').CronJob;
var qs = require('qs');

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors('*'));


app.use( express.static( `${__dirname}/../build` ) );

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


// app.post("/api/integrations/smartwaiver", (req, res) => {
//   // res.send("test " + req.body)
//   let uniqueid = req.body.unique_id;
//   let credential = req.body.credential;
//   let event = req.body.event;
//   if (req.body.UID && req.body.APIKEY){
//     let UID = req.body.UID;
//     let APIKEY = req.body.APIKEY;
//   }
//   res.send("Created! " + uniqueid + " " + credential + " " + event).then(
//     axios.get("https://api.smartwaiver.com/v4/waivers/" + uniqueid + "?pdf=false&sw-api-key=056eecb3218c7bbdf23c0335b81c47bc")
//     .then(response => {
//       var re = response.body;
//       var time = re.waiver.createdOn;
//       var email = re.waiver.email;
//       var ip = re.waiver.clientIP;
//       for (var i = 0; i < re.waiver.participants.length; i++) {
//         if(!re.waiver.participants[i].isMinor) {
//           var firstname = re.waiver.participants[i].firstName;
//           var lastname = re.waiver.participants[i].lastName;
//           var phone = re.waiver.participants[i].phone;
//           var isMinor = re.waiver.participants[i].isMinor;
//         } else {
//           return "Is a minor - not adding"
//         }
//       }
//     }).catch( (error)=> {
//       console.log(error)
//     })
//     .then(axios.post(`https://app.opiniion.com/_services/opiniion/customer?uid=${UID}&api=${APIKEY}&firstname=${firstname}&lastname=${lastname}&email=${email}&countrycode=+1&phone=${phone}`))
//     .catch( (error)=> {
//       console.log(error)
//     })      
//   );
// });


app.get('/pushRes', (req, res) => {
app.get('db').get_resman_data().then(response => {
  let newResData = response;
  newResData.map((e,i) => {
    var bidRes = e.bid;
    var apikeyRes = e.apikey;
    var ipidRes = e.ipid;
    var apiRes = e.api;
    var pidRes = e.pid;
    var aidRes = e.datapoint1;
    var status = "Former"
    var d1 = new Date()
    var d2 = new Date(d1.getTime() - 365*24*60*60*1000);
    axios.post('https://api.myresman.com/Events/GetMoveOuts', qs.stringify({
          'IntegrationPartnerID': ipidRes,
          'ApiKey': apiRes,
          'AccountID': aidRes,
          'PropertyID': pidRes,
          'StartDate': d2,
          'EndDate': d1,
          'Statuses': status
        }))
        .then((response) => {
          var data = response.data.MoveOuts;
          data.map((e,i) => {
            let isMinorRes = ('' +e.IsMinor);
            if(e.MobilePhone && e.MobilePhone.length > 5) {
              var mobile = e.MobilePhone.replace(/\D/g,'');
            } else {
              var mobile = '';
            }
            if (isMinorRes && isMinorRes == "true") {
              console.log("Minor")
              null 
            } else {
                axios.post(`https://app.opiniion.com/srv-api/customer/exist?uid=${bidRes}&api=${apikeyRes}&email=${e.email}&phone=${mobile}`).then( response => {
                  if (response.exist == 'false') {
                    axios.post(`https://app.opiniion.com/_services/opiniion/customer?uid=${bidRes}&api=${apikeyRes}&firstname=${e.FirstName}&lastname=${e.LastName}&email=${e.Email}&countrycode=+1&phone=${mobile}&q=2`)
                  } else {
                    null;
                  }
                })
            }
          })
    })
    .catch(error => console.log(error))
      axios.post('https://api.myresman.com/Leasing/GetCurrentResidents', qs.stringify({
        'IntegrationPartnerID': ipidRes,
        'ApiKey': apiRes,
        'AccountID': aidRes,
        'PropertyID': pidRes }))
      .then((response) => {
        var data = response.data.Residents;
        data.map((e,i) => {
          let d1 = new Date();
          let d2 = new Date(e.MoveInDate)
          let d3 = new Date(e.LeaseEndDate)
          let isMinorRes = ('' +e.IsMinor);
          if(e.MobilePhone && e.MobilePhone.length > 5) {
            var mobile = e.MobilePhone.replace(/\D/g,'');
          } else {
            var mobile = '';
          }
          if (isMinorRes && isMinorRes == "true") {
            null 
          } else {
            axios.post(`https://app.opiniion.com/srv-api/customer/exist?uid=${bidRes}&api=${apikeyRes}&email=${e.email}&phone=${mobile}`).then( response => {
              if (response.exist == 'false') {
              axios.post(`https://app.opiniion.com/_services/opiniion/customer?uid=${bidRes}&api=${apikeyRes}&firstname=${e.FirstName}&lastname=${e.LastName}&email=${e.Email}&countrycode=+1&phone=${mobile}`)
              } else {
                null;
              }
            })
          }
        })              
      })
    })
  })
})
  
  //Chron Job Setup
  // When I wrote these, only God and I understood what I was doing.
  // Now, only God knows.

  var resJob = new CronJob({
  cronTime: '*/60 * 8-20 * * *',
  onTick: function() {
    app.get('db').get_resman_data().then(response => {
      let newResData = response;
      newResData.map((e,i) => {
        var bidRes = e.bid;
        var apikeyRes = e.apikey;
        var ipidRes = e.ipid;
        var apiRes = e.api;
        var pidRes = e.pid;
        var aidRes = e.datapoint1;
        axios.post('https://api.myresman.com/Leasing/GetCurrentResidents', qs.stringify({
              'IntegrationPartnerID': ipidRes,
              'ApiKey': apiRes,
              'AccountID': aidRes,
              'PropertyID': pidRes }))
            .then((response) => {
              var data = response.data.Residents;
              data.map((e,i) => {
                console.log(e);
                let d1 = new Date();
                let d2 = new Date(e.MoveInDate)
                let d3 = new Date(e.LeaseEndDate)
                let isMinorRes = ('' +e.IsMinor);
                if(e.MobilePhone && e.MobilePhone.length > 5) {
                  var mobile = e.MobilePhone.replace(/\D/g,'');
                } else {
                  var mobile = '';
                }
                function evaluateDate(date1, date2) {
                  return Math.ceil((date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24));
                }
                if (isMinorRes && isMinorRes == "true") {
                  console.log('Is a minor')          
                } else if(0 < evaluateDate(d1,d2) <= 7){
                    axios.post(`https://app.opiniion.com/_services/opiniion/customer?uid=${bidRes}&api=${apikeyRes}&firstname=${e.FirstName}&lastname=${e.LastName}&email=${e.Email}&countrycode=+1&phone=${mobile}&q=1`)
                } else if(0 >= evaluateDate(d1,d3) >= -7){             
                    axios.post(`https://app.opiniion.com/_services/opiniion/customer?uid=${bidRes}&api=${apikeyRes}&firstname=${e.FirstName}&lastname=${e.LastName}&email=${e.Email}&countrycode=+1&phone=${mobile}&q=2`)
                } else {
                    axios.post(`https://app.opiniion.com/_services/opiniion/customer?uid=${bidRes}&api=${apikeyRes}&firstname=${e.FirstName}&lastname=${e.LastName}&email=${e.Email}&countrycode=+1&phone=${mobile}`)
                }
              })
        }, error => {
          console.log(error);
        })
      })
    })
  },
  start: false,
  timeZone: 'America/Los_Angeles'
});
resJob.start();


var resMaintJob = new CronJob({
  cronTime: '0 0 0/24 1/1 * 1-7',
  onTick: function() {
    app.get('db').get_resman_data().then(response => {
      let newResData = response.data;
      newResData.map((e,i) => {
        var bidRes = e.bid;
        var apikeyRes = e.apikey;
        var ipidRes = e.ipid;
        var apiRes = e.api;
        var pidRes = e.pid;
        var aidRes = e.datapoint1;
        var date1 = new Date();
        var date2 = new Date();
        date2.setDate(date2.getDate() - 1);
        axios.post('https://api.myresman.com/Events/GetCompletedWorkOrders', qs.stringify({
              'IntegrationPartnerID': ipidRes,
              'ApiKey': apiRes,
              'AccountID': aidRes,
              'PropertyID': pidRes,
              'StartDate': date2,
              'EndDate': date1 }))
            .then((response) => {
              var data = response.WorkOrders;             
              data.map((e,i) => {
                let isMinorRes = ('' +e.IsMinor);
                if(e.MobilePhone && e.MobilePhone.length > 5) {
                  console.log(e.MobilePhone);
                  var mobile = e.MobilePhone.replace(/\D/g,'');
                } else {
                  var mobile = '';
                }
                if (isMinorRes && isMinorRes == "true") {
                  null 
                } else {
                  axios.post(`https://app.opiniion.com/_services/opiniion/customer?uid=${bidRes}&api=${apikeyRes}&firstname=${e.FirstName}&lastname=${e.LastName}&email=${e.Email}&countrycode=+1&phone=${mobile}&q=3`)
                } 
              })
        })
        .catch(error => console.log(error))
      })
    })
  },
  start: false,
  timeZone: 'America/Los_Angeles'
});
resMaintJob.start();


// var vendJob = new CronJob({
//   crontTime: '0 0 0/24 1/1 * 1-7',
//   onTick: function() {
//     var config = {
//       headers: {'Authorization': 'bearer ' + Kh7UKpuhyOjF9hNWCadKi_y3XSeJ1wCiqR6l2IL3}
//     }
//     axios.get('https://missionarymall.vendhq.com/api/2.0/customers', config).then(response => {
//       console.log(response);
//     })
//   }
// })

 
// app.get('/testing', (req, res) => {
//     axios.get('/getvoldata').then(res => {
//       res.data.map((e,i) => {
//         let volbid = e.bid;
//         let volapi = e.apikey;
//         axios.post(`http://${e.datapoint1}/net/WebService.aspx?Login=${e.datapoint2}&EncryptedPassword=${e.sourcepass}&API_Name=Generic\\Orders&WHERE_Value=New`).then(response => {
//           let voldata = response;
//           console.log(voldata);
//           // voldata.map((e,i) => {
//           //   axios.post(`https://app.opiniion.com/_services/opiniion/customer?uid=${volbid}&api=${volapi}&firstname=${e.firstname}&lastname=${e.lastname}&email=${e.email}&countrycode=+1&phone=${e.phone}`)
//           // })
//         })
//       })
//     })
// })

// Internal server setup (localhost:XXXX)

app.listen(3004, () => {
  console.log("Listening on port 3004");
});
