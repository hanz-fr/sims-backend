var express = require("express");
var router = express.Router();

const controller = require('../controllers/mutasiController');


router.get('/', controller.getAllMutasi);
router.get('/:id', controller.getMutasi);
router.post('/', controller.createMutasi);
router.put('/:id', controller.updateMutasi);
router.delete('/:id', controller.deleteMutasi);

module.exports = router;