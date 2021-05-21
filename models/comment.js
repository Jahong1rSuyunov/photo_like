const mongoose = require("mongoose"),
Schema = mongoose.Schema,
ObjectId =Schema.Types.ObjectId;

const CommentSchema = new Schema( {
    imageid: {type:ObjectId},
    email: { type:String },
    name: { type: String },
    comment: { type: String },
    timestamp: { type: Date, default: Date.now() } 
} )

module.exports = mongoose.model("Comment", CommentSchema)


