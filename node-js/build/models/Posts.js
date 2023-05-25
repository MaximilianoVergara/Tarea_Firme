"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SchemaPost = new mongoose_1.Schema({
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
exports.default = (0, mongoose_1.model)('Post', SchemaPost);
