const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  githubId: {
    type: String,
    required: true
  },
  notebooks: [{
    type: Schema.Types.ObjectId,
    ref: 'Notebook',
    default: []
  }]
},{
  timestamps: true
});
const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getById = (id, callback) => {
  User.findById(id, callback);
}

module.exports.getByUsername = (username, callback) => {
  User.findOne({ username: username }, callback);
}

module.exports.addUser = (userData, callback) => {
  userData.save(callback);
}

module.exports.updateUser = (id, newData, callback) => {
  delete newData._id;
  delete newData.notebooks;
  User.findByIdAndUpdate(id, { $set: newData }, callback);
}

module.exports.addNotebook = (id, notebookId, callback) => {
  User.findByIdAndUpdate(id, { $push: { notebooks: mongoose.Types.ObjectId(notebookId) } }, callback);
}

module.exports.removeNotebook = (id, notebookId, callback) => {
  User.findByIdAndUpdate(id, { $pull: { notebooks: mongoose.Types.ObjectId(notebookId) } }, callback);
}

module.exports.removeUser = (id, callback) => {
  User.findByIdAndRemove(id, callback);
}