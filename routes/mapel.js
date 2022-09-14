var express = require("express");
var router = express.Router();

const controller = require('../controllers/mapelController');

router.get('/', controller.getAllMapel); // GET ALL MAPEL
router.get('/:id', controller.getMapel); // GET MAPEL
router.post('/', controller.createMapel); // CREATE ROUTE
router.put('/:id', controller.updateMapel); // UPDATE ROUTE
router.delete('/:id', controller.deleteMapel); // DELETE ROUTE

module.exports = router;