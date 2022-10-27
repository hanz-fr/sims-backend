var express = require("express");
var router = express.Router();

const controller = require('../controllers/mapelJurusanController');

router.get('/', controller.getAllMapelJurusan); // GET ALL MAPEL JURUSAN
router.get('/:mapelJurusanId', controller.getMapelJurusan); // GET MAPEL JURUSAN
router.get('/get/by-jurusan/:jurusanId', controller.getAllMapelbyJurusan); // GET ALL MAPELJURUSAN BY JURUSAN
router.post('/', controller.createMapelJurusan); // CREATE ROUTE
router.put('/:mapelJurusanId', controller.updateMapelJurusan); // UPDATE ROUTE
router.delete('/:mapelJurusanId', controller.deleteMapelJurusan); // DELETE ROUTE

module.exports = router;