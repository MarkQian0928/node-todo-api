const MongoClient = require('mongodb').MongoClient;

//In MongoClient, first arguement is a string, url where your db lives. Second arguement is a callback argument.
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
    if(err){
        console.log('unable to connect to mongodb server');
    }
    console.log('connect to MongoDB server');

    //.collection里面是string name of colleciton you want to insert into
    //.insertOne() let you to insert a new document into your collection
    //.insertOne() has two arguments, first is object, where you install various key value pairs we want to have in our document
    //the second is callback function

    // db.collection('Todos').insertOne({
    //     text: "Something to to",
    //     completed: false
    // }, (err, result)=>{
    //     if (err){
    //         return console.log('unable to insert todo', err);
    //     }
    //     //the .ops attribute will install all the documents that inserted. 
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // })

    db.collection('Users').insertOne({
        name: 'Mark',
        age: '23',
        location: 'Edmonton'
    }, (err, result)=>{
        if(err){
            return console.log('unable to insert todo', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    })


    db.close();
});