const mongoose = require('mongoose');

var postSchema = new mongoose.Schema(
    {
        "title": {
            "type": String,
            "minlength": [10, 'Title should be minimum of 10 characters'],
            "required": true
        },
        "content": {
            "type": String
        },
        "createdDate": {
            "type": Date,
            "default": Date.now
        },
        "comments": [
            {
                "comment": String, 
                "user": {
                    "type": mongoose.Schema.Types.ObjectId,
                    "ref": 'User'
                }
            }
        ],
        "createdBy": {
            "type": mongoose.Schema.Types.ObjectId,
            "ref": 'User'
        }
    }
)

postSchema.statics.createCommentForPost = function(commentObj , postId){
    return Post.findByIdAndUpdate(
        postId,
        { $push: { comments: commentObj } },
        { new: true }
      )
}

var Post = mongoose.model('Post', postSchema);

module.exports = Post


