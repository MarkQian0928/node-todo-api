const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
var {User} = require('./../server/models/user');

// Todo.remove({}).then((result)=>{
//     console.log(result);
// });

//Todo.findOneAndRemove()

Todo.findByIdAndRemove('596c30c7ee00a73f6e225449').then((todo)=>{
    console.log(todo);
})