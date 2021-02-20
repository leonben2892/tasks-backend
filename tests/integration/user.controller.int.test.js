const request = require("supertest");
const app = require("../../app");
const userService = require("../../services/user.service");
const userMockData = require("../mock-data/user.json");

const userEndPointUrl = "/api/user/";
const nonExistentId = '6006bab3ad4b0f43d8c8164d';
const malformedId = '1234';
const nonExistentEmail = 'test1234@gmail.com'

afterAll(async () => {
	await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
});

describe(`GET ${userEndPointUrl}`, () => {
    test(`to fetch user by id`, async () => {
        const response = await request(app).get(`${userEndPointUrl}${userMockData._id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.user).toBeDefined();
        expect(response.body.user.email).toBe('test@gmail.com');
    });
    test(`to fetch user by non-existent id`, async () => {
        const response = await request(app).get(`${userEndPointUrl}${nonExistentId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.user).toBeNull();
    });
    test(`with malformed data`, async () => {
        const response = await request(app).get(`${userEndPointUrl}${malformedId}`);
        expect(response.statusCode).toBe(500);
        expect(response.body.message).toBe("Error fetching user by id!");
    });
    test(`to fetch user by email`, async () => {
        const response = await request(app).get(`${userEndPointUrl}`).query({email: 'test@gmail.com'});
        expect(response.statusCode).toBe(200);
        expect(response.body.user).toBeDefined();
        expect(response.body.user.email).toBe('test@gmail.com');
    });
    test(`to fetch user non-existent email`, async () => {
        const response = await request(app).get(`${userEndPointUrl}`).query({email: nonExistentEmail});
        expect(response.statusCode).toBe(200);
        expect(response.body.user).toBeNull();
    });
});

describe(`POST ${userEndPointUrl}`, () => {
    test(`to create new user`, async () => {
        const newUser = { email: "jestest@gmail.com", password: '1234' };
        const response = await request(app).post(userEndPointUrl).send(newUser);
        expect(response.statusCode).toBe(201);
        expect(response.body.user).toBeDefined();
        expect(response.body.user.email).toBe('jestest@gmail.com');
        await userService.deleteUserById(response.body.user._id);
    });
    test(`with existing email`, async () => {
        const response = await request(app).post(userEndPointUrl).send({ email: userMockData.email, password: userMockData.password });
        expect(response.statusCode).toBe(500);
        expect(response.body.message).toBe("Error creating new user!");
    });
    test(`with malformed data`, async () => {
        const response = await request(app).post(userEndPointUrl).send();
        expect(response.statusCode).toBe(500);
        expect(response.body.message).toBe("Error creating new user!");
    });
});