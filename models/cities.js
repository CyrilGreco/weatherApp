var mongoose = require('mongoose');
// Mettre en place le schéma de votre collection au sein de votre Backend.

var cityschema = mongoose.Schema({
	name: String,
	url: String,
	des: String,
	Tmax: Number,
	Tmin: Number,
	longitude: Number,
	latitude: Number,
});

// schema pour créer un doc, collection est un ensemble de doc,
// création d'un model qui va gérer cityschema, avec le nom de la collection ('cities') et du schema.

var cityModel = mongoose.model('cities', cityschema);

module.exports = cityModel;
