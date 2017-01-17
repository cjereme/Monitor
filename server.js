
// This version is using EJS for now -
// Module use
var express = require('express');
var pg = require('pg');


// initialize
var app = express();


app.set('view engine', 'ejs');
//app.set('views', __dirname + '/views');

var config = {
    user: 'christine',
    database: 'MyMonitor',
    password: 'password',
    host: 'localhost',
    port: '5432',
    max: 10,
    idleTimeoutMillis: 30000
};

var pool = new pg.Pool(config)

// test route
app.get("/parents", function(request, response){
    var parentsArray = [
        {name: "Chrisine", email: "test_cjm@test.com"}
    ]
    response.render('parents', {parents: parentsArray});
});

// Read the data from the database
app.get("/parentsdb", function(request, response) {
    pool.connect(function (err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err)
        }
        client.query('SELECT * from Parents', function (err, result) {
            done();

            if (err) {
                return console.error('error running query', query);
            }
            console.log(result.rows[0])
            response.render('parentsdb', {parentsdb: result.rows[0]});
        });
    });
});

pool.on('error', function(err, client) {
    console.error('idle client error', err.msg, err.stack)
});

// Routes

// Listen
app.listen(8000, function() {
    console.log('Running on port 8000')

});