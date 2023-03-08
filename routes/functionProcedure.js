var express = require("express");
var router = express.Router();

const controller = require('../controllers/functionAndProcedureController');

router.get('/function/lama-siswa-sekolah', controller.getLamaSiswaSekolahFunction);
router.get('/function/download', controller.download);

module.exports = router;