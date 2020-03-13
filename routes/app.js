let router = require("express").Router();
let dashboardController = require("../controllers/DashboardController");
let adminController = require("../controllers/AdminController");
let authMiddleware = require("../middlewares/AuthMiddleware");

router.get("/dashboard", dashboardController.index);
router.get("/users", authMiddleware.isAdmin, adminController.users);

module.exports = router;
