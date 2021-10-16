const bcrypt = require('bcrypt');

const database = require(`${__dirname}/../../database`);
const FormatterHelper = require(`${__dirname}/../../helper/FormatterHelper`);

const formatterHelper = new FormatterHelper();

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

module.exports = {
    getUser,
    updateUser
}