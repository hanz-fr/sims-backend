var express = require("express");
var router = express.Router();

const controller = require('../controllers/kelasController');


router.get('/', controller.getAllKelas); // get all kelas

router.get('/get-by-walkel/:nip', controller.getKelasByWalkelNIP); // get kelas by walkel nip
router.get('/:id', controller.getKelas); // get kelas by id

router.get('/siswa-per-kelas/all', controller.getSiswaByKelas);
router.get('/siswa-per-kelas/10', controller.getSiswaByKelas10);
router.get('/siswa-per-kelas/11', controller.getSiswaByKelas11);
router.get('/siswa-per-kelas/12', controller.getSiswaByKelas12);

router.post('/', controller.createKelas); // create route

router.put('/:id', controller.updateKelas); // update route

router.delete('/:id', controller.deleteKelas); // delete route


module.exports = router;