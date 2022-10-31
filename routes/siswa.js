var express = require("express");
var router = express.Router();

const controller = require('../controllers/siswaController');


router.get('/', controller.getAllSiswa); // get all siswa
router.get('/:jurusan/:kelas', controller.getAllSiswaByJurusanKelas)
router.get('/:nis_siswa', controller.getSiswa); // get siswa by nis
router.post('/', controller.createSiswa); // create route
router.put('/:nis_siswa', controller.updateSiswa); // update route
router.delete('/:nis_siswa', controller.deleteSiswa); // delete route
/* router.post('/searchSiswa', controller.searchSiswa); */


module.exports = router;