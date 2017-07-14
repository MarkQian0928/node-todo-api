const mongoose = require('mongoose');

mongoose.Promise = global.promise;
mongoose.connect('mongodb:localhost:27017/TodoApp',{
    useMongoClient: true
});

module.exports = {mongoose};