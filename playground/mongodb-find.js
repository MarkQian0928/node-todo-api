
const {MongoClient, ObjectID} = require('mongodb');

//In MongoClient, first arguement is a string, url where your db lives. Second arguement is a callback argument.
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
    if(err){
        console.log('unable to connect to mongodb server');
    }
    console.log('connect to MongoDB server');

    //.find() with NO ARGUMENT means that we want to fetch everything. We want all documents from the `Todos`
    //.find({complete: false}) will only return the results that with `complete: false`
    //如果要想通过id来find，不能直接用 "_id: 'xxxxxx'" ,要用 "_id: new ObjectID('xxxxxx')"
    db.collection('Todos').find({
        _id: new ObjectID('596434f8560ba0f6637d990e')
    }).toArray().then((docs)=>{
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err)=>{
        console.log('unable to fetch todos', err);
    });

    db.collection('Todos').find().count().then((count)=>{
        console.log(`Todos count: ${count}`);
    },(err)=>{
        console.log('unable to fecth todos', err);
    });

    //db.close();
});