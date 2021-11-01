const bcrypt = require('bcrypt');
const ejs = require('ejs');
var validator = require('validator');

const database = require('../../database');
const SendMail = require(`${__dirname}/../../helper/mail/SendMail`);

const sendMail = new SendMail();

const signup = async(req, res) => {
    if (!validator.isEmail(req.body.email) || validator.isEmpty(req.body.password) || validator.isEmpty(req.body.name)) {
        return res.status(404).json({
            error: 'invalid email or password'
        });
    }

    let email = req.body.email;
    let key = email.split('@');
    let userToken = Math.random().toString(10).substring(2, 100);

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const databaseRef = database.ref('user');
    const snapshot = await databaseRef.child(key[0]).once('value');
    let user = snapshot.val();

    if (user != null) {
        return res.status(401).json({
            message: 'user exists'
        });
    }

    await databaseRef.child(key[0]).set({
        name: req.body.name,
        email: req.body.email,
        isAdmin: false,
        password: hashedPassword,
        token: userToken
    });

    let template = await ejs.renderFile(`${__dirname}/../../emails/UserVerification.ejs`, { name: req.body.name, url: 'https://' + req.headers.host + '/user/verification/' + userToken });
    sendMail.sendMail(req.body.email, 'Account verification', template);

    return res.status(200).json({
        message: 'user created!'
    });
}

module.exports = {
    signup
}