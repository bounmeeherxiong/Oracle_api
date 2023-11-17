const Accounts = require('../models/ledgerenties.model');
const momen =require('moment')
const accountsModel = new Accounts();


exports.InsertLedgerEntries = async (req, res, next) => {
    try{
        const data={
            journal_no:journal_no,
            createdate:createdate,
            createdate_exchange_rate:createdate_exchange_rate,
            money_rate:money_rate,
            createby:createby,
            currency:currency,
            informdata,
             }=req.body;
           
             const Journal=data.journal_no
             const Create_date=createdate
             const Createdate_exchange=createdate_exchange_rate
             const Exchange_rate=data.money_rate
             const create_by=data.createby
             const currency_code=data?.currency
             const All_data=data.informdata
             await accountsModel.InsertLedgerEntries(Journal,Create_date,Createdate_exchange,Exchange_rate,create_by,currency_code,All_data);
             res.status(201).json({
                 statusCode: 201,
                 message: "successfully"
             });
    }catch(err){
        console.log(err)
    }
};

exports.Getall_DataGl = async (req, res, next) => {
    try{
        const first_data_gl = await accountsModel.GetFirst_DataGL()
        const second_data_gl= await accountsModel.GetSecond_DataGL()
        const firstchildren_data_gl=await accountsModel.GetFirstChildren_DataGL()
   
        const secondchildren_data_gl=await accountsModel.GetSecondChildren_DataGL()
        console.log("secondchildren_data_gl=",secondchildren_data_gl)
        res.status(200).json({
            statusCode: 200,
            fist_gldata: first_data_gl,
            second_gldata:second_data_gl,
            firstchildren_data:firstchildren_data_gl,
            secondchildren_data:secondchildren_data_gl
        });
    }catch(err){
        console.log(err)
    }
};

exports.getNewSecondChildren_DataGL = async (req, res, next) => {
    try{
        const getNewSecond = await accountsModel.getNewSecondChildren_DataGL()

        res.status(200).json({
            statusCode: 200,
            new_gldata: getNewSecond,
        });
    }catch(err){
        console.log(err)
    }
};
