const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var port = process.env.PORT || 3000;

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
            return res.status(404).send();
        };

        //{todo} is equal to {todo: todo}
        res.send({todo});
    }).catch((e)=>{
        res.status(400).send();
    })
});


//delete
app.delete('/todos/:id',(req, res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    };
    Todo.findByIdAndRemove(id).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        };
        res.send({todo});

    }).catch((e)=>{
        res.status(400).send();
    });
});

//PATCH
app.patch('/todos/:id', (req, res)=>{
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    };

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }
    // new: true 和 mongodb-update 里的returnOriginal: false作用一样，都表示return new object
    Todo.findByIdAndUpdate(id, {$set: body},{new: true}).then((todo)=>{
        if(!todo){
            return res.send(404).send();
        }
        res.send({todo});
    }).catch((e)=>{
        res.status(400).send();
    })
});


app.listen(port, ()=>{
    console.log(`Started on port ${port}`);
});

module.exports = {app};