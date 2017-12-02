const mongoose = require('mongoose');

const Note = require('./note');

const { Schema } = mongoose;

const NotebookSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  viewers: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: [],
  }],
  editors: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: [],
  }],
  publicVisible: {
    type: Boolean,
    default: false,
  },
  publicEdit: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});
const Notebook = mongoose.model('Notebook', NotebookSchema);
module.exports = Notebook;

module.exports.getByUser = async (id) => {
  try {
    const notebooks = await Notebook.find({
      $or: [
        { owner: mongoose.Types.ObjectId(id) },
        { editors: mongoose.Types.ObjectId(id) },
        { viewers: mongoose.Types.ObjectId(id) },
      ],
    }).sort({ updatedAt: -1 }).exec();
    const populateAll = [];
    notebooks.forEach((notebook) => {
      populateAll.push(Note.getAll(notebook._id));
    });
    const allNotes = await Promise.all(populateAll);
    const populated = [];
    notebooks.forEach((notebook, index) => {
      populated.push({ ...notebook._doc, notes: allNotes[index].slice() });
    });
    return populated;
  } catch (error) {
    return error;
  }
};

module.exports.getById = async (id) => {
  try {
    const notebook = await Notebook.findById(id);
    const notes = await Note.getAll(id);
    return { ...notebook._doc, notes };
  } catch (error) {
    return error;
  }
};

module.exports.addNotebook = (newNotebook, userId) => {
  const notebook = new Notebook(
    { owner: mongoose.Types.ObjectId(userId), ...newNotebook },
  );
  return notebook.save();
};

module.exports.updateNotebook = (id, newData) => {
  const {
    _id, owner, viewers, editors, ...data
  } = newData;
  return Notebook.findByIdAndUpdate(id, { $set: data });
};

module.exports.addViewer = (id, userId) => (
  Notebook.findByIdAndUpdate(id, { $push: { viewers: mongoose.Types.ObjectId(userId) } })
);

module.exports.removeViewer = (id, userId) => (
  Notebook.findByIdAndUpdate(id, { $pull: { viewers: mongoose.Types.ObjectId(userId) } })
);

module.exports.addEditor = (id, userId) => (
  Notebook.findByIdAndUpdate(id, { $push: { editors: mongoose.Types.ObjectId(userId) } })
);

module.exports.removeEditor = (id, userId) => (
  Notebook.findByIdAndUpdate(id, { $pull: { editors: mongoose.Types.ObjectId(userId) } })
);

module.exports.updateOwner = (id, userId) => (
  Notebook.findByIdAndUpdate(id, { $set: { owner: mongoose.Types.ObjectId(userId) } })
);

module.exports.removeNotebook = id => (
  Notebook.findByIdAndRemove(id)
);

module.exports.removeByOwner = userId => (
  Notebook.find({ owner: mongoose.Types.ObjectId(userId) }).remove()
);
