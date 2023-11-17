module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const TagsSchema = new Schema({
    name: {
      type: String,
      min: 2,
      max: 20,
      match: /^[\u4e00-\u9fa5A-Za-z0-9_]{2,20}$/,
    },
    articleNum: {
      type: Number,
      default: 0,
    },
    status: {
      type: Boolean,
      default: false,
    },
    updateTime: {
      type: Number,
      default: 0,
    },
    createTime: {
      type: Number,
      default: 0,
    },
  }, {
    collection: 'tags',
    versoionKey: false,
  });
  const TagsModel = mongoose.model('Tags', TagsSchema);

  return TagsModel;
};
