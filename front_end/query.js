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

function sendQuery(topic, leaning) {
    leaning = 2;
    topic = "test";
    connection.connect();
    connection.query(p1 + leaning.toString() + p2 + topic + p3, function(err, rows, fields) {
        if (!err) {
        //var dct = new Map();
        //dct.set("articles", rows.toString())
        //return dct;
            console.log(rows);
            return rows;
            }
        else {
            console.log(err);
            return null;
            }
    });

    console.log("here");
}

app.get("/helper", function(request, response) {
    var topic = request.params.topic;
    var leaning = request.params.leaning;

    //response.writeHead(200, {"Content-Type": "application/json"});
    response.send(sendQuery(topic, leaning));
})

app.listen(8080);
