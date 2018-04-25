const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post("/api/integrations", (req, res) => {
  // res.send("test " + req.body)
  let uniqueid = req.body.unique_id;
  let credential = req.body.credential;
  let event = req.body.event;
  res.send("done " + uniqueid + " " + credential + " " + event).then(
    axios
      .get(
        "https://api.smartwaiver.com/v4/waivers/" +
          uniqueid +
          "?pdf=false&sw-api-key=056eecb3218c7bbdf23c0335b81c47bc"
      )
      .then(response => {
        var re = response.body;
        var time = re.waiver.createdOn;
        var email = re.waiver.email;
        var ip = re.waiver.clientIP;
        for (var i = 0; i < re.waiver.participants.length; i++) {
          var firstname = re.waiver.participants[i].firstName;
          var lastname = re.waiver.participants[i].lastName;
          var phone = re.waiver.participants[i].phone;
          var isMinor = re.waiver.participants[i].isMinor;
        }
      })
  );
});

app.listen(3004, () => {
  console.log("Listening on port 3004");
});
