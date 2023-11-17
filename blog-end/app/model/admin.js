const helper = require('../extend/helper');
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const AdminSchema = new Schema({
    userName: {
      type: String,
      min: 5,
      max: 20,
      match: /^[\u4e00-\u9fa5A-Za-z0-9_]{5,20}$/,
    },
    password: {
      type: String,
    },
  }, {
    collection: 'admin',
    versoionKey: false,
  });
  const AdminModel = mongoose.model('Admin', AdminSchema);

  const adminUser = {
    userName: app.config.userName,
    password: app.config.password,
  };
  console.log('===========', app.config);
  helper.genSaltPassword(adminUser.password).then(async hash => {
    adminUser.password = hash;
    const oldUser = await AdminModel.find({ userName: adminUser.userName });
    if (oldUser.length === 0) {
      AdminModel.create(adminUser);
    }
  });

  // const oldUser = await AdminModel.find({ userName: adminUser.userName });
  // if (oldUser.length === 0) {
  //   AdminModel.create(adminUser);
  // }
  // AdminModel.findOne({ userName: adminUser.userName }, (err, data) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     if (!data) {
  //       AdminModel.create({
  //         userName: adminUser.userName,
  //         password: genSaltPassword(adminUser.password),
  //       });
  //     }
  //   }
  // });
  return AdminModel;
};
