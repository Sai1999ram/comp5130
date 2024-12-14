const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // Log for debugging
        console.log('Auth Header:', req.header('Authorization'));

        if (!req.header('Authorization')) {
            return res.status(401).json({ message: "No authorization header" });
        }

        const token = req.header('Authorization').replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ message: "No token found" });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (tokenError) {
            console.log('Token verification error:', tokenError);
            return res.status(401).json({ message: "Invalid token" });
        }
    } catch (error) {
        console.log('Auth middleware error:', error);
        res.status(500).json({ message: "Auth middleware error", error: error.message });
    }
};