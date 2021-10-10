var jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const authorization = req.headers.authorization ? req.headers.authorization : null;

    try {
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded.isAdmin) {
            res.status(401).json({
                message: 'you are unauthorized'
            });
            next('you are unauthorized');
        }

        req.token = decoded;
        next();
    } catch (err) {
        next('you are unauthorized');
    }
}

module.exports = auth;