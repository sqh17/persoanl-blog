module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const AboutSchema = new Schema({
    imgs: [
      {
        imgUrl: { type: 'string', required: false },
        link: { type: 'string', required: false },
      },
    ],
    desc: {
      type: 'string',
      min: 1,
      max: 800,
    },
    tags: [ String ],
    createTime: {
      type: 'number',
      default: 0,
    },
    updateTime: {
      type: 'number',
      default: 0,
    },
    showResume: {
      type: 'boolean',
      default: false,
    },
  }, {
    collection: 'about',
    versoionKey: false,
  });
  const AboutModel = mongoose.model('About', AboutSchema);

  return AboutModel;
};
