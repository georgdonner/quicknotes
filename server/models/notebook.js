const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Note = require('./note');

const NotebookSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
},{
  timestamps: true
});
const Notebook = module.exports = mongoose.model('Notebook', NotebookSchema);

module.exports.getByUser = (id, callback) => {
  Notebook.find({ owner: mongoose.Types.ObjectId(id) }, callback);
}

module.exports.getById = (id, callback) => {
  Notebook.findById(id, callback);
}

module.exports.addNotebook = (newNotebook, userId, callback) => {
  newNotebook.owner = mongoose.Types.ObjectId(userId);
  newNotebook.save(callback);
}

module.exports.updateNotebook = (id, newData, callback) => {
  delete newData._id;
  delete newData.owner;
  Notebook.findByIdAndUpdate(id, { $set: newData }, callback);
}

module.exports.updateOwner = (id, userId, callback) => {
  Notebook.findByIdAndUpdate(id, { $set: { owner: mongoose.Types.ObjectId(userId) } }, callback);
}

module.exports.removeNotebook = (id, callback) => {
  Notebook.findByIdAndRemove(id, callback);
}

module.exports.removeByOwner = (userId, callback) => {
  Notebook.find({ owner: mongoose.Types.ObjectId(userId)}).remove(callback);
}