 const mongoose = require('mongoose');

 const {Schema,model} = mongoose;


 const PostSchema = new Schema({
    title: String,
    summary: String,
    Content: String,
    cover: String,
    author: {type:Schema.Types.ObjectID, ref:'User'},
 }, {
    timestamps: true
 });

 const PostModel = model('Post', PostSchema);

 module.exports = PostModel;  