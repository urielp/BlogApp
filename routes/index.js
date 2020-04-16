var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', function(req, res, next) {
  // const token = jwt.sign(
  // {user:'Uriel',userID:1234},
  // "this_should_be_secret_or_salt_for_token",
  // {expiresIn:"1h"});
  res.status(200).json({
    token:token,
    message:"Success"
  })
});

module.exports = router;
