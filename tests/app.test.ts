import { Category, Discipline, Teacher, TeacherDiscipline, Term, Test } from ".prisma/client";
import { faker } from "@faker-js/faker";
import jwt from "jsonwebtoken";
import supertest from "supertest";
import seed from "../prisma/seed.js";
import app from "../src/app.js";
import config from "../src/config.js";
import { client } from "../src/database.js";
import { createTest } from "./factories/testFactory.js";
import { createUser, insertUser } from "./factories/userFactory.js";

const agent = supertest(app);

interface SeedElements {
    term: Term;
    teacher: Teacher;
    discipline: Discipline;
    teacherDiscipline: TeacherDiscipline;
    category: Category;
    test: Test
}

let seedElements: SeedElements

afterAll( async () => await client.$disconnect());
beforeEach( async () => {
    await client.$executeRaw`TRUNCATE TABLE users CASCADE;`;
    await client.$executeRaw`TRUNCATE TABLE terms CASCADE;`;
    await client.$executeRaw`TRUNCATE TABLE teachers CASCADE;`;
    await client.$executeRaw`TRUNCATE TABLE categories CASCADE;`;
    seedElements = await seed();
})

describe("POST /users/sign-up", () => {

  it("should answer with status 201 when credentials are valid", async () => {
    const user = createUser();
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
    const user = createUser();
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

  it("should answer with status 200 when credentials are valid", async () => {
    const user = createUser();
    await insertUser(user);
    const response = await agent.post("/users/sign-in").send({ email: user.email, password: user.password });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it("should answer with status 401 when email is invalid", async () => {
    const user = createUser();
    const response = await agent.post("/users/sign-in").send(user);
    expect(response.status).toBe(401);
  });

  it("should answer with status 401 when password is invalid", async () => {
    const user = createUser();
    await insertUser(user);
    const response = await agent.post("/users/sign-in").send({...user, password:'wrong-password'});
    expect(response.status).toBe(401);
  });

  it("should answer with status 422 given a invalid body", async () => {
    const response = await agent.post("/users/sign-in").send();
    expect(response.status).toBe(422);
  });
});

describe("GET /terms", () => {
    it("should answer with status 401 given a non existing token", async () => {
        const response = await agent.get("/terms");
        expect(response.body.length).toBeUndefined;
        expect(response.status).toBe(401);
    });
    it("should answer with status 401 given an invalid token", async () => {
        const response = await agent.get("/terms").set("Authorization", 'invalid-token');
        expect(response.body.length).toBeUndefined;
        expect(response.status).toBe(401);
    });
    it("should answer with status 401 given an expired token", async () => {
        const token = jwt.sign({}, config.secretJWT, { expiresIn: 0 });
        const response = await agent.get("/terms").set("Authorization", token);
        expect(response.body.length).toBeUndefined;
        expect(response.status).toBe(401);
    });
    
    it("should answer with status 200 and an aarray of terms given a valid token", async () => {
        const token = jwt.sign({}, config.secretJWT);
        const response = await agent.get("/terms").set("Authorization", token);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.status).toBe(200);
    });
});

describe("GET /teachers", () => {
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
        const disciplineName = seedElements.discipline.name
        const response = await agent.get(`/teachers/disciplines/${disciplineName}`);
        expect(response.body.length).toBeUndefined;
        expect(response.status).toBe(401);
    });
    it("should answer with status 401 given an invalid token", async () => {
        const disciplineName = seedElements.discipline.name
        const response = await agent.get(`/teachers/disciplines/${disciplineName}`).set("Authorization", 'invalid-token');
        expect(response.body.length).toBeUndefined;
        expect(response.status).toBe(401);
    });
    it("should answer with status 401 given an expired token", async () => {
        const token = jwt.sign({}, config.secretJWT, { expiresIn: 0 });
        const disciplineName = seedElements.discipline.name
        const response = await agent.get(`/teachers/disciplines/${disciplineName}`).set("Authorization", token);
        expect(response.body.length).toBeUndefined;
        expect(response.status).toBe(401);
    });
    it("should answer with status 404 given a non existing discipline", async () => {
        const token = jwt.sign({}, config.secretJWT);
        const response = await agent.get(`/teachers/disciplines/non-existing-discipline`).set("Authorization", token);
        expect(response.body.length).toBeUndefined;
        expect(response.status).toBe(404);
    });
    it("should answer with status 200 and an array of teachers of a discipline given a valid token and discipline name", async () => {
        const token = jwt.sign({}, config.secretJWT);
        const disciplineName = seedElements.discipline.name
        const response = await agent.get(`/teachers/disciplines/${disciplineName}`).set("Authorization", token);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.status).toBe(200);
    });
});

