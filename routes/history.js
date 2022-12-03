var express = require("express");
var router = express.Router();

const controller = require('../controllers/historyController');

router.get('/', controller.getAllHistory);
router.get('/:username/all', controller.getAllUserHistory);
router.get('/:historyId', controller.getHistory);
router.post('/', controller.createHistory);
router.put('/:historyId', controller.updateHistory);
router.delete('/:historyId', controller.deleteHistory);

module.exports = router;