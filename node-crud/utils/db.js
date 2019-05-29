const { MongoClient } = require('mongodb');
const { dbUrl, dbName } = require('../config');

class Db {
    constructor() {
        if (Db.db || Db.connecting) {
            return;
        }

        Db.connect(dbUrl, dbName);
    }

    static connect(dbUrl, dbName) {
        if (!dbUrl || !dbName) {
            return;
        }

        Db.connecting = MongoClient.connect(dbUrl, { useNewUrlParser: true })
            .then(client => {
                Db.db = client.db(dbName);
            })
            .catch(err => {
                throw err;
            });
    }

    insert(collectionName, insertData) {
        return Db.connecting.then(_ => {
            return Db.db.collection(collectionName).insertOne(insertData);
        });
    }

    delete(collectionName, filter) {
        return Db.connecting.then(_ => {
            return Db.db.collection(collectionName).deleteOne(filter);
        });
    }

    update(collectionName, filter, updateData) {
        return Db.connecting.then(_ => {
            return Db.db.collection(collectionName).updateOne(filter, { $set: updateData });
        });
    }

    find(collectionName, filter = {}) {
        return Db.connecting.then(_ => {
            return Db.db.collection(collectionName).find(filter).toArray();
        });
    }
}

module.exports = Db;
