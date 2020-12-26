const express = require('express')
const router = express.Router()
var Post = require("../models/Post.model") 

router.post('/' , function(req,res){
  const comment = req.body.comment
  const user = req.body.user
  const postId = req.body.postId

  const commentObj = {
      comment, user
  }

  Post.createCommentForPost(commentObj, postId)
 .then(function(post){
    res.status(200).send(post)
  })
  .catch(function(err){
    res.status(400).send("Comment cannot be creted.")
  })

  /*
   
  Post.createCommentForPost(commentObj, postId)
  .then(function(post){
    res.status(200).send(post)
  })
  .catch(function(err){
    res.status(400).send("Comment cannot be creted.")
  })
  */

})

module.exports = router