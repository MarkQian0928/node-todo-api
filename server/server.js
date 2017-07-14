
const mongoose = require('mongoose');

//global, e.g. global.email,在整个project里只要在这里改变var email的值，就可以影响project里所有的email的value
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp', {
    useMongoClient: true
});


var Todo = mongoose.model('Todo',{
    // require: true 意味着 必须要有这个property
    //minlength: 设置最小的长度，
    //trim: true 删除收尾的空格。 '  Hello world  '=> 'Hello world’
    text:{
        type: String,
        required: true,
        minlength: 1,
        trim: true

    },
    //default: false, set the default value
    completed:{
        type: Boolean,
        default: false
    },
    completedAt:{
        type: Number,
        default: null
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
    text: "edit this course"
});

otherTodo.save().then((doc)=>{
    console.log(JSON.stringify(doc, undefined, 2));
},(e)=>{
    console.log('unable to save todo');
});