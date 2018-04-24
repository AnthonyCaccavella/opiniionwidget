const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());



app.post('/api/integrations', (req, res) => {
    // res.send("test " + req.body)
    let uniqueid = req.body.unique_id;
    let credential = req.body.credential;
    let event = req.body.event;
    res.send("done " + uniqueid + ' ' + credential + ' ' + event)
//     .then(axios.get('https://api.smartwaiver.com/v4/waivers/'+uniqueid+'?pdf=false&sw-api-key=056eecb3218c7bbdf23c0335b81c47bc').then((response) => {
//         return response.data;
//     })
// )
})



app.listen(3004, () => {
console.log("Listening on port 3004")
})