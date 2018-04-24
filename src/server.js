const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

let app = express();
app.use(bodyParser.json());
app.use(cors());



app.post('/api/integrations', (req, res) => {        
    res.send({
        "testing": true
    });                
})



app.listen(3004, () => {
console.log("Listening on port 3004")
})