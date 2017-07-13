
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db)=>{
    if(err){
        console.log('unable to connect to mongoDB server');
    }
    console.log('Connected to MongoDB Server');

    //findOneAndUpdate
    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('5966cf67ee28fa4286ef2490')
    }, 
    {
        $set:{
            completed: true
        }
    },
    {
        returnOriginal: false
    })
    .then((result)=>{
        console.log(result);
    });

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('59643731cda02cf688dd1045')
    }, {
        $set:{
            name: 'Update'
        },
        $inc:{
            age: 1
        }
    },{
        returnOriginal: false
    }).then((result)=>{
        console.log(result);
    })
});