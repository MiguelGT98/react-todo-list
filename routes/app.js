let router = require("express").Router();
let dashboardController = require("../controllers/DashboardController");
let adminController = require("../controllers/AdminController");
let authMiddleware = require("../middlewares/AuthMiddleware");
let multer = require("multer");
var path = require("path");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  }
});

var upload = multer({ storage: storage });

router.get("/dashboard", dashboardController.index);
router.get("/users", authMiddleware.isAdmin, adminController.users);
router.post("/upload", upload.single("file"), dashboardController.uploadFile);

module.exports = router;
