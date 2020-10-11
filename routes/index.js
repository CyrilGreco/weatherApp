var express = require('express');
const session = require('express-session');
var router = express.Router();
// initialiser le module dans son projet pour générer une requête via une URL depuis son Backend.
var request = require('sync-request');

// variable d'environnement pour crypter les données sensibles
var API_KEY_WEATHER = process.env.API_KEY_WEATHER

var cityModel = require('../models/cities');
var userModel = require('../models/users');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/weather', async function (req, res, next) {
	var cityList = await cityModel.find();
	// donner l'accès à la page weather au seuls connecté et inscrits.
	console.log(req.session.user);

	if (req.session.user === null || req.session.user === undefined) {
		res.redirect('/');
	} else {
		res.render('weather', { cityList });
	}
});

router.get('/update-data', async function (req, res, next) {
	var cityList = await cityModel.find();

	// boucler sur chaque element du tableau pour rafraichir les data affichées.
	for (var i = 0; i < cityList.length; i++) {
		var result = request(
			'GET',
			'http://api.openweathermap.org/data/2.5/weather?q=' +
				cityList[i].name +
				'&units=metric&lang=fr&appid='+API_KEY_WEATHER
		);
		var dataweather = JSON.parse(result.body);

		await cityModel.updateOne(
			{ _id: cityList[i].id },
			{
				name: cityList[i].name,
				desc: dataweather.weather[0].description,
				img: dataweather.weather[0].icon,
				temp_min: dataweather.main.temp_min,
				temp_max: dataweather.main.temp_max,
			}
		);
	}

	var cityList = await cityModel.find();
	res.render('weather', { cityList });
});

// ajouter une ville

router.post('/add-city', async function (req, res, next) {
	// API

	var cityList = await cityModel.find();
	try {
		var result = request(
			'GET',
			'http://api.openweathermap.org/data/2.5/weather?q=' +
				req.body.name +
				'&units=metric&lang=fr&appid='+API_KEY_WEATHER
		);
		console.log(JSON.parse(result.getBody()));
		// stocker les data récupérées dans la variable dataweather pour les exploiter dasn un second temps.
		// methode JSON.parse afin de transformer des chaînes de caractères JSON en objet JavaScript.
		var dataweather = JSON.parse(result.getBody());

		// Tester si la ville recherchée est déjà présente dans la liste
		let alreadyDisplayed = false;

		nametest = req.body.name.toLowerCase();

		for (var i = 0; i < cityList.length; i++) {
			if (cityList[i].name.toLowerCase() === nametest) {
				alreadyDisplayed = true;
			}
		}

		if (alreadyDisplayed === false && dataweather.name) {
			var iconurl =
				'http://openweathermap.org/img/w/' +
				dataweather.weather[0].icon +
				'.png';
			// recuperer les data issues de l'api.
			var newCity = new cityModel({
				name: req.body.name,
				url: iconurl,
				des: dataweather.weather[0].description,
				Tmax: dataweather.main.temp_max,
				Tmin: dataweather.main.temp_min,
				longitude: dataweather.coord.lon,
				latitude: dataweather.coord.lat,
			});

			// pour les sauvegarder en base de données.
			await newCity.save();
			// afficher la variable qui contient les info de la collection de la base de données.
			cityList = await cityModel.find();
		}
	} catch (error) {
		console.error(error);
	}
	res.render('weather', { cityList });
});

router.get('/delete-city', async function (req, res, next) {
	var cityList = await cityModel.deleteOne({ _id: req.query.id });
	res.redirect('/weather');
});
// res.redirect renvoi à la route .get(/'weather'... qui elle même renvoi à weather. Si en revanche on souhaite utiliser res.render dans ce cas il faudra bien rappeler l'objet { cityList }, faut de quoi => erreur.

module.exports = router;
