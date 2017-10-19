const db = require('../db');

function getNotebook(notebook) {
  return new Promise((resolve, reject) => {
      db.get().collection(notebook, {strict: true}, (err, collection) => {
        if (err) {
          reject(err);
        } else {
          resolve(collection);
        }
      });
    }
  );
}

exports.all = (notebook) => {
  return new Promise(async (resolve, reject) => {
    try {
      const collection = await getNotebook(notebook)
      const docs = await collection.find().toArray();
      resolve(docs);
    } catch (err) {
      reject(err);
    }
  });
}

exports.get = (notebook, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const collection = await getNotebook(notebook)
      const doc = await collection.findOne({_id: id});
      resolve(doc);
    } catch (err) {
      reject(err);
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
      reject(err);
    }
  });
}