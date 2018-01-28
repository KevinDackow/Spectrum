/**
 * Created by daohlim on 28/1/18.
 */
var express = require('express');
var app = express();

var mysql      = require('mysql2');
var connection = mysql.createConnection({
    host     : '35.227.79.121',
    user     : 'root',
    password : 'hack@brown',
    database : 'articles'
});

var p1 = `SELECT author, description, publishedAt, documents.sourceName, title, url, urlToImage FROM articles.documents
INNER JOIN (SELECT * FROM articles.positions WHERE leaning = `;
var p2 = ") as pos ON pos.sourceName = documents.sourceName WHERE description LIKE \"%";
var p3 = "%\" LIMIT 10";

function sendQuery(topic, leaning, response) {
    // leaning = 2;
    // topic = "test";
    connection.connect();
    if(leaning === undefined || topic === undefined){
        leaning = 3;
        topic = "trump";
    }
    connection.query(p1 + leaning.toString() + p2 + topic + p3, function(err, rows, fields) {
        if (!err) {
        //var dct = new Map();
        //dct.set("articles", rows.toString())
        //return dct;
            response.send({'articles' : rows});
            }
        else {
            console.log(err);
            response.status(500).send("Sorry bud, api is down");
            }
    });

}

app.get("/", function(request, response) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    var topic = request.query.topic;
    var leaning = request.query.leaning;
    //console.log(request);
    //response.writeHead(200, {"Content-Type": "application/json"});
    sendQuery(topic, leaning, response);
});

app.listen(8080, "0.0.0.0");
console.log("i'm up")
