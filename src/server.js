const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

let app = express();
app.use(bodyParser.json());
app.use(cors());



app.get('api/integrations', (req, res) => {        
    res.send("Hello Friend");                
})



app.listen(3004, () => {
console.log("Listening on port 3004")
})