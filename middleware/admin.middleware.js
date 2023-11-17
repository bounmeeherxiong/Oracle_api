const express = require('express');
const jwt = require('jsonwebtoken');
var admin_secret = process.env.ADMIN_KEYS;
const adminModel = require('../modules/accounting/models/role.model');
const roleModel = new adminModel();
module.exports = {
    isAdmin: (req, res, next) => {
        const userId = req.body.userId
        roleModel.selectRoleById(userId).then(roles => {
            if (roles.length > 0) {
                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === "admin") {
                        next();
                        return;
                    }
                    res.status(403).send({
                        statusCode: 403,
                        message: "Require Admin Role!"
                    });
                    return;
                }
            } else {
                res.status(403).send({
                    statusCode: 403,
                    message: "Require Admin Role!"
                });
                return;
            }
        });
    },

    isEmployee: (req, res, next) => {
        const userId = req.body.userId
        roleModel.selectRoleById(userId).then(roles => {
            if (roles.length <= 0) {
                res.status(403).send({
                    statusCode: 403,
                    message: "Require Employeee Role!"
                });
                return;
            }
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "employee" || roles[i].name === "admin") {
                    next();
                    return;
                }
                res.status(403).send({
                    statusCode: 403,
                    message: "Require Employeee Role!"
                });
                return;
            }
        });
    }
}