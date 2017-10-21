const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    default: ''
  },
  folder: {
    type: String,
    default: ''
  },
  tmp: {
    type: Boolean,
    default: false
  },
  isStarred: {
    type: Boolean,
    default: false
  },
  autoDelete: Date,
  notebook: {
    type: Schema.Types.ObjectId,
    ref: 'Notebook'
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
},{
  timestamps: true
});
const Note = module.exports = mongoose.model('Note', NoteSchema);

module.exports.getAll = (notebookId, callback) => {
  Note.find({ notebook: mongoose.Types.ObjectId(notebookId)}, callback);
}

module.exports.getById = (id, callback) => {
  Note.findById(id, callback);
}

module.exports.addNote = (newNote, notebookId, userId, callback) => {
  newNote.notebook = mongoose.Types.ObjectId(notebookId);
  newNote.owner = mongoose.Types.ObjectId(userId);
  newNote.save(callback);
}

module.exports.updateNote = (id, newData, callback) => {
  delete newData._id;
  Note.findByIdAndUpdate(id, newData, { new: true }, callback);
}

module.exports.remove = (id, callback) => {
  Note.findByIdAndRemove(id, callback);
}

module.exports.removeByNotebook = (notebookId, callback) => {
  Note.find({ notebook: mongoose.Types.ObjectId(notebookId)}).remove(callback);
}