const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp',{
    useMongoClient: true
});

var User = mongoose.model('User',{
    email:{
        type: String,
        require: true,
        trim: true,
        minlength: 1
    }
});

var newUser = new User({
    email: '   test2@email.com   '
});

newUser.save().then((doc)=>{
    console.log(JSON.stringify(doc, undefined, 2));
}, (e)=>{
    console.log('unable to save user', e);
});