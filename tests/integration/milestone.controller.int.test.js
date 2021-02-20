const request = require("supertest");
const app = require("../../app");
const milestoneMockData = require("../mock-data/milestone.json");

const milestoneEndPointUrl = "/api/milestone/";
const nonExistentTaskId = "6006bab3ad4b0f43d8c81649";
const nonExistentMilestoneId = "6006bab3ad4b0f43d8c81648";
const malformedTaskId = "6006bab3ad4b0f43d8c8164p";
const malformedMilestoneId = "6006bab3ad4b0f43d8c8164z";
let createdMilestone;
let createdTask;
let updatedProps;

afterAll(async () => {
	await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
});

describe(`POST ${milestoneEndPointUrl}`, () => { 
	test(`to create new milestone`, async () => {
		/* Creating task for the upcoming tests */
		const newTask = {userId: '6006bab3ad4b0f43d8c81647', subject: "Test Created Task", description: "This is a test created by a jest test", importance: 3, image: "https://docs.microsoft.com/learn/achievements/run-web-app-background-task-with-webjobs-social.png"};
		let response = await request(app).post("/api/task/").send(newTask);
		createdTask = response.body.payload;
		/* --------------------- */
		const newMilestone = {taskId: createdTask._id, description: "Test milestone created by Jest test"};
		response = await request(app).post(milestoneEndPointUrl).send(newMilestone);
		expect(response.statusCode).toBe(201);
        expect(response.body.payload).toBeDefined();
        expect(response.body.payload.taskId).toBe(createdTask._id);
        expect(response.body.payload.description).toBe("Test milestone created by Jest test");
		createdMilestone = response.body.payload;
	});
	test(`to create new milestone with malformed data`, async () => {
		const newMilestone = {description: "Test milestone created by Jest test",}; // Malformed data - taskId is missing
		const response = await request(app).post(milestoneEndPointUrl).send(newMilestone);
		expect(response.statusCode).toBe(500);
        expect(response.body.message).toBe("Error creating new milestone!");
	});
});


describe(`GET ${milestoneEndPointUrl}`, () => {
	test(`with task id to get task milestones`, async () => {
		// const expectedObj = {...milestoneMockData, __v: 0};
		const response = await request(app).get(`${milestoneEndPointUrl}${createdMilestone.taskId}`)
		expect(response.statusCode).toBe(200);
		expect(response.body.payload).toBeDefined();
        expect(response.body.payload).toStrictEqual([createdMilestone]);
	});
	test(`with non-existent task id`, async () => {
		const response = await request(app).get(`${milestoneEndPointUrl}${nonExistentTaskId}`);
		expect(response.statusCode).toBe(200);
		expect(response.body.payload).toBeDefined();
        expect(response.body.payload).toStrictEqual([]);
	});
	test(`with malformed task id`, async () => {
		const response = await request(app).get(`${milestoneEndPointUrl}${malformedTaskId}`);
		expect(response.statusCode).toBe(500);
        expect(response.body.message).toBe("Error fetching task milestones!");
	});
});

describe(`PUT ${milestoneEndPointUrl}`, () => {
    beforeEach(() => {
        updatedProps = {description: "This is an updated milestone"};
      });
	test(`to update exisitng milestone by id`, async () => {
		const response = await request(app).put(`${milestoneEndPointUrl}${createdMilestone._id}`).send(updatedProps);
		expect(response.statusCode).toBe(200);
        expect(response.body.payload).toBeDefined();
        expect(response.body.payload._id).toBe(createdMilestone._id);
		expect(response.body.payload.description).toBe("This is an updated milestone");
	});
	test(`to update with non-existent id`, async () => {
		const response = await request(app).put(`${milestoneEndPointUrl}${nonExistentMilestoneId}`).send(updatedProps);
		expect(response.statusCode).toBe(200);
		expect(response.body.payload).toBeNull();
	});
	test(`to update milestone with malformed data`, async () => {
		const response = await request(app).put(`${milestoneEndPointUrl}${malformedMilestoneId}`).send(updatedProps);
		expect(response.statusCode).toBe(500);
		expect(response.body.message).toBe("Error updating milestone!");
	});
});

describe(`DELETE ${milestoneEndPointUrl}`, () => { 
	test(`to delete a milestone by id`, async () => {
		let response = await request(app).delete(`${milestoneEndPointUrl}${createdMilestone._id}`);
		expect(response.statusCode).toBe(200);
		expect(response.body.payload).toBeDefined();
		expect(response.body.payload.description).toBe("This is an updated milestone");

		/* Delete the created task used for the tests */
		response = await request(app).delete(`${"/api/task/"}${createdTask._id}`);
		/* ------------------------------------------ */
	});
	test(`to delete a milestone with non-existent id`, async () => {
		const response = await request(app).delete(`${milestoneEndPointUrl}${nonExistentMilestoneId}`);
		expect(response.statusCode).toBe(200);
		expect(response.body.payload).toBeNull();
	});
	test(`to delete task with malformed data`, async () => {
		const response = await request(app).delete(`${milestoneEndPointUrl}${malformedMilestoneId}`);
		expect(response.statusCode).toBe(500);
		expect(response.body.message).toBe("Error deleting milestone by id!");
	});
});
