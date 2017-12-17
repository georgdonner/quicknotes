const mongoose = require('mongoose');

const { Schema } = mongoose;
const Note = mongoose.model('Note');

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
    const notebooks = await Notebook
      .find({
        $or: [
          { owner: mongoose.Types.ObjectId(id) },
          { editors: mongoose.Types.ObjectId(id) },
          { viewers: mongoose.Types.ObjectId(id) },
        ],
      })
      .populate('owner', 'username')
      .populate('viewers', 'username')
      .populate('editors', 'username')
      .sort({ updatedAt: -1 })
      .exec();
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
    const notebook = await Notebook.findById(id)
      .populate('owner', 'username')
      .populate('viewers', 'username')
      .populate('editors', 'username');
    const notes = await Note.getAll(id);
    return { ...notebook._doc, notes };
  } catch (error) {
    return error;
  }
};

module.exports.addNotebook = async (newNotebook, id) => {
  const userId = mongoose.Types.ObjectId(id);
  const notebook = new Notebook(
    {
      owner: userId,
      editors: [userId],
      viewers: [userId],
      ...newNotebook,
    },
  );
  const created = await notebook.save();
  const populated = await Notebook.findById(created._id)
    .populate('owner', 'username')
    .populate('viewers', 'username')
    .populate('editors', 'username');
  return { ...populated._doc, notes: [] };
};

module.exports.updateNotebook = (id, newData) => {
  const {
    _id, owner, viewers, editors, ...data
  } = newData;
  return Notebook
    .findByIdAndUpdate(id, { $set: data })
    .populate('owner', 'username')
    .populate('viewers', 'username')
    .populate('editors', 'username');
};

module.exports.refreshUpdatedAt = id => (
  Notebook.findByIdAndUpdate(id, { updatedAt: Date.now() }).exec()
);

module.exports.addViewer = (id, userId) => (
  Notebook.findByIdAndUpdate(id, { $addToSet: { viewers: mongoose.Types.ObjectId(userId) } })
);

module.exports.removeViewer = (id, userId) => (
  Notebook.findByIdAndUpdate(id, { $pull: { viewers: mongoose.Types.ObjectId(userId) } })
);

module.exports.addEditor = (id, userId) => (
  Notebook.findByIdAndUpdate(id, {
    $addToSet: {
      editors: mongoose.Types.ObjectId(userId),
      viewers: mongoose.Types.ObjectId(userId),
    },
  })
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
