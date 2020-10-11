//  Dans ce fichier, importez le module mongoose
var mongoose = require('mongoose');

// initialisation des variables d'environnement pour crypter les données sensibles. 
var MONGODB_USERNAME=process.env.MONGODB_USERNAME
var MONGODB_PASSWORD=process.env.MONGODB_PASSWORD

var options = {
	connectTimeoutMS: 5000,
	useNewUrlParser: true,

	useUnifiedTopology: true,
};
mongoose.connect(
	'mongodb+srv://'+MONGODB_USERNAME+':'+MONGODB_PASSWORD+'@cluster0.elmco.azure.mongodb.net/weatherapp?retryWrites=true&w=majority',
	options,
	function (err) {
		console.log(err);
	}
);

module.exports = mongoose;
