const express = require(`express`);
const router = express.Router();

const userController = require(`${__dirname}/../../controllers/user/UserController`);

router.route('/')
    .get(userController.getUser)
    .put(userController.updateUser)

router.route('/comment')
    .post(userController.createComment)

router.route('/change-status-request')
    .post(userController.requestChangeStatus)
    .delete(userController.deleteChangeStatus)

module.exports = router;