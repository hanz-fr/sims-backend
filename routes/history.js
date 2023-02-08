var express = require("express");
var router = express.Router();

const controller = require('../controllers/historyController');

router.get('/', controller.getAllHistory);
router.get('/today', controller.getTodaysHistory);
router.get('/older', controller.getAllHistoryYesterdayAndSo);
router.get('/:username/all', controller.getAllUserHistory);
router.get('/:historyId', controller.getHistory);
router.get('/count/permonth', controller.countAllHistoryPerMonth);
router.post('/', controller.createHistory);
router.put('/:historyId', controller.updateHistory);
router.delete('/:historyId', controller.deleteHistory);

module.exports = router;