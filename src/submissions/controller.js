const helpers = require("./helpers");
const problems = require("../problems/questions");

module.exports = {
  async getAll(req, res) {
    try {
      const submissions = await helpers.getAll({});

      return res.send({
        status: "success",
        data: submissions && submissions.length ? submissions : [],
      });
    } catch (error) {
      return res.status(400).send({
        status: "failure",
      });
    }
  },
  async getForQuestion(req, res) {
    try {
      const question = parseInt(req.params?.question) || false;
      const submissions = await helpers.getForQuestion( question );

      return res.send({
        status: "success",
        data: submissions && submissions.length ? submissions : [],
      });
    } catch (error) {
      console.error(error);
      return res.status(400).send({
        status: "failure",
      });
    }
  },
  async answerQuestion(req, res) {
    try {
      const question = parseInt(req.params?.question) || false;

      if (!question || !problems[question]) {
        return res.status(400).send({
          status: "failure",
          message: "Invalid question",
        });
      }
      const { name, answer } = req.body;
      
      if (!answer) {
        return res.status(400).send({
          status: "failure",
          message: "Invalid answer format",
        });
      }
      // is the answer correct
      const correct_answer = problems[question].answer;
      const correct = correct_answer == answer;

      // write this submission to the database
      await helpers.addNew({ name, correct, question });

      return res.send({
        status: "success",
        correct,
      });
    } catch (error) {
      return res.status(400).send({
        status: "failure",
        correct: false,
      });
    }
  },
  async countAttempts(req, res) {
    try {
      const question = parseInt(req.params?.question) || false;
      if (!question || !problems[question]) {
        return res.status(400).send({
          status: "failure",
          message: "Invalid question",
        });
      }
      
      let attempts = await helpers.countAttempts(question);

      return res.send({
        status: "success",
        data: attempts && attempts.length ? attempts : [],
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        status: "failure",
      });
    }
  },
};
