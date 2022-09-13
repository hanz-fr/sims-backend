var express = require("express");
var router = express.Router();

const controller = require('../controllers/ortuController');

 
router.get('/', controller.getAllOrtu); // get all ortu

router.get('/:id', controller.getOrtu); // get ortu by id

router.post('/', controller.createOrtu); // create route

router.put('/:id', controller.updateOrtu); // update route

router.delete('/:id', controller.deleteOrtu);  // delete route

module.exports = router;
