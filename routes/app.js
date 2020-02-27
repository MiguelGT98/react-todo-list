// routes/app.js
// De express obtiene una instancia del componente Router
let router = require("express").Router();
// Importa el controlador que creamos
let PagesController = require("../controllers/PagesController");

// Establece que al hacer una petición GET a la ruta / se conteste
// con las palabras "Hello World!"
router.get("/", PagesController.homepage);
router.get("/product/:id", PagesController.product);
router.get("/product/:id/editar", PagesController.editProduct);

router.post("/product/:id/editar", PagesController.postProduct);

// Identifica la ruta "/about" y la respuesta de la ruta
router.get("/about", PagesController.about);

// Exporta las configuraciones
module.exports = router;
