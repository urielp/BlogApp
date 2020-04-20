const express = require('express');
const router = express.Router();
const Article = require('../models/article');
const moment = require('moment');

//gets all posts
router.get('/', (req, res, next) => {

  return Article.find()
    .sort({
      createdAt: 'descending'
    })
    .then((articles) => res.json({
      articles: articles.map(article => article.toJSON())
    }))
    .catch((next) => {
      console.log(next);
    })
}).post('/', (req, res, next) => {
  const {
    body
  } = req;
  console.log(body);
  if (!body.title) {
    return res.status(422).json({
      errors: {
        title: 'is required',
      },
    });
  }
  if (!body.author) {
    return res.status(422).json({
      errors: {
        author: 'is required',
      },
    });
  }

  if (!body.body) {
    return res.status(422).json({
      errors: {
        body: 'is required',
      },
    });
  }
  body.createdAt = moment().format('LLL');
  console.log(body);
  console.log(moment.locale());
  const finalArticle = new Article(body);
  return finalArticle.save()
    .then(() => res.json({
      article: finalArticle.toJSON()
    }))
    .catch(next);
});
module.exports = router;