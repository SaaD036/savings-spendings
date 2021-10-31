const express = require(`express`);
const router = express.Router();

const loginController = require(`${__dirname}/../../controllers/auth/LoginController`);
const signupController = require(`${__dirname}/../../controllers/auth/SignupController`);
const userController = require(`${__dirname}/../../controllers/user/UserController`);

//login routes
router.route('/login')
    .post(loginController.login)

//signup routes
router.route('/signup')
    .post(signupController.signup)

//verify user
router.route('/verification/:token')
    .get(userController.verifyAccount)

module.exports = router;