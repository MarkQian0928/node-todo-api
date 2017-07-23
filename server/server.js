var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

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

app.get('/todos', (req, res)=>{
    Todo.find().then((test)=>{
        res.send({test});
    }, (e)=>{
        res.status(400).send(e);
    });
});

//GET
app.get('/todos/:id',(req, res)=>{
    /* request params is going to be an object that it's going to have key value 
    pairs where the key is URL parameter like ID and the value is whatever value 
    was actually put there*/
    var id = req.params.id;

    //.isValid()=>Checks if a value is a valid bson ObjectID
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    };
    
    //.catch()=>Attaches a callback for only the rejection of the Promise.
    Todo.findById(id).then((todo)=>{
        if(!todo){
            res.status(404).send();
        };

        //{todo} is equal to {todo: todo}
        res.send({todo});
    }).catch((e)=>{
        res.status(400).send();
    })
});

app.listen(3000, ()=>{
    console.log('Started on port 3000');
});

module.exports = {app};