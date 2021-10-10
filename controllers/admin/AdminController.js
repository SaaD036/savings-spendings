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

module.exports = {
    getUser
}