const db = require('../../../configs/db_accounting');
const oracledb=require('oracledb')
class chartAccount {
    async InsertLedgerEntries(Journal,Create_date,Createdate_exchange,Exchange_rate,create_by,currency_code,All_data){
        const vindVars={
            JOURNAL_NO:Journal,
            CREATEDATE:Create_date,
            CREATEEXCHANGE:Createdate_exchange,
            MONEY_RATE:Exchange_rate,
            CREATE_BY:create_by,
            CURRENCY:currency_code,
            INFORMDATA:{
                type:'LEDGER_ENTRIES_TABLE_ARRAY_TYPE',
                dir:oracledb.BIND_IN,
                val:All_data.filter(entry=> Object.keys(entry).length > 0)
                
            }
        }
        console.log("ddddd=",vindVars)
        return await db.query("BEGIN INSERT_JOURNAL_LEDGERENTRIES(:JOURNAL_NO,:CREATEDATE,:CREATEEXCHANGE,:MONEY_RATE,:CURRENCY,:CREATE_BY,:INFORMDATA);END;",vindVars);
    }
    async GetFirst_DataGL(){
        const result= await db.query('SELECT * FROM ALL_FIRST_GL');
        return result.length == 0 ? null : result.rows;
    }
    async GetSecond_DataGL(){
        const result= await db.query('SELECT * FROM ALL_SECOND_GL');
        return result.length == 0 ? null : result.rows;
    }
    async GetFirstChildren_DataGL(){
        const result= await db.query('SELECT * FROM ALL_FIRST_CHILDREN_GL');
        return result.length == 0 ? null : result.rows;
    }
    async GetSecondChildren_DataGL(){
        const result= await db.query('SELECT * FROM ALL_SECOND_CHILDREN_GL');
        return result.length == 0 ? null : result.rows;
    }
    async getNewSecondChildren_DataGL(){
        const result= await db.query('SELECT * FROM ALL_NEW_SECOND_CHILDREN_GL');
        return result.length == 0 ? null : result.rows;
    }
}
module.exports = chartAccount;