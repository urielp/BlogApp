const express = require('express');
const router = express.Router();
const Article = require('../models/article');
const moment = require('moment');
const newArt = require('../newDBStruct/controllers/article.controller');

const getPagination =(page,size)=>{
  const limit = size ? + size:3;
  const offset =page ? page * limit : 0;
  return {limit,offset};
}
//gets all posts
router.get('/', (req, res, next) => {

  return Article.find()
    .sort({
      createdAt: 'descending'
    }).limit(10)
    .then((articles) =>{
      res.json({articles: articles.map(article => article.toJSON())})
    }  
      )
    .catch((next) => {
      console.log(next);
    })
}).get('/withPagination',newArt.findAll)
.post('/', (req, res, next) => {
  const {
    body
  } = req;
  // if (!body.title) {
  //   return res.status(422).json({
  //     errors: {
  //       title: 'is required',
  //     },
  //   });
  // }
  // if (!body.subTitle) {
  //   return res.status(422).json({
  //     errors: {
  //       title: 'is required',
  //     },
  //   });
  // }
  // if (!body.author) {
  //   return res.status(422).json({
  //     errors: {
  //       author: 'is required',
  //     },
  //   });
  // }

  if (!body) {
    return res.status(422).json({
      errors: {
        body: 'is required',
      },
    });
  }
  // console.log(body)
  body.createdAt = moment().format('LLL');
  const finalArticle = new Article(body);
  return finalArticle.save()
    .then(() => res.json({
      article: finalArticle.toJSON()
    }))
    .catch(next);
}).get('/:id', (req, res, next) => {
  
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