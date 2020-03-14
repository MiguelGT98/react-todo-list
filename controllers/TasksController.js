const Task = require("../models/Task");

exports.store = (req, res) => {
  let task = {};
  task.description = req.body.description;
  Task.create(task).then(id => {
    console.log("Task created with id: ", id);
    res.redirect("/");
  });
};

exports.done = (req, res) => {
  Task.find(req.params.id)
    .then(task => {
      if (task) {
        return Task.done(req.params.id);
      }
    })
    .then(id => {
      console.log(`Task with id: ${id} done`);
      res.redirect("/");
    });
};
