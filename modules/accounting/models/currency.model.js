const db = require('../../../configs/db_accounting');
const oracledb=require('oracledb')
class Accounts {
    async SelectAllCurrency() {
        const result= await db.query('SELECT * FROM ALL_CURRENCY');
        return result.length == 0 ? null : result.rows;
    };
    async InsertCurrency(CurrencyUid,Currencyname,Createdate,) {
        let data = {  
            CURRENCY_UID:CurrencyUid,
            CURRENCY_NAME:Currencyname,
            CURRENCY_DATE:Createdate,
        }
        return await db.query("BEGIN INSERT_CURRENCY(:CURRENCY_UID,:CURRENCY_NAME,:CURRENCY_DATE);END;",data);
    }
    async SelectCurrency_name(uid){
         let param_data={
            PARAM_UID:uid,
            CURRENCY_NAME:{dir:oracledb.BIND_OUT,type:oracledb.STRING}
         }
        const result= await db.query("BEGIN GETCURRENCY_BYUID(:PARAM_UID,:CURRENCY_NAME);END;",param_data)
        return result.outBinds;
    }
}
module.exports = Accounts;