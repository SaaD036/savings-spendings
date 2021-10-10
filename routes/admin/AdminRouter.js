const express = require(`express`);
const router = express.Router();

const adminMiddleware = require(`${__dirname}/../../middlewares/auth/Admin`);
const adminController = require(`${__dirname}/../../controllers/admin/AdminController`);

router.route('/')
    .get(adminMiddleware, adminController.getUser)

module.exports = router;