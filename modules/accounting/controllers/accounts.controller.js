
const Accounts = require('../models/accounts.model');
const accountsModel = new Accounts();
const uuid = require('uuid');


exports.slectAllAccounts = async (req, res, next) => {
    try{
        const data = await accountsModel.selectAll();
        res.status(200).json({
            statusCode: 200,
            result: data,
        });
    }catch(err){
        console.log(err)
    }
};
exports.InsertAccount = async (req, res, next) => {
    try{
        const Uid = uuid.v4();
        const Account_Name_eng = req.body.Account_Name_eng;
        const Account_date=req.body.Account_date;
        const Cretestatus = req.body.Cretestatus;
        const Bs_status=req.body.Bs_status;
        await accountsModel.InsertAccount(Uid,Account_Name_eng,Account_date,Cretestatus,Bs_status);
        res.status(410).json({
            statusCode: 410,
            message: "Please complated"
        });

    }catch(err){
        console.log(err)
    }
};

