const router = require('express').Router();

const ledgerentriesController = require('../controllers/ledgerentries.controller');
router.get('',ledgerentriesController.Getall_DataGl)
router.get('/new_data',ledgerentriesController.getNewSecondChildren_DataGL)
router.post('/Insert',ledgerentriesController.InsertLedgerEntries)
module.exports = router;