describe("GET /disciplines", () => {
    it("should answer with status 401 given a non existing token", async () => {
        const response = await agent.get("/disciplines");
        expect(response.body.length).toBeUndefined;
        expect(response.status).toBe(401);
    });
    it("should answer with status 401 given an invalid token", async () => {
        const response = await agent.get("/disciplines").set("Authorization", 'invalid-token');
        expect(response.body.length).toBeUndefined;
        expect(response.status).toBe(401);
    });
    it("should answer with status 401 given an expired token", async () => {
        const token = jwt.sign({}, config.secretJWT, { expiresIn: 0 });
        const response = await agent.get("/disciplines").set("Authorization", token);
        expect(response.body.length).toBeUndefined;
        expect(response.status).toBe(401);
    });
    it("should answer with status 200 and an array of disciplines given a valid token", async () => {
        const token = jwt.sign({}, config.secretJWT);
        const response = await agent.get("/disciplines").set("Authorization", token);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.status).toBe(200);
    });
});

describe("GET /disciplines/terms/:id", () => {
    it("should answer with status 401 given a non existing token", async () => {
        const termId = seedElements.term.id
        const response = await agent.get(`/disciplines/terms/${termId}`);
        expect(response.body.length).toBeUndefined;
        expect(response.status).toBe(401);
    });
    it("should answer with status 401 given an invalid token", async () => {
        const termId = seedElements.term.id
        const response = await agent.get(`/disciplines/terms/${termId}`).set("Authorization", 'invalid-token');
        expect(response.body.length).toBeUndefined;
        expect(response.status).toBe(401);
    });
    it("should answer with status 401 given an expired token", async () => {
        const termId = seedElements.term.id
        const token = jwt.sign({}, config.secretJWT, { expiresIn: 0 });
        const response = await agent.get(`/disciplines/terms/${termId}`).set("Authorization", token);
        expect(response.body.length).toBeUndefined;
        expect(response.status).toBe(401);
    });
    it("should answer with status 404 given a non existing term", async () => {
        const token = jwt.sign({}, config.secretJWT);
        const nonExistingTerm = seedElements.term.id + 1
        const response = await agent.get(`/disciplines/terms/${nonExistingTerm}`).set("Authorization", token);
        expect(response.body.length).toBeUndefined;
        expect(response.status).toBe(404);
    });
    it("should answer with status 200 and an array of teachers of a discipline given a valid token and term id", async () => {
        const termId = seedElements.term.id
        const token = jwt.sign({}, config.secretJWT);
        const response = await agent.get(`/disciplines/terms/${termId}`).set("Authorization", token);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.status).toBe(200);
    });
});

describe("GET /categories", () => {
    it("should answer with status 401 given a non existing token", async () => {
        const response = await agent.get("/categories");
        expect(response.body.length).toBeUndefined;
        expect(response.status).toBe(401);
    });
    it("should answer with status 401 given an invalid token", async () => {
        const response = await agent.get("/categories").set("Authorization", 'invalid-token');
        expect(response.body.length).toBeUndefined;
        expect(response.status).toBe(401);
    });
    it("should answer with status 401 given an expired token", async () => {
        const token = jwt.sign({}, config.secretJWT, { expiresIn: 0 });
        const response = await agent.get("/categories").set("Authorization", token);
        expect(response.body.length).toBeUndefined;
        expect(response.status).toBe(401);
    });
    it("should answer with status 200 and an array of categories given a valid token", async () => {
        const token = jwt.sign({}, config.secretJWT);
        const response = await agent.get("/categories").set("Authorization", token);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.status).toBe(200);
    });
});

