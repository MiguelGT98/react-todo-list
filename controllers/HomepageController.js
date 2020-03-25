const Task = require('../models/Task');

exports.index = (req, res) => {
  let tasks = Task.all().then((tasks) => {
    tasks.sort((a, b) => {
      return b.id - a.id;
    });
    res.render('homepage/index', {tasks: tasks});
  });
}