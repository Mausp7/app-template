const app = require('../app')
const mockserver = require('supertest');
const mongoose = require('mongoose');
const {MongoMemoryServer} = require('mongodb-memory-server');
const User = require('../model/user');

test('New user has empty Array dashboard.', async () => {
    //given
    const virtualMongoDb = await MongoMemoryServer.create();
    const uri = virtualMongoDb.getUri();
    const connectionVirtualMongoDb = await mongoose.connect(uri);

    const newUser = new User({
        username: "testUser", googleId: "testGoogle"
    });
    await newUser.save();

    const client = mockserver.agent(app);
    client.set('authorization', newUser._id);

    //when
    const response = await client.get('/api/dashboards')

    //then
    expect(response.body.user.dashboards).toStrictEqual([]);

    await connectionVirtualMongoDb.disconnect();
    await virtualMongoDb.stop();
});
