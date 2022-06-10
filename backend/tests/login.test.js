require('dotenv').config();
const app = require('../app')
const mockserver = require('supertest');
const mongoose = require('mongoose');
const User = require('../models/user');
const {startVirtualDb, stopVirtualDb, clearUsers} = require('./utils/inMemoryDb');
const jwt = require("jsonwebtoken");
const {setupGoogleSuccessResponse, setupGoogleErrorResponse} = require('./utils/httpMock');

describe('/api/user/login POST test', () => {
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

    it('should return 400 without body (user not created).', async () => {
        //given
        
        //when
        const response = await client.post('/api/user/login');
        
        //then
        expect(response.status).toBe(400);
    });

    it('should return 400 without provider data (user not created).', async () => {
        //given
        const code = "random";
        
        //when
        const response = await client.post('/api/user/login').send({
            code
        });
        
        //then
        expect(response.status).toBe(400);
    });

    it('should return 400 without code data (user not created).', async () => {
        //given
        const provider = "github";
        
        //when
        const response = await client.post('/api/user/login').send({
            provider
        });
        
        //then
        expect(response.status).toBe(400);
    });

    it('should return 400 with invalid provider data (user not created).', async () => {
        //given
        const code = "random";
        const provider = "gitlab";
        
        //when
        const response = await client.post('/api/user/login').send({
            code, provider
        });
        
        //then
        expect(response.status).toBe(400);
    });
    
    it('should return 200 with JWT with valid provider (user not created).', async () => {
        //given
        const code = "random";
        const provider = "google";
        const googleUserId = '832475ö4783598142ö5'
        setupGoogleSuccessResponse(googleUserId);

        //when 
        const response = await client.post('/api/user/login').send({
            code, provider
        });
        
        //then
        expect(response.status).toBe(200);
        const responseToken = jwt.decode(response.body)
        expect(responseToken.providers.google).toBe(googleUserId);
        const users = await User.find();
        expect(users).toStrictEqual([]);
    });

    it('should return 401 with invalid code (user not created).', async () => {
        //given
        const code = "random";
        const provider = "google";

        setupGoogleErrorResponse();

        //when 
        const response = await client.post('/api/user/login').send({
            code, provider
        });
        
        //then
        expect(response.status).toBe(401);
        expect(response.body).toStrictEqual({});
        const users = await User.find();
        expect(users).toStrictEqual([]);
    });

});
