let userModel = require("../models/User");
let Handlebars = require("handlebars");
Handlebars.registerHelper("ifEquals", function(arg1, arg2, options) {
  return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});

exports.index = (req, res) => {
  let user = req.user;

  res.render("dashboard/index", { user: user });
};

exports.uploadFile = (req, res) => {
  const path = req.file.path;

  const user = req.user;

  userModel.uploadPhoto(user.id, path).then(() => {
    return res.redirect("/app/dashboard");
  });
};
