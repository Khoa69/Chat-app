import router from '../config/router.config'
const authController = require("../controllers/auth.controller");
const verifySignUp = require("../middlewares/verifySignUp");
const JoinSchemaValidation = require("../middlewares/validation.middlewares");
const { SignUpSchema } = require("../validations/auth.validation");

router.post(
    "/register",
    [JoinSchemaValidation(SignUpSchema),verifySignUp.checkDuplicateEmail],
    authController.signup,
);

router.post(
    "/login",
    authController.login,
);


module.exports = router;