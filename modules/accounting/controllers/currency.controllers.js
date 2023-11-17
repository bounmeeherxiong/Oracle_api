
const Accounts = require('../models/currency.model');
const accountsModel = new Accounts();
const uuid = require('uuid');

exports.SelectAllCurrency = async (req, res, next) => {
    try{
        const data = await accountsModel.SelectAllCurrency()
        res.status(200).json({
            statusCode: 200,
            result: data,
        });
    }catch(err){
        console.log(err)
    }
};

exports.InsertCurrency = async (req, res, next) => {
    try{
        const CurrencyUid = uuid.v4();
        const Currencyname = req.body.Currencyname;
        const Createdate=req.body.Createdate;
        await accountsModel.InsertCurrency(CurrencyUid,Currencyname,Createdate);
        res.status(410).json({
            statusCode: 410,
            message: "successfully"
        });

    }catch(err){
        console.log(err)
    }
};
exports.SelectCurrency_name = async (req, res, next) => {
    try{
        const uid = req.params.uid;
       const data= await accountsModel.SelectCurrency_name(uid);
        res.status(200).json({
            statusCode: 200,
            result: data,
        });

    }catch(err){
        console.log(err)
    }
};

