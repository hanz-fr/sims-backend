var express = require("express");
var router = express.Router();

const controller = require('../controllers/dashboardController');

router.get('/', controller.getMainDashboardData);
router.get('/siswa-tidak-naik', controller.getSiswaTidakNaik);

module.exports = router;