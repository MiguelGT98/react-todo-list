const router = require("express").Router();
const homepageController = require("../controllers/HomepageController");
const tasksController = require("../controllers/TasksController");

router.get("/", homepageController.index);

router.post("/task", tasksController.store);
router.patch("/task/:id", tasksController.done);
router.get("/task/:id", tasksController.get);
router.delete("/task/:id", tasksController.delete);

module.exports = router;
