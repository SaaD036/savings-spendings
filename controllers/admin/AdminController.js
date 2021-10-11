const bcrypt = require('bcrypt');

const database = require(`${__dirname}/../../database`);
const FormatterHelper = require(`${__dirname}/../../helper/FormatterHelper`);

const formatterHelper = new FormatterHelper();

const getUser = async(req, res) => {
    const databaseRef = database.ref('user');
    const snapshot = await databaseRef.once('value');
    const value = snapshot.val();

    let data = formatterHelper.getUserData(value);

    res.status(200).json({
        message: 'successful',
        data: data
    });
}

const updateUser = async(req, res) => {
    const databaseRef = database.ref('user');
    const snapshot = await databaseRef.child(req.params.key).once('value');
    const value = snapshot.val();

    if (value.email !== req.token.email) {
        res.send({
            message: 'you are unauthorized'
        });
    }

    if (value.email === req.body.email) {
        let data = {
            'email': req.body.email,
            'isAdmin': value.isAdmin
        };

        if (req.body.name) {
            data.name = req.body.name
        }
        if (req.body.password) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            data.password = hashedPassword
        }

        databaseRef.child(req.params.key).update(data)

        res.send({
            message: 'user updated'
        });
    } else {
        databaseRef.child(req.params.key).remove();

        let rootKey = req.body.email.split('@');
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        databaseRef.child(rootKey[0]).set({
            name: req.body.name,
            email: req.body.email,
            isAdmin: value.isAdmin,
            password: hashedPassword
        })

        res.status(200).json({
            message: 'user updated'
        });
    }
}

const changeUserStatus = async(req, res) => {
    const databaseRef = database.ref('user').child(req.params.key);

    databaseRef.update({
        'isAdmin': req.body.isAdmin
    });

    res.status(200).json({
        message: 'user status updated'
    });
}

module.exports = {
    getUser,
    changeUserStatus,
    updateUser
}