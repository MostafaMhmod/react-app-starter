
    // Seeding DB with the json files
    var db = require('./db.js');
    var fs = require('fs');
    
    exports.seed = function(callback) {
        db.connect(function(cb) {
            if (cb == true) {
                // Clear DB to avoid duplicates
                db.clearDB(function(cb) {
                    console.log("DB Cleared");
                });
    
                // Seeding airplane
                fs.readFile('./seeds/bTask.json', 'utf8', function(err, data) {
                    if (err) throw err;
                    console.log("Data Retrieved from json");
    
                    db.seed('products',JSON.parse(data));
                });

    
                callback(true);
            }
        });
    }
    