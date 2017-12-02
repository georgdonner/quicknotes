const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  githubId: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});
const User = mongoose.model('User', UserSchema);
module.exports = User;

module.exports.getById = id => (
  User.findById(id)
);

module.exports.findOrCreate = async (data) => {
  try {
    const userData = new User(data);
    const user = await User.findOne({ email: userData.email });
    return user || userData.save();
  } catch (error) {
    return error;
  }
};

module.exports.updateUser = (id, newData) => {
  const { _id, ...data } = newData;
  return User.findByIdAndUpdate(id, { $set: data });
};

module.exports.removeUser = id => (
  User.findByIdAndRemove(id)
);
