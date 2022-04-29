import jwt from "jsonwebtoken";
import supertest from "supertest";
import seed from "../prisma/seed.js";
import app from "../src/app.js";
import config from "../src/config.js";
import { client } from "../src/database.js";

const agent = supertest(app);

describe("GET /teachers", () => {
    afterAll(disconnect);
    beforeEach( async () => {
        await client.$executeRaw`TRUNCATE TABLE terms CASCADE;`;
        await client.$executeRaw`TRUNCATE TABLE teachers CASCADE;`;
        await seed();
    })

    it("should answer with status 401 given a non existing token", async () => {
        const response = await agent.get("/teachers");
        expect(response.body.length).toBeUndefined;
        expect(response.status).toBe(401);
    });
    it("should answer with status 401 given an invalid token", async () => {
        const response = await agent.get("/teachers").set("Authorization", 'invalid-token');
        expect(response.body.length).toBeUndefined;
        expect(response.status).toBe(401);
    });
    it("should answer with status 401 given an expired token", async () => {
        const token = jwt.sign({}, config.secretJWT, { expiresIn: 0 });
        const response = await agent.get("/teachers").set("Authorization", token);
        expect(response.body.length).toBeUndefined;
        expect(response.status).toBe(401);
    });
    it("should answer with status 200 and an array of teachers given a valid token", async () => {
        const token = jwt.sign({}, config.secretJWT);
        const response = await agent.get("/teachers").set("Authorization", token);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.status).toBe(200);
    });
});

describe("GET /teachers/disciplines/:name", () => {

    it("should answer with status 401 given a non existing token", async () => {
        const response = await agent.get("/teachers/disciplines/test");
        expect(response.body.length).toBeUndefined;
        expect(response.status).toBe(401);
    });
    it("should answer with status 401 given an invalid token", async () => {
        const response = await agent.get("/teachers/disciplines/test").set("Authorization", 'invalid-token');
        expect(response.body.length).toBeUndefined;
        expect(response.status).toBe(401);
    });
    it("should answer with status 401 given an expired token", async () => {
        const token = jwt.sign({}, config.secretJWT, { expiresIn: 0 });
        const response = await agent.get("/teachers/disciplines/test").set("Authorization", token);
        expect(response.body.length).toBeUndefined;
        expect(response.status).toBe(401);
    });
    it("should answer with status 200 and an array of teachers of a discipline given a valid token", async () => {
        const token = jwt.sign({}, config.secretJWT);
        const response = await agent.get("/teachers/disciplines/test").set("Authorization", token);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.status).toBe(200);
    });
});

async function disconnect() {
    await client.$disconnect();
}