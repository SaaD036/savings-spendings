const bcrypt = require('bcrypt');
var validator = require('validator');

const database = require(`${__dirname}/../../database`);
const FormatterHelper = require(`${__dirname}/../../helper/FormatterHelper`);
const UserHelper = require(`${__dirname}/../../helper/user/UserHelper`);

const formatterHelper = new FormatterHelper();
const userHelper = new UserHelper();

const getUser = async(req, res) => {
    const email = req.token.email;
    const key = email.split('@');

    const databaseRef = database.ref('user');
    const snapshot = await databaseRef.child(key[0]).once('value');
    const value = snapshot.val();

    return res.status(200).json({
        message: 'successful',
        data: {
            email: value.email,
            name: value.name,
            status: value.isAdmin
        }
    });
}

const updateUser = async(req, res) => {
    const email = req.token.email;
    const key = email.split('@');

    const databaseRef = database.ref('user');
    const snapshot = await databaseRef.child(key[0]).once('value');
    const value = snapshot.val();

    if (!value) {
        return res.status(200).json({
            message: 'user not found'
        })
    }

    const hashedPassword = req.body.password ? await bcrypt.hash(req.body.password, 10) : value.password;

    await databaseRef.child(key[0]).update({
        email: email,
        name: req.body.name,
        isAdmin: value.isAdmin,
        password: hashedPassword
    });

    return res.status(200).json({
        message: 'successful'
    });
}

const createComment = async(req, res) => {
    if (validator.isEmpty(req.body.date) || validator.isEmpty(req.body.comment)) {
        return res.status(200).json({
            error: 'empty date or comment'
        });
    }

    const databaseRef = database.ref('comments');
    let snapshot = await databaseRef.child(req.body.date).once('value');
    let dataLength = formatterHelper.getLength(snapshot);

    if (req.token.isAdmin) {
        return res.status(403).json({
            message: 'Admin can only reply to a comment'
        });
    }

    let data = userHelper.getCommentToSave(req, dataLength);
    await databaseRef.child(req.body.date).child(dataLength.toString()).set(data);

    snapshot = await databaseRef.child(req.body.date).once('value');

    return res.status(200).json({
        message: 'comment stored',
        data: userHelper.formatComment(snapshot.val(), req.token.email)
    });
}

const requestChangeStatus = async(req, res) => {
    const databaseRef = database.ref('requestChangeStatus');
    let email = req.token.email;
    let key = email.split('@');

    if (req.token.isAdmin) {
        return res.status(403).json({
            message: 'you are admin'
        });
    }

    let snapshot = await databaseRef.child(key[0]).once('value');

    if (snapshot.val()) {
        return res.status(403).json({
            message: 'You have already applied'
        });
    }

    await databaseRef.child(key[0]).set({
        email: req.token.email
    })

    return res.status(200).json({
        message: 'request sent to admin'
    });
}

const deleteChangeStatus = async(req, res) => {
    const databaseRef = database.ref('requestChangeStatus');
    let email = req.token.email;
    let key = email.split('@');

    await databaseRef.child(key[0]).remove();

    return res.status(200).json({
        message: 'request removed'
    });
}

const verifyAccount = async(req, res) => {
    const databaseRef = database.ref('user');
    let snapshot = await databaseRef.once('value');

    let data = formatterHelper.getUserDataWithToken(snapshot.val(), req.params.token);

    if (data.key) {
        await databaseRef.child(data.key).update({
            token: ""
        });
    }

    return res.status(200).json({
        data: "account verified"
    });
}

module.exports = {
    getUser,
    updateUser,
    createComment,
    requestChangeStatus,
    deleteChangeStatus,
    verifyAccount
}