const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema(
    {
        "name" : {
            "type" : String,
            "required" : true
        },
        "email" : {
                "type" : String,
                "unique" : true,
                "required" : true
            },
        "password" : {
            "type" : String,
            "required" : true
        }
    }
)


userSchema.methods.signin = function(password) {
    const storedPasswordHash = this.password;
    return bcrypt.compare(password, storedPasswordHash);
};

userSchema.methods.generateToken = function(){
    var user = this
    var token = jwt.sign({ "email" : user.email }, SADGRFCFDFD, { expiresIn: '1h' } );
    user.tokens = user.tokens.concat({token })
    return user.save()
}


userSchema.statics.findByToken = function(token) {
    token = token.replace("Bearer ", "")
    var decodedToken =  jwt.verify(token, SADGRFCFDFD)
    var email = decodedToken.email;
    return User.findOne({ email : email, "tokens.token" : token})
}

userSchema.pre('save', function(next){
    let user = this

    if(user.isModified('password')){
        if(user.password)
        bcrypt.hash(user.password , 3)
        .then(function(hash){
            console.log(hash)
            if(hash){
                user.password = hash
                next()
            }
            else
                throw new Error("Something went wrong while creating new user")
        })
        .catch(function(err){
            throw new Error("Something went wrong while creating new user")
        })
    }
    else{
        next()
    }
})

var User = mongoose.model('User', userSchema);
module.exports = User
