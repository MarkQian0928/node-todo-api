
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db)=>{
    if(err){
        return console.log('unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

//deleteMany
//.then()里面必须是result!!!!!
    // db.collection('Todos').deleteMany({text: 'eat lunch'}).then((result)=>{
    //     console.log(result);
    // });

//deletOne
    // db.collection('Todos').deleteOne({text: 'eat lunch'}).then((result)=>{
    //     console.log(result);
    // });

//findOneAndDelete
db.collection('Todos').findOneAndDelete({completed: false}).then((result)=>{
    console.log(result);
});

});
