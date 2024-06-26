const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
const mongoosePaginate = require("mongoose-paginate-v2");
const articleSChema = mongoose.Schema({
  title: {
    type: String,
    requierd: true
  },
  subTitle: {
    type: String,
    requierd: true
  },
  author: {
    type: String,
    requierd: true
  },
  body: {
    type: String,
    requierd: true
  },
  content: {
    type: String,
    requierd: true,
  },
  likes: {
    type: Number,
    requierd: false
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  },
  comments: {
    type: Array
  }
},{timestamps:true})
articleSChema.plugin(uniqueValidator);
articleSChema.plugin(mongoosePaginate);
module.exports = mongoose.model("Article", articleSChema);