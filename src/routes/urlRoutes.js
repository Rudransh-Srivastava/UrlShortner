const {short,redirect} = require('../controller/urlhandler')
const router = require("express").Router();

router.post("/shorten", short);
router.get('/:surl',redirect);

module.exports = router;