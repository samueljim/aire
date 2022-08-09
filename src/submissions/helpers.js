require('./model');

const mongoose = require('mongoose');
const Submissions = mongoose.model("Submissions");

module.exports = {
  async getAll() {
    return await Submissions.find({});
  },
  async getForQuestion(question) {
    return await Submissions.find({ question });
  },
  async addNew({ name, correct, question }) {
    return await new Submissions({ name, correct, question }).save();
  },
  async countAttempts(question) {
    const attempts = await Submissions.find({ question });

    // find the number of attempts for each name
    const counts = {};
    attempts.forEach(({ name, correct, submissionTime }) => {
      counts[name] = counts[name] || {};
      counts[name].attempts = (counts[name].attempts || 0) + 1;
      // get the first correct submission time for each name
      if (
        correct &&
        (!counts[name].earliestCorrectTime ||
          submissionTime < counts[name].earliestCorrectTime)
      ) {
        counts[name].earliestCorrectTime = submissionTime;
      }
    });
    // convert to array of objects
    const result = Object.keys(counts)
      .map((name) => ({
        name,
        attempts: counts[name].attempts,
        earliestCorrectTime: counts[name].earliestCorrectTime,
      }))
      .sort((a, b) => a.attempts - b.attempts)
      .sort((a, b) => {
        // sort by attempts and also first submission of the correct answer.
        // This is done to an hour accuracy as exact time is not important and this way we get better results.
        const aDate = new Date(a.submissionTime);
        const bDate = new Date(b.submissionTime);
        return aDate.getHours() - bDate.getHours();
      });

    return result;

    // This solution almost works but it gets earliest submission time instead of the earliest correct submission time
    // const counts = await Submissions.aggregate([
    //   {
    //     $group: {
    //       _id: "$name",
    //       attempts: { $sum: 1 },
    //       submissionTime: { $min: "$submissionTime" },
    //     },
    //   },
    //   { $match: { correct: { $ne: false } } },
    //   { $sort: { attempts: -1 } },
    // ]);
    // return counts;
  },
};
