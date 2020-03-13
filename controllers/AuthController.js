const { validationResult } = require("express-validator");
let userModel = require("../models/User");

exports.login = (req, res) => {
  let user = req.user;
  console.log(user);
  const changed = req.query.changed ? true : false;

  let authError = req.query.authError == 1 ? "Invalid register data" : null;
  res.render("auth/login", { layout: "auth", authError: authError, changed });
};

exports.register = (req, res) => {
  res.render("auth/register", {
    layout: "auth",
    errors: req.flash("errors")
  });
};

exports.passwordRecovery = (req, res) => {
  res.render("auth/passwordRecovery", {
    layout: "auth",
    errors: req.flash("errors")
  });
};

exports.recoverPassword = (req, res) => {
  userModel.generatePasswordLink(req.body.email).then(link => {
    res.render("auth/passwordRecovery", {
      layout: "auth",
      link,
      errors: req.flash("errors")
    });
  });
};

exports.getChangePassword = (req, res) => {
  userModel.validatePasswordLink(req.params.id).then(valid => {
    if (!valid) {
      return res.status(410).json("This link has expired");
    }

    return res.render("auth/changePassword", {
      layout: "auth"
    });
  });
};

exports.postChangePassword = (req, res) => {
  userModel.changePassword(req.params.id, req.body).then(changed => {
    if (!changed) return res.redirect("/login?changed=false");

    return res.redirect("/login?changed=true");
  });
};

exports.store = (req, res) => {
  // Identifica si hubieron errores en el request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("errors", errors.array());
    return res.redirect("back");
  }
  userModel
    .create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
    .then(data => {
      return res.redirect("/login");
    })
    .catch(error => console.log(error));
};
