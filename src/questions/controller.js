const problems = require("../problems/questions");

module.exports = {
  async getAll(req, res) {
    try {
      let questions = [];
      for (const question in problems) {
        questions.push({
          number: question,
          description: problems[question].description,
        });
      }

      return res.send({
        status: "success",
        data: questions && questions.length ? questions : [],
      });
    } catch (error) {
      console.error(error);
      return res.status(400).send({
        status: "failure",
      });
    }
  },
  async getOne(req, res) {
    try {
      const question = parseInt(req.params?.question) || false;

      if (!question || !problems[question]) {
        return res.status(400).send({
          status: "failure",
          message: "Invalid question",
        });
      }

      return res.send({
        status: "success",
        data: {
          description: problems[question].description,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(400).send({
        status: "failure",
      });
    }
  }
};
