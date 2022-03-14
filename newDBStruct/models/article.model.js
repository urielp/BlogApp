module.exports = (mongoose,mongoosePaginate,uniqueValidator) =>{
var  schema = mongoose.Schema({
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

schema.method("toJSON",function(){
    const {__v,_id,...object} =this.toObject();
    object.id=_id;
    return object;
})

schema.plugin(mongoosePaginate)
schema.plugin(uniqueValidator);
const Articles =mongoose.model("articles",schema);
return Articles
}