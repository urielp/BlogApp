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
  console.log("before postin new ", body);
  if (!body.title) {
    return res.status(422).json({
      errors: {
        title: 'is required',
      },
    });
  }
  if (!body.subTitle) {
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
  const finalArticle = new Article(body);
  return finalArticle.save()
    .then(() => res.json({
      article: finalArticle.toJSON()
    }))
    .catch(next);
}).get('/:id', (req, res, next) => {
  console.log(req.params.id);

  Article.findById(req.params.id, (error, article) => {
    if (error) {

    } else if (article) {
      console.log(article)
      res.status(200).json({
        article
      });
    }

  })
});
module.exports = router;