const Task = require("../models/Task");

exports.store = (req, res) => {
  let task = {};
  task.description = req.body.description;
  Task.create(task).then(id => {
    if (req.xhr || req.headers.accept.indexOf("json") >= 0) {
      Task.find(id).then(task => {
        res.json(task);
      });
    } else {
      res.redirect("/");
    }
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
