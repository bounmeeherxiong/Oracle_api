const router = require('express').Router();

const accountsController = require('../controllers/currency.controllers');

router.get('',accountsController.SelectAllCurrency)
router.post('/Insert',accountsController.InsertCurrency)
router.get('/get/:uid',accountsController.SelectCurrency_name)
module.exports = router;