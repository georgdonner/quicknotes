const mongoose = require('mongoose');

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

module.exports.getByUser = (id, callback) => {
  Notebook.find({
    $or: [
      { owner: mongoose.Types.ObjectId(id) },
      { editors: mongoose.Types.ObjectId(id) },
      { viewers: mongoose.Types.ObjectId(id) },
    ],
  }, callback);
};

module.exports.getById = (id, callback) => {
  Notebook.findById(id, (err, doc) => {
    if (err) {
      callback(err);
    } else if (!doc) {
      callback(new Error('Notebook not found'));
    } else {
      callback(null, doc);
    }
  });
};

module.exports.addNotebook = (newNotebook, userId, callback) => {
  const notebook = new Notebook(
    { owner: mongoose.Types.ObjectId(userId), ...newNotebook },
  );
  notebook.save(callback);
};

module.exports.updateNotebook = (id, newData, callback) => {
  const {
    _id, owner, viewers, editors, ...data
  } = newData;
  Notebook.findByIdAndUpdate(id, { $set: data }, callback);
};

module.exports.addViewer = (id, userId, callback) => {
  Notebook.findByIdAndUpdate(id, { $push: { viewers: mongoose.Types.ObjectId(userId) } }, callback);
};

module.exports.removeViewer = (id, userId, callback) => {
  Notebook.findByIdAndUpdate(id, { $pull: { viewers: mongoose.Types.ObjectId(userId) } }, callback);
};

module.exports.addEditor = (id, userId, callback) => {
  Notebook.findByIdAndUpdate(id, { $push: { editors: mongoose.Types.ObjectId(userId) } }, callback);
};

module.exports.removeEditor = (id, userId, callback) => {
  Notebook.findByIdAndUpdate(id, { $pull: { editors: mongoose.Types.ObjectId(userId) } }, callback);
};

module.exports.updateOwner = (id, userId, callback) => {
  Notebook.findByIdAndUpdate(id, { $set: { owner: mongoose.Types.ObjectId(userId) } }, callback);
};

module.exports.removeNotebook = (id, callback) => {
  Notebook.findByIdAndRemove(id, callback);
};

module.exports.removeByOwner = (userId, callback) => {
  Notebook.find({ owner: mongoose.Types.ObjectId(userId) }).remove(callback);
};
