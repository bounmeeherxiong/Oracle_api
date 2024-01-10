
const Accounts = require('../models/chartAccount.model');
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
exports.Getall_Chart_of_account = async (req, res, next) => {
    try{
        const first_data = await accountsModel.GetFirst_Chart_of_account()
        const second= await accountsModel.GetSecond_Chart_of_account()
        res.status(200).json({
            statusCode: 200,
            result_first: first_data,
            result_second:second
         
        });
    }catch(err){
        console.log(err)
    }
};
exports.GetAll_Chart_of_account_all = async (req, res, next) => {
    try{
        const all_chart_of_account = await accountsModel.GetAll_Chart_of_account_all()
        res.status(200).json({
            statusCode: 200,
            result: all_chart_of_account,
        });
    }catch(err){
        console.log(err)
    }
};
exports.getAll_account = async (req, res, next) => {
    try{
        const data = await accountsModel.getAll_account()
    
        res.status(200).json({
            statusCode: 200,
            result: data, 
        });
    }catch(err){
        console.log(err)
    }
};

exports.getCountnumber = async (req, res, next) => {

    try{
        console.log("dddddd")
        const data = await accountsModel.getCountnumber()
        console.log("data=",data)
        res.status(200).json({
            statusCode: 200,
            result: data, 
        });
    }catch(err){
        console.log(err)
    }
};

exports.chartofaccount = async (req, res, next) => {
    try{
        console.log("dddddd")
        const data = await accountsModel.chartofaccount()
        console.log("data=",data)
        res.status(200).json({
            statusCode: 200,
            result: data, 
        });
    }catch(err){
        console.log(err)
    }
};

exports.GetAccount_Type_UID = async (req, res, next) => {
    try {
        const uid = req.params.Uid;
        const data = await accountsModel.GetAccount_Type_UID(uid);
        res.status(200).json({
            statusCode: 200,
            message: "Success",
            result: data
        })
    } catch (e) {
        res.status(500).json({
            statusCode: 500,
            message: e.message
        });
    }
};

exports.GetAccount_Type_UID_Show_ChartAccount_Name = async (req, res, next) => {
    try {
        const uid = req.params.Uid;
        const data = await accountsModel.GetAccount_Type_UID_Show_ChartAccount_Name(uid);
        res.status(200).json({
            statusCode: 200,
            message: "Success",
            result: data
        })
    } catch (e) {
        res.status(500).json({
            statusCode: 500,
            message: e.message
        });
    }
};
exports.GetParents_Id_Show_ChartAaccount_name = async (req, res, next) => {
    try {
        const Chart_id = req.params.Chart_id;
        const data = await accountsModel.GetParents_Id_Show_ChartAaccount_name(Chart_id);
        res.status(200).json({
            statusCode: 200,
            message: "Success",
            result: data
        })
    } catch (e) {
        res.status(500).json({
            statusCode: 500,
            message: e.message
        });
    }
},
exports.filtersfirst_chart_of_account = async (req, res, next) => {
    try {
        const get_values = req.params.get_values;
        console.log("get_values=",get_values)
        const data = await accountsModel.filtersfirst_chart_of_account(get_values);
        res.status(200).json({
            statusCode: 200,
            message: "Success",
            result: data
        })
    } catch (e) {
        res.status(500).json({
            statusCode: 500,
            message: e.message
        });
    }
}

exports.filtersecond_chart_of_account = async (req, res, next) => {
    try {
        const id = req.params.id;
        console.log("chart_id=",id)
        const data = await accountsModel.filtersecond_chart_of_account(id);
        res.status(200).json({
            statusCode: 200,
            message: "Success",
            result: data
        })
    } catch (e) {
        res.status(500).json({
            statusCode: 500,
            message: e.message
        });
    }
}

exports.InsertChartAccount = async (req, res, next) => {
    try{
 
        const data={
            ACCOUNT_TYPE_UID,
            COMPANY_UID,
            ACCOUNT_UID,
            CHART_NAME_ENG,
            CHART_PARENTS,
            CHART_RATE,
            CHART_CREATEDATE,
            CHART_CURRENCY_CODE,
            CHART_CREATED_BY,
            OPENING_BALANCES,
            OPENING_STATUS,
            CURRENCY_UID,
            STATUS_DEBIT_CREDIT
             }=req.body; 
             console.log("insert=",data)
         const result_checked_name= await accountsModel.CheckChartAccountName(ACCOUNT_TYPE_UID,CHART_NAME_ENG,CHART_CURRENCY_CODE)
         console.log("result_checked_name333=",result_checked_name)
         if(result_checked_name > 0){
            res.status(409).json({
                statusCode: 409,
                message: "successfully",
                data:409
            });
         }else{
            await accountsModel.InsertChartAccount(data);
            res.status(201).json({
                statusCode: 201,
                message: "Created"
            });
         }


    }catch(err){
        console.log(err)
    }
};

exports.UpdateChartAccount = async (req, res, next) => {
    try{
        const data={
            CHARTID,
            CHARTNAME_ENG,
            CHARTRATE,
            OPENING_BALANCES,
            CHARTPARENTS,
            CHART_CREATEDATE,
            CHART_CURRENCY_CODE,
            OPENING_STATUS,
            CHART_CREATED_BY,
            STATUS_DEBIT_CREDIT,
             }=req.body; 
             await accountsModel.UpdateChartAccount(data);
             res.status(201).json({
                 statusCode: 201,
                 message: "Created"
             });
    }catch(err){
        console.log(err)
    }
};



