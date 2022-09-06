const Joi = require('joi');

const SignUpSchema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d#?!@$ %^&*-]{8,}$/),
    email: Joi.string().required().email(),
    re_password: Joi.string().required().valid(Joi.ref('password')),
})

module.exports = {SignUpSchema};
