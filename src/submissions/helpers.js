require('./model');

const mongoose = require('mongoose');
const Submissions = mongoose.model("Submissions");

module.exports = {
  async getAll() {
    return await Submissions.find({});
  },
  async addNew({ name, correct }) {
    return await new Submissions({ name, correct }).save();
  },
  async countAttempts() {
    const attempts = await Submissions.find({});

    // find the number of attempts for each name
    const counts = {};
    attempts.forEach(({ name, correct, submissionTime }) => {
      counts[name] = counts[name] || {};
      counts[name].attempts = (counts[name].attempts || 0) + 1;
      // get the first correct submission time for each name
      if (
        correct &&
        (!counts[name].submissionTime ||
          submissionTime < counts[name].submissionTime)
      ) {
        counts[name].submissionTime = submissionTime;
      }
    });
    // convert to array of objects
    const result = Object.keys(counts).map(name => ({
      name,
      attempts: counts[name].attempts,
      submissionTime: counts[name].submissionTime,
    }));
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
    
  }
};
