const mysql = require('mysql2/promise');
require('dotenv').config();


let pool = mysql.createPool({
    connectionLimit: 5,
    host: "devserver2023.cd2norchyjvi.ap-southeast-1.rds.amazonaws.com",
    user: "itdevteam",
    password: "itdevteam2022",
    database: "accounting"
});

exports.pool = pool;
