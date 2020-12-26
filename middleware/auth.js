const User = require("../models/User.model")

function auth(req, res , next) {   
    var token = req.headers["authorization"] // req.header("Authorization")
    try{
        User.findByToken(token)
        .then(function(user){
            req.user = user
            next()
        })
        .catch(function(){
            res.status(401).send("Please Authenticate")
        })
    }catch(err){
        res.status(401).send("Please Authenticate")
    }
}


module.exports = auth