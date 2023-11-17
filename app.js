const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
// try {
const accountsRouters = require('./modules/accounting/routes/accounts.routes');
const accountTypeRouters=require('./modules/accounting/routes/accountType.routes')
const accountCurrency=require('./modules/accounting/routes/currency.routes')
const chartAccount=require('./modules/accounting/routes/chartAccount.roues')
const ledgerEntries=require('./modules/accounting/routes/ledgerentries.routes')

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, x-access-token, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.get("/", (req, res) => {
    res.status(200).send({
        message: "No token provided!"
    });
});

app.use("/accounting/api/accounts", cors(), accountsRouters);
app.use("/accounting/api/accountType",cors(),accountTypeRouters)
app.use("/accounting/api/currency",cors(),accountCurrency)
app.use("/accounting/api/chartAccount",cors(),chartAccount)
app.use("/accounting/api/ledger_entries",cors(),ledgerEntries)

module.exports = app;