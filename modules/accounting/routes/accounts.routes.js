const router = require('express').Router();

const accountsController = require('../controllers/accounts.controller');

router.get("/", accountsController.slectAllAccounts);
router.post('/Insert',accountsController.InsertAccount)
module.exports = router;