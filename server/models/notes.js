const db = require('../db');

function getNotebook(notebook) {
  return new Promise(
    (resolve, reject) => {
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
  return new Promise(
    (resolve, reject) => {
      getNotebook(notebook)
        .then((collection) => {
          collection.find().toArray((err, docs) => {
            if (err) {
              reject(err);
            } else {
              resolve(docs);
            }
          });
        })
        .catch((err) => {
          reject(err);
        });
    }
  );
}