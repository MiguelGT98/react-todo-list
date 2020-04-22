const Task = require("../models/Task");

exports.store = (req, res) => {
  let task = {};
  task.description = req.body.description;
  Task.create(task).then((id) => {
    if (req.xhr || req.headers.accept.indexOf("json") >= 0) {
      Task.find(id).then((task) => {
        res.json(task);
      });
    } else {
      res.redirect("/");
    }
  });
};

exports.done = (req, res) => {
  Task.find(req.params.id)
    .then((task) => {
      if (task) {
        return Task.done(req.params.id);
      }
    })
    .then(() => {
      if (req.xhr || req.headers.accept.indexOf("json") >= 0) {
        Task.find(req.params.id).then((task) => {
          res.json(task);
        });
      } else {
        res.redirect("/");
      }
    });
};

exports.delete = (req, res) => {
  Task.find(req.params.id)
    .then((task) => {
      if (task) {
        return Task.delete(req.params.id);
      }
    })
    .then(() => {
      if (req.xhr || req.headers.accept.indexOf("json") >= 0) {
        res.json({ id: req.params.id });
      } else {
        res.redirect("/");
      }
    });
};

exports.get = (req, res) => {
  Task.find(req.params.id).then((task) => {
    if (task) {
      res.status(200).json(task);
    }

    res.status(404).json({ error: { message: "Task with id not found" } });
  });
};
