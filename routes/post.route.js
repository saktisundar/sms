const express = require('express')
const router = express.Router()
var Post = require("../models/Post.model") 
var jwt = require("jsonwebtoken")
var User = require("../models/User.model")
const auth = require("../middleware/auth")

router.post('/' , auth, function(req,res){ // create post

        /**********Logic fot creating new  Post */
        var data = req.body;
        var newPost =  new Post()
        newPost.title = data.title
        newPost.content = data.content
        newPost.createdBy = req.user._id

        newPost.save()
        .then(function(succesResponse){
            res.status(200).send(newPost)
        })
        .catch((err)=>{
            const e = { msg : "Post Cannot be saved" , error: err}
            res.status(400).send(e)
        })
        /**********END OF LOGIC */
})

router.get('/',auth,  function(req,res){
 Post.find().populate("createdBy", ["name","email"] )
    .then(function(posts){
        res.status(200).send(posts)
    })
    .catch(function(err){
        res.status(400).send("Not able to get users")
    })
})

module.exports = router









