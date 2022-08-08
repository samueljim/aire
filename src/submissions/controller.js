const helpers = require('./helpers');

module.exports = {
  async getAll(req, res) {
    try {
      const submissions = await helpers.getAll({});

      return res.send({
        status: "success",
        body: submissions && submissions.length ? submissions : [],
      });
    } catch (error) {
      return res.status(400).send({
        status: "failure",
      });
    }
  },
  async addNew(req, res) {
    try {
      // TODO work out if result is correct
      const { name, answer } = req.body;
      const correct = answer === "correct";
      const correctTime = (correct) ? new Date() : null;
      
      await helpers.addNew({ name, correct, correctTime });

      return res.send({
        status: "success",
      });
    } catch (error) {
      return res.status(400).send({
        status: "failure",
      });
    }
  },
  async countAttempts(req, res) {
    try {
      const attempts = await helpers.countAttempts({});

      return res.send({
        status: "success",
        body: attempts && attempts.length ? attempts : [],
      });
    } catch (error) {
      return res.status(400).send({
        status: "failure",
      });
    }
  },
};
