


const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({
        message: "No token provided"
    })
    try {
        const decoded = jwt.verify(
            token,
            "1h2kj3h12j12iyd273dy829213"
        );
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({
            message: "Invalid Token"
        });
    }
}