const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
var {User} = require('./../server/models/user');

var id = "596c30c7ee00a73f6e2254481";

//Checks if a value is a valid bson ObjectID
if(!ObjectID.isValid(id)){
    console.log('id not valid');
}
else{
    //在mangoose里，id是object id,这里我们设置 _id = string id,但是mangoose会自动转变成objectID，
    Todo.find({
        _id: id
    }).then((todos)=>{
        console.log('Todos', todos);
    });

    Todo.findOne({
        _id: id
    }).then((todo)=>{
        console.log('Todo', todo);
    });

    Todo.findById(id).then((todo)=>{
        if(!todo){
            return console.log('Id not found');
        }
        console.log('Todo by ID', todo);
    }).catch((e)=>console.log(e));
}

User.findById('59684724721dc10920bd7fe9').then((result)=>{
    if(!result){
        return console.log('Unable to find user');
    }
    console.log(JSON.stringify(result, undefined, 2));
}, (e)=>{
    console.log(e);
});

