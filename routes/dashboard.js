var express = require("express");
var router = express.Router();

const controller = require('../controllers/dashboardController');

router.get('/', controller.getMainDashboardData);
router.get('/siswa-tidak-naik', controller.getSiswaTidakNaik);
router.get('/alumni/get', controller.getAlumni);
router.get('/siswa-tidak-naik/searchbyraport', controller.getSiswaTidakNaikSearchRaport);

module.exports = router;