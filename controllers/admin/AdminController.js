var validator = require('validator');

const database = require(`${__dirname}/../../database`);
const FormatterHelper = require(`${__dirname}/../../helper/FormatterHelper`);
const UserHelper = require(`${__dirname}/../../helper/user/UserHelper`);

const formatterHelper = new FormatterHelper();
const userHelper = new UserHelper();

const getUser = async(req, res) => {
    const databaseRef = database.ref('user');
    const snapshot = await databaseRef.once('value');
    const value = snapshot.val();

    let data = formatterHelper.getUserData(value);

    return res.status(200).json({
        message: 'successful',
        data: data
    });
}

const changeUserStatus = async(req, res) => {
    if (validator.isEmpty(req.body.key)) {
        return res.status(200).json({
            error: 'empty name or amount'
        });
    }

    const databaseRef = database.ref('user').child(req.body.key);
    const snapShot = await databaseRef.once('value');
    const value = snapShot.val();

    const requestSnapshot = await database.ref('requestChangeStatus').child(req.body.key).once('value');
    const requestValue = requestSnapshot.val();

    if (!requestValue) {
        return res.status(404).json({
            message: 'user not found'
        });
    }

    await databaseRef.update({ isAdmin: !value.isAdmin });
    await database.ref('requestChangeStatus').child(req.body.key).remove();

    return res.status(200).json({
        message: 'user status updated'
    });
}

const getUserRequest = async(req, res) => {
    const databaseRef = database.ref('requestChangeStatus');
    const snapShot = await databaseRef.once('value');

    return res.status(200).json({
        data: userHelper.formatUserStatusRequest(snapShot.val())
    });
}

const deleteUserRequest = async(req, res) => {
    await database.ref('requestChangeStatus').child(req.body.key).remove();

    return res.status(200).json({
        message: 'user request deleted'
    });
}

module.exports = {
    getUser,
    changeUserStatus,
    getUserRequest,
    deleteUserRequest
}