describe("GET /tests/disciplines/:id", () => {
    it("should answer with status 401 given a non existing token", async () => {
        const disciplineId = seedElements.discipline.id
        const response = await agent.get(`/tests/disciplines/${disciplineId}`);
        expect(response.body.length).toBeUndefined;
        expect(response.status).toBe(401);
    });
    it("should answer with status 401 given an invalid token", async () => {
        const disciplineId = seedElements.discipline.id
        const response = await agent.get(`/tests/disciplines/${disciplineId}`).set("Authorization", 'invalid-token');
        expect(response.body.length).toBeUndefined;
        expect(response.status).toBe(401);
    });
    it("should answer with status 401 given an expired token", async () => {
        const token = jwt.sign({}, config.secretJWT, { expiresIn: 0 });
        const disciplineId = seedElements.discipline.id
        const response = await agent.get(`/tests/disciplines/${disciplineId}`).set("Authorization", token);
        expect(response.body.length).toBeUndefined;
        expect(response.status).toBe(401);
    });
    it("should answer with status 404 given a non existing discipline", async () => {
        const token = jwt.sign({}, config.secretJWT);
        const nonExistingDiscipline = seedElements.discipline.id + 1
        const response = await agent.get(`/tests/disciplines/${nonExistingDiscipline}`).set("Authorization", token);
        expect(response.body.length).toBeUndefined;
        expect(response.status).toBe(404);
    });
    it("should answer with status 200 and an array of tests given a valid token and discipline id", async () => {
        const token = jwt.sign({}, config.secretJWT);
        const disciplineId = seedElements.discipline.id
        const response = await agent.get(`/tests/disciplines/${disciplineId}`).set("Authorization", token);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.status).toBe(200);
    });
});

describe("GET /tests/teachers/:id", () => {
    it("should answer with status 401 given a non existing token", async () => {
        const teacherId = seedElements.teacher.id
        const response = await agent.get(`/tests/teachers/${teacherId}`);
        expect(response.body.length).toBeUndefined;
        expect(response.status).toBe(401);
    });
    it("should answer with status 401 given an invalid token", async () => {
        const teacherId = seedElements.teacher.id
        const response = await agent.get(`/tests/teachers/${teacherId}`).set("Authorization", 'invalid-token');
        expect(response.body.length).toBeUndefined;
        expect(response.status).toBe(401);
    });
    it("should answer with status 401 given an expired token", async () => {
        const token = jwt.sign({}, config.secretJWT, { expiresIn: 0 });
        const teacherId = seedElements.teacher.id
        const response = await agent.get(`/tests/teachers/${teacherId}`).set("Authorization", token);
        expect(response.body.length).toBeUndefined;
        expect(response.status).toBe(401);
    });
    it("should answer with status 404 given a non existing teacher", async () => {
        const token = jwt.sign({}, config.secretJWT);
        const nonExistingTeacher = seedElements.teacher.id + 1
        const response = await agent.get(`/tests/teachers/${nonExistingTeacher}`).set("Authorization", token);
        expect(response.body.length).toBeUndefined;
        expect(response.status).toBe(404);
    });
    it("should answer with status 200 and an array of tests given a valid token and teacher id", async () => {
        const token = jwt.sign({}, config.secretJWT);
        const teacherId = seedElements.teacher.id
        const response = await agent.get(`/tests/teachers/${teacherId}`).set("Authorization", token);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.status).toBe(200);
    });
});

