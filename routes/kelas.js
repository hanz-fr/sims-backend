var express = require("express");
var router = express.Router();

const controller = require('../controllers/kelasController');


router.get('/', controller.getAllKelas); // get all kelas

router.get('/:id', controller.getKelas); // get kelas by id

// router.get('/siswa-by-kelas/:id', controller.getSiswaInKelas); // get siswa by kelas id

router.get('/siswa-by-kelas/get', controller.getSiswaByKelas);

router.post('/', controller.createKelas); // create route

router.put('/:id', controller.updateKelas); // update route

router.delete('/:id', controller.deleteKelas); // delete route


module.exports = router;