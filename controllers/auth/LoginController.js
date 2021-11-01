const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var validator = require('validator');

const database = require('../../database');

const login = async(req, res) => {
    if (!validator.isEmail(req.body.email) || validator.isEmpty(req.body.password)) {
        return res.status(404).json({
            error: 'invalid email or password'
        });
    }

    let email = req.body.email;
    let key = email.split('@');

    const databaseRef = database.ref('user');
    const snapshot = await databaseRef.child(key[0]).once('value');
    let user = snapshot.val();

    if (user == null) {
        return res.status(401).json({
            message: 'Unauthenticated'
        });
    }

    let isValidPassword = await bcrypt.compare(req.body.password, user.password);

    if (isValidPassword) {
        const token = jwt.sign({
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin,
            token: user.token
        }, process.env.JWT_SECRET, {
            expiresIn: '3h'
        });

        return res.status(200).json({
            message: 'login successful',
            token: token
        });
    }

    return res.status(200).json({
        message: 'Unauthenticated'
    });
}

module.exports = {
    login
}