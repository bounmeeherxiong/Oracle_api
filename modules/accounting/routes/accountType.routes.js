const router = require('express').Router();

const accountsController = require('../controllers/accountType.controller');

router.get('/',accountsController.slectAllAccountsType)
router.post('/Insert',accountsController.InsertAccountType)
module.exports = router;