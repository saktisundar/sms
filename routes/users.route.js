const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
var users = require('../db')
var User = require("../models/User.model") 

const auth = require("../middleware/auth")

router.post('/signin', function(req,res){
    let { email , password }  = req.body // object destructuring . ES6
    console.log(req.body)
    User.findOne({ email: email })  // Find user
    .then(function(user) {
      if (user) {
        user.signin(password).then(function(result) {  // Signin the user
            if (result === true) {
                user.generateToken()  // Generate Token
                .then(function(){
                  //  res.status(200).send({ token : user.tokens[user.tokens.length-1] , user});
                        res.render("success", {email})
                })
                .catch(function(){
                    res.status(400).send("Authentication failed");
                })
            }
            else {
                res.status(400).send("Incorrect email or password");
            }
        });
      }
      else {
        const newUser = new User({email, password,name,phone})
        newUser.save(()=>{
            res.render("success", {email})

            //
        });
      }
    })
    .catch(function(err) {
      console.log(err);
      res.status(400).send(" ERROR Incorrect email or password");
    });
})

router.post('/signup' , function(req,res){ // Signup
    var data = req.body;
    var newUser =  new User()
    newUser.name =  data.name
    newUser.email = data.email
    newUser.password = data.password
   

    newUser.save()
    .then(function(user){
        res.status(200).send(user)
    })
    .catch((err)=>{
        const e = { msg : "User Cannot be saved" , error: err}
        res.status(400).send(e)
    })
})

// GET POST PUT PATCH DELETE
router.get('/' , auth, function(req,res){
    User.find()
    .then(function(users){
        res.status(200).send(users)
    })
    .catch(function(err){
        res.status(400).send("Not able to get users")
    })
})

router.get('/:id', auth, function(req,res){
    var id = req.params.id
    User.findById(id)
    .then(function(user){
        res.status(200).send(user)
    })
    .catch(function(err){
        res.status(400).send("Not able to fetch the user")
    })
})


module.exports = router