const db = require('../models');
const Articles = db.articles;

const getPagination = (page,size)=>{
    
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;

    return { limit, offset };
}

//get all posts from db 
exports.findAll = (req,res)=>{
    const {page,size,title} = req.query;
    var condition = title ? {title:{$regex:new RegExp(title), $options:'i'}}:{};
    
    const {limit,offset } = getPagination (page,size);
    console.log(req.query)
    Articles.paginate(condition,{offset,limit})
    .then((data)=>{
        console.log(data); 
        res.send({
            totalItems:data.totalDocs,
            articles:data.docs,
            totalPages:data.totalPages,
            currentPage:data.page -1 ,
        });
    })
    .catch((error)=>{
        res.status(500).send({
            message:error.message || "We faced some error retrieving posts"
        });
    });

}