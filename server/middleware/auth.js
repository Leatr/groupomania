const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers["x-access-token"];
    // console.log(token)
    if(!token) {
        res.send("Need a token");
    } else {
        jwt.verify(token, "jwtSecret", (err, decoded) => {
            if(err) {
                res.json({auth: false, message: "failed to authenticate"});
            } else {
                console.log(decoded)
                req.userId = decoded.id;
                next();
            }
        });
    }
}