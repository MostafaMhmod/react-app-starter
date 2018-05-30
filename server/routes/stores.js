const express = require('express');
const router = express.Router();
const Store = require('../models/store');
var db = require('../db.js');
var seeder = require('../dbSeed.js');


// get an instance of the router for api routes
var apiRoutes = router;


// Home Endpoint
apiRoutes.get('/', (req, res, next) => {
  res.send('Invalid Endpoint, Try a different one ');
});



// viewStores Endpoint
apiRoutes.get('/viewStores', (req, res, next) => {
  db.connect(function(cb)
        {
            if(cb == true)
            {
                db.getProducts(function(content)
                {
                console.log(content)
                var jsonContent = JSON.parse(content);
                res.send(jsonContent);
                });
            }   
        });
  });



apiRoutes.get('/db/seed', function(req, res) {
  seeder.seed(function(cb)
  {
      if(cb == true)
      {
          res.send("Database Seeded!");
      }
      if(cb == false)
      {
          res.send("Error Seeding Database!");
      }
  });
});      

    /* DELETE DB */
    apiRoutes.get('/db/delete', function(req, res) {
      db.clearDB(function(cb){
          console.log(cb);
      });
  });   


module.exports = apiRoutes;
