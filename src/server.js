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
    res.send("done " + uniqueid + ' ' + credential + ' ' + event);                
})



app.listen(3004, () => {
console.log("Listening on port 3004")
})