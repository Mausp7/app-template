require('dotenv').config();
const app = require('../app')
const mockserver = require('supertest');
const mongoose = require('mongoose');
const User = require('../models/user');
const {startVirtualDb, stopVirtualDb, clearUsers} = require('./utils/inMemoryDb');
const jwt = require("jsonwebtoken");

describe('/api/dashboard GET test', () => {
    let connection;
    let mongodb;
    let client;

    beforeAll(async () => {
        const result = await startVirtualDb();
        connection = result.connectionVirtualMongoDb;
        mongodb = result.virtualMongoDb;
    
        client = mockserver.agent(app);
    });

    afterAll(async () => await stopVirtualDb(connection, mongodb));

    afterEach(async () => await clearUsers(User));


    it('should return an empty array dashboards for a new user.', async () => {
        //given
        const newUser = new User({
            username: "testUser",
            providers: {
                google: null,
                facebook: null
            }
        });
        await newUser.save();


        const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET);
        client.set('authorization', token);
        
        //when
        const response = await client.get('/api/dashboards')
        
        //then
        expect(response.body.user.dashboards).toStrictEqual([]);
    });
    
    it('should return null if user has been deleted from DB.', async () => {
        //given
        
        const newUser = new User({
            username: "testUser",
            providers: {
                google: null,
                facebook: null
            }
        });
        await newUser.save();
        
        const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET);
        client.set('authorization', token);

        await User.deleteMany();
        
        //when
        const response = await client.get('/api/dashboards')
        
        //then
        expect(response.status).toBe(200);
        expect(response.body.user).toBe(null);
    });



    it('should return a dashboard with matching _id for a user if it exists.', async () => {
        //given
        const newUser = new User({
            username: "testUser",
            providers: {
                google: null,
                facebook: null
            },
            dashboards: [
                {
                    title: "testDashboard"
                },
                {
                    title: "testDashboard2"
                }
            ]
        });
        await newUser.save();

        const client = mockserver.agent(app);
        const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET);
        client.set('authorization', token);

        //when
        const response = await client.get(`/api/dashboards/${newUser.dashboards[0]._id}`)

        //then
        expect(response.body.dashboard.title).toBe("testDashboard");
    });

    it('should return null if a dashboard with matching _id for a user does not exists.', async () => {
        //given
        const newUser = new User({
            username: "testUser",
            providers: {
                google: null,
                facebook: null
            }
        });
        await newUser.save();

        const client = mockserver.agent(app);
        const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET);
        client.set('authorization', token);

        //when
        const response = await client.get(`/api/dashboards/invalidId`)

        //then
        expect(response.body.dashboard).toBe(null);
    });

    it('should return an empty array of todos for a new dashboard.', async () => {
        //given
        const newUser = new User({
            username: "testUser",
            providers: {
                google: null,
                facebook: null
            },
            dashboards: [
                {
                    title: "testDashboard"
                }
            ]
        });
        await newUser.save();

        const client = mockserver.agent(app);
        const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET);
        client.set('authorization', token);

        //when
        const response = await client.get(`/api/dashboards/${newUser.dashboards[0]._id}/todos`)

        //then
        expect(response.body.todos).toStrictEqual([]);
    });

    it('should return a todo with matching _id from a users dashboard if it exists.', async () => {
        //given
        const newUser = new User({
            username: "testUser",
            providers: {
                google: null,
                facebook: null
            },
            dashboards: [
                {
                    title: "testDashboard",
                    todos: [
                        {
                            title: "testTodo",
                            content: "testTodoContent"
                        },
                        {
                            title: "testTodo2",
                            content: "testTodoContent2"
                        },
                    ]
                }
            ]
        });
        await newUser.save();

        const client = mockserver.agent(app);
        const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET);
        client.set('authorization', token);

        //when
        const response = await client.get(`/api/dashboards/${newUser.dashboards[0]._id}/todos/${newUser.dashboards[0].todos[0]._id}`)

        //then
        expect(response.body.todo.title).toBe("testTodo");
    });

    it('should return noll if a todo with matching _id from a users dashboard does not exists.', async () => {
        //given
        const newUser = new User({
            username: "testUser",
            providers: {
                google: null,
                facebook: null
            },
            dashboards: [
                {
                    title: "testDashboard",
                }
            ]
        });
        await newUser.save();

        const client = mockserver.agent(app);
        const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET);
        client.set('authorization', token);

        //when
        const response = await client.get(`/api/dashboards/${newUser.dashboards[0]._id}/todos/invalidTodoId`)

        //then
        expect(response.body.todo).toBe(null);
    });

    it('should create todo.', async () => {
        //given
        const newUser = new User({
            username: "testUser",
            providers: {
                google: null,
                facebook: null
            },
            dashboards: [
                {
                    title: "testDashboard"
                }
            ]
        });
        await newUser.save();

        const client = mockserver.agent(app);
        const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET);
        client.set('authorization', token);
        //client.set('content-type', "application-JSON");

        //when
        const response = await client.post(`/api/dashboards/${newUser.dashboards[0]._id}/todos`)
            .send({
                title: "testTodo",
                content: "testContent"
        });

        //then
        expect(response.status).toBe(200);
        expect(response.body.dashboards[0].todos).toHaveLength(1);
        expect(response.body.dashboards[0].todos[0]._id).not.toBeNull();

        const userInDb = await User.findById(newUser._id);
        expect(userInDb.dashboards[0].todos).toHaveLength(1);
        expect(userInDb.dashboards[0].todos[0]._id).not.toBeNull();
        expect(userInDb.dashboards[0].todos[0]._id.toString()).toBe(response.body.dashboards[0].todos[0]._id);
    }); 


    it('should return an error with code 500 if DB is not connected.', async () => {
        //given
        const newUser = new User({
            username: "testUser",
            providers: {
                google: null,
                facebook: null
            }
        });
        await newUser.save();
        
        const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET);
        client.set('authorization', token);
        await connection.disconnect();

        //when
        const response = await client.get('/api/dashboards')
        
        //then
        expect(response.statusCode).toBe(500);

        const uri = mongodb.getUri();
        connection = await mongoose.connect(uri);
    });
});
