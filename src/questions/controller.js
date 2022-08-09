const problems = require("../problems/questions");

module.exports = {
  async getAll(req, res) {
    try {
      let questions = [];
      for (const question in problems) {
        questions.push({
          question,
          description: problems[question].description,
        });
      }

      return res.send({
        status: "success",
        body: questions && questions.length ? questions : [],
      });
    } catch (error) {
      console.error(error);
      return res.status(400).send({
        status: "failure",
      });
    }
  }
};
