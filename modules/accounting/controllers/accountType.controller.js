
const Accounts = require('../models/accountType.model');
const accountsModel = new Accounts();
const uuid = require('uuid');


exports.slectAllAccountsType = async (req, res, next) => {
    try{
        const data = await accountsModel.selectAllAccountType()
        res.status(200).json({
            statusCode: 200,
            result: data,
        });
    }catch(err){
        console.log(err)
    }
};
exports.InsertAccountType = async (req, res, next) => {
    try{
        const uid = uuid.v4();
        const ACCOUNT_UID=req.body.ACCOUNT_UID;
        const ACCOUNT_TYPE_NAME_ENG = req.body.ACCOUNT_TYPE_NAME_ENG;
        const ACCOUNT_TYPE_AC_SYMBOL=req.body.ACCOUNT_TYPE_AC_SYMBOL;
        const BS_ID=req.body.BS_ID;
        const ACCOUNT_TYPE_CREATEDATE_STRING=req.body.ACCOUNT_TYPE_CREATEDATE_STRING
        const data= {
            ACCOUNT_TYPE_UID:uid,
            ACCOUNT_UID:ACCOUNT_UID,
            ACCOUNT_TYPE_NAME_ENG:ACCOUNT_TYPE_NAME_ENG,
            ACCOUNT_TYPE_AC_SYMBOL:ACCOUNT_TYPE_AC_SYMBOL,
            BS_ID:BS_ID,
            ACCOUNT_TYPE_CREATEDATE_STRING:ACCOUNT_TYPE_CREATEDATE_STRING
           }

        await accountsModel.InsertAccountType(data);
        res.status(410).json({
            statusCode: 410,
            message: "successfully"
        });

    }catch(err){
        console.log(err)
    }
};

