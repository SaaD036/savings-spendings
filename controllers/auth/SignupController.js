const bcrypt = require('bcrypt');

const database = require('../../database');
const SendMail = require(`${__dirname}/../../helper/mail/SendMail`);

const sendMail = new SendMail();

const signup = async(req, res) => {
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

    let text = 'Hi, '+req.body.name+'. Click '+req.headers.host+'/user/verification/'+userToken+' to verify your account';
    sendMail.sendMail(req.body.email, 'Account verification', text);

    return res.status(200).json({
        message: 'user created!'
    });
}

module.exports = {
    signup
}