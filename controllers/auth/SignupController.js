const bcrypt = require('bcrypt');

const database = require('../../database');

const signup = async(req, res) => {
    let email = req.body.email;
    let key = email.split('@');

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const databaseRef = database.ref('user');
    const snapshot = await databaseRef.child(key[0]).once('value');
    let user = snapshot.val();

    if (user != null) {
        res.status(401).json({
            message: 'user exists'
        });
    }

    await databaseRef.child(key[0]).set({
        name: req.body.name,
        email: req.body.email,
        isAdmin: false,
        password: hashedPassword
    });

    res.status(200).json({
        message: 'user created!'
    });
}

module.exports = {
    signup
}