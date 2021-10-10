const express = require(`express`);
const router = express.Router();

const loginController = require(`${__dirname}/../../controllers/auth/LoginController`);
const signupController = require(`${__dirname}/../../controllers/auth/SignupController`);

router.route('/login')
    .post(loginController.login)

router.route('/signup')
    .post(signupController.signup)


module.exports = router;