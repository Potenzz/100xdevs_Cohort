const jwt = require("jsonwebtoken");
const jwt_secret = require("../config")

function userMiddleware(req, res, next) {
    const token = req.headers.authorization;
    const jwtToken = token.split(" ")[1];

    const decodedValue = jwt.verify(jwtToken, jwt_secret);
    if(decodedValue.username){
        req.username = decodedValue.username;
        next();
    }else{
        res.status(404).json({
            msg:"You are not authenticated"
        })
    }

}


module.exports = userMiddleware;