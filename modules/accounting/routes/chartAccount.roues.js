const router = require('express').Router();

const accountsController = require('../controllers/chartAccount.controller');
router.get('',accountsController.Getall_Chart_of_account)
router.get('/all',accountsController.getAll_account)
router.get('/Countnumber',accountsController.getCountnumber)
router.post('/Insert',accountsController.InsertChartAccount)
router.get('/:Uid',accountsController.GetAccount_Type_UID)
router.get('/Type/:Uid',accountsController.GetAccount_Type_UID_Show_ChartAccount_Name)
router.get('/ChartID/:Chart_id',accountsController.GetParents_Id_Show_ChartAaccount_name)
router.post('/Update',accountsController.UpdateChartAccount)

module.exports = router;