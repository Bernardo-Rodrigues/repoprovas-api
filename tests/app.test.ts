
import supertest from "supertest";
import app from "../src/app.js";
import { client } from "../src/database.js";
import { createUser, insertUser } from "./factories/userFactory.js";

const agent = supertest(app);

describe("POST /users/sign-up", () => {
  beforeEach(truncateUsers);
  afterAll(disconnect);

  it("should answer with status 201 when credentials are valid", async () => {
    const user = await createUser();
    const response = await agent.post("/users/sign-up").send(user);
    const createdUsers = await client.user.findUnique({
      where: {
        email: user.email
      }
    })
    expect(createdUsers).not.toBeNull();
    expect(response.status).toBe(201);
  });
  
  it("should answer with status 409 when user already exists", async () => {
    const user = await createUser();
    await insertUser(user);
    const response = await agent.post("/users/sign-up").send({ email: user.email, password: user.password });
    const createdUsers = await client.user.findMany({
      where: {
        email: user.email
      }
    })
    expect(createdUsers.length).toBe(1);
    expect(response.status).toBe(409);
  });

  it("should answer with status 422 given a invalid body", async () => {
    const response = await agent.post("/users/sign-up").send();
    expect(response.status).toBe(422);
  });
});

describe("POST /users/sign-in", () => {
  beforeEach(truncateUsers);
  afterAll(disconnect);

  it("should answer with status 200 when credentials are valid", async () => {
    const user = await createUser();
    await insertUser(user);
    const response = await agent.post("/users/sign-in").send({ email: user.email, password: user.password });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it("should answer with status 401 when email is invalid", async () => {
    const user = await createUser();
    const response = await agent.post("/users/sign-in").send(user);
    expect(response.status).toBe(401);
  });

  it("should answer with status 401 when password is invalid", async () => {
    const user = await createUser();
    await insertUser(user);
    const response = await agent.post("/users/sign-in").send({...user, password:'wrong-password'});
    expect(response.status).toBe(401);
  });

  it("should answer with status 422 given a invalid body", async () => {
    const response = await agent.post("/users/sign-in").send();
    expect(response.status).toBe(422);
  });
});

async function disconnect() {
  await client.$disconnect();
}

async function truncateUsers() {
  await client.$executeRaw`TRUNCATE TABLE users CASCADE;`;
}