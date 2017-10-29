const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  githubId: {
    type: String,
    required: true
  }
},{
  timestamps: true
});
const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getById = (id, callback) => {
  User.findById(id, callback);
}

module.exports.findOrCreate = (data, callback) => {
  const userData = new User(data);
  User.findOne({ email: userData.email }, (err, user) => {
    if (err) {
      callback(err);
    } else {
      if (user) {
        callback(null, user);
      } else {
        userData.save(callback);
      }
    }
  });
}

module.exports.updateUser = (id, newData, callback) => {
  delete newData._id;
  User.findByIdAndUpdate(id, { $set: newData }, callback);
}

module.exports.removeUser = (id, callback) => {
  User.findByIdAndRemove(id, callback);
}