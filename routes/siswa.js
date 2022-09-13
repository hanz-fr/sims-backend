var express = require("express");
var router = express.Router();

const controller = require('../controllers/siswaController');


router.get('/', controller.getAllSiswa); // get all siswa

router.get('/:nis', controller.getSiswa); // get siswa by nis

router.post('/', controller.createSiswa); // create route

router.put('/:nis', controller.updateSiswa); // update route

router.delete('/:nis', controller.deleteSiswa); // delete route




module.exports = router;
