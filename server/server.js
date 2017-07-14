
const mongoose = require('mongoose');

//global, e.g. global.email,在整个project里只要在这里改变var email的值，就可以影响project里所有的email的value
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp', {
    useMongoClient: true
});

var Todo = mongoose.model('Todo',{
    text:{
        type: String
    },
    completed:{
        type: Boolean
    },
    completedAt:{
        type: Number
    }
});

var newTodo = new Todo({
    text: 'Cook dinner'
});

//save newTodo to the mongoDB and save returns a Promise
// newTodo.save().then((doc)=>{
//     console.log('Save todo', doc);
// }, (e)=>{
//     console.log('unable to save todo');
// });

var otherTodo = new Todo({
    text: "go to starbucks",
    completed: true,
    completedAt: 123
});

otherTodo.save().then((doc)=>{
    console.log(JSON.stringify(doc, undefined, 2));
},(e)=>{
    console.log('unable to save todo');
});