const request = require("supertest");
const baseURL = "http://localhost:3000";

const names = ['penny', 'sam', 'dave', 'mike', 'bob', 'dave', 'alex', 'jane', 'jill', 'jake', 'jim', 'jess', 'joe', 'edward'];
const randomName = () => {
  return names[Math.floor(Math.random() * names.length)];
}
describe("tests on endpoints", () => {
  it("check that a valid status code is returned", async () => {
    const response = await request(baseURL).get("/submissions");

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("success");
    // expect(Array.isArray(response.body.data)).toBe(true);

    const submission = response.body.data[0];
    expect(submission.correct).toBeDefined();
    expect(submission.name).toBeDefined();
    expect(submission.submissionTime).toBeDefined();
  });
  it("check that a metrics are returned", async () => {
    const response = await request(baseURL).get("/submissions/1/metrics");
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("success");
    const metrics = response.body.data[0];
    expect(metrics.attempts).toBeDefined();
    expect(metrics.name).toBeDefined();
    // expect(metrics.submissionTime).toBeDefined();
  });
});
describe("check that submitting a answer works", () => {
  it("no question", async () => {
    const response = await request(baseURL)
      .post("/submissions")
      .send({ name: randomName() });
    expect(response.statusCode).toBe(404);
  });
  it("invalid question", async () => {
     const response = await request(baseURL)
       .post("/submissions/23")
       .send({ name: randomName() });
     expect(response.statusCode).toBe(400);
     expect(response.body.status).toBe("failure");
     expect(response.body.message).toBe("Invalid question");
   });
     it("no answer to question", async () => {
       const response = await request(baseURL)
         .post("/submissions/1")
         .send({ name: randomName() });
       expect(response.statusCode).toBe(400);
       expect(response.body.status).toBe("failure");
       expect(response.body.message).toBe("Invalid answer");
     });
     it("incorrect answer to question", async () => {
       const response = await request(baseURL)
         .post("/submissions/1")
         .send({ name: randomName(), answer: "incorrect" });
       
       expect(response.statusCode).toBe(200);
       expect(response.body.status).toBe("success");
       expect(response.body.correct).toBe(false);
     });

    it("correct answer to question", async () => {
      const response = await request(baseURL)
        .post("/submissions/1")
        .send({ name: randomName(), answer: 233168 });
      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.correct).toBe(true);
    });
     it("correct answer to question but as string instead of number", async () => {
       const response = await request(baseURL)
         .post("/submissions/1")
         .send({ name: randomName(), answer: "233168" });
       expect(response.statusCode).toBe(200);
       expect(response.body.status).toBe("success");
       expect(response.body.correct).toBe(true);
     });
    it("incorrect answer to question 3", async () => {
      const response = await request(baseURL)
        .post("/submissions/3")
        .send({ name: randomName(), answer: "2332168" });
      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.correct).toBe(false);
    });
    it("correct answer to question 3", async () => {
      const response = await request(baseURL)
        .post("/submissions/3")
        .send({ name: randomName(), answer: 6857 });
      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.correct).toBe(true);
    });
  it("get for question returns only that question", async () => {
        const response = await request(baseURL)
        .get("/submissions/3")
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("success");
    response.body.data.every((submission) => {
      expect(submission.question).toBe(3);
    });
  });
  it("expect answer to increase the number of attempts in database", async () => {
    const name = randomName();
    const before = await request(baseURL).get("/submissions/1/metrics");
    expect(before.statusCode).toBe(200);
    // get the number of attempts for name before submitting an answer
    const beforeAttempts =
      before.body.data.find((metric) => metric.name === name)?.attempts || 0;

    await request(baseURL)
      .post("/submissions/1")
      .send({ name: name, answer: 123 });

    const after = await request(baseURL).get("/submissions/1/metrics");
    const afterAttempts = after.body.data.find(
      (metric) => metric.name === name
    ).attempts;
    expect(afterAttempts).toBe(beforeAttempts + 1);
  });
});