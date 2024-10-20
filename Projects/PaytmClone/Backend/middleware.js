const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken")

async function authMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ msg: "Authorization token missing or malformed." });
        }


        const token = authHeader.split(" ")[1];

        // Check Redis cache for token
        const cachedUser = await redisClient.get(token);
        if (cachedUser) {
        req.user = JSON.parse(cachedUser); // Attach cached user to the request
        return next(); // Skip further JWT decoding
        }


        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = { userId: decoded.userId }; 


        // Cache the token with user info for future requests
        await redisClient.set(token, JSON.stringify(req.user), {
            EX: 3600, 
        });

        next(); 
    } catch (err) {
        console.error("Authentication Error:", err.message);

        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ msg: "Token expired, please login again." });
        }
        if (err.name === "JsonWebTokenError") {
            return res.status(403).json({ msg: "Invalid token, access denied." });
        }

        return res.status(500).json({ msg: "Authentication failed, try again later." });
    }
}

module.exports = {
    authMiddleware,
};
