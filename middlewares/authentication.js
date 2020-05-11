"use strict";
const {verifyToken} = require("../helpers/jwt");
const {User} = require("../models");

function Authentication(req, res, next){
    const {token} = req.headers;
    try {
        const decode = verifyToken(token);
        const {id} = decode;
        User
            .findByPk(id)
            .then(user => {
                if(user){
                    req.currentUser = user.id;
                    next();
                } else {
                    return next({
                        type : "Bad Request",
                        code : "400",
                        msg : "Please Login First"
                    });
                }
            });
    } catch (err) {
        return next(err);
    }
}