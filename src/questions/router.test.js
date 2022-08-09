const request = require("supertest");
const baseURL = "http://localhost:3000";

describe("test /questions", () => {
  it("check that a valid status code is returned", async () => {
    const response = await request(baseURL).get("/questions");

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("success");
    // expect(Array.isArray(response.body.data)).toBe(true);

    const question = response.body.data[0];
    expect(question.number).toBe("1");
    expect(question.description).toBe(
      "<p>If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.</p><p>Find the sum of all the multiples of 3 or 5 below 1000.</p>"
    );
  });
});