const database = require(`${__dirname}/../../database`);
const FormatterHelper = require(`${__dirname}/../../helper/FormatterHelper`);

const formatterHelper = new FormatterHelper();

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
    const databaseRef = database.ref('user').child(req.body.key);

    databaseRef.update({
        isAdmin: req.body.status
    });

    return res.status(200).json({
        message: 'user status updated'
    });
}

module.exports = {
    getUser,
    changeUserStatus
}