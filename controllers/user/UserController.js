const bcrypt = require('bcrypt');

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

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

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

const getComments = async(req, res) => {
    const databaseRef = database.ref('comments');
    let snapshot = await databaseRef.child(req.body.date).once('value');
}

module.exports = {
    getUser,
    updateUser,
    createComment
}