describe("PATCH /tests/:id/view'", () => {
    it("should answer with status 401 given a non existing token", async () => {
        const testId = seedElements.test.id
        const response = await agent.patch(`/tests/${testId}/view`);
        expect(response.body.length).toBeUndefined;
        expect(response.status).toBe(401);
    });
    it("should answer with status 401 given an invalid token", async () => {
        const testId = seedElements.test.id
        const response = await agent.patch(`/tests/${testId}/view`).set("Authorization", 'invalid-token');
        expect(response.body.length).toBeUndefined;
        expect(response.status).toBe(401);
    });
    it("should answer with status 401 given an expired token", async () => {
        const token = jwt.sign({}, config.secretJWT, { expiresIn: 0 });
        const testId = seedElements.test.id
        const response = await agent.patch(`/tests/${testId}/view`).set("Authorization", token);
        expect(response.body.length).toBeUndefined;
        expect(response.status).toBe(401);
    });
    it("should answer with status 404 given a non existing test", async () => {
        const token = jwt.sign({}, config.secretJWT);
        const nonExistingTest = seedElements.test.id + 1
        const response = await agent.patch(`/tests/${nonExistingTest}/view`).set("Authorization", token);
        expect(response.body.length).toBeUndefined;
        expect(response.status).toBe(404);
    });
    it("should answer with status 200 given a valid token and test id", async () => {
        const token = jwt.sign({}, config.secretJWT);
        const testId = seedElements.test.id
        const response = await agent.patch(`/tests/${testId}/view`).set("Authorization", token);
        const createdTests = await client.test.findFirst({
            where:{
                name: seedElements.test.name
            }
        })
        expect(createdTests.views).toBe(1);
        expect(response.body.length).toBeUndefined;
        expect(response.status).toBe(200);
    });
});

describe("POST /tests", () => {
    it("should answer with status 401 given a non existing token", async () => {
        const response = await agent.get("/categories");
        const createdTests = await client.test.findMany()
        expect(createdTests.length).toBe(1);
        expect(response.body.length).toBeUndefined;
        expect(response.status).toBe(401);
    });
    it("should answer with status 401 given an invalid token", async () => {
        const response = await agent.get("/categories").set("Authorization", 'invalid-token');
        const createdTests = await client.test.findMany()
        expect(createdTests.length).toBe(1);
        expect(response.body.length).toBeUndefined;
        expect(response.status).toBe(401);
    });
    it("should answer with status 401 given an expired token", async () => {
        const token = jwt.sign({}, config.secretJWT, { expiresIn: 0 });
        const response = await agent.get("/categories").set("Authorization", token);
        const createdTests = await client.test.findMany()
        expect(createdTests.length).toBe(1);
        expect(response.body.length).toBeUndefined;
        expect(response.status).toBe(401);
    });
    it("should answer with status 404 given a non existing category", async () => {
        const test:any = createTest(seedElements)
        test.category = faker.lorem.word()
        const token = jwt.sign({}, config.secretJWT);
        const response = await agent.post(`/tests`).send(test).set("Authorization", token);
        const createdTests = await client.test.findMany()
        expect(createdTests.length).toBe(1);
        expect(response.body.length).toBeUndefined;
        expect(response.status).toBe(404);
    });
    it("should answer with status 400 given a non exising relation between teacher and discipline", async () => {
        const test:any = createTest(seedElements)
        test.teacher = faker.lorem.word()
        test.discipline = faker.lorem.word()
        const token = jwt.sign({}, config.secretJWT);
        const response = await agent.post(`/tests`).send(test).set("Authorization", token);
        const createdTests = await client.test.findMany()
        expect(createdTests.length).toBe(1);
        expect(response.body.length).toBeUndefined;
        expect(response.status).toBe(400);
    });
    it("should answer with status 201 given a valid body", async () => {
        const test:any = createTest(seedElements)
        const token = jwt.sign({}, config.secretJWT);
        const response = await agent.post(`/tests`).send(test).set("Authorization", token);
        const createdTests = await client.test.findMany()
        expect(createdTests.length).toBe(2);
        expect(response.status).toBe(201);
    });
});