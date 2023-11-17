const db = require('../../../configs/db_accounting');
const oracledb=require('oracledb')
class Accounts {
    async selectAll() {
        const result= await db.query('SELECT * FROM ALL_ACCOUNT');
        return result.length == 0 ? null : result.rows;
    };
    async InsertAccount(Uid,Account_Name_eng,Account_date,Cretestatus,Bs_status,) {
        let data = {  
            ACCOUNTUID:Uid,
            ACCOUNTNAME_ENG:Account_Name_eng,
            ACCOUNT_DATE_STRING:Account_date,
            ACCOUNTCREATESTATUS:Cretestatus,
            ACCOUNT_BS_STATUS:Bs_status
        }
        return await db.query("BEGIN INSERT_ACCOUNT(:ACCOUNTUID,:ACCOUNTNAME_ENG,:ACCOUNT_DATE_STRING,:ACCOUNTCREATESTATUS,:ACCOUNT_BS_STATUS);END;",data);
    }
}
module.exports = Accounts;