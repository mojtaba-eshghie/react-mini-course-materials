const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    // get token from the header
    const token = req.header('x-auth-token');

    // check if not token
    if (!token) {
        return res.status(401).json({ msg: 'no token, authorization denied...'});
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        
        // if verification is successful, the payload object is put into the decoded veraible here
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'token is not valid... ' });
    }
}