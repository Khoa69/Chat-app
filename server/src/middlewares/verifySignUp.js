const User  = require("../models/user.model");
const response = require("../utils/response");

checkDuplicateEmail = (req, res, next) => {

    // Email
    User.findOne({
        email: req.body.email
    }).exec((err, user) => {
        if (err) {
        res.status(500).json(response({},{ message: err },0));
        return;
        }
        if (user) {
        res.status(400).json(response({},{ message: "Failed! Email is already in use!" },0));
        return;
        }
        next();
    });
};

const verifySignUp = {
    checkDuplicateEmail,
};
module.exports = verifySignUp;