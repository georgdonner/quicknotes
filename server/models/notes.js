const db = require('../db');
const ObjectId = require('mongodb').ObjectID;
const ServerError = require('../serverError');

function getNotebook(notebook) {
  return new Promise((resolve, reject) => {
    db.get().collection(notebook, {strict: true}, (err, collection) => {
      if (err) {
        reject(new ServerError(err, 404));
      } else {
        resolve(collection);
      }
    });
  });
}

exports.all = (notebook) => {
  return new Promise(async (resolve, reject) => {
    try {
      const collection = await getNotebook(notebook)
      const docs = await collection.find().toArray();
      resolve(docs);
    } catch (err) {
      err instanceof ServerError ? reject(err) : reject(new ServerError(err.message, 400));
    }
  });
}

exports.get = (notebook, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const collection = await getNotebook(notebook)
      const doc = await collection.findOne({_id: id});
      if (doc) {
        resolve(doc);
      } else {
        reject({
          status: 404, 
          message: 'No note with id "' + id + '"'
        });
      }
    } catch (err) {
      err instanceof ServerError ? reject(err) : reject(new ServerError(err.message, 400));
    }
  });
}

exports.add = (notebook, note) => {
  return new Promise(async (resolve, reject) => {
    try {
      const metadata = {
        isStarred: false,
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: new Date(Date.now()).toISOString()
      }
      const newNote = Object.assign(note, metadata);
      const collection = await getNotebook(notebook)
      const doc = await collection.insertOne(newNote);
      resolve(doc.ops[0]);
    } catch (err) {
      err instanceof ServerError ? reject(err) : reject(new ServerError(err.message, 400));
    }
  });
}

exports.update = (notebook, id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newData = data;
      newData['updatedAt'] = new Date(Date.now()).toISOString();
      if (newData['_id']) {
        delete newData['_id'];
      }
      const collection = await getNotebook(notebook);
      const doc = await collection.findOneAndUpdate(
        { '_id': ObjectId(id) },
        newData,
        { returnOriginal: false }
      );
      resolve(doc.value);
    } catch (err) {
      err instanceof ServerError ? reject(err) : reject(new ServerError(err.message, 400));
    }
  });
}