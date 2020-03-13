let userModel = require("../models/User");

exports.users = (req, res) => {
  let user = req.user;
  userModel.all().then(users => {
    return res.render("admin/users", { user, users });
  });
};
