var express = require("express");
var router = express.Router();

const controller = require('../controllers/histroyController');

router.get('/', controller.getAllHistory);
router.get('/:authorName/all', controller.getAllAuthorHistory);
router.get('/:historyId', controller.getHistory);
router.post('/', controller.createHistory);
router.put('/:historyId', controller.updateHistory);
router.delete('/:historyId', controller.deleteHistory);

module.exports = router;