import supertest from "supertest";
import app from "../src/app.js";
import { user, createdUser } from "./factories/userFactory.js";

const agent = supertest(app);

describe("POST /users/sign-up", () => {
  it("should answer with status 201 when credentials are valid", async () => {
    const body = await user();
    const response = await agent.post("/users/sign-up").send(body);
    expect(response.status).toBe(201);
  });
  it("should answer with status 409 when user already exists", async () => {
    const user = await createdUser();
    const response = await agent.post("/users/sign-up").send({ email: user.email, password: user.password });
    expect(response.status).toBe(409);
  });
  it("should answer with status 422 given a invalid body", async () => {
    const response = await agent.post("/users/sign-up").send();
    expect(response.status).toBe(422);
  });
});

describe("POST /users/sign-in", () => {
  it("should answer with status 200 when credentials are valid", async () => {
    const user = await createdUser();
    const response = await agent.post("/users/sign-in").send({ email: user.email, password: user.password });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
  it("should answer with status 401 when credentials are invalid", async () => {
    const body = await user();
    const response = await agent.post("/users/sign-in").send(body);
    expect(response.status).toBe(401);
  });
  it("should answer with status 422 given a invalid body", async () => {
    const response = await agent.post("/users/sign-in").send();
    expect(response.status).toBe(422);
  });
});