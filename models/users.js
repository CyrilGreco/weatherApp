var mongoose = require('mongoose');
// Mettre en place le schéma de votre collection au sein de votre Backend.

var userschema = mongoose.Schema({
	username: String,
	email: String,
	password: String,
});

// schema pour créer un doc, collection est un ensemble de doc,
// création d'un model qui va gérer cityschema, avec le nom de la collection ('cities') et du schema.

var userModel = mongoose.model('users', userschema);

module.exports = userModel;
