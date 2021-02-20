const request = require("supertest");
const app = require("../../app");
const taskMockData = require("../mock-data/task.json");

const taskEndPointUrl = "/api/task/";
const nonExistentUserId = "6006bab3ad4b0f43d8c81649";
const malformedUserId = "6006bab3ad4b0f43d8c8164p";
const nonExistentTaskId = "60080c640121f318f452cc4c";
const malformedTaskId = "60080c640121f318f452cc4p";
let createdTask;

afterAll(async () => {
	await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
});

describe(`POST ${taskEndPointUrl}`, () => { 
	test(`to create new task`, async () => {
		const newTask = {userId: '6006bab3ad4b0f43d8c81647', subject: "Test Created Task", description: "This is a test created by a jest test", importance: 3, image: "https://docs.microsoft.com/learn/achievements/run-web-app-background-task-with-webjobs-social.png"};
		const response = await request(app).post(taskEndPointUrl).send(newTask);
		expect(response.statusCode).toBe(201);
        expect(response.body.payload).toBeDefined();
        expect(response.body.payload.subject).toBe("Test Created Task");
        expect(response.body.payload.description).toBe("This is a test created by a jest test");
        expect(response.body.payload.importance).toBe(3);
		expect(response.body.payload.image).toBe("https://docs.microsoft.com/learn/achievements/run-web-app-background-task-with-webjobs-social.png");
		createdTask = response.body.payload;
	});
	test(`to create new task with malformed data`, async () => {
		const newTask = {subject: "Test Created Task", description: "This is a test created by a jest test", importance: 3, image: "https://docs.microsoft.com/learn/achievements/run-web-app-background-task-with-webjobs-social.png"}; // Malformed data - userId is missing
		const response = await request(app).post(taskEndPointUrl).send(newTask);
		expect(response.statusCode).toBe(500);
        expect(response.body.message).toBe("Error creating new task!");
	});
});

describe(`GET ${taskEndPointUrl}`, () => {
	test(`with user id to get user tasks`, async () => {
		// const expectedObj = {...taskMockData, __v: 0};
		const response = await request(app).get(taskEndPointUrl).query({userId: createdTask.userId});
		expect(response.statusCode).toBe(200);
		expect(response.body.payload).toBeDefined();
        expect(response.body.payload).toStrictEqual([createdTask]);
	});
	test(`with non-existent user id`, async () => {
		const response = await request(app).get(taskEndPointUrl).query({userId: nonExistentUserId});
		expect(response.statusCode).toBe(200);
		expect(response.body.payload).toBeDefined();
        expect(response.body.payload).toStrictEqual([]);
	});
	test(`with malformed user id`, async () => {
		const response = await request(app).get(taskEndPointUrl).query({userId: malformedUserId});
		expect(response.statusCode).toBe(500);
        expect(response.body.message).toBe("Error fetching user tasks!");
	});
	test(`with task id specific task`, async () => {
		// const expectedObj = {...taskMockData, __v: 0};
		const response = await request(app).get(`${taskEndPointUrl}${createdTask._id}`);
		expect(response.statusCode).toBe(200);
		expect(response.body.payload).toBeDefined();
        expect(response.body.payload).toStrictEqual(createdTask);
	});
	test(`with non-existent task id`, async () => {
		const response = await request(app).get(`${taskEndPointUrl}${nonExistentTaskId}`);
		expect(response.statusCode).toBe(200);
		expect(response.body.payload).toBeNull();
	});
	test(`with malformed task id`, async () => {
		const response = await request(app).get(`${taskEndPointUrl}${malformedTaskId}`);
		expect(response.statusCode).toBe(500);
        expect(response.body.message).toBe("Error fetching task by id!");
	});
});

describe(`PUT ${taskEndPointUrl}`, () => { 
	test(`to update exisitng task by id`, async () => {
		const updatedProps = {subject: "Updated Task", description: "This is an updated task"};
		const response = await request(app).put(`${taskEndPointUrl}${createdTask._id}`).send(updatedProps);
		expect(response.statusCode).toBe(200);
		expect(response.body.payload).toBeDefined();
        expect(response.body.payload.subject).toBe("Updated Task");
		expect(response.body.payload.description).toBe("This is an updated task");
		expect(response.body.payload.importance).toBe(3);
		expect(response.body.payload.image).toBe("https://docs.microsoft.com/learn/achievements/run-web-app-background-task-with-webjobs-social.png");
	});
	test(`to update with non-existent id`, async () => {
		const updatedProps = {subject: "Updated Task", description: "This is an updated task"};
		const response = await request(app).put(`${taskEndPointUrl}${nonExistentTaskId}`).send(updatedProps);
		expect(response.statusCode).toBe(200);
		expect(response.body.payload).toBeNull();
	});
	test(`to update task with malformed data`, async () => {
		const updatedProps = {subject: "Updated Task", description: "This is an updated task"};
		const response = await request(app).put(`${taskEndPointUrl}${malformedTaskId}`).send(updatedProps);
		expect(response.statusCode).toBe(500);
		expect(response.body.message).toBe("Error updating task!");
	});
});

describe(`DELETE ${taskEndPointUrl}`, () => { 
	test(`to delete a task by id`, async () => {
		const response = await request(app).delete(`${taskEndPointUrl}${createdTask._id}`);
		expect(response.statusCode).toBe(200);
		expect(response.body.payload).toBeDefined();
		expect(response.body.payload.subject).toBe("Updated Task");
		expect(response.body.payload.description).toBe("This is an updated task");
		expect(response.body.payload.importance).toBe(3);
		expect(response.body.payload.image).toBe("https://docs.microsoft.com/learn/achievements/run-web-app-background-task-with-webjobs-social.png");
	});
	test(`to delete a task with non-existent id`, async () => {
		const response = await request(app).delete(`${taskEndPointUrl}${nonExistentTaskId}`);
		expect(response.statusCode).toBe(200);
		expect(response.body.payload).toBeNull();
	});
	test(`to delete task with malformed data`, async () => {
		const response = await request(app).delete(`${taskEndPointUrl}${malformedTaskId}`);
		expect(response.statusCode).toBe(500);
		expect(response.body.message).toBe("Error deleting task by id!");
	});
});


