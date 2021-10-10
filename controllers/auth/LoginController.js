const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const database = require('../../database');

const login = async(req, res) => {
    let email = req.body.email;
    let key = email.split('@');

    const databaseRef = database.ref('user');
    const snapshot = await databaseRef.child(key[0]).once('value');
    let user = snapshot.val();

    if (user == null) {
        res.status(401).json({
            message: 'Unauthenticated'
        });
    }

    let isValidPassword = await bcrypt.compare(req.body.password, user.password);

    if (isValidPassword) {
        const token = jwt.sign({
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin
        }, process.env.JWT_SECRET, {
            expiresIn: '3h'
        });

        res.status(200).json({
            message: 'login successful',
            token: token
        });
    }

    res.status(200).json({
        message: 'Unauthenticated'
    });
}

module.exports = {
    login
}