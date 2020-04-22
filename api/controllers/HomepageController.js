const Task = require("../models/Task");

exports.index = (req, res) => {
  return Task.all().then((tasks) => {
    tasks = tasks.sort((a, b) => {
      return b.id - a.id;
    });

    res.status(200).json({ tasks });
  });
};
