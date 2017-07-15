var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res)=>{
    var todo = new Todo({
        text: req.body.text,
    });
    todo.save().then((doc)=>{
        res.send(doc);
    }, (e)=>{
        //这个是http status， 400代表 bad request
        res.status(400).send(e);
    })
});

app.listen(3000, ()=>{
    console.log('Started on port 3000');
});