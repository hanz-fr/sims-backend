var express = require("express");
var router = express.Router();

const controller = require('../controllers/raportController');

router.get('/', controller.getAllRaport); // get all raport
router.get('/:id', controller.getRaport); // get raport 
router.post('/', controller.createRaport); // create raport
router.put('/:id', controller.updateRaport); // update raport
router.delete('/:id', controller.deleteRaport); // delete raport

module.exports = router;