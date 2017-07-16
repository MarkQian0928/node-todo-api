const expect = require('expect');
const request = require('supertest');

// `./`代表的是在server.test.js同一路径下 (在test folder里面），
// `../`代表我往上走一层 （在server路径里面），
// `/server`代表我找一个叫server.js的文件
const {app} = require('./../server');
const {Todo} = require('./../models/todo');

//beforeEach is a lifecycle method that lets us run some code before every single test case.
//We will use beforeEach to set up the database in a way this is useful.
//with this, our database will be empty before every  request.
beforeEach((done)=>{
    Todo.remove({}).then(()=>done());
});

describe('POST/todos', ()=>{
    it('should create a new todo', (done)=>{
        var text = 'Test todo text';

        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res)=>{
            expect(res.body.text).toBe(text);
        })
        .end((err, res)=>{
            if(err){
                done(err);
            }

            Todo.find().then((todos)=>{
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e)=>done(e));
        });
    });

    it('should not create todo with invalid body data',(done)=>{
        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err, res)=>{
            if(err){
                return done(err);
            }

            Todo.find().then((todos)=>{
                expect(todos.length).toBe(0);
                done();
            }).catch((e)=>done(e));

        });
    })
});