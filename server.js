var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/remark', function (req, res) {
    console.log("got remark: ", req.body);
    MongoClient.connect("mongodb://localhost:27017/remarksDb", function (err, db) {
        db.createCollection('remarks', function (err, collection) {
            collection.insert(req.body, { w: 1 }, function (err, result) {
                res.end();
            });
        });
    });
})

app.get('/remarks', function (req, res) {
    MongoClient.connect("mongodb://localhost:27017/remarksDb", function (err, db) {
        db.createCollection('remarks', function (err, collection) {
            if (err) {
                console.error(err);
                res.end("[]");
            }
            else {
                var findRes = collection.find();
                findRes.toArray(function (err, items) {
                    if (err) {
                        console.error(err);
                    }
                    if (items) {
                        res.end(JSON.stringify(items));
                    }
                    else {
                        res.end("[]");
                    }
                });
            }
        });
    });
})

app.use(express.static('public'));

app.listen(8088, function () {
    console.log('exercise app listening on port 8088.')
})