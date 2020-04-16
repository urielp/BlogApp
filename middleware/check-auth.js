const jwt = require('jsonwebtoken');


module.exports = (req,res,next) => {
  try {
      
    const token = req.headers.authorization;
    jwt.verify(token,"this_should_be_secret_or_salt_for_token");
    next();
  }
    catch(error){
        console.log(error);
        res.status(401).json({message:"you are not allowed"});
  }
};