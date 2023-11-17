const db = require('../../../configs/db_accounting');
class AccountType {
    async selectAllAccountType() {
        const result= await db.query('SELECT * FROM ALL_ACCOUNTS_TYPE');
        return result.length == 0 ? null : result.rows;
    };
    async InsertAccountType(data) {
        return await db.query("BEGIN INSERT_ACCOUNT_TYPE(:ACCOUNT_TYPE_UID,:ACCOUNT_UID,:ACCOUNT_TYPE_NAME_ENG,:ACCOUNT_TYPE_AC_SYMBOL,:BS_ID,:ACCOUNT_TYPE_CREATEDATE_STRING);END;",data);
    }
}
module.exports = AccountType;