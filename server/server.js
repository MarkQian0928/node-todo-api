var {mongoose} = require('./db/mongoose');

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
newTodo.save().then((doc)=>{
    console.log('Save todo', doc);
}, (e)=>{
    console.log('unable to save todo');
});

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