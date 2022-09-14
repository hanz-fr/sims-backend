var express = require("express");
var router = express.Router();

const controller = require('../controllers/nilaiAkhirController');

router.get('/', controller.getAllNilaiAkhir); // GET ALL NILAIAKHIR
router.get('/:id', controller.getNilaiAkhir); // GET NILAIAKHIR BY ID
router.post('/', controller.createNilaiAkhir); // CREATE NILAIAKHIR
router.put('/:id', controller.updateNilaiAkhir); // UPDATE NILAIAKHIR 
router.delete('/:id', controller.deleteNilaiAkhir); // DELETE NILAIAKHIR

module.exports = router;