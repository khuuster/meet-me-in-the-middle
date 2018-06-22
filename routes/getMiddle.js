var express = require('express');
var router = express.Router();
var axios = require('axios');
require('dotenv').config();

/* GET users listing. */
router.post('/', function(req, res) {
  var input1 = null;
  var input2 = null; 
   axios.get('https://maps.googleapis.com/maps/api/geocode/json?address='+req.body.input1+'&key='+process.env.KEY).then(function(response){
    input1 = response.data.results[0].geometry.location;
   }).then(function(){
    axios.get('https://maps.googleapis.com/maps/api/geocode/json?address='+req.body.input2+'&key='+process.env.KEY).then(function(response){
      input2 = response.data.results[0].geometry.location;
     })
   })
   setTimeout(function(){
     res.json({"input1": input1,"input2": input2})
   }, 1000)
});

module.exports = router;
