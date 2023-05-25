import {Schema, model} from "mongoose";

const SchemaPost = new Schema({
    created_at: Date,
    title: String,
    author: String,
    url: String,
    points: String,
    story_text: String,
    comment_text: String,
    story_id: Number,
    story_title: String,
    story_url: String,
    parent_id: Number,
    objectID: String,
    blocked: Number



});

export default model('Post', SchemaPost);