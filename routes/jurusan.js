var express = require("express");
var router = express.Router();

const controller = require('../controllers/jurusanController');

router.get('/', controller.getAllJurusan); // GET ALL JURUSAN
router.get('/:id', controller.getJurusan); // GET JURUSAN BY ID
router.post('/', controller.createJurusan); // CREATE JURUSAN
router.put('/:id', controller.updateJurusan); // UPDATE JURUSAN 
router.delete('/:id', controller.deleteJurusan); // DELETE JURUSAN
router.get('/all/count', controller.findAndCountAllJurusan); // FIND AND COUNT ALL JURUSAN
router.get('/count-siswa/:jurusanid', controller.countSiswaPerJurusan);

module.exports = router;