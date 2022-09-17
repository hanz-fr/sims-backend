var express = require("express");
var router = express.Router();

const controller = require('../controllers/nilaiMapelController');

router.get('/', controller.getAllNilaiMapel);
router.get('/:id', controller.getNilaiMapel);
router.post('/', controller.createNilaiMapel);
router.put('/:id', controller.updateNilaiMapel);
router.delete('/:id', controller.deleteNilaiMapel);

module.exports = router;