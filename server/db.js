var mongodb = require('mongodb')
var MongoClient = mongodb.MongoClient;
var dburl = 'mongodb://localhost:27017/bTask';
var assert = require('assert');
var DB = null;

exports.connect = function(cb)
{
    MongoClient.connect(dburl, function(err, db) 
    {
        DB = db;
        if(db != null)
        {
          console.log("Connected To DB");
          cb(true);
        }
        if(err != null)
        {
          console.log("Error Connecting To DB");
          console.log(err);
          cb(false);
        }
    });
}

exports.seed = function(collectionName,data)
{
  DB.collection(collectionName).insert(data, function(err, doc) {
        console.log("Data Seeded!");
    if(err) throw err;
  });
}

exports.db = function() 
{
  if (DB === null) throw Error('DB Object has not yet been initialized');
    return DB;
};

exports.clearDB = function(done) 
{
    DB.listCollections().toArray().then(function (collections) 
    {
      collections.forEach(function (c) 
      {
         DB.collection(c.name).removeMany();   
      });
      done();
    }).catch(done);
};

exports.getProducts = function(cb) {
    var products = DB.collection('products').find().toArray(function(err, docs) {
        var intCount = docs.length;
        console.log("Found : " + intCount + " products");
        if (intCount == 0)
        {
          console.log("Database Empty");
        }
        if (intCount > 0) {
            var strJson = "[";
            for (var i = 0; i < intCount;) {
                strJson += strJson = '{"_id": "' + docs[i]._id + '","name": "' + docs[i].name + '","image": "' + docs[i].image + '","price": "' + docs[i].price + '","brand": "' + docs[i].brand+ '","category": ' + '{ "id": "' + docs[i].category.id + '","name": "' + docs[i].category.name + '"}' + '}';
                i = i + 1;
                if (i < intCount) {
                    strJson += ',';
                }
            }
            strJson += ']';
            cb(strJson);
            console.log("products Retrived from DB");
        }
    });
}