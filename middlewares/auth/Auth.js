var jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const authorization = req.headers.authorization ? req.headers.authorization : null;

    try {
        if (authorization == null) {
            res.status(401).json({
                message: 'you are unauthenticated'
            });
            next('you are unauthenticated');
        }

        const token = authorization.split(' ')[1];

        if (token == null) {
            res.status(401).json({
                message: 'you are unauthenticated'
            });
            next('you are unauthenticated');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.token = decoded;
        next();
    } catch (err) {
        next('you are unauthenticated');
    }
}

module.exports = auth;