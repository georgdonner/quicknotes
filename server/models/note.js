const mongoose = require('mongoose');

const { Schema } = mongoose;

const NoteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    default: '',
  },
  tmp: {
    type: Boolean,
    default: false,
  },
  autoDelete: Date,
  notebook: {
    type: Schema.Types.ObjectId,
    ref: 'Notebook',
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
});
const Note = mongoose.model('Note', NoteSchema);
module.exports = Note;

module.exports.getAll = notebookId => (
  Note.find({ notebook: mongoose.Types.ObjectId(notebookId) }).populate('owner', 'username').sort({ updatedAt: -1 }).exec()
);

module.exports.getById = id => (
  Note.findById(id).populate('owner', 'username').sort({ updatedAt: -1 }).exec()
);

module.exports.addNote = (newNote, notebookId, userId) => {
  const note = new Note({
    owner: mongoose.Types.ObjectId(userId),
    notebook: mongoose.Types.ObjectId(notebookId),
    ...newNote,
  });
  return note.save();
};

module.exports.updateNote = (id, newData) => {
  const {
    _id, updatedAt, ...data
  } = newData;
  return Note.findByIdAndUpdate(id, data, { new: true });
};

module.exports.remove = id => (
  Note.findByIdAndRemove(id)
);

module.exports.removeByNotebook = notebookId => (
  Note.find({ notebook: mongoose.Types.ObjectId(notebookId) }).remove()
);
