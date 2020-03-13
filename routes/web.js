let router = require("express").Router();
let homepageController = require("../controllers/HomepageController");
let authController = require("../controllers/AuthController");
let authValidator = require("../validators/AuthValidators");
let passport = require("passport");

router.get("/", homepageController.index);

// Authentication routes
router.get("/login", authController.login);
router.get("/register", authController.register);
router.get("/password-recovery", authController.passwordRecovery);
router.post("/password-recovery", authController.recoverPassword);
router.get("/change-password/:id", authController.getChangePassword);
router.post("/change-password/:id", authController.postChangePassword);
router.post("/register", authValidator.store, authController.store);
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login?authError=1",
    successRedirect: "/app/dashboard"
  })
);
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
