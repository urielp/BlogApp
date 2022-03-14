const dbConfig = require('../config/db.config');
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const uniqueValidator = require('mongoose-unique-validator');

mongoose.Promise = global.Promise;


const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.articles = require('./article.model')(mongoose,mongoosePaginate,uniqueValidator);

module.exports = db;