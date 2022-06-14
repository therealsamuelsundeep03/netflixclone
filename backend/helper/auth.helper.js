const mongo = require('../model/mongodb');

const helper = {
    findUserByEmail(email){
        return mongo.db.collection('auth').findOne({email});
    },

    create(email,password){
        return mongo.db.collection('auth').insertOne({email,password});
    }
}

module.exports = helper;