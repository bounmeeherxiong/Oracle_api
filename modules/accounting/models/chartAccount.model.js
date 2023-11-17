const db = require('../../../configs/db_accounting');
const oracledb=require('oracledb')
class chartAccount {
    async selectAllAccountType() {
        const result= await db.query('SELECT * FROM ALL_ACCOUNTS_TYPE');
        return result.length == 0 ? null : result.rows;
    };
    async GetFirst_Chart_of_account(){
        const result= await db.query('SELECT * FROM mview_first_chart_of_account');
        return result.length == 0 ? null : result.rows;
    }
    async getAll_account(){
        const result= await db.query('SELECT * FROM ALL_CHART_OF_ACCOUNTS');
 
        return result.length == 0 ? null :result.rows
    }
    async getCountnumber(){
        const result= await db.query('SELECT * FROM ALL_COUNTJOURNAL_NUMBER')
        console.log("result=",result)
        return result.length == 0 ? null :result.rows
    }
    async GetSecond_Chart_of_account(){
        const result= await db.query('SELECT * FROM MVIEW_SECOND_CHART_OF_ACCOUNT');
        return result.length == 0 ? null : result.rows;
    }
    async CheckChartAccountName(ACCOUNT_TYPE_UID,CHART_NAME_ENG,CHART_CURRENCY_CODE){
        const data={
            ACCOUNT_TYPE_UID:ACCOUNT_TYPE_UID,
            CHART_NAME_ENG:CHART_NAME_ENG,
            CHART_CURRENCY_CODE:CHART_CURRENCY_CODE,
        }
        const result = await db.query(" SELECT COUNT(*) as  count_row FROM chart_of_accounts  a where UPPER(replace(a.chart_name_eng, ' ', '')) = UPPER(replace(:CHART_NAME_ENG, ' ', '')) and a.account_type_uid = :ACCOUNT_TYPE_UID and a.chart_currency_code= :CHART_CURRENCY_CODE",data);
        return result.length == 0 ? null :result.rows[0].COUNT_ROW
    }
    async GetAccount_Type_UID_Show_ChartAccount_Name(ACCOUNT_TYPE_UID){
        const data={
            ACCOUNT_TYPE_UID:ACCOUNT_TYPE_UID
        }
        const result= await db.query("SELECT a.chart_id, a.chart_name_eng,a.chart_currency_code FROM chart_of_accounts a where a.account_type_uid=:ACCOUNT_TYPE_UID",data)
        return result.length == 0 ? null : result.rows
    }
    async GetParents_Id_Show_ChartAaccount_name(Chart_id){
        
        const data={
            CHART_ID:Chart_id
        }
        const result= await db.query("SELECT a.CHART_ID, a.CHART_NAME_ENG,a.CHART_CURRENCY_CODE,a.ACCOUNT_TYPE_UID,a.CHART_PARENTS,b.ACCOUNT_TYPE_AC_SYMBOL,c.ACCOUNT_CREATESTATUS FROM chart_of_accounts a INNER JOIN ACCOUNTS_TYPE b ON b.ACCOUNT_TYPE_UID=a.ACCOUNT_TYPE_UID INNER JOIN ACCOUNTS c on c.account_uid=b.account_uid START WITH CHART_ID = :CHART_ID CONNECT BY PRIOR a.CHART_PARENTS = a.CHART_ID",data)
        return result.length == 0 ? null : result.rows
    }
    async GetAccount_Type_UID(ACCOUNT_TYPE_UID){
        const data={
            ACCOUNT_TYPE_UID:ACCOUNT_TYPE_UID,
            RECORD_OPEN:{dir:oracledb.BIND_OUT,type:oracledb.CURSOR}
        }
        const result= await db.query("BEGIN GETACCOUNTS_NAME_BY_TYPE_UID(:ACCOUNT_TYPE_UID,:RECORD_OPEN);END;",data);
        const res_result=result.outBinds.RECORD_OPEN ;
        let row;
        let result_data=[];
        while((row= await res_result.getRow())){
            result_data.push(row)
        }
        return result_data.length == 0 ? null :result_data
    }

    async SelectCurrency_name(uid){
        let param_data={
           PARAM_UID:uid,
           CURRENCY_NAME:{dir:oracledb.BIND_OUT,type:oracledb.STRING}
        }
       const result= await db.query("BEGIN GETCURRENCY_BYUID(:PARAM_UID,:CURRENCY_NAME);END;",param_data)
       return result.outBinds;
   }
    async InsertChartAccount(data){
        return await db.query("BEGIN INSERT_CHART_OF_ACCOUNTS(:ACCOUNT_TYPE_UID,:COMPANY_UID,:ACCOUNT_UID,:CHART_NAME_ENG,:CHART_PARENTS,:CHART_RATE,:CHART_CREATEDATE,:CHART_CURRENCY_CODE,:CHART_CREATED_BY,:OPENING_BALANCES,:OPENING_STATUS,:BS_ID,:CURRENCY_UID,:STATUS_DEBIT_CREDIT);END;",data);
    }
    async UpdateChartAccount(data){
        
        return await db.query("BEGIN UPDATE_CHART_OF_ACCOUNTS(:CHARTID,:CHARTNAME_ENG,:CHARTRATE,:CHARTPARENTS,:CHART_CREATEDATE,:CHART_CURRENCY_CODE,:CHART_CREATED_BY,:OPENING_BALANCES,:OPENING_STATUS,:STATUS_DEBIT_CREDIT);END;",data);
    }
}
module.exports = chartAccount;