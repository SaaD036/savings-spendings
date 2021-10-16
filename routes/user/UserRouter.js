const express = require(`express`);
const router = express.Router();

const userController = require(`${__dirname}/../../controllers/user/UserController`);

router.route('/')
    .get(userController.getUser)
    .put(userController.updateUser)

module.exports = router;